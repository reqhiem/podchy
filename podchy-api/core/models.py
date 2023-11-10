import uuid
from django.db import models
from django.contrib.auth.models import User


class Cpod(models.Model):
    cid = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        help_text="Unique identifier for the cpod",
    )
    name = models.CharField(max_length=100)
    users = models.ManyToManyField(
        User,
        through="Permission",
        help_text="Users that have access to the cpod",
    )

    class Meta:
        ordering = ["name"]
        verbose_name = "Cpod"
        verbose_name_plural = "Cpods"

    def __str__(self):
        return self.name


class Permission(models.Model):
    OWNER_PERMISSION = "OWNER"
    INVITED_PERMISSION = "INVITED"

    PERMISSION_CHOICES = [
        (OWNER_PERMISSION, "Owner"),
        (INVITED_PERMISSION, "Invited"),
    ]
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        help_text="User that has the permission",
    )

    cpod = models.ForeignKey(
        Cpod,
        on_delete=models.CASCADE,
        help_text="Cpod that the user has the permission",
    )

    permission = models.CharField(
        max_length=20,
        choices=PERMISSION_CHOICES,
        default=OWNER_PERMISSION,
        help_text="Permission of the user",
    )


class FileCode(models.Model):
    fid = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        help_text="Unique identifier for the file",
    )
    filename = models.CharField(max_length=100)
    language = models.CharField(max_length=100)
    value = models.TextField()
    cpod = models.ForeignKey(
        Cpod,
        on_delete=models.CASCADE,
        help_text="Cpod that the file belongs to",
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        help_text="User that created the file",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["filename"]
        verbose_name = "File"
        verbose_name_plural = "Files"
