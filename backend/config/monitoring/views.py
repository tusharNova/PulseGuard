import datetime
from django.db.models import Avg, Count, Q
from django.utils import timezone
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import CheckResult, Monitor
from .serializers import CheckResultSerializer, MonitorSerializer


class MonitorViewSet(viewsets.ModelViewSet):
    serializer_class = MonitorSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Multi-tenant isolation: Users can only see and manipulate their own monitors.
        """
        return Monitor.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Auto-bind the authenticated user as the owner of the newly created monitor.
        """
        serializer.save(user=self.request.user)

    @action(detail=True, methods=["get"], url_path="history")
    def history(self, request, pk=None):
        """
        Retrieve recent check results for this monitor (capped at latest 50).
        """
        monitor = self.get_object()
        results = monitor.check_results.all()[:50]
        serializer = CheckResultSerializer(results, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"], url_path="uptime-stats")
    def uptime_stats(self, request, pk=None):
        """
        Calculate 24-hour uptime percentage and average latency.
        """
        monitor = self.get_object()
        since = timezone.now() - datetime.timedelta(hours=24)
        recent_checks = monitor.check_results.filter(timestamp__gte=since)

        stats = recent_checks.aggregate(
            total_checks=Count("id"),
            successful_checks=Count("id", filter=Q(is_up=True)),
            avg_response_time=Avg("response_time_ms", filter=Q(is_up=True)),
        )

        total = stats["total_checks"] or 0
        successful = stats["successful_checks"] or 0
        avg_rt = stats["avg_response_time"]

        uptime_percentage = round((successful / total) * 100, 2) if total > 0 else 100.0
        avg_response_time_ms = round(avg_rt, 2) if avg_rt is not None else None

        return Response(
            {
                "monitor_id": str(monitor.id),
                "monitor_name": monitor.name,
                "period": "24h",
                "total_checks": total,
                "successful_checks": successful,
                "failed_checks": total - successful,
                "uptime_percentage": uptime_percentage,
                "avg_response_time_ms": avg_response_time_ms,
            }
        )


class CheckResultViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Paginated read-only viewset for CheckResults, scoped to authenticated user's monitors.
    """

    serializer_class = CheckResultSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = CheckResult.objects.filter(monitor__user=self.request.user)
        monitor_id = self.request.query_params.get("monitor")
        if monitor_id:
            queryset = queryset.filter(monitor_id=monitor_id)
        return queryset
