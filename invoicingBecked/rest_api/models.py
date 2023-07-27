from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser
# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self,username,password,**extra_fields):
        if not username:
            raise ValueError("Username sholud be provided")
        user=self.model(username=username,**extra_fields)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self,username,password,**extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        return self.create_user(username,password,**extra_fields)
    
class User(AbstractBaseUser):
    id=models.AutoField(primary_key=True)
    # first_name = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    username = models.CharField(max_length=30,unique=True)
    email= models.EmailField(max_length=100,unique=True)
    mobile_number = models.CharField(max_length=15)
    password=models.CharField(max_length=100)

    USERNAME_FIELD='username'
    objects=UserManager()

class Invoice(models.Model):
    id=models.AutoField(primary_key=True)
    # invoice_id=models.AutoField(primary_key=True)
    client_name=models.CharField(max_length=200)
    date=models.CharField(max_length=11)
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name='user')

class Item(models.Model):
    id=models.AutoField(primary_key=True)
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name='items',null=True, blank=True)
    desc=models.CharField(max_length=200)
    quantity=models.IntegerField()
    rate=models.FloatField()

