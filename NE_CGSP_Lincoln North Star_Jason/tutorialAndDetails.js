function tutorialSetup(many) {
  //tutorial setup function occurs at the start of every tutorial
  if (tutorial == 1 && tutorialText == 0){
    // if it is the basic control tutorial it is slightly different as that tutorial doesn't start in a battle
    //sets the chosen word
    chosenWord = "FBLA";
    //sets the screen and endlessPick to be 2 so the theme can be school
    screen = 19;
    endlessPick = 2;
    //also sets up the hidden word (though there is no way to actually guess the word in the tutorial)
    chosenWordSplit = unchar(split(chosenWord, ""));
        wordGameSetup();
  }else{
    //for all other tutorials that start in battle it first clears all optioncards
     optionCardAppearArray = [-1, -1, -1, -1, -1, -1];
    //tutorial joker has a unique screen because it doesn't need to explain how to use the joker with actual cards as the player should be knowledgable enough with the game by the time he unlocks him. Also the joker is very intuitive, and doesn't have a real strategy like the other characters.
    if (tutorial == 7){
     screen = 23;
    }else{
      screen = 3;
    }
    //start card battle things.
     startCardBattleSetup();
   startCardBattleSetupV = 1;
    //remove all but one option card because most tutorials only need one option card. (if the tutorial needs more option cards the board will be manually changed in the tutorial)
   optionCardBoard.splice(1, 5);
    //some tutorials need a certain amount of battle cards so we remove base on a parameter
     cardInDeckObjects.splice(many, 9);
    //if it is the beggining of the tutorial then reset status effects.
     if (tutorialText == 0){
       statusReset();
     }
  }
}

function tutorialLimit(bCard, endTurn, oCard, leftA, rightA){
  //function for limiting certain things in tutorials. First parameter is stopping battle cards from being dragged. Then stopping the player from ending their turn, then stopping the special attack card (or other option cards) from being used. Then stopping the player from backtracking/progressing text.
  tutorialNoBCard = bCard;
  tutorialNoEndTurn = endTurn;
  tutorialNoOCard = oCard;
  tutorialNoArrow[0] = leftA;
  tutorialNoArrow[1] = rightA;
}

function tutorialBasics(){
  textSize(45);
  fill(255);
  textFont(anton);
  if (tutorialText == 0){
    tutorialSetup();
    tutorialText = 1;
    enemyDifficulty = [0, 3, 0, 3];
  }
  //various blocks of tutorial text
  if (tutorialText == 1){
    text("Welcome to The King's Hand, a mix between a card", 310, 150);
    text("game and a word game.", 260, 200);
    text("(Use Arrow Keys or Click to Continue Text < >)", 260, 250);
    tutorialLimit(true, true, true, true, false);
  }
  if (tutorialText == 2){
    text("When you start a level you will have a hidden ", 310, 150);
    text("word/phrase in the top left corner. Your goal is to guess \nthat word/phrase. Every word/phrase has a theme to \nhelp guide your guesses. < >", 260, 200);
    tutorialLimit(true, true, true, false, false);
    //arrow to theme and word
    textSize(25);
    //all arrow text is a blue color so the text stands out more
      fill(0, 150, 255);
      text("Hidden Word", 100, 280);
    text("Helpful Theme", 480, 30);
      helpArrows[0] = new TutorialArrow(150,210,270);
    helpArrows[1] = new TutorialArrow(680,30,0);
  }
  if (tutorialText == 3){
    text("To help you guess the word you select one of four", 310, 140);
    text("different enemies. Each have different effects: revealing \na consonant/vowel, or giving you a free letter guess. < >", 260, 190)
    tutorialLimit(true, true, true, false, false);
    //arrow to the enemy options
    helpArrows[0] = new TutorialArrow(670,560,270);
    helpArrows[1] = new TutorialArrow(370,500,270);
    helpArrows[2] = new TutorialArrow(970,500,270);
  }
  if (tutorialText == 4){
    text("Normally you can choose any of the four, but for now", 310, 150);
    text("let's start by revealing a consonant. <", 260, 200);
    tutorialLimit(true, true, true, false, true);
    //reveal consonant arrow
    helpArrows[1] = new TutorialArrow(370,500,270);
  fill(0, 150, 255);
      text("Click", 320, 590);}
  if (tutorialText == 5){
    //make the player the king
    playerCharacter = 1;
    //setup battle and remove all but one card
      tutorialSetup(1);
      enemyHealth = 28; //tutorial enemies are always thee exact health need for the tutorial
      enemyDisplayHealth = enemyHealth;
      enemyHealthMax = enemyHealth;
      optionCardAppearArray = [1,-1,-1,-1,-1,-1];
      cardInDeckPicker = [1];
      cardInDeckObjects[0].cardScore = 4;
      tutorialText = 6;
      playerHealth = playerMaxHealth;
    }
      textFont(anton);
    if (tutorialText == 6){
      text("When you select an enemy you get brought into battle.", 300, 150);
      text("In battle, your goal is to get the enemy's health to zero \nbefore your health hits zero. If you complete this goal \nyou will reveal the consonant. (Arrows/Click < >)", 260, 200);
      textSize(25);
      fill(0, 150, 255);
      //enemy and player health arrows
      text("Enemy Health", 950, 85);
      helpArrows[0] = new TutorialArrow(900,60,195);
      text("Your Health", 580, 390);
      helpArrows[1] = new TutorialArrow(530,400,155);
      tutorialLimit(true, true, true, true, false);
    }
    if (tutorialText == 7){
       text("In order to damage your enemy, you use both option", 300, 150);
       text("cards and battle cards. < >", 260, 200);
      textSize(25);
      fill(0, 150, 255);
      //battle and option cards arrows
      text("Battle Cards", 530, 360);
      helpArrows[0] = new TutorialArrow(620,400,37);
      text("Option Cards", 300, 250);
      helpArrows[1] = new TutorialArrow(250,220,195);
      tutorialLimit(true, true, true, false, false);
    }
    if (tutorialText == 8){
      text("Every battle card has a number value attached to it. At", 300, 150);
       text("the start of a match, the value can range from 1-6 but the \nmax value a battle card can have is 10. (Ace is a one) < >", 260, 200);
      textSize(25);
      fill(0, 150, 255);
      //card value arrows
      text("Card Value", 610, 320);
      helpArrows[0] = new TutorialArrow(670,380,90);
      tutorialLimit(true, true, true, false, false);
    }
    if (tutorialText == 9){
      text("Every option card has a different effect. Click on the", 300, 150);
       text("option card to read specifically what they do. <", 260, 200);
      textSize(35);
      fill(0, 150, 255);
      //click option card arrows
      text("Click", 310, 240);
      helpArrows[1] = new TutorialArrow(250,230,180);
      tutorialLimit(true, true, true, false, true);
    }
    if (tutorialText == 10){
      text("This card is unique as it is a character special card.", 300, 150);
       text("While most option cards are randomly given every turn, \nevery character has a unique card which you get every \nturn. This special card is often the center of the \ncharacter's playstyle. < >", 260, 200);
      tutorialLimit(true, true, true, false, false);
    }
    if (tutorialText == 11){
      text("Drag and drop the battle card on top of the option", 300, 150);
       text("card to activate the option card and attack. <", 260, 200);
      textSize(25);
      fill(0, 150, 255);
      //drag and option card arrows
      text("Drag", 650, 320);
      helpArrows[0] = new TutorialArrow(680,380,90);
      text("Option Card", 300, 250);
      helpArrows[1] = new TutorialArrow(250,220,195);
      tutorialLimit(false, true, false, false, true);
    }
    if (tutorialText == 12){
      text("Now that you're out of battle cards and option cards,", 300, 150);
       text("end your turn by clicking the black card in the bottom \nright corner.", 260, 200);
      tutorialLimit(true, false, true, true, true);
    }
    if (tutorialText == 14){
      //tutorial 14 occurs after ending your turn and remakes the optimal battle/option card deck 
      tutorialSetup(2);
      optionCardAppearArray = [1,2,-1,-1,-1,-1];
      optionCardSetup();
      cardInDeckPicker = [1, 1];
      cardInDeckObjects[0].cardScore = 5;
      cardInDeckObjects[1].cardScore = 6;
      tutorialText = 15;
      optionCardSetup();
    }
    if (tutorialText == 15){
      text("When you end your turn, the enemy will have", 440, 150);
       text("their turn. During their turn they will attack you \nwith dice. After their turn has ended you will be \ngiven a new set of option and battle cards. \ncards. (Arrows/Click >) ", 400, 200);
      tutorialLimit(true, true, true, true, false);
    }
  if (tutorialText == 16){
    text("Now that it is your turn again try using the ", 440, 150);
     text("Intergrate option card.", 400, 200);
    textSize(25);
    //drag battle card arrows
      fill(0, 150, 255);
      text("Drag", 500, 490);
      helpArrows[0] = new TutorialArrow(600,480,0);
      text("Drag", 960, 490);
      helpArrows[1] = new TutorialArrow(900,480,180);
    tutorialLimit(false, true, true, true, true);
  }
    if (tutorialText == 17){
      text("Notice, that while you added two cards to", 440, 150);
       text("equal 11, the max battle card value you can get is \n10. (Arrows/Click >)", 400, 200);
      tutorialLimit(true, true, true, true, false);
    }
    if (tutorialText == 18){
      text("Now, use the special card and defeat the", 440, 150);
      text("enemy to end the tutorial. <", 400, 200);
      tutorialLimit(false, true, false, false, true);
    }
  if (enemyDisplayHealth <= 0){
    //end tutorial by killing enemy
    tutorial = 0;
    tutorialText = 0;
    screen = 9;
    nextEnemy = false;
    enemyDisplayHealth = 1;
  }
}

