from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import CheckResult, Monitor

User = get_user_model()


class MonitorAPITests(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(
            email="alice@pulseguard.io",
            password="AlicePassword123!",
            first_name="Alice",
        )
        self.user2 = User.objects.create_user(
            email="bob@pulseguard.io",
            password="BobPassword123!",
            first_name="Bob",
        )
        self.monitors_url = reverse("monitoring:monitor-list")
        self.monitor_payload = {
            "name": "Production Service",
            "url": "https://pulseguard.io",
            "monitor_type": "HTTPS",
            "interval": 60,
        }

    def test_create_monitor_authenticated(self):
        self.client.force_authenticate(user=self.user1)
        response = self.client.post(self.monitors_url, self.monitor_payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], self.monitor_payload["name"])

        # Check database association
        monitor = Monitor.objects.get(id=response.data["id"])
        self.assertEqual(monitor.user, self.user1)

    def test_create_monitor_unauthenticated(self):
        response = self.client.post(self.monitors_url, self.monitor_payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_list_monitors_scoped_to_user(self):
        # Alice creates a monitor
        self.client.force_authenticate(user=self.user1)
        self.client.post(self.monitors_url, self.monitor_payload, format="json")

        # Bob logs in and checks list -> must be empty
        self.client.force_authenticate(user=self.user2)
        response = self.client.get(self.monitors_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_tenant_isolation_cannot_access_other_users_monitor(self):
        # Alice creates a monitor
        monitor = Monitor.objects.create(
            user=self.user1,
            name="Alice Secret Server",
            url="https://secret.alice.io",
            interval=60,
        )
        detail_url = reverse("monitoring:monitor-detail", kwargs={"pk": monitor.id})

        # Bob attempts to GET, PATCH, DELETE Alice's monitor
        self.client.force_authenticate(user=self.user2)
        get_res = self.client.get(detail_url)
        self.assertEqual(get_res.status_code, status.HTTP_404_NOT_FOUND)

        patch_res = self.client.patch(detail_url, {"name": "Hacked"}, format="json")
        self.assertEqual(patch_res.status_code, status.HTTP_404_NOT_FOUND)

        delete_res = self.client.delete(detail_url)
        self.assertEqual(delete_res.status_code, status.HTTP_404_NOT_FOUND)

    def test_interval_validation(self):
        self.client.force_authenticate(user=self.user1)
        invalid_payload = self.monitor_payload.copy()
        invalid_payload["interval"] = 5  # Below 10s minimum
        response = self.client.post(self.monitors_url, invalid_payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("interval", response.data)

    def test_create_check_result_and_query(self):
        monitor = Monitor.objects.create(
            user=self.user1,
            name="API Gateway",
            url="https://api.gateway.io",
        )
        check = CheckResult.objects.create(
            monitor=monitor,
            status_code=200,
            response_time_ms=145.2,
            is_up=True,
        )
        self.assertTrue(check.is_up)
        self.assertEqual(check.status_code, 200)
        self.assertEqual(monitor.check_results.count(), 1)

    def test_monitor_history_endpoint_authenticated(self):
        monitor = Monitor.objects.create(
            user=self.user1,
            name="Payment API",
            url="https://pay.gateway.io",
        )
        # Create 3 check results
        CheckResult.objects.create(monitor=monitor, status_code=200, response_time_ms=120.0, is_up=True)
        CheckResult.objects.create(monitor=monitor, status_code=500, response_time_ms=250.0, is_up=False)
        CheckResult.objects.create(monitor=monitor, status_code=200, response_time_ms=110.0, is_up=True)

        history_url = reverse("monitoring:monitor-history", kwargs={"pk": monitor.id})

        self.client.force_authenticate(user=self.user1)
        response = self.client.get(history_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)
        self.assertEqual(response.data[0]["status_code"], 200)

    def test_monitor_history_tenant_isolation(self):
        monitor = Monitor.objects.create(
            user=self.user1,
            name="Alice Server",
            url="https://alice.io",
        )
        CheckResult.objects.create(monitor=monitor, status_code=200, response_time_ms=50.0, is_up=True)
        history_url = reverse("monitoring:monitor-history", kwargs={"pk": monitor.id})

        # Bob attempts to read Alice's monitor check history -> must return 404
        self.client.force_authenticate(user=self.user2)
        response = self.client.get(history_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

