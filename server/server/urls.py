from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('api/preflopcharts/', include('api.preflopcharts.urls')),
    path('api/user/', include('api.user.urls')),
]
