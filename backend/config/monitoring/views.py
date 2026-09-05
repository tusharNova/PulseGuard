from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Monitor
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
