from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *


@api_view(['GET'])
def matching_players(request):
    # Get parameters and check if empty
    first_name = request.query_params.get('first_name', None)
    last_name = request.query_params.get('last_name', None)
    if not first_name and not last_name:
        return Response(
            {"error": "At least one of 'first_name' or 'last_name' is required."}, 
            status=400  
        )


    # Filter based on first name and last name
    players = Player.objects.all()
    if first_name:
        players = players.filter(first_name__icontains=first_name)
    if last_name:
        players = players.filter(last_name__icontains=last_name)


    # Serialize and return the filtered players
    serializer = PlayerSerializer(players, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def player_pitching_stats(request):
    # Get parameter and check if empty
    player_id = request.query_params.get('player_id', None)
    if not player_id:
        return Response(
            {"error": "'player_id' is required."}, 
            status=400  
        )

    # Filter based on player_id
    pitching_stats = PitchingStats.objects.filter(player__id=player_id)
    
    # Serialize and return the filtered stats
    serializer = PitchingStatsSerializer(pitching_stats, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def player_batting_stats(request):

    # Get parameter and check if empty
    player_id = request.query_params.get('player_id', None)
    if not player_id:
        return Response(
            {"error": "'player_id' is required."}, 
            status=400  
        )

    # Filter based on player_id
    batting_stats = BattingStats.objects.filter(player__id=player_id)

    # Serialize and return the filtered stats
    serializer = BattingStatsSerializer(batting_stats, many=True)
    return Response(serializer.data)

