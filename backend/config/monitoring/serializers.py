from rest_framework import serializers

from .models import Alert, CheckResult, Monitor, NotificationChannel


class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = (
            "id",
            "monitor",
            "alert_type",
            "message",
            "is_resolved",
            "created_at",
        )
        read_only_fields = fields


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


class MonitorSerializer(serializers.ModelSerializer):
    recent_checks = serializers.SerializerMethodField()

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
            "recent_checks",
        )
        read_only_fields = ("id", "created_at", "updated_at", "recent_checks")

    def get_recent_checks(self, obj):
        if hasattr(obj, "prefetched_recent_checks"):
            checks = obj.prefetched_recent_checks[:20]
        else:
            checks = obj.check_results.all()[:20]
        return CheckResultSerializer(checks, many=True).data

    def validate_interval(self, value):
        if value < 10:
            raise serializers.ValidationError(
                "Monitoring interval must be at least 10 seconds."
            )
        return value


class NotificationChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationChannel
        fields = (
            "id",
            "name",
            "channel_type",
            "config",
            "is_active",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")

    def validate_config(self, value):
        # Optional: Add validation based on channel_type if needed.
        if not isinstance(value, dict):
            raise serializers.ValidationError("Config must be a valid JSON object.")
        return value
