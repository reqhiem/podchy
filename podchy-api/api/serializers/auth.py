from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    password = serializers.CharField(write_only=True)
    password_again = serializers.CharField(write_only=True)


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "first_name",
            "last_name",
        )


class TokenSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer(read_only=True)

    class Meta:
        model = Token
        fields = (
            "key",
            "user",
        )
