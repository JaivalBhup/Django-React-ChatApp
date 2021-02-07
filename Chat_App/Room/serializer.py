from rest_framework import serializers
from .models import *

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = room
        fields = ('id','name', 'code','host_user_name','user_set', 'created_at')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ('id', 'user_session_id', 'first_name', 'last_name', 'user_name', 'rooms','password')

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = message
        fields = ('id', 'text', 'room', 'user', 'sent_date')

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ('first_name','last_name','user_name', 'password')

class LoginUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ('user_name', 'password')

class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = room
        fields = ('name',)