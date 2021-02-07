from django.db import models
import string
import random
# Create your models here.

def generate_code():
    lenght=6
    while True:
        code = "".join(random.choices(string.ascii_uppercase, k = lenght))
        if room.objects.filter(code=code).count() == 0:
            break
    return code    
    
class room(models.Model):
    name = models.CharField(max_length=50, default = "Chat Room")
    code = models.CharField(max_length=10, default=generate_code, unique=True)
    host_user_name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    
class user(models.Model):
    user_session_id = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50, default="abc")
    last_name = models.CharField(max_length=50, default="abc")
    user_name = models.CharField(max_length=50, default="abc")
    password = models.CharField(max_length = 250, default="123")
    rooms = models.ManyToManyField(room)

class message(models.Model):
    text = models.CharField(max_length=250)
    room = models.ForeignKey(room, on_delete = models.CASCADE)
    user = models.ForeignKey(user, on_delete = models.CASCADE)
    sent_date = models.DateTimeField(auto_now_add=True)

