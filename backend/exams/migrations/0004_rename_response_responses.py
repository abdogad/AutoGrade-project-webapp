# Generated by Django 5.0.6 on 2024-06-18 01:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('exams', '0003_remove_exam_date_alter_exam_end_time_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Response',
            new_name='Responses',
        ),
    ]