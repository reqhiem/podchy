from rest_framework import routers
from api.views import (
    auth as auth_views,
)

router = routers.DefaultRouter(trailing_slash=False)

router.register(
    prefix=r"auth",
    viewset=auth_views.AuthViewSet,
    basename="auth",
)

urlpatterns = router.urls
