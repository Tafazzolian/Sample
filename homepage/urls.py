from django.urls import path
from . import views

urlpatterns = [
    path('', views.welcome , name = 'home'),
    path('shop/', views.shop , name = 'shop'),
    path('test/', views.test),
    path('details/<int:table_id>', views.details , name = 'table id detail'),
    path('delete/<int:table_id>' , views.delete , name = 'delete'),
    path('form/' , views.form , name = 'form'),
    path('update/<int:table_id>', views.update, name = 'update'),
]