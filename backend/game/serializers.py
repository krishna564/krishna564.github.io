from rest_framework import serializers

from .models import games

class GamesSerializers(serializers.ModelSerializer):

    # id = serializers.IntegerField(read_only=True)
    # name = serializers.CharField(required=True, allowed_blank=False, max_length=100)
    # url = serializers.CharField(required=True, allowed_blank=False, max_length=2083)
    # author = serializers.CharField(required=True, allowed_blank=False, max_length=255)
    # published_date = serializers.DateTimeField(required=True)

    # def create(self, validated_data):
    #     games.objects.create(validated_data)

    class Meta:
        model = games
        fields = ('id', 'name', 'url', 'author', 'published_date')