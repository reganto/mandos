from django.urls import path

from . import views

app_name = "task"

urlpatterns = [
    path("", views.TaskListView.as_view(), name="list"),
    path("<str:pk>/", views.TaskDetailView.as_view(), name="detail"),
]
