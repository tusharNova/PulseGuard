from celery import shared_task


@shared_task
def add(x, y):
    """
    Simple arithmetic task to verify Celery task execution and serialization.
    """
    return x + y