function tutorialKing(){
  if (tutorialText == 0){
    //tutorial setup
    playerCharacter = 1;
      tutorialSetup(1);
      enemyHealth = 12;
    playerHealth = playerMaxHealth;
      enemyDisplayHealth = enemyHealth;
      enemyHealthMax = enemyHealth;
      optionCardAppearArray = [1,-1,-1,-1,-1,-1];
      cardInDeckPicker = [1];
     cardInDeckObjects[0].cardScore = 6;
      tutorialText = 1;
    optionCardSetup();
    }
  fill(255);
      textFont(anton);
  if (tutorialText == 1){
      textSize(45);
      text("The King specializes in achieving high card values to", 300, 150);
      text("deal large damage. \n(Use Arrow Keys To Continue Text < >)", 260, 200);
      
      tutorialLimit(true, true, true, true, false);
    }
  if (tutorialText == 2){
      textSize(45);
      text("The King's Special Attack Card, The King's Law is", 300, 150);
       text("the strongest option card in the game. Using this card \nto its fullest potential is the center of the King's \ngameplay. < >", 260, 200);
      tutorialLimit(true, true, true, false, false);
    }
  if (tutorialText == 3){
      textSize(45);
      text("The King's Law deals damage double the battle card's", 300, 150);
       text("value used on it. This card along with other strong \noffensive cards makes the King the most straight \nforward character in the game. < >", 260, 200);
      tutorialLimit(true, true, true, false, false);
    }
  if (tutorialText == 4){
      textSize(45);
      text("Use the card and end the fight. <", 300, 150);
      tutorialLimit(false, true, false, false, true);
    }
    if (enemyDisplayHealth <= 0){
     screen = 9;
     tutorial = 0;
      tutorialText = 0;
      //making enemyHealth and display health not zero fixes some weird detectors
      enemyHealth = 2;
      enemyDisplayHealth = 2;
   }
}

function tutorialQueen(){
  if (tutorialText == 0){
    //tutorial setup
    playerCharacter = 2;
      tutorialSetup(1);
    playerHealth = playerMaxHealth;
      enemyHealth = 30;
      enemyDisplayHealth = enemyHealth;
      enemyHealthMax = enemyHealth;
      optionCardAppearArray = [6,7,-1,-1,-1,-1];
      tutorialText = 1;
    optionCardSetup();
    cardInDeckPicker = [1];
      cardInDeckObjects[0].cardScore = 5;
    }
  fill(255);
      textFont(anton);
  if (tutorialText == 1){
      textSize(45);
    text("The Queen specializes in attacking with many", 440, 150);
      text("low number battle cards to chip away at the \nenemy's health. \n(Use Arrow Keys To Continue Text < >)", 400, 200);
      tutorialLimit(true, true, true, true, false);
    }
  if (tutorialText == 2){
    //option card arrow
      helpArrows[1] = new TutorialArrow(230,60,150);
      textSize(45);
      text("The Queen's Special Attack Card, The Queen's", 440, 150);
    text("Gall is one of the few infinitely reusable cards in \nthe game. It is able to deal small damage every \ntime it is used but the card's value can not be \nover 3. < ", 400, 200);
      tutorialLimit(true, true, true, false, false);
    }
  if (tutorialText == 3){
    //use cards arrow
      helpArrows[0] = new TutorialArrow(700,380,90);
      helpArrows[1] = new TutorialArrow(230,50,60);
      textSize(45);
      text("This encourages skillful use of cards like", 440, 150);
       text("Division which increases how many battle cards \nare in your deck, while also lowering its values. \nTry it out.", 400, 200);
      tutorialLimit(false, true, false, true, true);
    }
  if (tutorialText == 4 || tutorialText == 5){
    //battle card arrow
      helpArrows[0] = new TutorialArrow(700,380,90);
    helpArrows[1] = new TutorialArrow(500,380,90);
      textSize(45);
      text("Now use the Queen's Gall twice.", 440, 150);
      tutorialLimit(false, true, false, true, true);
    }
  if (tutorialText == 6){
    textSize(45);
    //end turn arrow
    helpArrows[0] = new TutorialArrow(1230,350,90);
      text("Now end your turn.", 440, 150);
      tutorialLimit(true, false, true, true, true);
  }
  if (tutorialText == 8){
    //post ending turn reset option cards and battle cards
    tutorialSetup(1);
      optionCardAppearArray = [6,20,-1,-1,-1,-1];
      cardInDeckPicker = [1];
      cardInDeckObjects[0].cardScore = 1;
      tutorialText = 9;
    optionCardSetup();
    }
  if (tutorialText == 9){
      textSize(45);
      text("Another unique trait of the Queen is her Gambit", 440, 150);
      text("option card. By using a battle card with a value of \none, you can inflict                         on yourself. >", 400, 200);
    fill(150, 20, 170);
    //I like having status text have their icons and thematic colors
    text("WEAKNESS", 812, 255);
      tutorialLimit(true, true, true, true, false);
    image(statusIMG[1], 780, 235, 45, 45);
    }
  if (tutorialText == 10){
      textSize(45);
      text("For most characters Weakness is a negative", 440, 150);
      text("status effect, however it actually helps the \nQueen, since the Weakness effect lowers all \nbattle card's value by one. < >", 400, 200);
      tutorialLimit(true, true, true, false, false);
    }
  if (tutorialText == 11){
      textSize(45);
      text("There are many other unique strategies the ", 440, 150);
      text("queen can employ, so feel free to experiment. \nFor now, try the Gambit option card. <" , 400, 200);
      tutorialLimit(false, true, true, false, true);
    }
  if (tutorialText == 12){
      textSize(45);
      text("Now end your turn.", 440, 150);
      tutorialLimit(true, false, true, true, true);
    textSize(25);
      fill(0, 150, 255);
    //weakness icon arrow
    text("Weakness Icon", 480, 560);
      helpArrows[0] = new TutorialArrow(430,520,200);
    }
  if (tutorialText == 14){
    //new battle cards
    tutorialSetup(5);
      optionCardAppearArray = [6,-1,-1,-1,-1,-1];
      cardInDeckPicker = [1,1,1,1,1];
      cardInDeckObjects[0].cardScore = 3;
    cardInDeckObjects[1].cardScore = 1;
    cardInDeckObjects[2].cardScore = 3;
    cardInDeckObjects[3].cardScore = 4;
    cardInDeckObjects[4].cardScore = 2;
      tutorialText = 15;
    optionCardSetup();
    }
  if (tutorialText == 15){
      textSize(45);
      text("Now use the Queen's Gall and end the fight", 440, 150);
      tutorialLimit(false, true, false, true, true);
    }
    if (enemyDisplayHealth <= 0){
    //end tutorial
     screen = 9;
    tutorial = 0;
    tutorialText = 0;
    //making enemyHealth and display health not zero fixes some weird detectors
    enemyHealth = 2;
    enemyDisplayHealth = 2;
    playerStatus = [];
    playerWeaken = false;
    oCardAttack = 0;
    oCardAttackV = false;
   }
}

