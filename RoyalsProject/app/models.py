from django.db import models

# Database Models 

class Player(models.Model):
    id = models.IntegerField(primary_key=True)  

    first_name = models.CharField(max_length=50)   
    name_use = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    team = models.CharField(max_length=50)
    birth_date = models.CharField(max_length=50)
    height_feet = models.IntegerField()
    height_inches = models.IntegerField(null=True, default=0)
    weight = models.IntegerField()
    throws = models.CharField(max_length=10)  
    bats = models.CharField(max_length=10)   
    primary_position = models.CharField(max_length=25, null=True, default="Not Available") 

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class PitchingStats(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="pitching_stats")

    year = models.IntegerField()
    league = models.CharField(max_length=10, null=True, default="Not Available")
    org_abbreviation = models.CharField(max_length=10)
    games = models.IntegerField()
    games_started = models.IntegerField()
    complete_games = models.IntegerField()
    games_finished = models.IntegerField()
    innings_pitched = models.FloatField()
    wins = models.IntegerField()
    losses = models.IntegerField()
    saves = models.IntegerField()
    total_batters_faced = models.IntegerField()
    at_bats = models.IntegerField()
    hits = models.IntegerField()
    doubles = models.IntegerField()
    triples = models.IntegerField()
    home_runs = models.IntegerField()
    bases_on_balls = models.IntegerField()
    strikeouts = models.IntegerField()


class BattingStats(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="batting_stats")

    year = models.IntegerField()
    league = models.CharField(max_length=10, null=True, default="Not Available")
    org_abbreviation = models.CharField(max_length=10)
    plate_appearances = models.IntegerField()
    at_bats = models.IntegerField()
    games = models.IntegerField()
    games_started = models.IntegerField()
    runs = models.IntegerField()
    hits = models.IntegerField()
    doubles = models.IntegerField()
    triples = models.IntegerField()
    home_runs = models.IntegerField()
    bases_on_balls = models.IntegerField()
    strikeouts = models.IntegerField()
    sacrifices = models.IntegerField()
    sacrifice_flies = models.IntegerField()
    stolen_bases = models.IntegerField()
    caught_stealing = models.IntegerField()
