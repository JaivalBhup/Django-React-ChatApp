# Generated by Django 3.1.5 on 2021-01-27 11:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Room', '0003_user_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='user_session_id',
            field=models.CharField(max_length=50),
        ),
    ]
