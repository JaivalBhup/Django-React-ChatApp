from django.urls import path
from .views import *

urlpatterns = [
    path('api/rooms', RoomListView.as_view()),
    path('api/users', UserListView.as_view()),
    path('api/check-user-session', CheckUserSession.as_view()),
    path('api/login-user', LoginUserView.as_view()),
    path('api/register-user', RegisterUserView.as_view()),
    path('api/logout-user', LogoutUserView.as_view()),
    path('api/authenticate-user', AuthenticateUserView.as_view()),
    path('api/get-curr-user', GetCurrUserView.as_view()),
    path('api/create-room', CreateRoomView.as_view()),
    path('api/add-user-to-room', AddUserToRoomView.as_view()),
    path('api/send-message', SendMessageView.as_view()),
    path('api/update-messages', UpdateMessagesView.as_view()),
]