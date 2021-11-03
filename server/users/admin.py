from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin

class UserAdminConfig(UserAdmin):
    model = User
    search_fields = ('email', 'username')
    ordering = ('date_joined',)
    list_display = ('id', 'email', 'username', 'date_joined', 'is_active', 'is_staff', 'is_superuser')

admin.site.register(User, UserAdminConfig)