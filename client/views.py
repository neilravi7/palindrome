from django.shortcuts import render

# Create your views here.

def home_page_view(request):
    return render(request, 'home/home.html')


def sign_up_view(request):
    return render(request, 'accounts/sign_up.html')


def sign_in_view(request):
    return render(request, 'accounts/sign_in.html')


def game_board(request):
    return render(request, 'games/palindrome_board.html')


def user_profile(request):
    return render(request, 'accounts/user_profile.html')