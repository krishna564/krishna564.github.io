from django.contrib import admin

# Register your models here.
from .models import games

class GamesAdmin(admin.ModelAdmin):
    list_display = ("name", "url", "author", "published_date")

admin.site.register(games, GamesAdmin)
