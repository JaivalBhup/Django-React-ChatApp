# Generated by Django 3.1.5 on 2021-01-29 09:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Room', '0007_auto_20210129_0925'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='first_name',
            field=models.CharField(default='abc', max_length=50),
        ),
        migrations.AddField(
            model_name='user',
            name='last_name',
            field=models.CharField(default='abc', max_length=50),
        ),
    ]
