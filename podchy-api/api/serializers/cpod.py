from django.contrib.auth.models import User
from rest_framework import serializers
from core.models import Cpod, Permission, FileCode


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email")


class PermissionSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer(
        read_only=True,
        help_text="User that has the permission",
    )

    class Meta:
        model = Permission
        fields = ("user", "permission")


class CpodSerializer(serializers.ModelSerializer):
    users = PermissionSerializer(
        source="permission_set",
        many=True,
        required=False,
        help_text="Users that have access to the cpod",
    )

    class Meta:
        model = Cpod
        fields = ("cid", "name", "language", "users", "created_at")
        extra_kwargs = {
            "created_at": {"read_only": True},
        }


class FileCodeSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField()
    key = serializers.CharField(source="fid")

    class Meta:
        model = FileCode
        fields = (
            "key",
            "fid",
            "filename",
            "language",
            "content",
            "owner",
            "created_at",
        )
        extra_kwargs = {
            "created_at": {"read_only": True},
        }

    def get_content(self, obj):
        return obj.value
