from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    # group =serializers.CharField()

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError('password not match')
        return super().validate(data)
    
    
    def create(self, validated_data):
        # group_data = validated_data.pop('group')
        # group, _ = Group.objects.get_or_create(name=group_data)

        # if group_data == 'rider':
        #     validated_data['is_rider'] = True
        # else:
        #     validated_data['is_driver'] = True
        
        data = {
            key: value for key, value in validated_data.items()
            if key not in ('password1', 'password2')
        }
        data['password'] = validated_data['password1']

        user = self.Meta.model.objects.create_user(**data)

        # user.groups.add(group)

        user.save()

        return user
    
    class Meta:
        model = get_user_model()

        fields= (
            'id', 'email', 'password1', 'password2', 'first_name',
            'last_name',
        )
        read_only_fields = ('id', 'password1', 'password2',)

   
class LoginSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        user_data = UserSerializer(user).data
        for key, value in user_data.items():
            if key != 'id':
                token[key] = value
        
        return token

User = get_user_model()

class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'first_name', 'last_name']
        read_only_fields = ('id', 'email',)

    def update(self, instance, validated_data):
        # Exclude password fields from validated data
        validated_data.pop('password1', None)
        validated_data.pop('password2', None)
        
        # Perform the usual update logic
        instance = super().update(instance, validated_data)
        return instance

class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = get_user_model()
        fields = ( 'old_password', 'password', 'password2')

    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password':'password did not match'})
            
        return super().validate(attrs)
    
    def validate_old_password(self, value):
        user = self.context['request'].user

        if not user.check_password(value):
            raise serializers.ValidationError({'old_password': 'Old password is not correct'})

        return value
    
    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()

        return instance
    

