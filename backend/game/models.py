from django.db import models

# Create your models here.

class games(models.Model):
    name = models.CharField(max_length=255)
    url = models.TextField()
    author = models.CharField(max_length=255)
    published_date = models.DateTimeField()
