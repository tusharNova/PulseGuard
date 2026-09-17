import logging

import requests
from django.conf import settings
from django.core.mail import send_mail

logger = logging.getLogger(__name__)


def dispatch_plugin_alerts(monitor, alert, subject: str, message: str):
    """
    Dispatches alerts to all active NotificationChannels for the monitor's user.
    """
    channels = monitor.user.notification_channels.filter(is_active=True)
    for channel in channels:
        try:
            if channel.channel_type == "SLACK":
                webhook_url = channel.config.get("webhook_url")
                if webhook_url:
                    requests.post(
                        webhook_url, json={"text": f"*{subject}*\n{message}"}, timeout=5
                    )
            elif channel.channel_type == "TELEGRAM":
                bot_token = channel.config.get("bot_token")
                chat_id = channel.config.get("chat_id")
                if bot_token and chat_id:
                    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
                    requests.post(
                        url,
                        json={"chat_id": chat_id, "text": f"{subject}\n\n{message}"},
                        timeout=5,
                    )
            elif channel.channel_type == "DISCORD":
                webhook_url = channel.config.get("webhook_url")
                if webhook_url:
                    requests.post(
                        webhook_url,
                        json={"content": f"**{subject}**\n{message}"},
                        timeout=5,
                    )
            elif channel.channel_type == "WEBHOOK":
                webhook_url = channel.config.get("webhook_url")
                if webhook_url:
                    requests.post(
                        webhook_url,
                        json={
                            "subject": subject,
                            "message": message,
                            "monitor_id": str(monitor.id),
                        },
                        timeout=5,
                    )
        except Exception as e:
            logger.error(
                f"Failed to send alert to channel {channel.name} ({channel.channel_type}): {e}"
            )


def send_monitor_down_alert(monitor, alert) -> bool:
    """
    Dispatches a 'Site DOWN' incident notification to the monitor owner.
    """
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

    # Dispatch to external plugins (Slack, Telegram, etc.)
    dispatch_plugin_alerts(monitor, alert, subject, message)

    user_email = monitor.user.email
    if not user_email or not getattr(monitor.user, "email_alerts_enabled", True):
        logger.debug(
            f"Skipping DOWN alert email for monitor {monitor.id}: email not set or alerts disabled"
        )
        return False

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
    Dispatches a 'Site RECOVERED' resolution notification to the monitor owner.
    """
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

    # Dispatch to external plugins (Slack, Telegram, etc.)
    dispatch_plugin_alerts(monitor, alert, subject, message)

    user_email = monitor.user.email
    if not user_email or not getattr(monitor.user, "email_alerts_enabled", True):
        logger.debug(
            f"Skipping UP recovery email for monitor {monitor.id}: email not set or alerts disabled"
        )
        return False

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
