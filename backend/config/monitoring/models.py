import uuid
from django.conf import settings
from django.db import models


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
