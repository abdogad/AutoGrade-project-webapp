# Generated by Django 5.0.6 on 2024-06-22 00:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exams', '0008_alter_question_graded'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='result',
            name='score',
        ),
        migrations.RemoveField(
            model_name='result',
            name='student_email',
        ),
        migrations.RemoveField(
            model_name='result',
            name='student_name',
        ),
        migrations.AddField(
            model_name='result',
            name='csv_file',
            field=models.FileField(default='exit', upload_to='media/'),
            preserve_default=False,
        ),
    ]