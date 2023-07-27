from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields="__all__"
    def create(self,validated_data):
        user=User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            name=validated_data['name'],
            # last_name=validated_data['last_name'],
            email=validated_data['email'],
            mobile_number=validated_data['mobile_number']
        )
        return user
class LoginSerializer(serializers.Serializer):
    username=serializers.CharField()
    password=serializers.CharField()
    def validate(self,data):
        user=authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Cred")
    
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'invoice', 'desc', 'quantity', 'rate')

class InvoiceSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)
    class Meta:
        model = Invoice
        fields='__all__'
        # fields = ('id', 'client_name', 'date', 'user', 'items')

# class itemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=item
#         # fields='__all__'
#         fields = ['desc', 'quantity', 'rate']

# class InvoiceSerializer(serializers.ModelSerializer):
#     items = itemSerializer(many=True)
#     class Meta:
#         model = Invoice
#         fields='__all__'


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=User
#         fields="__all__"