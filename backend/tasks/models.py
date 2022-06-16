# from django.urls import reverse
from django.db import models

# Create your models here.


class Task(models.Model):
    title = models.CharField(
        max_length=255,
        null=False,
        blank=False,
        verbose_name="Title",
        help_text="Title of the Task",
    )
    completed = models.BooleanField(
        default=False, verbose_name="Completed", help_text="Task is Completed?"
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created", "completed")
        indexes = (models.Index(fields=("created", "completed")),)

    def __str__(self):
        return self.title

    # def get_absolute_url(self):
    #     return reverse("task_detail", args=[str(self.id)])
