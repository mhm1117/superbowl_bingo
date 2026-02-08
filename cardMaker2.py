import random, csv

#everyone squares (6)
defSquares = ["Patriots TD", "Seahawks TD", "Game Goes into OT", "Bad Bunny Makes Statement", "Successful Hail Mary", "Successful Trick Play"]

#game related (12)
gameList = [[2, ["Successful Challenge", "Pick-6", "One Handed Catch", "Missed Extra Point", "Deep Kickoff Return", "Safety"]],        # rare
[2, ["Fight Fight Fight", "Impressive TD Celebration", "Player Knocks Someone Over", "Player Jumps Into Stands"]],          # med rare - fun
[4, ["Missed Field Goal", "30+ Yard Catch", "20+ Yard Run", "Close Call Catch/Incomplete", "Tush Push", 
     "QB Running Touchdown", "Recovered Fumble", "2-Pt Attempt"]], #med rare - reg
[2, ["Fumble", "Interception", "Turnover On Downs", "QB Sack", "Bad Ref Call", "4th Down Conversion"]],                     # likely
[1, ["Flag: Off. Pass Interference", "Flag: Taunting", "Flag: Grounding"]],                                                 # flags rare
[1, ["Flag: Offsides", "Flag: False Start", "Flag: Def. Pass Interference", "Flag: Holding"]],                              # flags likely
[2, ["Darnold Interception", "Crazy Maye Scramble", "Random Mahomes Mention", "Tom Brady Mention", "Insane JSN Catch"]]]    # game specific

#commericals (5)
commHeading = "Commercial: "
commList = [[2, ["Jeep", "Bud Light", "Michelob", "Mountain Dew", "Doritos", "Taco Bell", "Dunkin' Donuts"]], 
[1, ["Nike", "He Gets Us", "Hims", "UberEats"]],
[2, ["New Movie", "Gambling", "AI", "Musical Artist", "Football Player"]]]

def getSquareSet(numSq, setList) {

}

for setList in gameList:
    
