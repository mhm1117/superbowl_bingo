import random

MAIN_21 = ["Commentator Glazes Mahomes","Taylor Sighting","BS Pro-Chief Flag Call",
              "Barkley 30+ Yard TD","Mahomes Toes Sideline For 1st Down","Chiefpeat mentioned",
              "Missed Field Goal","Game goes into OT","Successful Challenge","Pick-6",
              "Crazy Impressive Catch","Fight Fight Fight","Player Throws Tantrum",
              "Top Notch TD Celebration","Missed Extra Point","Turnover on downs","Chiefs Touchdown",
              "Eagles Touchdown","Fumble / Interception","20+ yard catch","Quarterback Running Touchdown"]

COMMS_COMP = ["FanDuel","Geico","State Farm","BudLight","Coca-Cola","Toyota","Kia","Michelob Ultra",
             "M&Ms","Little Caesars","UberEats","Wing Stop","Doritos","Redbull","Allstate"]

COMMS_FEAT = ["Mahomes Feat.","Purdy Feat.","Kelce Brothers Feat.","Musical Artist Feat.","Backup QB"]

NUM_CARDS = 1

def getCompSets(companys, numCards):
    compSets = []
    totalComp = len(companys)
    compRange = list(range(0,totalComp))
    compCount = 0
    for i in range(numCards):
        set = []
        for j in range(3):
            compNum = random.randint(0, (totalComp-1) - compCount)
            set.append(companys[compRange[compNum]])
            compRange.pop(compNum)
            compCount += 1
            if (len(compRange) == 0):
                compRange = list(range(0,totalComp))
                compCount = 0
        compSets.append(set)

    return compSets

def makeCards(numCards, compSets, featSets, mainSet):
    cardLists = []
    featRange = list(range(0, len(featSets)))
    featCount = 0
    for i in range(numCards):
        featNum = random.choice(featRange)
        feat = featSets[featNum]
        featRange.remove(featNum)
        card = random.sample((mainSet + compSets[i] + [feat]), 25)
        print(card)
        cardLists.append(card)



companySets = getCompSets(COMMS_COMP, NUM_CARDS)
makeCards(NUM_CARDS, companySets, COMMS_FEAT, MAIN_21)
