from django.contrib import admin

# Register your models here.

from .models import Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ("title", "completed", "created", "updated")
    list_filter = ("completed", "created")
    search_fields = ("title",)
