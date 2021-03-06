# Generated by Django 4.0.5 on 2022-06-16 14:35

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='Title of the Task', max_length=255, verbose_name='Title')),
                ('completed', models.BooleanField(default=False, help_text='Task is Completed?', verbose_name='Completed')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ('-created', 'completed'),
            },
        ),
        migrations.AddIndex(
            model_name='task',
            index=models.Index(fields=['created', 'completed'], name='api_task_created_bffabf_idx'),
        ),
    ]
