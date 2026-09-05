from rest_framework import permissions, viewsets
from .models import Monitor
from .serializers import MonitorSerializer


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
