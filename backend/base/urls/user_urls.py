from django.urls import path
from base.views import user_views as views


urlpatterns = [
    path('profile/', views.getUserProfile, name="users-profile"),
    path('profile/update/', views.updateUserProfile, name="user-profile-update"),
    path('register/', views.registerUser, name='register'),
    path('', views.getUsers, name="users"),
    path('login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('<str:pk>/', views.getUserById, name='user'),
    
    path('delete/<str:pk>/', views.deleteUser, name='user-delete'),

    path('update/<str:pk>/', views.updateUser, name='user-update'),
]