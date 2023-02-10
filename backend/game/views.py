from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .serializers import GamesSerializers
from .models import games

# Create your views here.

def list_games(request):
    all_games = games.objects.all()
    serializer = GamesSerializers(all_games, many=True)
    return JsonResponse(serializer.data, safe=False)

def get_game(request, name):
    game = games.objects.filter(name__contains=name)
    serializer = GamesSerializers(game, many=True)
    return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def create_game(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = GamesSerializers(data=data)
        if serializer.is_valid():
            serializer.save()
            all_games = games.objects.all()
            serializer = GamesSerializers(all_games, many=True)
            return JsonResponse(serializer.data, safe=False)
        return JsonResponse(serializer.errors)

@csrf_exempt
def delete_game(request, id):
    try:
        selected_game = games.objects.get(id=id)
    except games.DoesNotExist:
        return HttpResponse(status=404)
    
    if request.method == 'DELETE':
        selected_game.delete()
        all_games = games.objects.all()
        serializer = GamesSerializers(all_games, many=True)
        return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def update_game(request, id):
    try:
        selected_game = games.objects.get(id=id)
    except games.DoesNotExist:
        return HttpResponse(status=404)
    
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = GamesSerializers(selected_game, data=data)
        if serializer.is_valid():
            serializer.save()
            all_games = games.objects.all()
            serializer = GamesSerializers(all_games, many=True)
            return JsonResponse(serializer.data, safe=False)
