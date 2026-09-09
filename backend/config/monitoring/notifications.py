import logging
from django.conf import settings
from django.core.mail import send_mail

logger = logging.getLogger(__name__)


def send_monitor_down_alert(monitor, alert) -> bool:
    """
    Dispatches a 'Site DOWN' incident notification email to the monitor owner.
    """
    user_email = monitor.user.email
    if not user_email:
        return False

    subject = f"🚨 [DOWN ALERT] {monitor.name} is unreachable"
    message = (
        f"Hello,\n\n"
        f"PulseGuard detected that your monitored service is DOWN.\n\n"
        f"Monitor: {monitor.name}\n"
        f"Endpoint: {monitor.url}\n"
        f"Protocol: {monitor.monitor_type}\n"
        f"Incident Time: {alert.created_at.strftime('%Y-%m-%d %H:%M:%S UTC')}\n"
        f"Error Details: {alert.message}\n\n"
        f"We will automatically notify you the moment your service recovers.\n\n"
        f"— Team PulseGuard\n"
    )

    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user_email],
            fail_silently=False,
        )
        logger.info(f"Sent DOWN alert email for monitor {monitor.id} to {user_email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send DOWN alert email for monitor {monitor.id}: {e}")
        return False


def send_monitor_up_alert(monitor, alert) -> bool:
    """
    Dispatches a 'Site RECOVERED' resolution notification email to the monitor owner.
    """
    user_email = monitor.user.email
    if not user_email:
        return False

    subject = f"✅ [RECOVERED] {monitor.name} is back online"
    message = (
        f"Great news!\n\n"
        f"PulseGuard detected that your service has RECOVERED and is responding normally.\n\n"
        f"Monitor: {monitor.name}\n"
        f"Endpoint: {monitor.url}\n"
        f"Recovery Time: {alert.created_at.strftime('%Y-%m-%d %H:%M:%S UTC')}\n"
        f"Status: Healthy (200 OK)\n\n"
        f"The previous incident has been marked as resolved.\n\n"
        f"— Team PulseGuard\n"
    )

    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user_email],
            fail_silently=False,
        )
        logger.info(f"Sent UP recovery email for monitor {monitor.id} to {user_email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send UP recovery email for monitor {monitor.id}: {e}")
        return False
