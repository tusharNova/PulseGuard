from rest_framework import serializers
from .models import CheckResult, Monitor


class MonitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monitor
        fields = (
            "id",
            "name",
            "url",
            "monitor_type",
            "interval",
            "is_active",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")

    def validate_interval(self, value):
        if value < 10:
            raise serializers.ValidationError(
                "Monitoring interval must be at least 10 seconds."
            )
        return value


class CheckResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckResult
        fields = (
            "id",
            "monitor",
            "timestamp",
            "status_code",
            "response_time_ms",
            "is_up",
            "error_message",
        )
        read_only_fields = fields
