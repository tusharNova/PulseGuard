from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

User = get_user_model()


class AuthAPITests(APITestCase):
    def setUp(self):
        self.register_url = reverse("account:register")
        self.login_url = reverse("account:login")
        self.profile_url = reverse("account:me")
        self.user_data = {
            "email": "dev@pulseguard.io",
            "password": "SecurePassword123!",
            "first_name": "Senior",
            "last_name": "Dev",
        }

    def test_user_registration_success(self):
        response = self.client.post(self.register_url, self.user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["email"], self.user_data["email"])
        self.assertNotIn("password", response.data)

        # Verify password is encrypted in database
        user = User.objects.get(email=self.user_data["email"])
        self.assertTrue(user.check_password(self.user_data["password"]))
        self.assertNotEqual(user.password, self.user_data["password"])

    def test_user_registration_duplicate_email(self):
        self.client.post(self.register_url, self.user_data, format="json")
        response = self.client.post(self.register_url, self.user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_registration_short_password(self):
        invalid_data = self.user_data.copy()
        invalid_data["password"] = "short"
        response = self.client.post(self.register_url, invalid_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_login_success(self):
        User.objects.create_user(**self.user_data)
        login_payload = {
            "email": self.user_data["email"],
            "password": self.user_data["password"],
        }
        response = self.client.post(self.login_url, login_payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_user_login_invalid_credentials(self):
        User.objects.create_user(**self.user_data)
        login_payload = {
            "email": self.user_data["email"],
            "password": "WrongPassword123!",
        }
        response = self.client.post(self.login_url, login_payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_profile_authenticated(self):
        user = User.objects.create_user(**self.user_data)
        # Login to get access token
        login_res = self.client.post(
            self.login_url,
            {"email": user.email, "password": self.user_data["password"]},
            format="json",
        )
        token = login_res.data["access"]

        # Call profile with Bearer token
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["email"], user.email)

    def test_user_profile_unauthenticated(self):
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
