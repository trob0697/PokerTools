from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('register/', views.register, name='Register'),
    path('login/', TokenObtainPairView.as_view(), name='Login'),
    path('login/refresh/', TokenRefreshView.as_view(), name='Login'),
]