from django.db.models import Q
from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from core.models import (
    Cpod,
    Permission,
    FileCode,
)
from api.serializers.cpod import CpodSerializer, FileCodeSerializer
from api.utils import generate_hello_world


class CpodViewSet(viewsets.ModelViewSet):
    model_class = Cpod
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = CpodSerializer

    def get_queryset(self):
        current_user = self.request.user
        return (
            Cpod.objects.filter(
                Q(
                    permission__user=current_user,
                    permission__permission__in=["OWNER", "INVITED"],
                )
            )
            .distinct()
            .order_by("-created_at")
        )

    def perform_create(self, serializer):
        instance = serializer.save()
        instance.users.add(
            self.request.user,
            through_defaults={
                "permission": Permission.OWNER_PERMISSION,
            },
        )
        language = instance.language
        print(language)
        file = generate_hello_world(language)
        user = User.objects.get(username=self.request.user.username)
        FileCode.objects.create(
            cpod=instance,
            filename=file["filename"],
            language=language,
            value=file["content"],
            owner=user,
        )

    @action(methods=["POST"], detail=True)
    def invite(self, request, pk=None):
        cpod = self.get_object()
        username = request.data["username"]
        user = User.objects.get(username=username)
        if user is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        cpod.users.add(
            user,
            through_defaults={
                "permission": Permission.INVITED_PERMISSION,
            },
        )
        return Response(status=status.HTTP_200_OK)

    @action(methods=["GET"], detail=True)
    def files(self, request, pk=None):
        cpod = self.get_object()
        files = FileCode.objects.filter(cpod=cpod)
        serializer = FileCodeSerializer(files, many=True)
        return Response(serializer.data)
