# Generated by Django 3.1.5 on 2021-02-05 23:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Room', '0009_auto_20210201_1905'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='host_user_name',
            field=models.CharField(max_length=50),
        ),
    ]