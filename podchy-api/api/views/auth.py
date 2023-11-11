from rest_framework import viewsets, status, serializers
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from api.serializers.auth import RegisterSerializer, TokenSerializer
from django.contrib.auth.models import User


class AuthViewSet(viewsets.GenericViewSet):
    serializer_class = AuthTokenSerializer

    @action(detail=False, methods=["post"])
    def login(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data, context={"request": self.request}
        )

        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, _ = Token.objects.get_or_create(user=user)
        return Response(TokenSerializer(token).data)

    @action(detail=False, methods=["post"])
    def register(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if (
            serializer.validated_data["password"]
            != serializer.validated_data["password_again"]
        ):
            raise serializers.ValidationError(
                {
                    "password": "Passwords do not match",
                }
            )

        user = User.objects.create_user(
            username=serializer.validated_data["username"],
            email=serializer.validated_data["email"],
            password=serializer.validated_data["password"],
            first_name=serializer.validated_data["first_name"],
            last_name=serializer.validated_data["last_name"],
        )
        user.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )
