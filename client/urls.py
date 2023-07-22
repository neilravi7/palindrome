from django.urls import path
from . import views

app_name = 'client'

urlpatterns = [
    path('sign_up', views.sign_up_view, name='sign_up_client'),
    path('sign_in', views.sign_in_view, name='sign_in_client'),
    path('game/board', views.game_board, name='game_board'),
    path('user/profile', views.user_profile, name='user_profile'),
]