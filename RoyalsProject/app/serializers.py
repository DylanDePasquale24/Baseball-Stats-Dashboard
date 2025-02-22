from rest_framework import serializers
from .models import *


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'


class BattingStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BattingStats
        fields = '__all__'


class PitchingStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PitchingStats
        fields = '__all__'