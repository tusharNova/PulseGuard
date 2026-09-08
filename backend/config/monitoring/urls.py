from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import CheckResultViewSet, MonitorViewSet

app_name = "monitoring"

router = DefaultRouter()
router.register(r"monitors", MonitorViewSet, basename="monitor")
router.register(r"check-results", CheckResultViewSet, basename="check-result")

urlpatterns = [
    path("", include(router.urls)),
]
