from core.models import FileCode
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from api.serializers.file_code import FileCodeSerializer


class FileCodeViewSet(viewsets.ModelViewSet):
    model_class = FileCode
    serializer_class = FileCodeSerializer

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
