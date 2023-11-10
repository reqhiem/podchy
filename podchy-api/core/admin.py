from core.models import Cpod, Permission, FileCode
from django.contrib import admin


@admin.register(Cpod)
class CpodAdmin(admin.ModelAdmin):
    pass


@admin.register(Permission)
class PermissionAdmin(admin.ModelAdmin):
    pass


@admin.register(FileCode)
class FileCodeAdmin(admin.ModelAdmin):
    pass
