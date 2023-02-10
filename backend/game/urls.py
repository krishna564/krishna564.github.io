from django.urls import path
from . import views

urlpatterns = [
    path('list', views.list_games),
    path('create', views.create_game),
    path('delete/<int:id>', views.delete_game),
    path('update/<int:id>', views.update_game),
    path('get/<str:name>', views.get_game)
]

