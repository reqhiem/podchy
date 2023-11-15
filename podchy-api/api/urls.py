from rest_framework import routers
from api.views import (
    auth as auth_views,
    cpod as cpod_views,
    file_code as file_code_views,
)

router = routers.DefaultRouter(trailing_slash=False)

router.register(
    prefix=r"auth",
    viewset=auth_views.AuthViewSet,
    basename="auth",
)

router.register(
    prefix=r"cpod",
    viewset=cpod_views.CpodViewSet,
    basename="cpod",
)

router.register(
    prefix=r"file",
    viewset=file_code_views.FileCodeViewSet,
    basename="file-code",
)

urlpatterns = router.urls