function tutorialJack(){
  if (tutorialText == 0){
    //tutorial setup
    playerCharacter = 3;
      tutorialSetup(1);
      enemyHealth = 22;
      enemyDisplayHealth = enemyHealth;
      enemyHealthMax = enemyHealth;
      optionCardAppearArray = [22,13,-1,-1,-1,-1];
      cardInDeckPicker = [1];
      cardInDeckObjects[0].cardScore = 6;
      tutorialText = 1;
    optionCardSetup();
    playerHealth = 27;
    }
  fill(255);
  textSize(45);
      textFont(anton);
  if (tutorialText == 1){
      text("The Jack specializes in inflicting status effects", 440, 150);
      text("on your enemy. Many of his cards deal with both \ndebuffs and buffs, including his Special Attack \nCard. >", 400, 200);
      tutorialLimit(true, true, true, true, false);
  }
  if (tutorialText == 2){
      text("The Jack's Special Attack Card deals more ", 440, 150);
      text("damage, the more status effects are in battle. \nThis includes status effects on both your enemy \nand you. < >", 400, 200);
      tutorialLimit(true, true, true, false, false);
  }
  if (tutorialText == 3){
      text("To see what status effects are applied, look", 440, 150);
      text("at icons that appear on both your and your \nenemy's health.< >", 400, 200);
      tutorialLimit(true, true, true, false, false);
  }
  if (tutorialText == 4){
      text("Use the Mend Option Card to inflict                 on", 440, 150);
    text("yourself. <", 400, 200);
    fill(190, 0, 0);
    text("REGEN", 1132, 155);
      tutorialLimit(false, true, true, false, true);
    image(statusIMG[4], 1100, 135, 45, 45);
  }
  if (tutorialText == 5){
      text("Now end your turn.", 440, 150);
    fill(0, 150, 255);
    //icon arrow
    text("Regen Icon", 480, 560);
      helpArrows[0] = new TutorialArrow(430,520,200);
      tutorialLimit(true, false, true, true, true);
  }
  if (tutorialText == 7){
    tutorialSetup(1);
      optionCardAppearArray = [22,14,-1,-1,-1,-1];
      cardInDeckPicker = [1];
      cardInDeckObjects[0].cardScore = 7;
      tutorialText = 8;
    optionCardSetup();
    }
  if (tutorialText == 8){
      text("Next use the Whopper Option Card to", 440, 150);
    text("the enemy.", 400, 200);
    fill(150, 20, 170);
    text("WEAKEN", 1162, 155);
    image(statusIMG[1], 1130, 135, 45, 45);
      tutorialLimit(false, true, true, true, true);
  }
  if (tutorialText == 9){
      text("Now end your turn again.", 440, 150);
      tutorialLimit(true, false, true, true, true);
  }
  if (tutorialText == 11){
    //post end turn setup
    tutorialSetup(1);
      optionCardAppearArray = [22,-1,-1,-1,-1,-1];
      cardInDeckPicker = [1];
      cardInDeckObjects[0].cardScore = 3;
      tutorialText = 12;
    optionCardSetup();
    }
  if (tutorialText == 12){
      text("Now that a status effect has been applied to  ", 440, 150);
text("both you and the enemy, 2 status effects are in \nthe battle, and the Jack's Dose should do 13 \ndamage. (the Jack's Dose does 3 damage by \ndefault) Try it out and end the fight.", 400, 200);
      tutorialLimit(false, true, false, true, true);
  }
  if (enemyDisplayHealth <= 0){
    //end tutorial
     screen = 9;
     tutorial = 0;
    tutorialText = 0;
    //making enemyHealth and display health not zero fixes some weird detectors
    enemyHealth = 2;
    enemyDisplayHealth = 2;
   }
}

