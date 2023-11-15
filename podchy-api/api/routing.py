from django.urls import re_path
from api.consumers import CpodConsumer

ws_urlpatterns = [
    re_path(r"ws/cpod/(?P<cpod_name>[0-9a-z-]+)", CpodConsumer.as_asgi()),
]
