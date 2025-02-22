import json
import os
import django

# Set up Django environment 
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "RoyalsProject.settings")
django.setup()

from app.models import Player, BattingStats, PitchingStats

# Load JSON into data object
with open("players.json", "r") as file:
    data = json.load(file)



# Iterate over players in the JSON file
for player_data in data:

    # Extract main player info
    player, created = Player.objects.get_or_create(
        id=player_data["id"],
        defaults={
            "first_name": player_data["name_first"],
            "name_use": player_data["name_use"],
            "last_name": player_data["name_last"],
            "team": player_data["team"],
            "birth_date": player_data["birth_date"],
            "height_feet": player_data["height_feet"],
            "height_inches": player_data.get("height_inches"),
            "weight": player_data["weight"],
            "throws": player_data["throws"],
            "bats": player_data["bats"],
            "primary_position": player_data["primary_position"]
        }
    )

    # Extract Batting Stats
    for batting_stat in player_data["stats"]["batting"]:
        BattingStats.objects.create(
            player=player,
            year=batting_stat["year"],
            league=batting_stat["league"],
            org_abbreviation=batting_stat["org_abbreviation"],
            plate_appearances=batting_stat["plate_appearances"],
            at_bats=batting_stat["at_bats"],
            games=batting_stat["games"],
            games_started=batting_stat["games_started"],
            runs=batting_stat["runs"],
            hits=batting_stat["hits"],
            doubles=batting_stat["doubles"],
            triples=batting_stat["triples"],
            home_runs=batting_stat["home_runs"],
            bases_on_balls=batting_stat["bases_on_balls"],
            strikeouts=batting_stat["strikeouts"],
            sacrifices=batting_stat["sacrifices"],
            sacrifice_flies=batting_stat["sacrifice_flies"],
            stolen_bases=batting_stat["stolen_bases"],
            caught_stealing=batting_stat["caught_stealing"]
        )

    # Extract Pitching Stats
    for pitching_stat in player_data["stats"]["pitching"]:
        PitchingStats.objects.create(
            player=player,
            year=pitching_stat["year"],
            league=pitching_stat["league"],
            org_abbreviation=pitching_stat["org_abbreviation"],
            games=pitching_stat["games"],
            games_started=pitching_stat["games_started"],
            complete_games=pitching_stat["complete_games"],
            games_finished=pitching_stat["games_finished"],
            innings_pitched=pitching_stat["innings_pitched"],
            wins=pitching_stat["wins"],
            losses=pitching_stat["losses"],
            saves=pitching_stat["saves"],
            total_batters_faced=pitching_stat["total_batters_faced"],
            at_bats=pitching_stat["at_bats"],
            hits=pitching_stat["hits"],
            doubles=pitching_stat["doubles"],
            triples=pitching_stat["triples"],
            home_runs=pitching_stat["home_runs"],
            bases_on_balls=pitching_stat["bases_on_balls"],
            strikeouts=pitching_stat["strikeouts"]
        )

print("ETL process completed successfully")