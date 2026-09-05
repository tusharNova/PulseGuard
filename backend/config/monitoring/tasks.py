import time
import requests
from celery import shared_task
from .models import CheckResult, Monitor


@shared_task(bind=True, max_retries=1)
def ping_monitor_task(self, monitor_id):
    """
    Asynchronous Celery task that executes an HTTP GET health check for a monitor,
    measures latency, captures failures/timeouts, and records a CheckResult.
    """
    try:
        monitor = Monitor.objects.get(id=monitor_id)
    except Monitor.DoesNotExist:
        return {"error": f"Monitor {monitor_id} not found"}

    if not monitor.is_active:
        return {"status": "skipped", "reason": "monitor is inactive"}

    url = monitor.url
    status_code = None
    response_time_ms = None
    is_up = False
    error_message = ""

    start_time = time.perf_counter()
    try:
        response = requests.get(
            url,
            timeout=10,
            headers={"User-Agent": "PulseGuard-Uptime-Bot/1.0"},
        )
        elapsed = time.perf_counter() - start_time
        response_time_ms = round(elapsed * 1000, 2)
        status_code = response.status_code
        is_up = 200 <= status_code < 400

        if not is_up:
            error_message = f"HTTP status code {status_code}"

    except requests.exceptions.Timeout:
        elapsed = time.perf_counter() - start_time
        response_time_ms = round(elapsed * 1000, 2)
        is_up = False
        error_message = "Request timed out (exceeded 10 seconds)"

    except requests.exceptions.SSLError as e:
        is_up = False
        error_message = f"SSL verification failed: {str(e)}"

    except requests.exceptions.ConnectionError as e:
        is_up = False
        error_message = f"Connection failed (DNS failure or unreachable host): {str(e)}"

    except requests.exceptions.RequestException as e:
        is_up = False
        error_message = f"Request error: {str(e)}"

    # Record the health check result
    check_result = CheckResult.objects.create(
        monitor=monitor,
        status_code=status_code,
        response_time_ms=response_time_ms,
        is_up=is_up,
        error_message=error_message,
    )

    return {
        "check_result_id": str(check_result.id),
        "monitor_id": str(monitor.id),
        "status_code": status_code,
        "response_time_ms": response_time_ms,
        "is_up": is_up,
        "error_message": error_message,
    }
