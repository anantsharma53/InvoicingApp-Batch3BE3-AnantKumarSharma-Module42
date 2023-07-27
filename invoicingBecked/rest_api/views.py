from django.shortcuts import render
from django.views import View
from .serializers import *
from django.http import HttpResponse,JsonResponse,HttpResponseBadRequest,Http404
import json
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
# Create your views here.
# invoices = [{
#         "invoice_id": 1,
#         "client_name": "Anant Sharma",
#         "date": "2023-05-30",
#         "items": [
#             {
#                 "desc": "product 1",
#                 "rate": 100.00,
#                 "quantity": 2,
#             }
#         ],
#     }]
# user=[{
#     "user_id":1,
#     "email":"abc@gmail.com",
#     "password":"abc123",
# }]
class create_invoice(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        data=json.loads(request.body)
        data["user"]=request.user.id
        serializer = InvoiceSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class delet_invoice(APIView):
    permission_classes=[IsAuthenticated]
    def delete(self, request,id):
        try:
            invoice = Invoice.objects.get(user=request.user.id,pk=id)
            invoice.delete()
            return JsonResponse({"message": "Invoice deleted successfully"}, status=200)
        except Invoice.DoesNotExist:
            return JsonResponse({"error": "Invoice not found"}, status=404)

class GetInvoiceViews(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request):
        print(request.user.id)
        invoices = Invoice.objects.filter(user_id=request.user.id)
        invoice_serialized=InvoiceSerializer(invoices,many=True).data
        return JsonResponse(invoice_serialized,safe=False)
    
class GetSingleInvoiceViews(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request, id):
        invoice = Invoice.objects.filter(id=id,user=request.user.id).first()
        if invoice is not None:
            # Serialize the invoice object into JSON data
            invoice_serialized = InvoiceSerializer(invoice).data
            # Return the serialized data as a JSON response
            return JsonResponse(invoice_serialized, safe=False)
        else:
            # If the invoice with the given id does not exist, return a 404 response
            return JsonResponse({'error': 'Invoice not found'}, status=404)
        
class ItemEntryViews(View):
    def post(self, request,id):
        item_data=json.loads(request.body)
        item_data["invoice"] = id
        item_serialized=ItemSerializer(data=item_data)
        if(item_serialized.is_valid()):           
           item_serialized.save()
           return JsonResponse({"message":"items added succesfully"}, status=200)
        return HttpResponseBadRequest() 
    def put(self, request, item_id):
        try:
            item = Item.objects.get(pk=item_id)
        except Item.DoesNotExist:
            return JsonResponse({"error": "Item not found"}, status=404)

        item_data = json.loads(request.body)
        item_data["invoice"] = item.invoice_id  # Keep the existing invoice ID
        item_serialized = ItemSerializer(item, data=item_data)
        
        if item_serialized.is_valid():
            item_serialized.save()
            return JsonResponse({"message": "Item updated successfully"}, status=200)
        return HttpResponseBadRequest()

    def delete(self, request, item_id,id):
        try:
            item = Item.objects.get(pk=item_id)
        except Item.DoesNotExist:
            return JsonResponse({"error": "Item not found"}, status=404)

        item.delete()
        return JsonResponse({"message": "Item deleted successfully"}, status=200)  
   
class SigneUpView(APIView):
    def post(self,request):
        serializer=UserSerializer(data=request.data)
        if serializer.is_valid():
            user=serializer.save()
            refresh=RefreshToken.for_user(user)
            return JsonResponse({
                'refresh':str(refresh),
                'access':str(refresh.access_token)
            },
            status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.error,status.HTTP_400_BAD_REQUEST,safe=False)
       
class SignInView(APIView):
    def post(self,request):
        serializer=LoginSerializer(data=request.data)
        if serializer.is_valid():
            user=serializer.validated_data
            refresh=RefreshToken.for_user(user)
            return JsonResponse({
                'refresh':str(refresh),
                'access':str(refresh.access_token)
            },
            status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.error,status.HTTP_400_BAD_REQUEST,safe=False)
    
























# class GetInvoiceViews(View):
#     def get(self, request):
#         # invoice_serialized=InvoiceSerializer(invoices).data
#         return JsonResponse(invoices,safe=False)
# [
                #     {
                #     'desc': val["items.desc"],
                #     'rate': val["items"].rate,
                #     'quantity': val["items"].quantity,
                #     }
                #     # for item in val.items.all()
                # ],