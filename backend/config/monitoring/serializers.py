from rest_framework import serializers
from .models import CheckResult, Monitor


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
        checks = obj.check_results.all()[:20]
        return CheckResultSerializer(checks, many=True).data

    def validate_interval(self, value):
        if value < 10:
            raise serializers.ValidationError(
                "Monitoring interval must be at least 10 seconds."
            )
        return value
