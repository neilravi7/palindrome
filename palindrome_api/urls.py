from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView
from . import views

app_name = "palindrome_api"

urlpatterns = [
    path('moves/checker', views.PalindromeChecker.as_view(), name='moves_checker'),
    path('computer/moves', views.PalindromeComputerMoves.as_view(), name='computer_moves'),
]