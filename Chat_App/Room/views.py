from django.shortcuts import render
from .serializer import *
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from django.contrib.auth.hashers import make_password, check_password

# Create your views here.

class RoomListView(generics.ListCreateAPIView):
    queryset = room.objects.all()
    serializer_class = RoomSerializer

class UserListView(generics.ListCreateAPIView):
    queryset = user.objects.all()
    serializer_class = UserSerializer

class CheckUserSession(APIView):
    def get(self, request, format = None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        session = self.request.session.session_key
        u = user.objects.filter(user_session_id = session)
        if u:
            return Response({"user_name": u[0].user_name}, status = status.HTTP_200_OK)
        return Response({"user_name":None})

class LogoutUserView(APIView):
    def post(self, request, format=None):
        query_set = user.objects.filter(user_session_id = self.request.session.session_key)
        if len(query_set)>0:
            print("sessionChanged")
            u = query_set[0]
            print(u.user_name)
            u.user_session_id = ""
            u.save(update_fields=['user_session_id'])
            return Response({"Message":"User Logged out"}, status = status.HTTP_200_OK)

class AuthenticateUserView(APIView):
    def get(self, request, format=None):
        user_name = request.GET.get('user_name')
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        query_set = user.objects.filter(user_name=user_name)
        if len(query_set)>0:
            u = query_set[0]
            if u.user_session_id == self.request.session.session_key:
                return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_403_FORBIDDEN)

class GetCurrUserView(APIView):
    def get(self, request, format=None):
        user_name = request.GET.get('user_name')
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        query_set = user.objects.filter(user_name=user_name)
        if len(query_set)>0:
            u = query_set[0]
            roomsIds = UserSerializer(u).data['rooms']
            print(roomsIds)
            rooms = []
            for r in roomsIds:
                rooms.append(RoomSerializer(room.objects.filter(id = r)[0]).data)
            messages = {}
            for r in rooms:
                messages[r['code']] = []
                mess_obj = message.objects.filter(room = r['id']).order_by('-sent_date')
                for m in mess_obj:
                    d = MessageSerializer(m).data
                    sender = user.objects.filter(id=d['user'])[0]
                    d['userName'] = sender.user_name
                    messages[r['code']].append(d)
            data = {
                'userData': UserSerializer(u).data,
                'rooms': rooms,
                'messages': messages
            }
            if u.user_session_id == self.request.session.session_key:
                return Response(data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_403_FORBIDDEN)

class LoginUserView(APIView):
    serializer_class = LoginUserSerializer
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        user_session_id = self.request.session.session_key
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            query_set = user.objects.filter(user_session_id=user_session_id)
            if len(query_set) > 0:
                print("sessionChanged")
                u = query_set[0]
                print(u.user_name)
                u.user_session_id = ""
                u.save(update_fields=['user_session_id'])
                print(u.user_session_id)
            user_name = serializer.data.get('user_name')
            password = serializer.data.get('password')
            query_set = user.objects.filter(user_name = user_name)
            #check pass word
            if len(query_set)>0:
                u = query_set[0]
                if check_password(password,  u.password):
                    
                    u.user_session_id = user_session_id
                    u.save(update_fields=['user_session_id'])
                    return Response(UserSerializer(u).data, status=status.HTTP_200_OK)
                    
                else:
                    return Response({"Error":"Password Incorrect"}, status = status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"Error":"User Not Found"}, status = status.HTTP_404_NOT_FOUND)


class RegisterUserView(APIView):
    serializer_class = RegisterUserSerializer
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user_name = serializer.data.get('user_name')
            query_set = user.objects.filter(user_name=user_name)
            if len(query_set) > 0:
                return Response({"Error":"User Already Exists"}, status = status.HTTP_403_FORBIDDEN)
            user_session_id = self.request.session.session_key
            query_set = user.objects.filter(user_session_id=user_session_id)
            if len(query_set) > 0:
                print("sessionChanged")
                u = query_set[0]
                print(u.user_name)
                u.user_session_id = ""
                u.save(update_fields=['user_session_id'])
                print(u.user_session_id)
            print("ajhkajsf")
            fName = serializer.data.get('first_name')
            lName = serializer.data.get('last_name')
            password = serializer.data.get('password')
            password = make_password(password)
            print(password)
            u = user(first_name = fName, last_name = lName, user_name = user_name, password=password, user_session_id=user_session_id)
            u.save()
            print(UserSerializer(u).data)
            return Response(UserSerializer(u).data, status = status.HTTP_201_CREATED)

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user_query = user.objects.filter(user_session_id=self.request.session.session_key)
            if len(user_query)>0:
                u=user_query[0]
                room_name = serializer.data.get('name')
                host_user_name = u.user_name
                r = room(name=room_name, host_user_name=host_user_name)
                r.save()
                u.rooms.add(r)
                return Response(UserSerializer(u).data)

class AddUserToRoomView(APIView):
    #Please add validations and errors.........
    def post(self, request, format=None):
        userName = request.data.get('user_name')
        room_code = request.data.get('code')
        print(userName, room_code)
        query_set1 = user.objects.filter(user_name=userName)
        query_set2 = room.objects.filter(code=room_code)

        if len(query_set1) > 0 and len(query_set2)>0:
            u = query_set1[0]
            r = query_set2[0]
            u.rooms.add(r)
            data = RoomSerializer(r).data
            return Response(data, status= status.HTTP_200_OK)
        else:
            return Response({'Error':'User Not Found'})

class SendMessageView(APIView):
    #Please add validations and errors.........
    def post(self, request, format=None):
        userName = request.data.get('user_name')
        m_text = request.data.get('message')
        room_code = request.data.get('code')
        print(userName, room_code, m_text)
        query_set1 = user.objects.filter(user_name=userName)
        query_set2 = room.objects.filter(code=room_code)
        if len(query_set1) > 0 and len(query_set2)>0:
            u = query_set1[0]
            r = query_set2[0]
            m = message(user = u, room = r, text = m_text)
            m.save()
            r.created_at = m.sent_date
            r.save(update_fields=['created_at'])
            return Response(status= status.HTTP_200_OK)
        else:
            return Response({'Error':'Message Not Sent'})

class UpdateMessagesView(APIView):
    def get(self,request,format=None):
        room_code = request.GET.get('room_code')
        query_set = room.objects.filter(code=room_code)
        if len(query_set)>0:
            r = query_set[0]
            messages = []
            mess_obj = message.objects.filter(room = r.id).order_by('-sent_date')
            for m in mess_obj:
                d = MessageSerializer(m).data
                sender = user.objects.filter(id=d['user'])[0]
                d['userName'] = sender.user_name
                messages.append(d)
            data={
                'messages':messages
            }
            return Response(data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_403_FORBIDDEN)
