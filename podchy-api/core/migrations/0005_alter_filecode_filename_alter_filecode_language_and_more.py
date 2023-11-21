# Generated by Django 4.2.7 on 2023-11-14 23:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_cpod_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='filecode',
            name='filename',
            field=models.CharField(default='main.py', help_text='Name of the file', max_length=100),
        ),
        migrations.AlterField(
            model_name='filecode',
            name='language',
            field=models.CharField(default='python', help_text='Programming language of the file', max_length=100),
        ),
        migrations.AlterField(
            model_name='filecode',
            name='value',
            field=models.TextField(default='', help_text='Content of the file'),
        ),
    ]