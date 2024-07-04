from . import views
from django.urls import path
from knox import views as knox_views


urlpatterns = [
    path('register/', views.RegisterAPI.as_view(), name='register'),
    path('login/', views.LoginAPI.as_view(), name='login'),
    path('authenticated/', views.UserAPI.as_view(), name='authenticated'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
]
