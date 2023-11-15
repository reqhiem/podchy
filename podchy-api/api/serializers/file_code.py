from core.models import FileCode
from rest_framework import serializers


class FileCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileCode
        fields = (
            "fid",
            "filename",
            "language",
            "value",
            "cpod",
            "owner",
            "created_at",
            "updated_at",
        )
        extra_kwargs = {
            "fid": {"read_only": True},
            "owner": {"read_only": True},
        }
