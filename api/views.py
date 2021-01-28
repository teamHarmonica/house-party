from django.shortcuts import render
from rest_framework.generics import ListAPIView,CreateAPIView

from .models import Room
from .serializer import RoomSerializer
# Create your views here.

class RoomView(ListAPIView,CreateAPIView):
    queryset=Room.objects.all()
    serializer_class=RoomSerializer
