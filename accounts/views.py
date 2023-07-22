# django core imports
from django.contrib.auth import get_user_model
from django.shortcuts import render

# rest_framework imports
from rest_framework import generics #, permissions, viewsets
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response

# serializers imports
from . import serializers


# Auth API's
class SignUpView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = serializers.UserSerializer


class LoginView(TokenObtainPairView):
    serializer_class = serializers.LoginSerializer


# Players API's
class UserList(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.UserSerializer
    queryset = get_user_model().objects.all()


class UserDetail(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.UserSerializer
    queryset = get_user_model().objects.all()
    lookup_field = 'pk'


class UserDelete(generics.DestroyAPIView):
    queryset = get_user_model().objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.UserSerializer
    lookup_field = 'pk'


class UserPartialUpdate(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.UpdateUserSerializer
    queryset = get_user_model().objects.all()
    lookup_field = 'pk'


class ChangePasswordView(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.ChangePasswordSerializer
    queryset = get_user_model().objects.all()
    lookup_field = 'pk'