function tutorialAce(){
  if (tutorialText == 0){
    //tutorial setup
    playerCharacter = 4;
      tutorialSetup(2);
    playerHealth = playerMaxHealth;
      enemyHealth = 8;
      enemyDisplayHealth = enemyHealth;
      enemyHealthMax = enemyHealth;
      optionCardAppearArray = [17,25,-1,-1,-1,-1];
      cardInDeckPicker = [1, 2, 3, 1, 1];
      cardInDeckObjects[0].cardScore = 8;
    cardInDeckObjects[1].cardScore = 5;
      tutorialText = 1;
    optionCardSetup();
  }
  fill(0);
  textSize(22);
  fill(255);
  textSize(45);
      textFont(anton);
  if (tutorialText == 1){
    text("The Ace specializes in getting a specific battle", 440, 150);
      text("card value and using it to deal large damage. \nBefore every one of your turns you will pick a \ncard. Each card has a different value. >", 400, 200);
      tutorialLimit(true, true, true, true, false);
  }
  if (tutorialText == 2){
      text("The card you pick affects your Special Attack", 440, 150);
text("Card. Whatever card you pick becomes the value \nneeded for your Special Attack Card, Ace Shot. \nAce Shot is the only way the Ace can attack. < >", 400, 200);
      tutorialLimit(true, true, true, false, false);
  }
  if (tutorialText == 3){
    playerPickAceValue = true;
    //create ace picking cards
    for (let ace = 1; ace < 11; ace++) {
        aceCardsPick[ace] = new AceCards(625 + ace * 50, 400, ace);
      }
    tutorialText = 4;
  }
  if (tutorialText == 4){
    text("This is what is looks like when you are ", 440, 150);
    text("choosing your card. You have a full view of both \nyour option cards and battle cards. Since you \nhave an eight battle card, pick the eight card.", 400, 200);
      tutorialLimit(true, true, true, true, true);
    helpArrows[0] = new TutorialArrow(1025,480,270);
  }
  if (tutorialText == 5){
    text("Now the Ace Shot has changed to need a card ", 440, 150);
    text("with the value of eight to be used. However, \nI'm sure you noticed your battle card changed \nvalue. This is because if you choose a card with \nequal value to a battle card in your deck the \nbattle card will be changed. > ", 400, 200);
      tutorialLimit(true, true, true, true, false);
  }
  if (tutorialText == 6){
    text("The Ace is not about luckily getting the cards", 440, 150);
    text("you need. It is about earning them by looking at \nboth your option cards and battle cards. It seems \nyou don't have any battle cards with a value of \neight, let's reset and choose a different card. < >", 400, 200);
      tutorialLimit(true, true, true, false, false);
  }
   if (tutorialText == 7){
    playerPickAceValue = true;
     tutorialSetup(2);
     //recreate ace picking cards and make new battle cards
     optionCardBoard = [0, 0, 0, 0, 0, 0];
    for (let ace = 1; ace < 11; ace++) {
        aceCardsPick[ace] = new AceCards(625 + ace * 50, 400, ace);
      }
     optionCardAppearArray = [17, 25, -1, -1, -1];
     cardInDeckObjects[0].cardScore = 5;
     cardInDeckObjects[1].cardScore = 3;
    tutorialText = 8;
     optionCardSetup();
  } 
  if (tutorialText == 8){
    text("Since you have a five card and a three card", 440, 150);
    text("along with the Knock Off Option Card, it is best \nto choose card number two", 400, 200);
    helpArrows[0] = new TutorialArrow(725,480,270);
      tutorialLimit(true, true, true, true, true);
  }
  if (tutorialText == 9 || tutorialText == 10){
    text("Use the Knock Off Option Card. Which will ", 440, 150);
    text("subtract three from five equalling two.", 400, 200);
      tutorialLimit(false, true, false, true, true);
  }
  if (tutorialText == 11){
    text("Use the Ace Shot and end the tutorial", 430, 150);
      tutorialLimit(false, true, false, true, true); 
  }
  if (enemyDisplayHealth <= 0){
    //end tutorial
     screen = 9;
     tutorial = 0;
    tutorialText = 0;
    //making enemyHealth and display health not zero fixes some weird detectors
    enemyHealth = 2;
    enemyDisplayHealth = 2;
   }
}

function tutorialWitch(){
  if (tutorialText == 0){
    //tutorial setup
    playerCharacter = 5;
      tutorialSetup(2);
      enemyHealth = 10;
    playerHealth = playerMaxHealth;
      enemyDisplayHealth = enemyHealth;
      enemyHealthMax = enemyHealth;
      optionCardAppearArray = [23,24,2,-1,-1,-1];
      cardInDeckPicker = [1, 2, 3, 1, 1];
      cardInDeckObjects[0].cardScore = 5;
    cardInDeckObjects[1].cardScore = 1;
      tutorialText = 1;
    optionCardSetup();
    }
  fill(255);
  textSize(45);
      textFont(anton);
  if (tutorialText == 1){
    text("The Witch Jessica, specializes in", 580, 150);
      text("getting pairs. The first thing you will \nnotice is that you have only one option \ncard at the start of battle. >", 550, 200);
     tutorialLimit(true, true, true, true, false);
  }
  if (tutorialText == 2){
    text("Jessica instead, has her spell book.", 580, 150);
      text("You can use any battle card to unlock \noption cards using her spell book. < >", 550, 200);
      tutorialLimit(true, true, true, false, false);
  }
  if (tutorialText == 3 || tutorialText == 4){
    text("You do not have to memorize which", 580, 150);
    text("values correspond with which option \ncards you can just click on both pages, \ntry it.", 550, 200);
    tutorialLimit(true, true, true, true, true);
    fill(0, 150, 255);
    //click pages arrows
      text("Click", 140, 490);
    helpArrows[0] = new TutorialArrow(140,380,270);
    helpArrows[1] = new TutorialArrow(257,380,270);
  }
  if (tutorialText == 5){
    text("You can not have duplicate option", 580, 150);
      text("cards nor more than four at a time. \nFurthermore, her option cards do not \ndisappear when her turn ends. They only \ngo away when you use them. >", 550, 200);
      tutorialLimit(true, true, true, true, false);
  }
  if (tutorialText == 6){
    text("You also get the Cauldron option", 580, 150);
      text("card every turn for free. Use it to get \na six battle card then use Jessica's \nRight Page with the six.", 550, 200);
      tutorialLimit(false, true, true, true, true);
  }
  if (tutorialText == 7){
    text("The six card gave you a", 760, 150);
    text("Whack option card. Next, end \nyour turn.", 730, 200);
    tutorialLimit(true, false, true, true, true);
  }
  if (tutorialText == 9){
    //post end turn new battle cards
    tutorialSetup(2);
      cardInDeckPicker = [1, 3];
      cardInDeckObjects[0].cardScore = 5;
    cardInDeckObjects[1].cardScore = 4;
      tutorialText = 10;
    optionCardAppearArray = [23,24,2,28,-1,-1];
    optionCardSetup();
  }
  if (tutorialText == 10){
    //purposely vague on the instructions here (instead of telling them to make a 6 then use it) because this character is unlocked and they should know the basics of the game
    text("Now simply use the Whack ", 760, 150);
      text("Option Card and end the \ntutorial.", 730, 200);
      tutorialLimit(false, true, true, true, true);
  }
  if (enemyDisplayHealth <= 0){
    //end tutorial
     screen = 9;
     tutorial = 0;
    tutorialText = 0;
    //making enemyHealth and display health not zero fixes some weird detectors
    enemyHealth = 2;
    enemyDisplayHealth = 2;
   }
}

function tutorialJoker(){
  background(40);
  image(backIMG[5], 200, 412, 440, 375);
  if (tutorialText == 0){
    //tutorial setup
    playerCharacter = 7;
      tutorialSetup(1);
    enemyHealth = 8;
    playerHealth = playerMaxHealth;
      enemyDisplayHealth = enemyHealth;
      enemyHealthMax = enemyHealth;
    tutorialText = 1;
    }
  fill(255);
  textSize(45);
  if (tutorialText == 1){
    text("The Joker specializes in adapting to chaos. Despite being the", 130, 150);
    text("last character, he is one of the more intuitive characters. >", 100, 200);
    tutorialLimit(true, true, true, true, false);
  }
  if (tutorialText == 2){
    text("The Joker always has five option cards in his deck. If he uses", 130, 150);
    text("one of them, another card replaces it. You can never have two of \nthe same option card. < >", 100, 200);
    text("", 100, 250);
    tutorialLimit(true, true, true, false, false);
  }
  if (tutorialText == 3){
    //(he doesn't actually have every single card but it sounds better)
    text("Furthermore, Joker has every single option card available to", 130 ,150);
    text("him including Special Attack Cards. < >", 100, 200);
    tutorialLimit(true, true, true, false, false);
  }
  if (tutorialText == 4){
    text("These two changes encourage an entirely new mindset", 130, 150);
    text("compared to any other character. < >", 100, 200);
    tutorialLimit(true, true, true, false, false);
  }
  if (tutorialText == 5){
    text("End the tutorial by continuing the text. < >", 130, 150);
    tutorialLimit(true, true, true, false, false);
  }
 if (tutorialText == 6){
   //end tutorial
   screen = 9;
     tutorial = 0;
    tutorialText = 0;
 } 
}

