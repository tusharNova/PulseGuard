from django.contrib import admin
from .models import CheckResult, Monitor


@admin.register(Monitor)
class MonitorAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "url",
        "user",
        "monitor_type",
        "interval",
        "is_active",
        "created_at",
    )
    search_fields = ("name", "url", "user__email")
    list_filter = ("monitor_type", "is_active", "created_at")
    ordering = ("-created_at",)


@admin.register(CheckResult)
class CheckResultAdmin(admin.ModelAdmin):
    list_display = ("monitor", "is_up", "status_code", "response_time_ms", "timestamp")
    search_fields = ("monitor__name", "monitor__url", "error_message")
    list_filter = ("is_up", "timestamp", "status_code")
    ordering = ("-timestamp",)
