from core.models import Cpod, Permission
from django.contrib import admin


@admin.register(Cpod)
class CpodAdmin(admin.ModelAdmin):
    pass


@admin.register(Permission)
class PermissionAdmin(admin.ModelAdmin):
    pass
