import random, csv

MAIN_11 = ["Announcer Glazes Mahomes","Taylor Sighting","BS Pro-Chief Flag Call","Barkley 3O+ Yard TD",
           "Mahomes Toes Sideline For 1st Down","Jason Kelce Mention / Cameo","Chiefs TD","Eagles TD",
           "2O+ yard catch","Tush Push","Game goes into OT"]

COMMS_COMP = ["FanDuel","Geico","State Farm","BudLight","Coca-Cola","Toyota","Kia","Michelob Ultra",
             "M&Ms","Little Caesars","UberEats","Wing Stop","Doritos","Redbull","Allstate"]

COMMS_FEAT = ["Mahomes Feat.","Purdy Feat.","Kelce Brothers Feat.","Musical Artist Feat.","Backup QB Commerical"]

RARE = ["Blocked Field Goal","Successful Challenge","Pick-6","One Handed Catch","50+ Yard Catch",
        "Missed Extra Point","Kickoff Return TD"]

LIKELY = ["Fumble","Interception","Turnover On Downs","QB Running Touchdown", "Dropped Pass", "QB Sack", "Near Sack Miss"]

MED_RARE =["Fight Fight Fight","Player Throws Tantrum","Top Notch TD Celebration",
           "Player Falls Into People On Sideline"]

FLAGS = ["Offsides","False Start","Pass Interference","Holding"]

NUM_CARDS = 15

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

def getRareLikelySets(rares, likelys, numCards):
    rareLikelySets = []
    raresCopy = rares.copy()
    likelyCopy = likelys.copy()
    for i in range(numCards):
        set = []
        for j in range(3):
            rare = random.choice(raresCopy)
            likely = random.choice(likelyCopy)
            set.extend([rare, likely])
            raresCopy.remove(rare)
            likelyCopy.remove(likely)
            if (len(raresCopy) == 0):
                raresCopy = rares.copy()
                likelyCopy = likelys.copy()
        rareLikelySets.append(set)
    
    return rareLikelySets

def getOtherSets(medRares, flags, numCards):
    otherSets = []
    medCopy = medRares.copy()
    flagCopy = flags.copy()
    for i in range(numCards):
        set = []
        for j in range(2):
            medRare = random.choice(medCopy)
            flag = random.choice(flagCopy)
            set.extend([medRare, flag])
            medCopy.remove(medRare)
            flagCopy.remove(flag)
            if (len(medCopy) == 0):
                medCopy = medRares.copy()
                flagCopy = flags.copy()
        otherSets.append(set)
    
    return otherSets

def makeCards(numCards, compSets, rlSets, othSets, featSets, mainSet):
    cardLists = []
    featCopy = featSets.copy()
    for i in range(numCards):
        feat = random.choice(featCopy)
        featCopy.remove(feat)
        card = random.sample((mainSet + compSets[i] + rlSets[i] + othSets[i] + [feat]), 25)
        cardLists.append(card)
        if (len(featCopy) == 0):
            featCopy = featSets.copy()
    
    return cardLists

companySets = getCompSets(COMMS_COMP, NUM_CARDS)
rareLikelySets = getRareLikelySets(RARE, LIKELY, NUM_CARDS)
otherSets = getOtherSets(MED_RARE, FLAGS, NUM_CARDS)

bingoCards = makeCards(NUM_CARDS, companySets, rareLikelySets, otherSets, COMMS_FEAT, MAIN_11)

# print(bingoCards)

with open('bingoCards.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(bingoCards)