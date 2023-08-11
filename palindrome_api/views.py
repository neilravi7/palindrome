from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from faker import Faker

class PalindromeChecker(APIView, AllowAny):
    """Check given string is palindrome or not
    """    
    
    def post(self, request, format=None):
        word = request.data.get('palindromeString')
        if not word == "":
            is_palindrome = word == word[::-1]
            if is_palindrome:
                message = "It's plaindrome"
            else:
                message = "It's not palindrome"
        else:
            return Response({
                "message":"palindrome string missing"
            }, status=status.HTTP_400_BAD_REQUEST
            )
        return Response({"isPalindrome":is_palindrome, "message":message}, status=status.HTTP_200_OK)


class PalindromeComputerMoves(APIView, AllowAny):
    """Geuss a palindrome string for computer.
        Brain of computer.
    """    
    def get(self, request, format=None):
        fake = Faker()
        word = fake.word()
        word += word[::-1]
        return Response({"palindromeWord":word}, status=status.HTTP_200_OK)
    