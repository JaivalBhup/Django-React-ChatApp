# Generated by Django 3.1.5 on 2021-01-29 09:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Room', '0006_auto_20210129_0914'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='user_name',
            field=models.CharField(default='abc', max_length=50),
        ),
    ]