function tutorialWordGame(){
  textFont(anton);
  //clarity background
  fill(0, 0, 0, 180);
  rect(-50, -50, 1400, 700);
  fill(255);
  textSize(45);
  //tutorialnoLetter stops players fromg uessing letters
  tutorialNoLetter = true;
  //tutorial text 1 and 0 because people would click the end turn card and skip first text
  if (tutorialText == 0 || tutorialText == 1){
    text("Now that the battling portion is over, you are now", 270, 150);
    text("free to guess your word. (Arrows/Click >)", 250, 200);
    tutorialLimit(true, true, true, true, false);
  }
  if (tutorialText == 2){
    text("Type letters or click them on the index card at the", 270, 150);
    text("bottom of the screen to guess letters. < >", 250, 200);
     tutorialLimit(true, true, true, false, false);
  }
  if (tutorialText == 3){
    text("Bewarned however, every wrong guess cost score", 270, 150);
    text("with guessing vowels incorrectly costing even more. < >", 250, 200);
     tutorialLimit(true, true, true, false, false);
  }
  if (tutorialText == 4){
    text("If your score reaches zero you loose. < >", 270, 150);
     tutorialLimit(true, true, true, false, false);
  }
  if (tutorialText == 5){
    text("Also if you're feeling confident, you can try to", 270, 150);
    text("guess the entire phrase directly. If you get it right \nyou will earn a lot of points for every hidden letter. \n(So more risky guesses are rewarded) < >", 250, 200);
     tutorialLimit(true, true, true, false, false);
  }
  if (tutorialText == 6){
    text("But if you guess the phrase wrong you loose a huge", 270, 150);
    text("amount of score. < >", 250, 200);
     tutorialLimit(true, true, true, false, false);
  }
  if (tutorialText == 7){
    //end tutorial
    tutorialNoLetter = false;
    tutorial = 0;
    tutorialText = 0;
    tutorialOn[0] = false;
    //stores the fact that they already had the word game tutorial
    storeItem("tutorial?", tutorialOn);
  }
}

function tutorialOverplay(){
  fill(0, 0, 0, 180);
  rect(-50, -50, 1400, 700);
  fill(255);
  textSize(45);
  textFont(anton);
  if (tutorialText == 0){
    text("You have activated Overplay. > (Use Arrow Keys)", 330, 150);
      tutorialLimit(true, true, true, true, false);
  }
  if (tutorialText == 1 ){
    text("Whenever you lose all your Health, you enter", 330, 150);
    text("Overplay. Overplay refreshes all your option \ncards and turns them into Wild Cards < >", 300, 200);
  tutorialLimit(true, true, true, false, false);
  }
  if (tutorialText == 2){
    text("Wild Cards are stronger forms of option cards.", 330, 150);
    text("During Overplay you will have one turn to deal \nas much damage as you can. < >", 300, 200);
  tutorialLimit(true, true, true, false, false);
  }
  if (tutorialText == 3){
    text("This is your last chance to defeat a few more", 330, 150);
    text("enemies and gain a little bit more score. < >", 300, 200);
    tutorialLimit(true, true, true, false, false);
  }
  if (tutorialText == 4){
    //end tutorial
    tutorialText = 0;
    tutorial = 0; 
    tutorialLimit(false, false, false, true, true);
    //store that overplay tutorial has been expierenced
    tutorialOn[1] = false;
    storeItem("tutorial?", tutorialOn);
  }
}

function tutorialRage(){
  fill(0, 0, 0, 180);
  rect(-50, -50, 1400, 700);
  fill(255);
  textSize(45);
  textFont(anton);
  if (tutorialText == 0){
    text("Since this is your first boss fight, I will", 330, 150);
    text("tell you about a unique ability bosses have. \n(Use Arrow Keys to progress text < >)", 300, 200);
      tutorialLimit(true, true, true, true, false);
  }
  if (tutorialText == 1 ){
    text("Whenever a boss gets below half health they will", 330, 150);
    text("become enraged. < >", 300, 200);
  tutorialLimit(true, true, true, false, false);
  }
  if (tutorialText == 2){
    text("You can tell when a boss is raged by the flame", 330, 150);
    text("icon on their health bar. The rage buff will heal \nthe boss every second(ish) during your turn along \nwith granting the boss an extra dice. < >", 300, 200);
  tutorialLimit(true, true, true, false, false);
  }
  if (tutorialText == 3){
    text("Up till now, you have probably been taking your time", 330, 150);
    text("strategizing your moves. But when a boss is enraged \nYou no longer have that luxury. < >", 300, 200);
  tutorialLimit(true, true, true, false, false);
  }
  if (tutorialText == 4){
    text("In fact, the boss has been healing during this tutorial", 330, 150);
    text("so why are you still reading it?! < >", 300, 200);
  tutorialLimit(true, true, true, false, false);
  }
  if (tutorialText == 5){
    //end tutorial
    tutorialText = 0;
    tutorial = 0;
    tutorialLimit(false, false, false, true, true);
    //store that rage tutorial has been activated
    tutorialOn[2] = false;
    storeItem("tutorial?", tutorialOn);
  }
}

