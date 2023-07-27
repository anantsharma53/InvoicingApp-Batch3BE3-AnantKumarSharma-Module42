from django.urls import path
from .import views
from .views import *
# GetInvoiceViews,ItemEntryViews
from django.views.decorators.csrf import csrf_exempt
urlpatterns =[ 
    path('invoices/', GetInvoiceViews.as_view(), name='invoice-list'),
    path('invoices/new/',csrf_exempt(create_invoice.as_view()),name='new-invoice-create'),
    path('invoices/del/<int:id>',csrf_exempt(delet_invoice.as_view()),name='new-invoice-create'),
    path('invoices/<int:id>/',GetSingleInvoiceViews.as_view(),name='invoice-single-list'),
    path('invoices/<int:id>/items',csrf_exempt(ItemEntryViews.as_view()),name='new-invoice-create'),
    path('invoices/<int:id>/items/<int:item_id>',csrf_exempt(ItemEntryViews.as_view()),name='new-invoice-create'),
    path('invoices/user/signup/',csrf_exempt(SigneUpView.as_view()),name='user-signup'),
    path('invoices/user/login/',csrf_exempt(SignInView.as_view()),name='user-login'),
]