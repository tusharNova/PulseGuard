from django.test import TestCase, override_settings
from .tasks import add


class CeleryTaskTests(TestCase):
    def test_add_task_synchronous(self):
        result = add(4, 6)
        self.assertEqual(result, 10)

    @override_settings(CELERY_TASK_ALWAYS_EAGER=True)
    def test_add_task_delay_execution(self):
        async_result = add.delay(15, 25)
        self.assertTrue(async_result.successful())
        self.assertEqual(async_result.result, 40)