function oCardDetailsPage(){
  //clarity background
  fill(0, 0, 0, 180);
  rect(-50, -50, 1400, 700);
  fill (255);
  textSize(35);
  textFont(anton);
  if (oCardDetailsScreen[1]){
      optionCardGraphics[7].clear();
  optionCardGraphics[7].textSize(22);
    optionCardGraphics[7].fill(0);
  optionCardGraphics[7].textFont(anton);
  }
  if (oCardDetailsScreen[0] == 1){
    //for basic tutorial where text continues by seeing details screen
    if (tutorialText == 4){
      tutorialNoArrow[0] = true;
      tutorialNoArrow[1] = true;
    }
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new KingSpecialAttack(100, 200, 7);
    }
    //I personally can't decide wether I like writing text in the following way or in the tutorials where i use \n a lot. both have their benefits. Because there is some text that is placed inbetween other text (the status names) i use this method
    text("The King's Law:", 260, 100);
    //the card's effects is described
    text("This is the King's Special Attack Card. This card does double the ", 300, 150);
    text("damage as the battle card's value that is used on it.", 260, 200);
    //the wild card ability is also described
    text("Using this card does triple the damage as the battle card used on it.", 260, 400);
  }
  //also the oCardDetailsScreen[0] is equal to whatever option card id is clicked on
  if (oCardDetailsScreen[0] == 2){
    //the formatt of the details screen is repeated for every single option card
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new AddingCard(100, 200, 7);
    }
    if ((playerCharacter == 5 && whoseTurn == 1) || (player2Character == 5 && whoseTurn == 2)){
      text("Cauldron Card:", 260, 100);
    }else{
    text("Intergrate Card:", 260, 100);
    }
    text("This option card combines two cards into one, adding the values.", 300, 150);
    text("of the battle cards that are used on it.", 260, 200);
    text("Using this card returns two cards of the new combined value.", 260, 400);
  }
  if (oCardDetailsScreen[0] == 3){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new DodgeOptionCard(100, 200, 7);
    }
    if (multiplayerSelect == 0){
    text("Dodgy Dice Card:", 260, 100);
    text("This option card guarantees that you                     one of the dice", 300, 150);
       text("during the next enemy turn. If the card is greather than six you guarantee", 260, 200);
       text("you dodge the biggest dice.", 260, 250);
      text("Using this card makes you dodge all dice next enemy turn.", 260, 400);
    }
    //dodge card has a different discription if it is multiplayer and if the character is the queen
    if (multiplayerSelect == 3){
      text("Dodgy Cardy Card:", 260, 100);
    text("This option card guarantees that you                     the next attack your", 300, 150);
       text("opponent throws at you. This option card requires a battle card with a", 260, 200);
      if ((playerCharacter == 2 && whoseTurn == 1) || (player2Character == 2 && whoseTurn == 2)){
      text("value of four or lower to be used.", 260, 250);
    }else{
      text("value of six or higher to be used.", 260, 250);
    }
      //wild Card doesn't exist in multiplayer but it looks weird if there is no text after the wild card heading.
      text("Using this card makes you dodge your next opponent's attack no matter", 260, 400);
      text("what value of the battle card used on it is.", 260, 450);
    }
    //all status names have the icon and thematic color
    fill(0, 210, 0);
      text("DODGE", 892, 150);
      image(statusIMG[6], 860, 130, 45, 45);
  }
  if (oCardDetailsScreen[0] == 4){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new RedrawCard(100, 200, 7);
    }
    text("Roulette Card:", 260, 100);
    text("This option card randomly changes the value of the battle card", 300, 150);
       text("used on it. The new value can be anything between 1-10. This option", 260, 200);
       text("card can be reused three times", 260, 250);
    if ((whoseTurn == 1 && playerCharacter == 2) || (whoseTurn == 2 && player2Character == 2)){
      text("Using this card will always result in a card with a lower value.", 260, 400);
    }else{
      text("Using this card will always result in a card with a higher value.", 260, 400);
    }
  }
  if (oCardDetailsScreen[0] == 5){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new DuplicateCard(100, 200, 7);
    }
    text("Forge Card:", 260, 100);
    text("This option card adds an extra card to your deck with the exact same ", 300, 150);
       text("value and suit as the battle card used on it.", 260, 200);
      text("Using this card adds two new cards to your deck.", 260, 400);
  }
  if (oCardDetailsScreen[0] == 6){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new QueenSpecialAttack(100, 200, 7);
    }
    text("The Queen's Gall:", 260, 100);
    text("This is the Queen's Special Attack Card. This card does four damage", 300, 150);
       text("everytime this option card is used. The battle card can not be greater ", 260, 200);
       text("than three. This card can be reused infinitely.", 260, 250);
      text("Using this card deals seven damage per use.", 260, 400);
  }
  if (oCardDetailsScreen[0] == 7){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new SplitCardCard(100, 200, 7);
    }
    text("Division Card:", 260, 100);
    text("This option card splits the value of the battle card used on it", 300, 150);
       text("into two different cards.", 260, 200);
      text("Using this card also deals five damage to the enemy.", 260, 400);
  }
  if (oCardDetailsScreen[0] == 8){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new HealCard(100, 200, 7);
    }
    text("Physic Card:", 260, 100);
    text("This option card heals your character half the amount as the", 300, 150);
       text("value of the battle card used on it.", 260, 200);
    //physic has a different discription if overplay is active
    if (overPlay){
      text("Using this card grants you one extra free letter guess. This card requires \na batltle card value of 5 or more to be used.", 260, 400);
    }else{
      text("Using this card heals you the amount of the card value.", 260, 400);
    }
  }
  if (oCardDetailsScreen[0] == 9){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new KeepCardCard(100, 200, 7);
    }
    //keep a card has a different title and discription in multiplayer
    if (multiplayerSelect == 0){
    text("Stash Card:", 260, 100);
    text("This option card guarantees you keep the battle card used on it", 300, 150);
       text("next turn.", 260, 200);
      text("Using this card is the same as above.", 260, 400);
  }
    if (multiplayerSelect == 3){
      text("Sabotage Card:", 260, 100);
    text("This option card stores the battle card you used on it and forces", 300, 150);
      text("your opponent to start with said battle card during their next turn.", 260, 200);
      text("Using this card is the same as above.", 260, 400);
    }
  }
  if (oCardDetailsScreen[0] == 10){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new AddOneCard(100, 200, 7);
    }
    text("Add One Card:", 260, 100);
    text("This option card adds one to the value of the battle card used on it", 300, 150);
      text("Using this card is the same as above", 260, 400);
  }
  if (oCardDetailsScreen[0] == 11){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new SubtractOneCard(100, 200, 7);
    }
    text("Deduct One Card:", 260, 100);
    text("This option card subtracts one to the value of the battle card used", 300, 150);
       text("on it. ", 260, 200);
      text("Using this card is the same as above.", 260, 400);
  }
  if (oCardDetailsScreen[0] == 12){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new GetTenCard(100, 200, 7);
    }
    text("Counterfeit Card:", 260, 100);
    text("This option card gives you a ten card in exchange for a battle card", 300, 150);
       text("with a certain value. This value is random every turn.", 260, 200);
      text("Using this card is the same as above.", 260, 400);
  }
  if (oCardDetailsScreen[0] == 13){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new HealThreeCard(100, 200, 7);
    }
    text("Mend Card:", 260, 100);
    text("This option card heals three points of your health. If the battle card", 300, 150);
       text("used on it is greater than 4, grants                   effect.", 260, 200);
      text("Using this card heals ten health and always grants                  .", 260, 400);
    //regen icon and thematic color
    fill(190, 0, 0);
      text("REGEN", 817, 200);
      image(statusIMG[4], 785, 180, 45, 45);
    text("REGEN", 1040, 400);
      image(statusIMG[4], 1010, 380, 45, 45);
  }
  if (oCardDetailsScreen[0] == 14){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new NeedOddDamage(100, 200, 7);
    }
    text("Whopper Card:", 260, 100);
    text("This option card requires an odd number battle card to deal five", 300, 150);
       text("damage. If the battle card value is seven, deal nine damage and inflict", 260, 200);
       text("                         on the enemy.", 255, 250);
      text("Using this card always inflicts                          on the enemy and deals", 260, 400);
    text("four extra damage on use.", 260, 450);
    //weakness icons and thematic color
    fill(150, 20, 170);
    text("WEAKNESS", 747, 400);
    image(statusIMG[1], 715, 380, 45, 45);
    text("WEAKNESS", 317, 250);
    image(statusIMG[1], 285, 230, 45, 45);
  }
  if (oCardDetailsScreen[0] == 15){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new NeedEvenDamage(100, 200, 7);
    }
    text("Venostrike Card:", 260, 100);
    text("This option card requires an even number battle card to deal six", 300, 150);
       text("damage. If the battle card value is eight, deal ten damage and inflict", 260, 200);
       text("                    on the enemy.", 255, 250);
      text("Using this card always inflicts                    on the enemy and deals", 260, 400);
    text("four extra damage on use.", 260, 450);
    //poison icons and thematic color
    fill(40, 150, 40);
    text("POISON", 747, 400);
    image(statusIMG[0], 715, 380, 45, 45);
    text("POISON", 317, 250);
    image(statusIMG[0], 285, 230, 45, 45);
  }
  if (oCardDetailsScreen[0] == 16){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new DealDoubleDamage(100, 200, 7);
      }
    text("Duplex Card:", 260, 100);
    text("This option card deals double the damage of the value of the battle card ", 300, 150);
       text("used on it. The battle card's value can not exceed three.", 260, 200);
      text("Using this card deals triple the damage of the battle card's value", 260, 400);
  }
  if (oCardDetailsScreen[0] == 17){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new AceSpecialAttack(100, 200, 7);
    }
    fill(255);
    text("The Ace Shot:", 260, 100);
    text("This is the Ace's Special Attack Card. Every turn you get to choose a ", 300, 150);
       text("value which this card will require to deal eight damage. This card can be", 260, 200);
       text("reused infinitely.", 260, 250);
      text("Using this card deals 15 damage per use.", 260, 400);
  }
  if (oCardDetailsScreen[0] == 18){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new MultiplyCard(100, 200, 7);
    }
    text("Twofold Card:", 260, 100);
    text("This option card doubles the value of the battle card used on it.", 300, 150);
       text("The value of the card used on it must be 5 or less.", 260, 200);
      text("Using this card is the same as above.", 260, 400);
  }
  if (oCardDetailsScreen[0] == 19){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new PowerCharge(100, 200, 7);
    }
    text("Crescendo Card:", 260, 100);
    //every character card that is needed to be unlocked says that they are exclusive to said character
    text("This option card is exclusive to the King. It grants", 300, 150);
       text("to doubles the damage of your next attack. This card requires a battle ", 260, 200);
    text("card with a value of 9 or 10 to be used.", 260, 250);
      text("Using this card is the same as above.", 260, 400);
    //power charge icon and thematic color
    fill(255, 150, 0);
    text("POWER CHARGE", 1057, 150);
    image(statusIMG[5], 1025, 130, 45, 45);
  }
  if (oCardDetailsScreen[0] == 20){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new WeakenSelf(100, 200, 7);
    }
    text("Gambit Card:", 260, 100);
    text("This option card deals two damage. If the battle card used on it is an", 300, 150);
       text("ace, inflict                          debuff on self.", 260, 200);
      text("Using this card deals five damage and inflicts                          on self.", 260, 400);
    //weakness icons and thematic colors
    fill(150, 20, 170);
    text("WEAKNESS", 478, 200);
    image(statusIMG[1], 446, 180, 45, 45);
    text("WEAKNESS", 967, 400);
    image(statusIMG[1], 935, 380, 45, 45);
  }
  if (oCardDetailsScreen[0] == 21){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new EnemyRandomStatus(100, 200, 7);
    }
    fill(255);
    text("Syringe Card:", 260, 100);
    text("This option card inflicts a random status on the enemy. This option", 300, 150);
    text("card needs two battle cards with the same value to be used.", 260, 200);
      text("Using this card is the same as above.", 260, 400);
  }
  if (oCardDetailsScreen[0] == 22){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new JackSpecialAttack(100, 200, 7);
    }
    text("The Jack's Dose:", 260, 100);
    text("This is the Jack's Special Attack Card. This card deals 3 damage", 300, 150);
       text("plus 5 damage per status effect you or the enemy are inflicted with.", 260, 200);
      text("Using this card deals 7 damage plus 8 damage per status effect.", 260, 400);
  }
  if (oCardDetailsScreen[0] == 23){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new WitchSpecialLeft(100, 200, 7);
    }
    text("Jessica's Spell Book Left Page", 260, 100);
    text("Unlocks different option cards depending on the value of the battle", 300, 150);
    text("card used on it.", 260, 200);
    //physic description changes in overplay
    if (!overPlay){
    text("1 - Physic - Heal half [Card Value] health.", 300, 250);
    }else{
      text("1 - Physic - Free Guess Card", 300, 250);
    }
       text("2 - Syringe - Inflicts random status on the enemy.", 300, 300);
    text("3 - Roulette - Randomly redraw battle card.", 300, 350);
    text("4 - Cauldron - Combine two battle card's into one.", 300, 400);
      text("5 - Forge - Duplicate a battle card. (Only one per turn)", 300, 450);
  }
  if (oCardDetailsScreen[0] == 24){
    text("Jessica's Spell Book Right Page", 260, 100);
    text("Unlocks different option cards depending on the value of the battle", 300, 150);
    text("card used on it.", 260, 200);
    text("6 - Whack - Deal 10 damage. (Min 6)", 300, 250);
       text("7 - Hammer - Deal 7 damage. (Bonus if = 7)", 300, 300);
    text("9 - Fire Ball - Deal double [Card Value] damage.", 300, 400);
      text("10 - Unlabled Elixir - Chance to buff self or debuff enemy. (Need 10)", 300, 450);
    //sentry description changes in multiplayer
    if (multiplayerSelect == 3){
      text("8 - Dodgy Cardy -                    one of opponent's attack. (Min 6)", 300, 350);
      //dodge icon and thematic color
      fill(0, 210, 0);
    text("DODGE", 600, 350);
    image(statusIMG[6], 568, 330, 45, 45);
    }else{
    text("8 - Sentry -                      against enemy attack. (Bonus if = 8)", 300, 350);
      //guard icon and thematic color
    fill(150);
    text("GUARDS", 520, 350);
    image(statusIMG[7], 488, 330, 45, 45);
    }
    
  }
  if (oCardDetailsScreen[0] == 25){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new SubtractCard(100, 200, 7);
    }
    text("Knock Off Card", 260, 100);
    text("This option card combines two cards into one, subtracting the values.", 300, 150);
    text("of the battle cards that are used on it.", 260, 200);
    text("Using this card returns two cards of the new combined value.", 260, 400);
  }
  if (oCardDetailsScreen[0] == 26){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new BlockCard(100, 200, 7);
    }
    text("Sentry Card", 260, 100);
    text("This option card                     you from the greatest enemy dice next", 300, 150);
    text("turn. If the value of the battle card equals 8, block two dice next turn.", 260, 200);
    text("", 260, 250);
    text("Using this card                     all dice next turn.", 260, 400);
    //guard icon and thematic color
    fill(150);
    text("GUARDS", 590, 150);
    image(statusIMG[7], 558, 130, 45, 45);
    text("GUARDS", 534, 400);
    image(statusIMG[7], 502, 380, 45, 45);
  }
  if (oCardDetailsScreen[0] == 27){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new SevenDamage(100, 200, 7);
    }
    text("Hammer Card", 260, 100);
    text("This option card deals 7 damage to the enemy. If the value of the", 300, 150);
    text("battle card used on it is equal to seven deal 13 damage.", 260, 200);
    text("Using this card deals 14 damage. If battle card value is seven deal 30", 260, 400);
    text("damage.", 260, 450);
  }
  if (oCardDetailsScreen[0] == 28){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new TenDamage(100, 200, 7);
    }
    text("Whack Card", 260, 100);
    text("This option card deals 10 damage to the enemy. The battle card", 300, 150);
    text("used on it must be six or more.", 260, 200);
    text("Using this card deals 25 damage.", 260, 400);
  }
  if (oCardDetailsScreen[0] == 29){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new DoubleDamage(100, 200, 7);
    }
    text("Fire Ball Card", 260, 100);
    text("This option card deals double the damage of the battle card's value", 300, 150);
    text("used on it.", 260, 200);
    text("Using this card deals triple damage.", 260, 400);
  }
  if (oCardDetailsScreen[0] == 30){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new GetAceCard(100, 200, 7);
    }
    fill(255);
    text("Magazine Card", 260, 100);
    text("This option card is exclusive to the Ace. Every turn this option card", 300, 150);
    text("will require a random card value. Using this option card will change", 260, 200);
    text("the value of the option card used on it into the value needed for", 260, 250);
    text("The Ace Shot. This card is infinitely reusable.", 260, 300);
    text("Using this card doesn't require any card value.", 260, 400);
  }
  if (oCardDetailsScreen[0] == 31){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new FiftyFifty(100, 200, 7);
    }
    //if the player is the witch the description and name is different
    if ((playerCharacter == 5 && whoseTurn == 1) || (player2Character == 5 && whoseTurn == 2)){
      text("Unlabled Elixir Card", 260, 100);
    text("This option card is exclusive to Jessica. When used this option card ", 300, 150);
    }else{
    text("Reaction Card", 260, 100);
    text("This option card is exclusive to the Jack. When used this option card ", 300, 150);
    }
    text("will either grant                            and            to the player or inflict", 260, 200);
    text("                 ,             ,                     , and             on the enemy. This card", 260, 250);
    text("requires a card with a value of eight or higher to be used.", 260, 300);
    text("Using this card doesn't require any card value.", 260, 400);
    //thematic colors of the status effects
    fill(255, 150, 0);
    text("POWER CHARGE", 500, 200);
    fill(190, 0, 0);
    text("REGEN", 775, 200);
    fill(150, 20, 170);
    text("WEAKNESS", 260, 250);
    fill(40, 150, 40);
    text("POISON", 420, 250);
    fill(253, 218, 13);
    text("PICKPOCKET", 540, 250);
    fill(173, 216, 230);
    text("FREEZE", 770, 250);
  }
  if (oCardDetailsScreen[0] == 32){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new AddTwoCard(100, 200, 7);
    }
    text("Add Two Card:", 260, 100);
    text("This option card adds two to the value of the battle card used on it.", 300, 150);
      text("Using this card is the same as above.", 260, 400);
  }
  if (oCardDetailsScreen[0] == 33){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new SubtractTwoCard(100, 200, 7);
    }
    text("Deduct Two Card:", 260, 100);
    text("This option card subtracts two to the value of the battle card used", 300, 150);
       text("on it. ", 260, 200);
      text("Using this card is the same as above.", 260, 400);
  }
  if (oCardDetailsScreen[0] == 34){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new OCardStronger(100, 200, 7);
    }
    text("Kaleidoscope Card:", 260, 100);
    text("This option card is exclusive to the Joker. Every time an option card", 300, 150);
       text("is used, the damage this option card deals is increased by one. (The", 260, 200);
    text("damage is reset when this card is used). This card requires a card", 260, 250);
    text("with a value of seven or higher to be used.", 260, 300);
      text("This option card deals 2 damage per option card used.", 260, 400);
  }
  if (oCardDetailsScreen[0] == 35){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new QuadruplicateCard(100, 200, 7);
    }
    text("Four Knights Card:", 260, 100);
    text("This option card is exclusive to the Queen. Using this option card", 300, 150);
       text("creates three extra cards to your deck. This card requires an ace card to", 260, 200);
    text("be used.", 260, 250);
      text("Using this card does not require any specific card value to be used.", 260, 400);
    
  }
  if (oCardDetailsScreen[0] == 36){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new NeedSuitCard(100, 200, 7);
    }
    text("Royal Flush Card:", 260, 100);
    text("This option card deals 5 damage. This card requires a specific suit to", 300, 150);
       text("be used.", 260, 200);
      text("Using this card deals 9 damage.", 260, 400);
  }
  if (oCardDetailsScreen[0] == 37){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new TwoPoison(100, 200, 7);
    }
    text("Ivy Card:", 260, 100);
    text("This option card deals 3 damage and inflicts                      on your", 300, 150);
       text("enemy. This card requires a card with a value of two to be used.", 260, 200);
      text("Using this card deals 6 damage.", 260, 400);
    //poison icon and thematic color
    fill(40, 150, 40);
    text("POISON", 992, 150);
    image(statusIMG[0], 960, 130, 45, 45);
  }
  if (oCardDetailsScreen[0] == 38){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new FreeGuessCard(100, 200, 7);
    }
    text("Theory Card:", 260, 100);
    text("This option card grants you a free letter guess. This card requires", 300, 150);
       text("card with a value of nine or ten to be used.", 260, 200);
      text("Using this card does not require any specific card value.", 260, 400);
  }
  if (oCardDetailsScreen[0] == 39){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new PickpocketCard(100, 200, 7);
    }
    text("Raid Card:", 260, 100);
    text("This option card deals 6 damage and inflicts                            on the", 300, 150);
       text("enemy. This card requires a card with a value of six or more to be used.", 260, 200);
      text("Using this card deals 14 damage.", 260, 400);
    //pickpocket icon and thematic color
    fill(253, 218, 13);
    text("PICKPOCKET", 992, 150);
    image(statusIMG[3], 960, 130, 45, 45);
  }
  if (oCardDetailsScreen[0] == 40){
    //every details screen creates said option card in oCardDetailsIMG and uses oCardIMG graphic 7 to display the image
    //this makes the creation of the option card object only happen once and not every frame
    if (oCardDetailsScreen[1]){
    oCardDetailsIMG = new CureStatus(100, 200, 7);
    }
    text("Antidote Card:", 260, 100);
    //Antidote card has different description in multiplayer
    if (multiplayerSelect == 0){
    text("This option card cures the player of all debuffs. This card requires a", 300, 150);
       text("card with a value of six or more to be used.", 260, 200);
      text("Using this card does not require any specific card value to be used.", 260, 400);
    }
    if (multiplayerSelect == 3){
      text("This option card cures the player of one debuff.", 300, 150);
       text("This card requires a card with a value of six or more to be used.", 260, 200);
      text("Using this card does not require any specific card value to be used.", 260, 400);
    }
  }
  //except for the witch pages the wild card heading appears
  fill(210, 0, 0);
  if (oCardDetailsScreen[0] != 23 && oCardDetailsScreen[0] != 24){
    text("WILD Card:", 260, 350);
  }else if (oCardDetailsScreen[0] == 24){
    //right page is different size so it looks weird unless i just make the image manually
    if (multiplayerSelect == 0){
    image(rightPage, 140, 200, 195, 250);
    }else{
      image(rightPage2, 140, 200, 195, 250);
    }
    //left page also looks some what weird so I just make the image
  }else if (oCardDetailsScreen[0] == 23){
    image(leftPage, 100, 200, 150, 250);
  }
  textSize(45);
  fill(255);
  text("Press Space To Close", 350, 550);
  //because i made the code as it is constantly making the option card every frame i need to clear it every frame too.
  if (oCardDetailsScreen[0] != 24){
    //except for the right witch page create the image
    if (oCardDetailsScreen[1]){
      //makes it so that the transparent image doesn't layer every frame
    oCardDetailsIMG.create();
      oCardDetailsScreen[1] = false;
    }
    image(optionCardGraphics[7], 100, 200);
  }
}
//#profit