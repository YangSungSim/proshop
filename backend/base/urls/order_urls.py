from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('add/', views.addOrderItems, name='orders-add'),
    path('<str:pk>/', views.getOrderById, name='orders-get-by-id'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
]