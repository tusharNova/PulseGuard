import uuid
from django.conf import settings
from django.db import models
from django.utils import timezone


class Monitor(models.Model):
    class Protocol(models.TextChoices):
        HTTP = "HTTP", "HTTP"
        HTTPS = "HTTPS", "HTTPS"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="monitors",
    )
    name = models.CharField(max_length=120)
    url = models.URLField()
    monitor_type = models.CharField(
        max_length=10,
        choices=Protocol.choices,
        default=Protocol.HTTPS,
    )
    interval = models.PositiveIntegerField(
        default=60,
        help_text="Monitoring interval in seconds",
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} ({self.url})"


class CheckResult(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    monitor = models.ForeignKey(
        Monitor,
        on_delete=models.CASCADE,
        related_name="check_results",
    )
    timestamp = models.DateTimeField(default=timezone.now, db_index=True)
    status_code = models.IntegerField(null=True, blank=True)
    response_time_ms = models.FloatField(null=True, blank=True)
    is_up = models.BooleanField(default=False)
    error_message = models.TextField(blank=True, default="")

    class Meta:
        ordering = ["-timestamp"]
        indexes = [
            models.Index(fields=["monitor", "-timestamp"]),
        ]

    def __str__(self):
        status_str = "UP" if self.is_up else "DOWN"
        return f"{self.monitor.name} - {status_str} at {self.timestamp}"


class Alert(models.Model):
    class AlertType(models.TextChoices):
        DOWN = "DOWN", "Site Down"
        UP = "UP", "Site Recovered"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    monitor = models.ForeignKey(
        Monitor,
        on_delete=models.CASCADE,
        related_name="alerts",
    )
    alert_type = models.CharField(
        max_length=20,
        choices=AlertType.choices,
    )
    message = models.TextField()
    is_resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"[{self.alert_type}] {self.monitor.name} - {self.created_at}"
