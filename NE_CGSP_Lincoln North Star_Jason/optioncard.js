class OptionCardAttack {
  //this object is used for the attacking option card animation
  constructor(tempX, tempY) {
    this.x = tempX;
    this.y = tempY;
  }
  attack() {
    push();
    scale(-1, 1);
    //cuz cornerCard image is flipped this reflips it
    image(specialIMG[0], -this.x, this.y, 150, 250);
    pop();
    //move the card off screen
    this.y -= 25;
  }
}

class KingSpecialAttack {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    //tempWhich marks which graphic the card is on.
    this.which = tempWhich;
  }
  create(){
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
    optionCardGraphics[this.which].image(oCardIMG[1], 75, 125, 150, 250);
    optionCardGraphics[this.which].text("Deal Double ", 8, 203);
    optionCardGraphics[this.which].text("Damage", 42, 225);
    }
    optionCardGraphics[this.which].fill(255);
    if (this.wild || overPlay){
    optionCardGraphics[this.which].image(wildIMG[1], 75, 125, 150, 250);
    optionCardGraphics[this.which].text("Deal Triple", 15, 203);
    optionCardGraphics[this.which].text("Damage", 42, 225);
    }  
    optionCardGraphics[this.which].image(cardBox, 125, 192, 15, 25);
    optionCardGraphics[this.which].text("King's Law", 28, 30);  
  }
  use(tempCardScore) {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    if (multiplayerSelect == 0) {
      if (overPlay || this.wild) {
        enemyHealth -= tempCardScore * 3;
        if (playerCharge) {
          //every attacking card does double damage and removes the status icon if powercharge is active
          enemyHealth -= tempCardScore * 3;
          playerCharge = false;
          removeStatusIcon(6, -1);
        }
      }
      if (!this.wild && !overPlay) {
        enemyHealth -= tempCardScore * 2;
        if (playerCharge) {
          enemyHealth -= tempCardScore * 2;
          playerCharge = false;
          removeStatusIcon(6, -1);
        }
      }
    }
    if (multiplayerSelect == 3) {
      if (whoseTurn == 1) {
        //every attacking card also can be dodged in multiplayer so there is always a check
        if (!player2Dodge) {
          player2Health -= tempCardScore * 2;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            player2Health -= tempCardScore * 2;
            playerCharge = false;
            removeStatusIcon(6, 1);
          }
        }else if (player2Dodge) {
          removeStatusIcon(7,2);
          player2Dodge = false;
          splashThing = new SplashMessage(12);
        }
      } else if (whoseTurn == 2) {
        if (!player1Dodge) {
          player1Health -= tempCardScore * 2;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (player2Charge) {
            player1Health -= tempCardScore * 2;
            player2Charge = false;
            removeStatusIcon(6, 2);
          }
        } else if (player1Dodge) {
          player1Dodge = false;
          removeStatusIcon(7,1);
          splashThing = new SplashMessage(12);
        }
      }
    }
  }
}

class AddingCard {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.uses = 0;
    this.which = tempWhich;    
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[3], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Combine Two", 18, 203);
      optionCardGraphics[this.which].text("Cards Into One", 13, 225);
    }
    optionCardGraphics[this.which].fill(255);
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[3], 75, 125, 150, 250);
    optionCardGraphics[this.which].text("Combine Two", 18, 203);
    optionCardGraphics[this.which].text("Cards Into Two", 11, 225);
    } 
    //different appearance if player is witch
    if ((playerCharacter == 5 && whoseTurn == 1) || (player2Character == 5 && whoseTurn == 2)){
      optionCardGraphics[this.which].text("Cauldron", 38, 30);
    }else{
      optionCardGraphics[this.which].text("Integrate", 35, 30);
    }
  }
  use(tempCardScore) {
    //keeps track of the first battle card's value
    AddingCardScore1[0] = tempCardScore;
    this.uses++;
    sparkle.play();
  }
  useAgain(tempCardScore2) {
    mainScore[0] += 50;
    numOfOCard++;
    this.uses++;
    this.used = true;
    sparkle.play();
    //adds both scores
    AddingCardScore1[1] = AddingCardScore1[0] + tempCardScore2;
    if (AddingCardScore1[1] > 10) {
      if (
        (playerCharacter == 4 && whoseTurn == 1) ||
        (player2Character == 4 && whoseTurn == 2)
      ) {
        AddingCardScore1[1] -= 10;
      } else {
        AddingCardScore1[1] = 10;
      }
    }
    //if new score is 10 then add to king's character bonus
    if (AddingCardScore1[1] == 10){
      characterBonus[1]++;
    }
    //for all cards the witch in her book has the followng block of code
    if (
      (playerCharacter == 5 && whoseTurn == 1) ||
      (player2Character == 5 && whoseTurn == 2)
    ) {
      //looks through the optioncard appear array for the option card.
      for (let ko = 0; ko < optionCardAppearArray.length + 1; ko++) {
        if (optionCardAppearArray[ko] == 2) {
          //then it gets rid of that number from optioncardappeararray and make the witchDeck variable that corresponds to this card and makes it false. 
          optionCardAppearArray[ko] = -1;
          witchDeck[3] = false;
          //other witch deck cards also have extra code witchCardNum -= 1; witchCardNum tracks how many option cards the witch has because she is only allowed 3. But the integrate card doesn't count as it is the only card that can be in optionCardBoard[2] so it doesn't need to be a factor
        }
      }
    }
  }
}

class DodgeOptionCard {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;
    
  }
  create(){
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    //some cards like this one have different appearances and effects in multiplayer mode
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[4], 75, 125, 150, 250);
      if (multiplayerSelect == 0){
        optionCardGraphics[this.which].text("Min:", 57, 115);
        optionCardGraphics[this.which].text("4", 72, 143);
      optionCardGraphics[this.which].text("Dodge One Dice", 8, 195);
      optionCardGraphics[this.which].text("If > 6 Dodge ", 25, 217);
      optionCardGraphics[this.which].text("Biggest Dice", 21, 239);
      optionCardGraphics[this.which].fill(255);
      optionCardGraphics[this.which].text("Dodgy Dice", 28, 30);
    }else{
      //different apperance if multiplayer and if player is queen
      if ((playerCharacter == 2 && whoseTurn == 1) || (player2Character == 2 && whoseTurn == 2)){
          optionCardGraphics[this.which].text("Max:", 57, 115);
      optionCardGraphics[this.which].text("4", 72, 143);
        }else{
          optionCardGraphics[this.which].text("Min:", 57, 115);
      optionCardGraphics[this.which].text("6", 72, 143);
        }
      optionCardGraphics[this.which].text("Dodge One", 28, 203);
      optionCardGraphics[this.which].text("Attack", 47, 225);
      optionCardGraphics[this.which].fill(255);
      optionCardGraphics[this.which].text("Dodgy Cardy", 21, 30);
    }
    }
    optionCardGraphics[this.which].fill(255);
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[4], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Dodge All Dice", 12, 217);
      optionCardGraphics[this.which].text("Dodgy Dice", 28, 30);
      optionCardGraphics[this.which].fill(0);
      optionCardGraphics[this.which].text("Min:", 57, 115);
        optionCardGraphics[this.which].text("4", 72, 143);
    } 
  }
  use(tempCardScore) {
    mainScore[0] += 50;
    numOfOCard++;
    this.used = true;
    sparkle.play();
    if (multiplayerSelect == 0) {
      if (!overPlay && !this.wild) {
        //check if value was 6 or below if it was set dodgeNext Attack to one which means player dodges one dice
        if (tempCardScore <= 6) {
          if (dodgeNextAttack == 0){
            addStatusIcon(7, -1);
          }
          dodgeNextAttack = 1;
        }
        //if dice was above 6 dode greatest attack
        if (tempCardScore > 6) {
          if (!dodgeGreatestAttack){
            addStatusIcon(7,-1);
          }
          dodgeGreatestAttack = true;
        }
      }
      //if wild card dodge all dice next turn.
      if (overPlay || this.wild) {
        addStatusIcon(7,-1);
        dodgeAllAttack = true;
      }
    }
    if (multiplayerSelect == 3) {
      //depending on whose turn make them gain dodge status effect
      if (whoseTurn == 1) {
        if (!player1Dodge){
        player1Dodge = true;
        player1Status.push(new StatusIcon(7, 1));
        }
      }
      if (whoseTurn == 2) {
        if (!player2Dodge){
        player2Dodge = true;
        player2Status.push(new StatusIcon(7, 2));
        }
      }
      //following block of code is for the witch and is same as the integrate card 
      if (
      (playerCharacter == 5 && whoseTurn == 1) ||
      (player2Character == 5 && whoseTurn == 2)
    ) {
      for (let ko = 0; ko < optionCardAppearArray.length + 1; ko++) {
        if (optionCardAppearArray[ko] == 3) {
          optionCardAppearArray[ko] = -1;
          witchCardNum -= 1;
          witchDeck[7] = false;
        }
      }
    }
    }
  }
}

class RedrawCard {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.uses = 0;
    this.which = tempWhich;    
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[3], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Redraw Card", 18, 195);
      optionCardGraphics[this.which].text("(Can Be Reused", 8, 217);
      optionCardGraphics[this.which].text("Three Times)", 17, 239);
    }
    optionCardGraphics[this.which].fill(255);
    if (this.wild || overPlay){
    optionCardGraphics[this.which].image(wildIMG[3], 75, 125, 150, 250);
    optionCardGraphics[this.which].text("Redraw Card", 18, 195);
    optionCardGraphics[this.which].text("(Can Be Reused", 8, 217);
    optionCardGraphics[this.which].text("Three Times)", 17, 239);
    } 
    optionCardGraphics[this.which].text("Roulette", 38, 30);
  }
  use(tempCardScore, whichCard) {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    //because this card can be reused three times it increases .uses by one every use
    this.uses++;
    if (!overPlay && !this.wild) {
      //this is the randomized values. I use shuffle because I want geetting a 10, 9, or one to be more rare than other numbers
      let tempShuffle = shuffle([1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,10]);
      //this is to prevent getting the same number whihc may make the player think the card didn't work.
      while (tempShuffle[0] == tempCardScore) {
        tempShuffle = shuffle([1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,10]);
      }
       this.score = tempShuffle[0];
    }
    //wild cards always makes the new card value higher than it was originally. so the following makes it greater. if you are the queen the new value is always lower than what you had.
    if (overPlay || this.wild) {
      if ((whoseTurn == 1 && playerCharacter == 2) || (whoseTurn == 2 && player2Character == 2)){
        //i use while to get rid of repeat values for the normal redraw card but because you may use a 10 in the overplay redraw (or an ace if you are the queen) that would make an infinite loop so i use an if to try to reroll once.
        this.score = int(random(1, tempCardScore + 1));
        if (this.score == tempCardScore) {
          this.score = int(random(1, tempCardScore + 1));
        }
      }else{
        this.score = int(random(tempCardScore, 11));
        if (this.score == tempCardScore) {
          this.score = int(random(tempCardScore, 11));
        }
      }
    }
    //makes randomized suit
    cardInDeckObjects[whichCard].suit = int(random(4));
    //character bonuses if the new value was one or a ten.
    if (this.score == 10){
      characterBonus[1]++;
    }
    if (this.score == 1){
      characterBonus[2]++;
    }
    //makes the battle card the newcard
    cardInDeckObjects[whichCard].cardScore = this.score;
    if (this.uses == 3) {
      this.used = true;  
      //the following is for the witch character see the integrate option card to find out how the following block of text works
    if (
      (playerCharacter == 5 && whoseTurn == 1) ||
      (player2Character == 5 && whoseTurn == 2)
    ) {
      for (let ko = 0; ko < optionCardAppearArray.length + 1; ko++) {
        if (optionCardAppearArray[ko] == 4) {
          optionCardBoard[ko] = 0;
          optionCardAppearArray[ko] = -1;
          witchCardNum -= 1;
          witchDeck[2] = false;
        }
      }
    }
    }
  }
}

class DuplicateCard {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;    
  }
  create() { 
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[3], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Duplicate Card", 10, 203);
    }
    optionCardGraphics[this.which].fill(255);
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[3], 75, 125, 150, 250);
    optionCardGraphics[this.which].text("Triplicate Card", 9, 203);
    } 
    optionCardGraphics[this.which].text("Forge", 51, 30);
    
  }
  use(tempCardScore, tempCardSuit, tempNewCardVariable) {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    //adds a new battle card to the battle card array. The suit and card value are the same as the original card but crucially the default x value is different to prevent stacking cards. 
    cardInDeckObjects.push(
      new BattleCard(600, 500, tempNewCardVariable));
    //the following is just insurance that the new card shares the value and suit of the original card.
    cardInDeckObjects[tempNewCardVariable - 1].suit = cardInDeckObjects[tempCardSuit].suit;
    cardInDeckObjects[tempNewCardVariable - 1].cardScore = tempCardScore;
    if (overPlay || this.wild) {
      //because a wild duplciate card creates two extra cards wild cards add 2 to the bonuses
      if (tempCardScore == 10){
        characterBonus[1]++;
      }
      if (tempCardScore == 1){
        characterBonus[2]++;
      }
      //following is the same code for creating a new battle card. 
      cardInDeckObjects.push(
        new BattleCard(400, 500, cardInDeckObjects.length + 1)
      );
      cardInDeckObjects[tempNewCardVariable].suit = cardInDeckObjects[tempCardSuit].suit;
      cardInDeckObjects[tempNewCardVariable].cardScore = tempCardScore;
    }
    //character bonuses depending on what value it is
    if (tempCardScore == 10){
      characterBonus[1]++;
    }
    if (tempCardScore == 1){
      characterBonus[2]++;
    }
    //following removes a card from the witch's option card board it is the same as present in the integreate card.
    if (
      (playerCharacter == 5 && whoseTurn == 1) ||
      (player2Character == 5 && whoseTurn == 2)
    ) {
      for (let ko = 0; ko < optionCardAppearArray.length + 1; ko++) {
        if (optionCardAppearArray[ko] == 5) {
          optionCardBoard[ko] = 0;
          optionCardAppearArray[ko] = -1;
          witchCardNum -= 1;
          witchDeck[4] = false;
        }
      }
    }
  }
}

class QueenSpecialAttack {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.wild = false;
    this.used = false;
    this.which = tempWhich;

  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[0], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Deal 4 Damage", 10, 203);
      optionCardGraphics[this.which].text("(Reusable)", 25, 225);
    }
    if (this.wild || overPlay){
    optionCardGraphics[this.which].image(wildIMG[0], 75, 125, 150, 250);
    optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Deal 7 Damage", 10, 203);
    optionCardGraphics[this.which].text("(Reusable)", 25, 225);
    } 
    optionCardGraphics[this.which].fill(0);
    optionCardGraphics[this.which].text("Max:", 55, 115);
    optionCardGraphics[this.which].text("3", 72, 143);
    optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].textSize(20);
    optionCardGraphics[this.which].text("Queen's Gall", 25, 30);
  }
  use() {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    //Queen's call is a very standard attacking card. it checks for multiplayer and lowers the health of the player dependin gon the team. It checks for players with dodge status active. and In Singleplayer it looks for charge and does extra damage in overplay.
    if (multiplayerSelect == 0) {
      if (!overPlay && !this.wild) {
        enemyHealth -= 4;
        //every attacking card does double damage and removes the status icon if powercharge is active
        if (playerCharge) {
          enemyHealth -= 4;
          playerCharge = false;
          removeStatusIcon(6, -1);
        }
      }
      if (overPlay || this.wild) {
        enemyHealth -= 7;
        //every attacking card does double damage and removes the status icon if powercharge is active
        if (playerCharge) {
          enemyHealth -= 7;
          playerCharge = false;
          removeStatusIcon(6, -1);
        }
      }
    }
    if (multiplayerSelect == 3) {
      if (whoseTurn == 1) {
        if (!player2Dodge) {
          player2Health -= 4;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            player2Health -= 4;
            removeStatusIcon(6, 1);
            playerCharge = false;
          }
        } else if (player2Dodge) {
          player2Dodge = false;
          removeStatusIcon(7,2);
          splashThing = new SplashMessage(12);
        }
      } else if (whoseTurn == 2) {
        if (!player1Dodge) {
          player1Health -= 4;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (player2Charge) {
            player1Health -= 4;
            player2Charge = false;
            removeStatusIcon(6,2)
          }
        } else if (player1Dodge) {
          player1Dodge = false;
          removeStatusIcon(7,1);
          splashThing = new SplashMessage(12);
        }
      }
    }
  }
}

class SplitCardCard {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;    
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[3], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Split Card Into", 15, 203);
      optionCardGraphics[this.which].text("Two", 58, 225);
    }
    optionCardGraphics[this.which].fill(255);
    if (this.wild || overPlay){
    optionCardGraphics[this.which].image(wildIMG[2], 75, 125, 150, 250);
    optionCardGraphics[this.which].text("Split Card Into", 15, 195);
    optionCardGraphics[this.which].text("2 And Deal", 27, 217);
    optionCardGraphics[this.which].text("5 Damage", 31, 239);
    } 
    optionCardGraphics[this.which].text("Division", 40, 30);
  }
  use(tempCardScore, tempCardSuit, tempNewCardVariable) {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    //first it splits the tempcardscore and puts it into two local variables
    let splitCardScore = tempCardScore / 2;
    let splitCardScore2 = splitCardScore;
    //then to prevent odd numbers being split into 1.5, 2.5, etc... I add/subtract 0.1 to the value then round it. If the card number was even rounding 4.1 and 3.9 still equals four if it was odd rounding 2.6 and 2.4 go towards 3 and 2 ie spliting the card
    splitCardScore = round(splitCardScore + 0.1);
    splitCardScore2 = round(splitCardScore2 - 0.1);
    cardInDeckObjects[tempCardSuit].cardScore = splitCardScore;
    //the following is making the extra card with the new value.
    cardInDeckObjects.push(
      new BattleCard(500, 500, tempNewCardVariable));
    //the following is extra insurance that the suit and cardscore is the same as the original card.
    cardInDeckObjects[tempNewCardVariable - 1].suit = cardInDeckObjects[tempCardSuit].suit;
    cardInDeckObjects[tempNewCardVariable -1].cardScore = splitCardScore2
    //character bonuses if either new score is one
    if (splitCardScore2 == 1){
      characterBonus[2]++;
    }
    if (splitCardScore == 1){
      characterBonus[2]++;
    }
    if (overPlay || this.wild) {
      enemyHealth = enemyHealth - 5;
    }
  }
}

class HealCard {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;    
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[4], 75, 125, 150, 250);
      optionCardGraphics[this.which].image(cardBox, 119, 202, 15, 25);
      optionCardGraphics[this.which].text("Heal Half", 25, 212);
      optionCardGraphics[this.which].text("Health", 45, 234);
    }
    optionCardGraphics[this.which].fill(255);
    if (overPlay){
    optionCardGraphics[this.which].image(wildIMG[4], 75, 125, 150, 250);
    optionCardGraphics[this.which].text("+1 Free Guess", 15, 203);
      optionCardGraphics[this.which].fill(0);
      optionCardGraphics[this.which].text("Min:", 55, 115);
      optionCardGraphics[this.which].text("5", 72, 143);
    } 
    if (this.wild && !overPlay){
    optionCardGraphics[this.which].image(wildIMG[4], 75, 125, 150, 250);
      optionCardGraphics[this.which].image(cardBox, 68, 193, 15, 25);
    optionCardGraphics[this.which].text("Heal      Health", 15, 203);
    } 
    optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Physic", 45, 30);
  }
  use(tempCardScore) {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    heal.play();
    this.used = true;
    if (multiplayerSelect == 0) {
      //heal a rounded amount based off of tempcardscore divided by 2. (this does mean that it always rounds up)
      if (!overPlay && !this.wild) {
        playerHealth = round(playerHealth + tempCardScore/2);
      }
      //you can't heal in overplay so it becomes another free guess card. This is extra important as the witch can access this card whenever in Overplay while the other heal card is just always removed from an overplay board.
      if (overPlay) {
        freeGuess++;
      }
      //if the card is wild but not in overplay you heal the same amount as the battle card
      if (this.wild && !overPlay){
       playerHealth += tempCardScore; 
      }
    }
    if (multiplayerSelect == 3) {
      //multiplayer healing based on whose turn it is
      if (whoseTurn == 1) {
        player1Health = round(player1Health + tempCardScore/2);
      } else if (whoseTurn == 2) {
        player2Health = round(player2Health + tempCardScore/2);
      }
    }
    //the following is extra bit of code to remove a card from the witch's board. I explain how it works on the integrate card
    if (
      (playerCharacter == 5 && whoseTurn == 1) ||
      (player2Character == 5 && whoseTurn == 2)
    ) {
      for (let ko = 0; ko < optionCardAppearArray.length + 1; ko++) {
        if (optionCardAppearArray[ko] == 8) {
          optionCardBoard[ko] = 0;
          optionCardAppearArray[ko] = -1;
          witchCardNum -= 1;
          witchDeck[0] = false;
        }
      }
    }
  }
}

class KeepCardCard {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.wild = false;
    this.used = false;
    this.which = tempWhich;
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      //multiplayer version of this card has the same purpose but because the next turn is the other player it is rebranded.
      if (multiplayerSelect == 0){
      optionCardGraphics[this.which].image(oCardIMG[3], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Keep A Card", 22, 203);
      optionCardGraphics[this.which].text("Next Turn", 32, 225);
      optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Stash", 50, 30);
    }else{
      optionCardGraphics[this.which].image(oCardIMG[3], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Force Opponent", 7, 195);
      optionCardGraphics[this.which].text("To Have A Card", 12, 217);
      optionCardGraphics[this.which].text("Next Turn", 33, 239);
       optionCardGraphics[this.which].fill(255);
      optionCardGraphics[this.which].text("Sabotage", 33, 30);
    }
    }
    optionCardGraphics[this.which].fill(255);
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[3], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Keep A Card", 22, 203);
      optionCardGraphics[this.which].text("Next Turn", 32, 225); 
      optionCardGraphics[this.which].text("Stash", 50, 30);
    } 
     
  }
  use(tempCardScore, tempCardSuit, whichCard, whichOCard) {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    //keep a card tracks the cardscore, suit and which graphics it was in, Along with making the keepACard variable true.
    keepACardScore = tempCardScore;
    keepACardSuit = tempCardSuit;
    keepACard = true;
    keepACardID = [whichCard, whichOCard];
    //if the ten card is kept add to the bonus
    if (tempCardScore == 10){
      characterBonus[1]++;
    }
    //adds the lock image to the graphic
    optionCardGraphics[this.which].image(lock, 75, 125, 60, 60);
  }
}

class AddOneCard {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[3], 75, 125, 150, 250);
    }
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[3], 75, 125, 150, 250);
      optionCardGraphics[this.which].fill(255);
    } 
    optionCardGraphics[this.which].text("Add One To", 30, 203);
    optionCardGraphics[this.which].text("Card Value", 30, 225);
    optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Add One", 40, 30);
  }
  use(tempCardScore) {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    this.newScore = tempCardScore + 1;
    //If the ace's battle card goes over 10 it returns to one, but every other character simply caps the value at 10.
    if (
      (playerCharacter == 4 && whoseTurn == 1) ||
      (player2Character == 4 && whoseTurn == 2)
    ) {
      if (this.newScore > 10) {
        this.newScore = 1;
      }
    }
    if (this.newScore == 10){
      characterBonus[1]++;
    }
  }
}

class SubtractOneCard {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[3], 75, 125, 150, 250);
    }
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[3], 75, 125, 150, 250);
      optionCardGraphics[this.which].fill(255);
    } 
    optionCardGraphics[this.which].text("Subtract One", 19, 195);
    optionCardGraphics[this.which].text("From Card", 30, 217);
    optionCardGraphics[this.which].text("Value", 51, 239);
    optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Deduct One", 25, 30);
  }
  use(tempCardScore) {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    this.newScore = tempCardScore - 1;
    //If the ace's battle card goes over 10 it returns to one, but every other character simply caps the value at 10.
    if (
      (playerCharacter == 4 && whoseTurn == 1) ||
      (player2Character == 4 && whoseTurn == 2)
    ) {
      if (this.newScore < 1) {
        this.newScore = 10;
      }
    }
    //also even though as the ace this card can give a 10 there is no point in adding the character bonus because only the king gets a score bonus for gaining 10s
    if (this.newScore == 1){
      characterBonus[2]++;
    }
  }
}

class GetTenCard {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;     
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[3], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Need:", 50, 115);
     optionCardGraphics[this.which].text(tenCardNeeded[0], 72, 143);
    }
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[3], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Need:", 50, 115);
     optionCardGraphics[this.which].text(tenCardNeeded[0], 72, 143);
      optionCardGraphics[this.which].fill(255);
    } 
    optionCardGraphics[this.which].text("Get 10 Card", 30, 203);
    optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Counterfeit", 25, 30);
  }
  use() {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    //this option card's mechanics is entirely in dthe sketch.js file so the only thing needed to be achieved here is to add the character bonus.
    characterBonus[1]++;
  }
}

class HealThreeCard {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.wild = false;
    this.used = false;
    this.which = tempWhich;    
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[4], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Heal 3 Health", 20, 195);
      optionCardGraphics[this.which].text("If > 4 Gain", 32, 217);
      optionCardGraphics[this.which].text("Regen Buff", 27, 239);
    }
    optionCardGraphics[this.which].fill(255);
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[4], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Heal 7 Health", 13, 203);
      optionCardGraphics[this.which].text("Gain Regen Buff", 8, 225);
    } 
    optionCardGraphics[this.which].text("Mend", 49, 30);
  }
  use(tempCardScore) {
    mainScore[0] += 50;
    numOfOCard++;
    heal.play();
    this.used = true;
    if (multiplayerSelect == 0) {
      if (!overPlay && !this.wild) {
        //heal 3 health
        playerHealth = playerHealth + 3;
        //if card value over 4 grant regen
        if (tempCardScore > 4) {
          if (!regenStat[1]) {
            addStatusIcon(5, -1);
          }
          regenStat[1] = true;
        }
      }
      if (overPlay || this.wild) {
        //if overplay or wild card heal 7 hp and always grant regen (noted this option card actually never appears in overplay as it is a healing card)
        playerHealth = playerHealth + 7;
        if (!regenStat[1]) {
          addStatusIcon(5, -1);
        }
        regenStat[1] = true;
      }
    }
    if (multiplayerSelect == 3) {
      //check whoseTurn it is 
      if (whoseTurn == 1) {
        //if card value > 4 cast regen
        if (tempCardScore > 4) {
          if (!regenStat[1]) {
            addStatusIcon(5, 1);
          }
          regenStat[1] = true;
        }
        player1Health = player1Health + 3;
      } else if (whoseTurn == 2) {
        //if card value > 4 cast regen
        if (tempCardScore > 4) {
          if (!regenStat[2]) {
            addStatusIcon(5, 2);
          }
          regenStat[2] = true;
        }
        player2Health = player2Health + 3;
      }
    }
  }
}

class NeedOddDamage {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;    
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[2], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Deal 5 Damage", 10, 195);
      optionCardGraphics[this.which].text("If = 7 Deal 9 &", 18, 217);
      optionCardGraphics[this.which].text("Inflict Weak", 22, 239);
    }
    if (this.wild || overPlay){
    optionCardGraphics[this.which].image(wildIMG[2], 75, 125, 150, 250);
      optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Deal 9 Damage", 10, 195);
    optionCardGraphics[this.which].text("& Inflict Weak", 15, 217);
    optionCardGraphics[this.which].text("If = 7 Deal 13", 30, 239);
    } 
    optionCardGraphics[this.which].fill(0);
    optionCardGraphics[this.which].text("Need:", 50, 115);
    optionCardGraphics[this.which].text("Odd", 57, 143);
    optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Whopper", 35, 30);
  }
  use(tempCardScore) {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    //first it checks if the card valye is equal to 7
    if (tempCardScore == 7) {
      //check if singleplayer
      if (multiplayerSelect == 0) {
        //if not overplay deal 9 damage and check if player is charged
        if (!overPlay && !this.wild) {
          enemyHealth = enemyHealth - 9;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            enemyHealth = enemyHealth - 9;
            playerCharge = false;
            removeStatusIcon(6, -1);
          }
        }
        //if overplay and card score is equal to 7 deal 13 damage
        if (overPlay || this.wild) {
          enemyHealth = enemyHealth - 13;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            enemyHealth = enemyHealth - 13;
            playerCharge = false;
            removeStatusIcon(6, -1);
          }
        }
        //if enemy isn't weaken cast weaken on them
        if (!weakenStat[0]) {
          addStatusIcon(2,0);
        }
        weakenStat[0] = true;
      }
      if (multiplayerSelect == 3) {
        //multiplayer and card score = 7
        if (whoseTurn == 1) {
          //check whose turn and if the player beign damaged is dodging
          if (!player2Dodge) {
            //deal damage and check for charge
            player2Health -= 9;
            //every attacking card does double damage and removes the status icon if powercharge is active
            if (playerCharge) {
              player2Health -= 9;
              playerCharge = false;
              removeStatusIcon(6, 1);
            }
            //weaken the other player if they aren't weaken
            if (!weakenStat[2]) {
              addStatusIcon(2,2);
            }
            weakenStat[2] = true;
          } else if (player2Dodge) {
            //if the player dodged that attack undo it and remove the status icon
            player2Dodge = false;
            removeStatusIcon(7,2);
            splashThing = new SplashMessage(12);
          }
        } else if (whoseTurn == 2) {
          //same as above for player 2's turn
          if (!player1Dodge) {
            player1Health -= 9;
            //every attacking card does double damage and removes the status icon if powercharge is active
            if (player2Charge) {
              player1Health -= 9;
              player2Charge = false;
              removeStatusIcon(6,2);
            }
            if (!weakenStat[1]) {
              addStatusIcon(2,1);
            }
            weakenStat[1] = true;
          } else if (player1Dodge) {
            player1Dodge = false;
            removeStatusIcon(7,1);
            splashThing = new SplashMessage(12);
          }
        }
      }
    } else {
      //the following is if card score isn't equal to 7
      if (multiplayerSelect == 0) {
        //if wild/overplay deal 5 damage
        if (!overPlay && !this.wild) {
          enemyHealth = enemyHealth - 5;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            enemyHealth = enemyHealth - 5;
            playerCharge = false;
            removeStatusIcon(6, -1);
          }
        }
        //if overplay deal 9 damage and weaken enemy
        if (overPlay || this.wild) {
          enemyHealth = enemyHealth - 9;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            enemyHealth = enemyHealth - 9;
            playerCharge = false;
            removeStatusIcon(6, -1);
          }
          if (!weakenStat[0]) {
            addStatusIcon(2,0);
          }
          weakenStat[0] = true;
        }
      }
      if (multiplayerSelect == 3) {
        //multiplayer checks whose turn it is and see if the other player is dodging or if the current player is charged
        if (whoseTurn == 1) {
          if (!player2Dodge) {
            player2Health -= 5;
            //every attacking card does double damage and removes the status icon if powercharge is active
            if (playerCharge) {
              player2Health -= 5;
              playerCharge = false;
              removeStatusIcon(6, 1);
            }
          } else if (player2Dodge) {
            player2Dodge = false;
            removeStatusIcon(7, 2);
            splashThing = new SplashMessage(12);
          }
        } else if (whoseTurn == 2) {
          if (!player1Dodge) {
            player1Health -= 5;
            //every attacking card does double damage and removes the status icon if powercharge is active
            if (player2Charge) {
              player1Health -= 5;
              player2Charge = false;
              removeStatusIcon(6, 2);
            }
          } else if (player1Dodge) {
            player1Dodge = false;
            removeStatusIcon(7, 1);
            splashThing = new SplashMessage(12);
          }
        }
      }
    }
  }
}

class NeedEvenDamage {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[2], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Deal 6 Damage", 11, 195);
      optionCardGraphics[this.which].text("If = 8 Deal 10 &", 15, 217);
      optionCardGraphics[this.which].text("Inflict Poison", 16, 239);
    }
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[2], 75, 125, 150, 250);
      optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Deal 10 Damage", 7, 195);
    optionCardGraphics[this.which].text("& Inflict Poison", 8, 217);
    optionCardGraphics[this.which].text("If = 8 Deal 14", 20, 239);
    } 
    optionCardGraphics[this.which].fill(0);
    optionCardGraphics[this.which].text("Need:", 50, 115);
    optionCardGraphics[this.which].text("Even", 55, 143);
    optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Venostrike", 27, 30);
  }
  use(tempCardScore) {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    if (tempCardScore == 8) {
      //if card score is equal to 8
      if (multiplayerSelect == 0) {
        //if singleplayer and not wild/overplay deal 10 damage
        if (!overPlay && !this.wild) {
          enemyHealth = enemyHealth - 10;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            enemyHealth = enemyHealth - 10;
            playerCharge = false;
            removeStatusIcon(6, -1);
          }
        }
        //if overplay/wild deal 14 damage
        if (overPlay || this.wild) {
          enemyHealth = enemyHealth - 14;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            enemyHealth = enemyHealth - 14;
            playerCharge = false;
            removeStatusIcon(6, -1);
          }
        }
        //poison enemy if they aren't already
        if (!poisonStat[0]) {
          addStatusIcon(1,0);
        }
        poisonStat[0] = true;
      }
      if (multiplayerSelect == 3) {
        //check whose turn it is in multiplayer mode. deal 10 damage and posion other player if the other player isn't dodging
        if (whoseTurn == 1) {
          if (!player2Dodge) {
            player2Health -= 10;
            //every attacking card does double damage and removes the status icon if powercharge is active
            if (playerCharge) {
              player2Health -= 10;
              playerCharge = false;
              removeStatusIcon(6, 1);
            }
            if (!poisonStat[2]) {
              addStatusIcon(1,2);
            }
            poisonStat[2] = true;
          } else if (player2Dodge) {
            player2Dodge = false;
            removeStatusIcon(7, 2);
            splashThing = new SplashMessage(12);
          }
        } else if (whoseTurn == 2) {
          if (!player1Dodge) {
            player1Health -= 10;
            //every attacking card does double damage and removes the status icon if powercharge is active
            if (player2Charge) {
              player1Health -= 10;
              player2Charge = false;
              removeStatusIcon(6,2)
            }
            if (!poisonStat[1]) {
              addStatusIcon(1,1);
            }
            poisonStat[1] = true;
          } else if (player1Dodge) {
          player1Dodge = false;
          removeStatusIcon(7, 1);
          splashThing = new SplashMessage(12);
        }
        } 
      }
    } else {
      //if card score isn't 8
      if (multiplayerSelect == 0) {
        //deal 6 damage if not wild
        if (!overPlay && !this.wild) {
          enemyHealth -= 6;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            enemyHealth -= 6;
            playerCharge = false;
            removeStatusIcon(6, -1);
          }
        }
        //deal 10 damage if wild along with poisoning 
        if (overPlay || this.wild) {
          enemyHealth -= 10;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            enemyHealth -= 10;
            playerCharge = false;
            removeStatusIcon(6, -1);
          }
          if (!poisonStat[0]) {
            addStatusIcon(1,0);
          }
          poisonStat[0] = true;
        }
      }
      if (multiplayerSelect == 3) {
        //multiplayer checks whose turn it is and see if the other player is dodging or if the current player is charged
        if (whoseTurn == 1) {
          if (!player2Dodge) {
            player2Health -= 6;
            //every attacking card does double damage and removes the status icon if powercharge is active
            if (playerCharge) {
              player2Health -= 6;
              playerCharge = false;
              removeStatusIcon(6, 1);
            }
          } else if (player2Dodge) {
            player2Dodge = false;
            removeStatusIcon(7, 2);
            splashThing = new SplashMessage(12);
          }
        } else if (whoseTurn == 2) {
          if (!player1Dodge) {
            player1Health -= 6;
            //every attacking card does double damage and removes the status icon if powercharge is active
            if (player2Charge) {
              player1Health -= 6;
              player2Charge = false;
              removeStatusIcon(6, 2);
            }
          } else if (player1Dodge) {
            player1Dodge = false;
            removeStatusIcon(7, 1);
            splashThing = new SplashMessage(12);
          }
        }
      }
    }
  }
}

class DealDoubleDamage {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[2], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Deal Double", 25, 203);
      optionCardGraphics[this.which].text("Damage", 45, 225);
    }
    if (this.wild || overPlay){
      optionCardGraphics[this.which].fill(255);
      optionCardGraphics[this.which].image(wildIMG[2], 75, 125, 150, 250);
    optionCardGraphics[this.which].text("Deal Triple", 29, 203);
    optionCardGraphics[this.which].text("Damage", 45, 225);
    } 
    optionCardGraphics[this.which].fill(0);
    optionCardGraphics[this.which].text("Max:", 55, 115);
    optionCardGraphics[this.which].text("3", 72, 143);
    optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Duplex", 45, 30);
  }
  use(tempCardScore) {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    if (multiplayerSelect == 0) {
      //checks for wild or overplay
      if (!overPlay && !this.wild) {
        //deal twice card value damage if charged do it twice and remove charge icon
        enemyHealth = enemyHealth - tempCardScore * 2;
        if (playerCharge) {
          enemyHealth = enemyHealth - tempCardScore * 2;
          playerCharge = false;
          removeStatusIcon(6, -1);
        }
      }
      if (overPlay || this.wild) {
        //if overplay/wild deal triple card value damage
        enemyHealth = enemyHealth - tempCardScore * 3;
        //every attacking card does double damage and removes the status icon if powercharge is active
        if (playerCharge) {
          enemyHealth = enemyHealth - tempCardScore * 3;
          playerCharge = false;
          removeStatusIcon(6, -1);
        }
      }
    }
    if (multiplayerSelect == 3) {
      //multiplayer acts same as single player but it checks for whose turn it is to decide who to damage. It also checks if the player to damage has dodge or not.
      if (whoseTurn == 1) {
        if (!player2Dodge) {
          player2Health = player2Health - tempCardScore * 2;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            player2Health = player2Health - tempCardScore * 2;
            removeStatusIcon(6, 1);
            playerCharge = false;
          }
        } else if (player2Dodge) {
          player2Dodge = false;
          removeStatusIcon(7, 2);
          splashThing = new SplashMessage(12);
        }
      } else if (whoseTurn == 2) {
        if (!player1Dodge) {
          player1Health = player1Health - tempCardScore * 2;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            player1Health = player1Health - tempCardScore * 2;
            removeStatusIcon(6, 2);
            player2Charge = false;
          }
        } else if (player1Dodge) {
          player1Dodge = false;
          removeStatusIcon(4, 1);
          splashThing = new SplashMessage(12);
        }
      }
    }
  }
}

class AceSpecialAttack {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;
  }
  show() {
    fill(0);
    //the show function writes text for the 3 option cards that need their text to be updated in battle
    //if the player isn't choosing the ace value then aceChosenValue stores which number they picked
    if (!playerPickAceValue){
      //for ocd the text is different if it equals 10
        if (aceChosenValue < 10) {
          //if aceChosenValue is equal to 1 then make it say ace cuz it looks better
          if (aceChosenValue == 1){
            text("Ace", this.x - 14, this.y + 18);
          }else{
      text(aceChosenValue, this.x - 3, this.y + 18);
          }
    }
    if (aceChosenValue == 10) {
      text(aceChosenValue, this.x - 8, this.y + 18);
    }
      }else{
        //if the player is currently picking the ace card value make the text equal to whatever card they are hovering over (which is stored in getAceValue[1])
        if (getAceValue[1] < 10) {
          if (getAceValue[1] == 1){
            text("Ace", this.x - 14, this.y + 18);
          }else{
      text(getAceValue[1], this.x - 3, this.y + 18);
          }
    }
    if (getAceValue[1] == 10) {
      text(getAceValue[1], this.x - 8, this.y + 18);
    }
      }
  }
  create(){
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[0], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Deal 8 Damage", 11, 203);
      optionCardGraphics[this.which].text("(Reusable)", 25, 225);
    }
    if (this.wild || overPlay){
      optionCardGraphics[this.which].fill(255);
      optionCardGraphics[this.which].image(wildIMG[0], 75, 125, 150, 250);
    optionCardGraphics[this.which].text("Deal 15 Damage", 8, 203);
    optionCardGraphics[this.which].text("(Reusable)", 25, 225);
    } 
    optionCardGraphics[this.which].fill(0);
    optionCardGraphics[this.which].text("Need:", 50, 115);
    optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Ace Shot", 38, 30);
  }
  use() {
    mainScore[0] += 50;
    numOfOCard++;
    characterBonus[4]++;
    //single player damage - checks for wild or over play if not do 8 damage then check for power charge if yes deal an extra 8 damage and remove status. if overplay or wild deal 15 damage not 8
    if (multiplayerSelect == 0) {
      if (!overPlay && !this.wild) {
        enemyHealth = enemyHealth - 8;
        if (playerCharge) {
          enemyHealth = enemyHealth - 8;
          playerCharge = false;
          removeStatusIcon(6, -1);
        }
      }
      if (overPlay || this.wild) {
        enemyHealth = enemyHealth - 15;
        //every attacking card does double damage and removes the status icon if powercharge is active
        if (playerCharge) {
          enemyHealth = enemyHealth - 15;
          playerCharge = false;
          removeStatusIcon(6, -1);
        }
      }
    }
    //multiplayer damage check whose turn it is then look if the other player is dodging if yes then remove that dodge if no then damage the other player. check if player is charged if yes remove status and do extra damage.
    if (multiplayerSelect == 3) {
      if (whoseTurn == 1) {
        if (!player2Dodge) {
          player2Health = player2Health - 8;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            player2Health -= 8;
            removeStatusIcon(6, 1);
            playerCharge = false;
          }
        } else if (player2Dodge) {
          player2Dodge = false;
          removeStatusIcon(7, 2);
          splashThing = new SplashMessage(12);
        }
      } else if (whoseTurn == 2) {
        if (!player1Dodge) {
          player1Health = player1Health - 8;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (player2Charge) {
            player1Health -= 8;
            removeStatusIcon(6, 2);
            player2Charge = false;
          }
        } else if (player1Dodge) {
          player1Dodge = false;
          removeStatusIcon(7, 1);
          splashThing = new SplashMessage(12);
        }
      }
    }
  }
}

class MultiplyCard {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;    
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[3], 75, 125, 150, 250);
    }
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[3], 75, 125, 150, 250);
      optionCardGraphics[this.which].fill(255);
    } 
    optionCardGraphics[this.which].text("Double Card", 21, 203);
    optionCardGraphics[this.which].text("Value", 49, 225);
    optionCardGraphics[this.which].fill(0);
    optionCardGraphics[this.which].text("Max:", 55, 115);
    optionCardGraphics[this.which].text("5", 72, 143);
    optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Twofold", 42, 30);
  }
  use() {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
  }
}

class PowerCharge {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;   
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[4], 75, 125, 150, 250); 
    }
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[4], 75, 125, 150, 250);
      optionCardGraphics[this.which].fill(255);
    } 
    optionCardGraphics[this.which].text("Next Attack ", 25, 195);
      optionCardGraphics[this.which].text("Deals Double", 20, 217);
      optionCardGraphics[this.which].text("Damage", 45, 239); 
    optionCardGraphics[this.which].fill(0);
    optionCardGraphics[this.which].text("Need:", 50, 115);
      optionCardGraphics[this.which].text("9 Or 10", 46, 143);
    optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Crescendo", 30, 30);
  }
  use() {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    //in single player grant power charge to player if multiplayer check which turn it is then give them charge.
    if (multiplayerSelect == 0) {
      if (!playerCharge) {
        addStatusIcon(6, -1);
      }
      playerCharge = true;
    }
    if (multiplayerSelect == 3) {
      if (whoseTurn == 1) {
        if (!playerCharge) {
          addStatusIcon(6, 1);
        }
        playerCharge = true;
      } else if (whoseTurn == 2) {
        if (!player2Charge) {
          addStatusIcon(6,2);
        }
        player2Charge = true;
      }
    }
  }
}

class WeakenSelf {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[2], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Deal 2 Damage", 11, 195);
      optionCardGraphics[this.which].text("If = 1 Inflict", 30, 217);
      optionCardGraphics[this.which].text("Weak On Self", 20, 239);
    }
    optionCardGraphics[this.which].fill(255);
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[2], 75, 125, 150, 250);
    optionCardGraphics[this.which].text("Deal 6 Damage", 11, 195);
    optionCardGraphics[this.which].text("& Inflict Weak", 15, 217);
    optionCardGraphics[this.which].text("On Self", 40, 239);
    } 
    optionCardGraphics[this.which].text("Gambit", 43, 30);
  }
  use(tempCardScore) {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    if (multiplayerSelect == 0) {
      //single player - check for overplay or wild. if card score == 1 then grant weakness. deal 2 damage if charged deal 2 more damage and remove charge.
      if (!overPlay && !this.wild) {
        if (tempCardScore == 1) {
          if (!weakenStat[1]) {
            addStatusIcon(2, -1);
          }
          weakenStat[1] = true;
        }
        enemyHealth -= 2;
        //every attacking card does double damage and removes the status icon if powercharge is active
        if (playerCharge) {
          enemyHealth -= 2;
          playerCharge = false;
          removeStatusIcon(6, -1);
        }
      }
      //wild / overplay always grants weakness and deals 6 damage
      if (overPlay || this.wild) {
        if (!weakenStat[1]) {
          addStatusIcon(2, -1);
        }
        weakenStat[1] = true;
        enemyHealth -= 6;
        //every attacking card does double damage and removes the status icon if powercharge is active
        if (playerCharge) {
          enemyHealth -= 6;
          playerCharge = false;
          removeStatusIcon(6, -1);
        }
      }
    }
    //multiplayer check whose turn and check for card score = 1 because 
    if (multiplayerSelect == 3) {
      if (whoseTurn == 1) {
        if (tempCardScore == 1) {
          if (!weakenStat[1]){
            addStatusIcon(2, 1);
          }
          weakenStat[1] = true;
        }
        if (!player2Dodge) {
          player2Health -= 2;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            player2Health -= 2;
            removeStatusIcon(6, 1);
            playerCharge = false;
          }
        } else if (player2Dodge) {
          player2Dodge = false;
          removeStatusIcon(7, 2);
          splashThing = new SplashMessage(12);
        }
      } else if (whoseTurn == 2) {
        if (tempCardScore == 1) {
          if (!weakenStat[2]){
            addStatusIcon(2, 2);
          }
          weakenStat[2] = true;
        }
        if (!player1Dodge) {
          player1Health -= 2;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (player2Charge) {
            player1Health -= 2;
            removeStatusIcon(6, 2);
            player2Charge = false;
          }
        } else if (player1Dodge) {
          player1Dodge = false;
          removeStatusIcon(7, 1);
          splashThing = new SplashMessage(12);
        }
      }
    }
  }
}

class EnemyRandomStatus {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.uses = 0;
    this.which = tempWhich;
  }
  show() {
    fill(0);
    //the show function is used because this card updates text in the middle of battle so this changes the text.
    if (this.uses == 0){
    text("Pair", this.x - 20, this.y + 18);
    }else{
      if (kalV == 1){
        //looks better if it says ace instead of 1 so i added it
        text("Ace", this.x - 14, this.y + 18);
      }else{
      text(kalV, this.x - 3, this.y + 18);
      }
    }
  }
  create(){
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[2], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Inflict Random", 11, 195);
      optionCardGraphics[this.which].text("Status On", 31, 217);
      optionCardGraphics[this.which].text("Enemy", 45, 239);
      optionCardGraphics[this.which].text("Need:", 50, 115);
    }
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[2], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Need:", 50, 115);
      optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Inflict Random", 11, 195);
    optionCardGraphics[this.which].text("Status On", 31, 217);
    optionCardGraphics[this.which].text("Enemy", 45, 239);
    } 
    optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Syringe", 41, 30);
  }
  use(tempCardScore) {
    //doubletext[3] says how many cards are in play that need doubletext so when this card is used up it subtracts from doubleText[3] saying there is one less doubleText card in the game. (doubleText is what signifies using the show function btw). doubleText[1] show which card slot this option card is in so turning it to -1 signifies it is no longer in use.
    doubleText[3]--;
    doubleText[1] = -1;
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    if (multiplayerSelect == 0) {
      //check for overplay or wild
      if (!overPlay && !this.wild) {
        for (let x = 0; x < 10; x++) {
          //o is the variable for which random status is applied. it is in a for loop in case the enemy is already inflicted with the status that is applied so it can redraw for another status. I don't use a while loop incase the enemy is inflicted with all status which would cause a forever loop.
          let o = int(random(5));
          if (o == 0) {
            if (!poisonStat[0]) {
              poisonStat[0] = true;
              addStatusIcon(1, 0);
              //x = 10 stops the for loop by signifying that a status has sucessfully been applied.
              x = 10;
            }
          }
          if (o == 1) {
            if (!weakenStat[0]) {
              weakenStat[0] = true;
              addStatusIcon(2,0);
              x = 10;
            }
          }
          if (o == 2) {
            if (!freezeStat[0]) {
              freezeStat[0] = true;
              addStatusIcon(3,0);
              x = 10;
            }
          }
          if (o == 3) {
            if (!pickpocketStat[0]) {
              pickpocketStat[0] = true;
              addStatusIcon(4,0);
              x = 10;
            }
          }
        }
      }
    }
    //multiplayer does the exact same as singleplayer but for the other player depending on whose turn it is
    if (multiplayerSelect == 3) {
      if (whoseTurn == 1) {
        if (!player2Dodge) {
          for (let x = 0; x < 10; x++) {
            let o = int(random(5));
            if (o == 0) {
              if (!poisonStat[2]) {
                poisonStat[2] = true;
                addStatusIcon(1,2);
                x = 10;
              }
            }
            if (o == 1) {
              if (!weakenStat[2]) {
                weakenStat[2] = true;
                addStatusIcon(2,2);
                x = 10;
              }
            }
            if (o == 2) {
              if (!freezeStat[2]) {
                freezeStat[2] = true;
                addStatusIcon(3,2);
                x = 10;
              }
            }
            if (o == 3) {
              if (!pickpocketStat[2]) {
                pickpocketStat[2] = true;
                addStatusIcon(4,2);
                x = 10;
              }
            }
          }
        } else if (player2Dodge) {
          player2Dodge = false;
          removeStatusIcon(7,2);
          splashThing = new SplashMessage(12);
        }
      } else if (whoseTurn == 2) {
        if (!player1Dodge) {
          for (let x = 0; x < 10; x++) {
            let o = int(random(5));
            if (o == 0) {
              if (!poisonStat[1]) {
                poisonStat[1] = true;
                addStatusIcon(1,1);
                x = 10;
              }
            }
            if (o == 1) {
              if (!weakenStat[1]) {
                weakenStat[1] = true;
                addStatusIcon(2,1);
                x = 10;
              }
            }
            if (o == 2) {
              if (!freezeStat[1]) {
                freezeStat[1] = true;
                addStatusIcon(3,1)
                x = 10;
              }
            }
            if (o == 3) {
              if (!pickpocketStat[1]) {
                pickpocketStat[1] = true;
                addStatusIcon(4,1);
                x = 10;
              }
            }
          }
        } else if (player1Dodge) {
        player1Dodge = false;
        removeStatusIcon(7, 1);
          splashThing = new SplashMessage(12);
      }
      } 
    }
    //again the follwing block of code is for the witch and needing to remove the option card from her board. see integrate option card for more details
    if (
      (playerCharacter == 5 && whoseTurn == 1) ||
      (player2Character == 5 && whoseTurn == 2)
    ) {
      for (let ko = 0; ko < optionCardAppearArray.length + 1; ko++) {
        if (optionCardAppearArray[ko] == 21) {
          optionCardBoard[ko] = 0;
          optionCardAppearArray[ko] = -1;
          witchCardNum -= 1;
          witchDeck[1] = false;
        }
      }
    }
  }
}

class JackSpecialAttack {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[1], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Deal 5 Damage", 12, 195);
      optionCardGraphics[this.which].text("Per Status", 32, 217);
      optionCardGraphics[this.which].text("Effect", 48, 239);
    }
    optionCardGraphics[this.which].fill(255);
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[1], 75, 125, 150, 250);
    optionCardGraphics[this.which].text("Deal 8 Damage", 12, 195);
    optionCardGraphics[this.which].text("Per Status", 32, 217);
    optionCardGraphics[this.which].text("Effect", 48, 239);
    } 
    optionCardGraphics[this.which].text("Jack's Dose", 23, 30);
  }
  use(tempCardScore) {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    //this card is a pretty standard attakcing card except that it does 3 + (how many status are in play) * 5 damage. Note: numOfStatus[0] tracks status currently in battle, numOfStatus[1] tracks total status in battle which is used for characterbonus score;
    if (multiplayerSelect == 0) {
      if (!overPlay && !this.wild) {
        enemyHealth = enemyHealth - (3 + numOfStatus[0] * 5);
        //every attacking card does double damage and removes the status icon if powercharge is active
        if (playerCharge) {
          enemyHealth = enemyHealth - (3 + numOfStatus[0] * 5);
          playerCharge = false;
          removeStatusIcon(6, -1);
        }
      }
      if (overPlay || this.wild) {
        enemyHealth = enemyHealth - (7 + numOfStatus[0] * 8);
        //every attacking card does double damage and removes the status icon if powercharge is active
        if (playerCharge) {
          enemyHealth = enemyHealth - (7 + numOfStatus[0] * 8);
          playerCharge = false;
          removeStatusIcon(6, -1);
        }
      }
    }
    if (multiplayerSelect == 3) {
      if (whoseTurn == 1) {
        if (!player2Dodge) {
          player2Health = player2Health - (3 + numOfStatus[0] * 5);
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            player2Health = player2Health - (3 + numOfStatus[0] * 5);
            removeStatusIcon(6, 1);
            playerCharge = false;
          }
        } else if (player2Dodge) {
          player2Dodge = false;
          removeStatusIcon(7, 2);
          splashThing = new SplashMessage(12);
        }
      } else if (whoseTurn == 2) {
        if (!player1Dodge) {
          player1Health = player1Health - (3 + numOfStatus[0] * 5);
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (player2Charge) {
            player1Health = player1Health - (3 + numOfStatus[0] * 5);
            removeStatusIcon(6, 2);
            player2Charge = false;
          }
        }  else if (player1Dodge) {
        player1Dodge = false;
        removeStatusIcon(7, 1);
          splashThing = new SplashMessage(12);
      }
      } 
    }
  }
}

class WitchSpecialLeft {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.which = tempWhich;
  }
  use(tempCardScore, ID) {
    //all 10 card values have a corresponding witchDeck index. first this code checks if the corresponding witchDeck index if false. (witchDeck being false means the witch does not have that card, if it is true then it does.)
    //it also checks if witchCardNum is less than 3 which means she has 3 or less option cards (not including her book or integrate card)
    if ((!witchDeck[tempCardScore - 1] && witchCardNum < 3) ) {
      //if card value is 5 (which means the duplicate card) then check if the player already has an extra duplicated card. if they do check if that card is no longer in use (ie: .x === 2000). if it is no longer in use get rid of that card. if they have a nonused 6th battle card play error and reject the card
      if (tempCardScore == 5){
        if (cardInDeckObjects[5] != null){
          if (cardInDeckObjects[5].x == 2000){
            cardInDeckObjects.splice(5,1);
            removeBattleCard(ID);
          }else{
          defaultBattleCard(ID);
      error.play();
        }
        }else{
        removeBattleCard(ID);
        }
      }else{
        //if card isn't 5 then remove the battle card as this witch page has been successfully used
      removeBattleCard(ID);
      }
    } else {
      //if witchCardNum = 3 or witch already has that option card reject the battle card.
      defaultBattleCard(ID);
      error.play();
    }
    //witchDeckOpen marks the board slots that are open. as opposed to witchCardNum marks how many option cards are in play and witchDeck marking which card scores are being used.
    //witchDeckOpen starts off as all of them being true (meaning they are used) except for [0] and [1] which house the spell book and don't matter
    let witchDeckOpen = [0, 0, true, true, true, true];
      for (let ui = 2; ui < 6; ui++) {
        //then looking through the option card appear array which looks for -1. -1 in the option card appeary array means there is no option card currently. and if there is no card currently the witchDeck open is changed to be false meaning it is open
        if (optionCardAppearArray[ui] == -1) {
          witchDeckOpen[ui] = false;
        }
      }
    //the same happens for witchDeck as witchDeck open but since witchDeck means the card values it only goes through 0-5 as the left page deals with those card values.
      for (let j = 0; j < 5; j++) {
        witchDeck[j] = false;
      }
      for (let i = 0; i < 6; i++) {
        //this prevents duplicate cards by marking the witchDeck as true if the corresponding optionCard id is present in the optionCardAppearArray
        if (optionCardAppearArray[i] == 8) {
          witchDeck[0] = true;
        }
        if (optionCardAppearArray[i] == 21) {
          witchDeck[1] = true;
        }
        if (optionCardAppearArray[i] == 4) {
          witchDeck[2] = true;
        }
        if (optionCardAppearArray[i] == 2) {
          witchDeck[3] = true;
        }
        if (optionCardAppearArray[i] == 5) {
          witchDeck[4] = true;
        }
      }
    //now for actually creating the option card it checks for what the card value was, if the corresponding witchDeck was false (so if it is already in the board), and if witchDeckOpen[3-5] is open which means there is an open slot in the optionCardBoard 
      for (let iou = 3; iou < 6; iou++) {
        if (tempCardScore == 1 && !witchDeck[0] && !witchDeckOpen[iou]) {
          //witchCardMake function it sends which slot of the option card is open (iou), then which option card id should be made and which deck number should now be made true.
          witchCardMake(iou,8,0);
        }
        if (tempCardScore == 2 && !witchDeck[1] && !witchDeckOpen[iou]) {
          witchCardMake(iou,21,1);
        }
        if (tempCardScore == 3 && !witchDeck[2] && !witchDeckOpen[iou]) {
          witchCardMake(iou,4,2);
        }
        if (tempCardScore == 4 && !witchDeck[3] && !witchDeckOpen[2]) {
          //the cauldron option card or value = 4 is different as it only appears in the [2] optioncardBoard slot so it does the following.
          optionCardAppearArray[2] = 2;
          witchDeck[3] = true;
          mainScore[0] += 50;
          numOfOCard++;
          characterBonus[5]++;
        }
        if (tempCardScore == 5 && !witchDeck[4] && !witchDeckOpen[iou]) {
          //again duplicate card can only be made if there is not already an extra cad.
          if (cardInDeckObjects.length <= 5){
            witchCardMake(iou, 5, 4);
          }
        }
      }
    //creates new option cards
      optionCardSetup();
      //1-physic, 2-Syringe 3-roulette, 4-add, 5-duplicate, 6-whack, 7-hammer, 8-Block, 9-fireball, 10-reaction
  }
  create(){
  }
}

function witchCardMake(iou, cardID, deckNum){
  //creates the new option card
  optionCardAppearArray[iou] = cardID;
  //marks that said option card is now being used
  witchDeck[deckNum] = true;
  //increases how many cards are being used
  witchCardNum++;
  mainScore[0] += 50;
  numOfOCard++;
  //witch's character bonus is how many times she used her spell book.
  characterBonus[5]++;
}

class WitchSpecialRight {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.which = tempWhich;
  }
  use(tempCardScore, ID) {
    if (tutorial == 6) {
      tutorialText = 7;
    }
    //Jessica's right page is similar to the left page but less complicated
    //checks if witchDeck of said card value is open and if there are 3 or less option cards in her deck. if not reject card 
    if (!witchDeck[tempCardScore - 1] && witchCardNum < 3) {
      removeBattleCard(ID);
    } else {
      defaultBattleCard(ID);
      error.play();
    }
    //witchDeck open has the same use as her left page but it only checks [3-5] not [2-5] because her left page has the cauldron card which always occupies her [2] optioncard slot but her right page does not.
    let witchDeckOpen = [0, 0, true, true, true, true];
      for (let ui = 3; ui < 6; ui++) {
        if (optionCardAppearArray[ui] == -1) {
          witchDeckOpen[ui] = false;
        }
      }
    //witch deck operates the same as her left page but for different option card ids
      for (let j = 5; j < 10; j++) {
        witchDeck[j] = false;
      }
      for (let i = 0; i < 6; i++) {
        if (optionCardAppearArray[i] == 28) {
          witchDeck[5] = true;
        }
        if (optionCardAppearArray[i] == 27) {
          witchDeck[6] = true;
        }
        //in multiplayer the sentry card is instead a normal dodge card.
        if (multiplayerSelect == 0){
        if (optionCardAppearArray[i] == 26) {
          witchDeck[7] = true;
        }
        }else{
          if (optionCardAppearArray[i] == 3) {
          witchDeck[7] = true;
        }
        }
        if (optionCardAppearArray[i] == 29) {
          witchDeck[8] = true;
        }
        if (optionCardAppearArray[i] == 31) {
          witchDeck[9] = true;
        }
      }
    //the following is the same as the left page for making the cards except for the sentry card which checks if it is multplayer or not.
      for (let iou = 3; iou < 6; iou++) {
        if (tempCardScore == 6 && !witchDeck[5] && !witchDeckOpen[iou]) {
          witchCardMake(iou,28,5);
        }
        if (tempCardScore == 7 && !witchDeck[6] && !witchDeckOpen[iou]) {
          witchCardMake(iou,27,6);
        }
        if (multiplayerSelect == 0){
        if (tempCardScore == 8 && !witchDeck[7] && !witchDeckOpen[iou]) {
         witchCardMake(iou,26,7);
        }
        }
        if (multiplayerSelect == 3){
        if (tempCardScore == 8 && !witchDeck[7] && !witchDeckOpen[iou]) {
          witchCardMake(iou,3,7);
        }
        }
        if (tempCardScore == 9 && !witchDeck[8] && !witchDeckOpen[iou]) {
          witchCardMake(iou,29,8);
        }
        if (tempCardScore == 10 && !witchDeck[9] && !witchDeckOpen[iou]) {
          witchCardMake(iou,31,9);
        }
      }
    //creates new option cards
      optionCardSetup(); 
  }
  create(){
  }
}

class SubtractCard {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.uses = 0;
    this.which = tempWhich;    
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[3], 75, 125, 150, 250);
    }
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[3], 75, 125, 150, 250);
      optionCardGraphics[this.which].fill(255);
    } 
    optionCardGraphics[this.which].text("Combine Two", 18, 195);
    optionCardGraphics[this.which].text("Cards And", 30, 217);
    optionCardGraphics[this.which].text("Minus Values", 17, 239);
    optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Knock Off", 35, 30);
  }
  use(tempCardScore) {
    //subtractCardScore[0] marks first card value
    subtractCardScore[0] = tempCardScore;
    sparkle.play();
  }
  useAgain(tempCardScore2) {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    //subtractCardScore[1] the new card value
    subtractCardScore[1] = subtractCardScore[0] - tempCardScore2;
    //if player is ace and new card value is less than 1 then multiply by -1 for the new card value. this means order does not matter when you subtract. (as in 5 - 8 = 3 like how 8-5 = 3). I wanted it to be more like it reverses score (as in 5-8 = 7 because of the negative 3) but it is too hard to explain so this works better.
    if (subtractCardScore[1] < 1) {
      if (
        (playerCharacter == 4 && whoseTurn == 1) ||
        (player2Character == 4 && whoseTurn == 2)
      ) {
        subtractCardScore[1] = subtractCardScore[1] * -1;
        if (subtractCardScore[1] == 0) {
          subtractCardScore[1] = 1;
        }
      } else {
        //if player isn't ace and new score is less than one make it a one
        subtractCardScore[1] = 1;
      }
    }
    //queen character bonus
    if (subtractCardScore[1] == 1){
      characterBonus[2]++;
    }
  }
}

class BlockCard {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;    
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[4], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Block Greatest", 12, 195);
      optionCardGraphics[this.which].text("Dice, If = 8", 33, 217);
      optionCardGraphics[this.which].text("Block 2 Dice", 17, 239);
    }
    optionCardGraphics[this.which].fill(255);
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[4], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Block All Dice", 15, 203);
      optionCardGraphics[this.which].text("Next turn", 35, 225);
    } 
    optionCardGraphics[this.which].text("Sentry", 48, 30);
  }
  use(tempCardScore) {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    //if this card is used and character doesn't already have block activated then add the block status icon
    if (!dodgeGreatestAttack && dodgeNextAttack == 0 && !dodgeAllAttack){
      playerStatus.push(new StatusIcon(8, -1));
    }
    if (!overPlay && !this.wild) {
      //if card doesn't equal eight let them dodge greatest dice. (yes the block and dodge card use the same variable)
      if (tempCardScore != 8) {
        if (!dodgeGreatestAttack){
          numOfStatus[0]++;
        }
        dodgeGreatestAttack = true;
      }
      //if card score = 8 then increase dodgeNextAttack to 2 so they dodge 2 dice
      if (tempCardScore == 8) {
        if (dodgeNextAttack == 0){
          numOfStatus[0]++;
        }
        dodgeNextAttack = 2;
      }
    }
    if (overPlay || this.wild) {
      dodgeAllAttack = true;
      numOfStatus[0]++;
    }
    //witchdeck card removal system see: integrate card for more details
    if (
      (playerCharacter == 5 && whoseTurn == 1) ||
      (player2Character == 5 && whoseTurn == 2)
    ) {
      for (let ko = 0; ko < optionCardAppearArray.length + 1; ko++) {
        if (optionCardAppearArray[ko] == 26) {
          optionCardBoard[ko] = 0;
          optionCardAppearArray[ko] = -1;
          witchCardNum -= 1;
          witchDeck[7] = false;
        }
      }
    }
  }
}

class SevenDamage {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[2], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Deal 7 Damage", 7, 203);
      optionCardGraphics[this.which].text("If = 7 Deal 13", 18, 225);
    }
    optionCardGraphics[this.which].fill(255);
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[2], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Deal 14 Damage", 6, 203);
      optionCardGraphics[this.which].text("If = 7 Deal 30", 18, 225);
    } 
    optionCardGraphics[this.which].text("Hammer", 40, 30);
  }
  use(tempCardScore) {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    if (multiplayerSelect == 0) {
      //very standard attack card with a bonus extra damage if the card sccore = 7
      if (tempCardScore == 7) {
        if (!overPlay && !this.wild) {
          enemyHealth -= 13;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            enemyHealth -= 13;
            playerCharge = false;
            removeStatusIcon(6, -1);
          }
        }
        if (overPlay || this.wild) {
          enemyHealth -= 30;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            enemyHealth -= 30;
            playerCharge = false;
            removeStatusIcon(6, -1);
          }
        }
      } else {
        if (!overPlay && !this.wild) {
          enemyHealth -= 7;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            enemyHealth -= 7;
            playerCharge = false;
            removeStatusIcon(6, -1);
          }
        }
        if (overPlay || this.wild) {
          enemyHealth -= 14;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            enemyHealth -= 14;
            playerCharge = false;
            removeStatusIcon(6, -1);
          }
        }
      }
    }
    if (multiplayerSelect == 3) {
      //standard multiplayer attack card code.
      if (whoseTurn == 1) {
        if (!player2Dodge) {
          if (tempCardScore != 7){
          player2Health -= 7;
            //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            player2Health -= 7;
            removeStatusIcon(6, 1);
            player1Charge = false;
          }
          }else{
            player2Health -= 13;
            //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            player2Health -= 13;
            removeStatusIcon(6, 1);
            player1Charge = false;
          }
          }
        } else if (player2Dodge) {
          player2Dodge = false;
          removeStatusIcon(7, 2);
          splashThing = new SplashMessage(12);
        }
      } else if (whoseTurn == 2) {
        if (!player1Dodge) {
          if (tempCardScore != 7){
          player1Health -= 7;
            //every attacking card does double damage and removes the status icon if powercharge is active
          if (player2Charge) {
            player1Health -= 7;
            removeStatusIcon(6, 2);
            player2Charge = false;
          }
          }else{
            player1Health -= 13;
            //every attacking card does double damage and removes the status icon if powercharge is active
          if (player2Charge) {
            player1Health -= 13;
            removeStatusIcon(6, 2);
            player2Charge = false;
          }
          }
        } else if (player1Dodge) {
          player1Dodge = false;
          removeStatusIcon(7, 1);
          splashThing = new SplashMessage(12);
        }
      }
    }
  //witchdeck card removal system see: integrate card for more details
    if (
      (playerCharacter == 5 && whoseTurn == 1) ||
      (player2Character == 5 && whoseTurn == 2)
    ) {
      for (let ko = 0; ko < optionCardAppearArray.length + 1; ko++) {
        if (optionCardAppearArray[ko] == 27) {
          optionCardBoard[ko] = 0;
          optionCardAppearArray[ko] = -1;
          witchCardNum -= 1;
          witchDeck[6] = false;
        }
      }
    }
  }
}

class TenDamage {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[2], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Deal 10 Damage", 7, 203);
      optionCardGraphics[this.which].text("Min:", 55, 115);
      optionCardGraphics[this.which].text("6", 72, 143);
    }
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[2], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Min:", 55, 115);
      optionCardGraphics[this.which].text("6", 72, 143);
      optionCardGraphics[this.which].fill(255);
      optionCardGraphics[this.which].text("Deal 25 Damage", 6, 203);
    } 
    optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Whack", 44, 30);
  }
  use(tempCardScore) {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    //extremely standard attack card withboth singleplayer and multiplayer functionality
    if (multiplayerSelect == 0) {
      if (!overPlay && !this.wild) {
        enemyHealth -= 10;
        //every attacking card does double damage and removes the status icon if powercharge is active
        if (playerCharge) {
          removeStatusIcon(6, -1);
          enemyHealth -= 10;
          playerCharge = false;
        }
      }
      if (overPlay || this.wild) {
        enemyHealth -= 25;
        //every attacking card does double damage and removes the status icon if powercharge is active
        if (playerCharge) {
          enemyHealth -= 25;
          playerCharge = false;
          removeStatusIcon(6, -1);
        }
      }
    }
    if (multiplayerSelect == 3) {
      if (whoseTurn == 1) {
        if (!player2Dodge) {
          player2Health -= 10;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            player2Health -= 10;
            removeStatusIcon(6, 1);
            playerCharge = false;
          }
        }else if (player2Dodge){
          player2Dodge = false;
          removeStatusIcon(7, 2);
          splashThing = new SplashMessage(12);
        }
      } else if (whoseTurn == 2) {
        if (!player1Dodge) {
          player1Health -= 10;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (player2Charge) {
            player1Health -= 10;
            removeStatusIcon(6, 2);
            player2Charge = false;
          }
        } else if (player1Dodge) {
          player1Dodge = false;
          removeStatusIcon(7, 1);
          splashThing = new SplashMessage(12);
        }
      }
    }
    //witchdeck card removal system see: integrate card for more details
    if (
      (playerCharacter == 5 && whoseTurn == 1) ||
      (player2Character == 5 && whoseTurn == 2)
    ) {
      for (let ko = 0; ko < optionCardAppearArray.length + 1; ko++) {
        if (optionCardAppearArray[ko] == 28) {
          optionCardBoard[ko] = 0;
          optionCardAppearArray[ko] = -1;
          witchCardNum -= 1;
          witchDeck[5] = false;
        }
      }
    }
  }
}

class DoubleDamage {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[2], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Deal Double ", 8, 217);
      optionCardGraphics[this.which].text("Damage", 40, 239);
      optionCardGraphics[this.which].image(cardBox,  125, 207, 15, 25);
    }
    optionCardGraphics[this.which].fill(255);
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[2], 75, 125, 150, 250);
      optionCardGraphics[this.which].image(cardBox, 125, 192, 15, 25);
      optionCardGraphics[this.which].text("Deal Triple", 15, 203);
      optionCardGraphics[this.which].text("Damage", 40, 225);
    }  
    optionCardGraphics[this.which].text("Fire Ball", 40, 30);
  }
  use(tempCardScore) {
    mainScore[0] += 50;
    numOfOCard++;
    this.used = true;
    //very standard attacking card but it does twice or triple the amount of the card value (same as the king's law but i didn't make them one card reskinned cuz I want joker to have both in a battle)
    if (multiplayerSelect == 0) {
      if (overPlay || this.wild) {
        enemyHealth -= tempCardScore * 3;
        //every attacking card does double damage and removes the status icon if powercharge is active
        if (playerCharge) {
          enemyHealth -= tempCardScore * 3;
          playerCharge = false;
          removeStatusIcon(6, -1);
        }
      }
      if (!overPlay && !this.wild) {
        enemyHealth -= tempCardScore * 2;
        //every attacking card does double damage and removes the status icon if powercharge is active
        if (playerCharge) {
          enemyHealth -= tempCardScore * 2;
          playerCharge = false;
          removeStatusIcon(6, -1);
        }
      }
    }
    if (multiplayerSelect == 3) {
      if (whoseTurn == 1) {
        if (!player2Dodge) {
          player2Health = player2Health - tempCardScore * 2;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            player2Health = player2Health - tempCardScore * 2;
            removeStatusIcon(6, 1);
            playerCharge = false;
          }
        } else if (player2Dodge) {
          player2Dodge = false;
          removeStatusIcon(7, 2);
          splashThing = new SplashMessage(12);
        }
      } else if (whoseTurn == 2) {
        if (!player1Dodge) {
          player1Health = player1Health - tempCardScore * 2;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (player2Charge) {
            player1Health = player1Health - tempCardScore * 2;
            removeStatusIcon(6, 2);
            player2Charge = false;
          }
        } else if (player1Dodge) {
          player1Dodge = false;
          removeStatusIcon(7, 1);
          splashThing = new SplashMessage(12);
        }
      }
    }
    //witchdeck card removal system see: integrate card for more details
    if (
      (playerCharacter == 5 && whoseTurn == 1) ||
      (player2Character == 5 && whoseTurn == 2)
    ) {
      for (let ko = 0; ko < optionCardAppearArray.length + 1; ko++) {
        if (optionCardAppearArray[ko] == 29) {
          optionCardBoard[ko] = 0;
          optionCardAppearArray[ko] = -1;
          witchCardNum -= 1;
          witchDeck[8] = false;
        }
      }
    }
  }
}

class GetAceCard {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.wild = false;
    this.used = false;
    this.which = tempWhich;
  }
  show() {
    fill(0);
    if (getAceValue[0] == 1){
      text("Ace", this.x - 14, this.y + 18);
    }else{
    text(getAceValue[0], this.x - 3, this.y + 18);
    }
    if (this.wild || overPlay){
      fill(255);
    }
    //Magazine card has text that changes in battle so the show function exists
    if (!playerPickAceValue){
        text(aceChosenValue, this.x - 11, this.y + 70);
      
      }else{
        text(getAceValue[1], this.x - 11, this.y + 70);
      }
  }
  create(){
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[2], 75, 125, 150, 250);
       optionCardGraphics[this.which].text("Deal 5 Damage", 11, 217);
    
    }
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[2], 75, 125, 150, 250);
      optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Deal 10 Damage", 11, 217);
    }   
    optionCardGraphics[this.which].text("Get     Card", 30, 195);
    optionCardGraphics[this.which].text("(Reusable)", 25, 239);
    optionCardGraphics[this.which].fill(0);
    optionCardGraphics[this.which].text("Need:", 50, 115);
    optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Magazine", 35, 30);
  }
  use() {
    mainScore[0] += 50;
    numOfOCard++;
    //standard attacking card, the only special thing about this option card is the fact that it returns a new battle card value but that code block is present in the sketch.js file.
    if (multiplayerSelect == 0) {
      if (overPlay || this.wild) {
        enemyHealth -= 10;
        //every attacking card does double damage and removes the status icon if powercharge is active
        if (playerCharge) {
          enemyHealth -= 10;
          playerCharge = false;
          removeStatusIcon(6, -1);
        }
      }
      if (!this.wild && !overPlay) {
        enemyHealth -= 5;
        //every attacking card does double damage and removes the status icon if powercharge is active
        if (playerCharge) {
          enemyHealth -= 5;
          playerCharge = false;
          removeStatusIcon(6, -1);
        }
      }
    }
    if (multiplayerSelect == 3) {
      if (whoseTurn == 1) {
        if (!player2Dodge) {
          player2Health -= 5;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            player2Health -= 5;
            playerCharge = false;
          }
        }else if (player2Dodge) {
          removeStatusIcon(7,2);
          player2Dodge = false;
          splashThing = new SplashMessage(12);
        }
      } else if (whoseTurn == 2) {
        if (!player1Dodge) {
          player1Health -= 5;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (player2Charge) {
            player1Health -= 5;
            player2Charge = false;
          }
        } else if (player1Dodge) {
          player1Dodge = false;
          removeStatusIcon(7,1);
          splashThing = new SplashMessage(12);
        }
      }
    }
  }
}


class FiftyFifty {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.wild = false;
    this.used = false;
    this.which = tempWhich;
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[4], 75, 125, 150, 250);
    }
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[4], 75, 125, 150, 250);
      optionCardGraphics[this.which].fill(255);
    } 
    optionCardGraphics[this.which].text("Chance To", 31, 195);
       optionCardGraphics[this.which].text("Buff Self Or", 28, 217);
        optionCardGraphics[this.which].text("Debuff Enemy", 17, 239);
    //different appearance if player is the witch
    if ((playerCharacter == 5 && whoseTurn == 1) || (player2Character == 5 && whoseTurn == 2)){
      optionCardGraphics[this.which].fill(0);
      if (!this.wild && !overPlay){
       optionCardGraphics[this.which].text("10", 70, 143);
    optionCardGraphics[this.which].text("Need:", 50, 115);
      }
      optionCardGraphics[this.which].fill(255);
      optionCardGraphics[this.which].textSize(20);
    optionCardGraphics[this.which].text("Unlabled Elixir", 20, 30);
    }else{
      optionCardGraphics[this.which].fill(0);
      if (!this.wild && !overPlay){
       optionCardGraphics[this.which].text("8", 72, 143);
    optionCardGraphics[this.which].text("Min:", 55, 115);
      }
      optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Reaction", 35, 30);
    }
  }
  use() {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    //chance randomly decides if the card buffs the player or defbuffs enemy
    let chance = int(random(2));
    if (multiplayerSelect == 0){
      // player buffs
      if (chance == 0){
         if (!playerCharge){
           playerCharge = true;
           addStatusIcon(6, -1);
         }
        if (!regenStat[1]){
           regenStat[1] = true;
          addStatusIcon(5,-1);
         }
      }
        //enemy debuffs
        if (chance == 1){
         if (!poisonStat[0]){
           poisonStat[0] = true;
           addStatusIcon(1,0);
         }
        if (!weakenStat[0]){
           weakenStat[0] = true;
          addStatusIcon(2,0);
         }
        if (!pickpocketStat[0]){
           pickpocketStat[0] = true;
          addStatusIcon(4,0);
         }
        if (!freezeStat[0]){
           freezeStat[0] = true;
          addStatusIcon(3,0);
         }
      }
    }
    if (multiplayerSelect == 3){
      if (whoseTurn == 1){
      // player buffs
      if (chance == 0){
         if (!playerCharge){
           playerCharge = true;
           addStatusIcon(6,1);
         }
        if (!regenStat[1]){
           regenStat[1] = true;
          addStatusIcon(5,1);
         }
      }
        //enemy debuffs
        if (chance == 1){
         if (!poisonStat[2]){
           poisonStat[2] = true;
           addStatusIcon(1,2);
         }
        if (!weakenStat[2]){
           weakenStat[2] = true;
          addStatusIcon(2,2);
         }
        if (!pickpocketStat[2]){
           pickpocketStat[2] = true;
          addStatusIcon(4,2);
         }
        if (!freezeStat[2]){
           freezeStat[2] = true;
          addStatusIcon(3,2);
         }
      }
    }
      if (whoseTurn == 2){
      if (chance == 0){
         if (!player2Charge){
           player2Charge = true;
           addStatusIcon(6,2);
         }
        if (!regenStat[2]){
           regenStat[2] = true;
          addStatusIcon(5,2);
         }
      }
        //enemy debuffs
        if (chance == 1){
         if (!poisonStat[1]){
           poisonStat[1] = true;
           addStatusIcon(1,1);
         }
        if (!weakenStat[1]){
           weakenStat[1] = true;
          addStatusIcon(2,1);
         }
        if (!pickpocketStat[1]){
           pickpocketStat[1] = true;
          addStatusIcon(4,1);
         }
        if (!freezeStat[1]){
           freezeStat[1] = true;
          addStatusIcon(3,1);
         }
      }
    }
    }
    if (
      (playerCharacter == 5 && whoseTurn == 1) ||
      (player2Character == 5 && whoseTurn == 2)
    ) {
      for (let ko = 0; ko < optionCardAppearArray.length + 1; ko++) {
        if (optionCardAppearArray[ko] == 31) {
          optionCardBoard[ko] = 0;
          optionCardAppearArray[ko] = -1;
          witchCardNum -= 1;
          witchDeck[9] = false;
        }
      }
    }
  }
}

class AddTwoCard {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[3], 75, 125, 150, 250);
    }
    
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[3], 75, 125, 150, 250);
      optionCardGraphics[this.which].fill(255);
    } 
    optionCardGraphics[this.which].text("Add Two To", 30, 203);
    optionCardGraphics[this.which].text("Card Value", 30, 225);
    optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Add Two", 38, 30);
  }
  use(tempCardScore) {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    //adds two to card score.
    this.newScore = tempCardScore + 2;
    //if ace and score goes above 10 then decrease score by 10 if not ace then cap score at 10
    if (
      (playerCharacter == 4 && whoseTurn == 1) ||
      (player2Character == 4 && whoseTurn == 2)
    ) {
      if (this.newScore > 10) {
        this.newScore -= 10;
      }
    }else if (this.newScore > 10){
        this.newScore = 10;
    }
    if (this.newScore == 10){
      characterBonus[1]++;
    }
  }
}

class SubtractTwoCard {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[3], 75, 125, 150, 250);
    }
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[3], 75, 125, 150, 250);
      optionCardGraphics[this.which].fill(255);
    } 
    optionCardGraphics[this.which].text("Subtract Two", 19, 195);
    optionCardGraphics[this.which].text("From Card", 30, 217);
    optionCardGraphics[this.which].text("Value", 51, 239);
    optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Deduct Two", 25, 30);
  }
  use(tempCardScore) {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    //decrease score by 2
    this.newScore = tempCardScore - 2;
    //if ace and value goes below one add 10 if not ace cap score at 1
    if (
      (playerCharacter == 4 && whoseTurn == 1) ||
      (player2Character == 4 && whoseTurn == 2)
    ) {
      if (this.newScore < 1) {
        this.newScore += 10;
      }
    }else if (this.newScore < 1){
      this.newScore = 1;
    }
    if (this.newScore == 1){
      characterBonus[2]++;
      
    }
  }
}

class OCardStronger {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[2], 75, 125, 150, 250);
       optionCardGraphics[this.which].text("Deal 1 Damage", 12, 195);
      optionCardGraphics[this.which].text("Per Option Card", 8, 217);
      optionCardGraphics[this.which].text("Used", 55, 239);
    optionCardGraphics[this.which].text("Min:", 55, 115);
    optionCardGraphics[this.which].text("7", 72, 143);
    }
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[2], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Min:", 55, 115);
    optionCardGraphics[this.which].text("7", 72, 143);
      optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Deal 2 Damage", 12, 195);
    optionCardGraphics[this.which].text("Per Option Card", 8, 217);
    optionCardGraphics[this.which].text("Used", 55, 239);
    } 
    optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].textSize(20);
    optionCardGraphics[this.which].text("Kaleidoscope", 20, 30);
  }
  use() {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    //standard attacking card except how it calculates damage
    if (multiplayerSelect == 0) {
      if (overPlay || this.wild) {
        //numOfOCard tracks total ocard uses in battle. While numOfOCardDetractor updates every time this card is used to be equal to the numOfOCard. This means numOfOCardDetractor essentially keeps track of ocards used since this card was used. which is the amount of damage this card does. (This card is stupid broken but that is fun right?)
        enemyHealth -= (numOfOCard - numOfOCardDetractor) * 2;
        //every attacking card does double damage and removes the status icon if powercharge is active
        if (playerCharge) {
          enemyHealth -= (numOfOCard - numOfOCardDetractor) * 2;
          playerCharge = false;
          removeStatusIcon(6, -1);
        }
      }
      if (!this.wild && !overPlay) {
        enemyHealth -= (numOfOCard - numOfOCardDetractor);
        //every attacking card does double damage and removes the status icon if powercharge is active
        if (playerCharge) {
          enemyHealth -= (numOfOCard - numOfOCardDetractor);
          playerCharge = false;
          removeStatusIcon(6, -1);
        }
      }
    }
    if (multiplayerSelect == 3) {
      if (whoseTurn == 1) {
        if (!player2Dodge) {
          //multiplayer Does the same as single player but for the other player. This also means that using the card lowers the damage this card does for your opponnent if you are both joker.
          player2Health -= (numOfOCard - numOfOCardDetractor);
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            player2Health -= (numOfOCard - numOfOCardDetractor);
            playerCharge = false;
          }
        }else if (player2Dodge) {
          removeStatusIcon(7,2);
          player2Dodge = false;
          splashThing = new SplashMessage(12);
        }
      } else if (whoseTurn == 2) {
        if (!player1Dodge) {
          player1Health -= (numOfOCard - numOfOCardDetractor);
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (player2Charge) {
            player1Health -= (numOfOCard - numOfOCardDetractor);
            player2Charge = false;
          }
        } else if (player1Dodge) {
          player1Dodge = false;
          removeStatusIcon(7,1);
          splashThing = new SplashMessage(12);
        }
      }
    }
    numOfOCardDetractor = numOfOCard;
  }
}

class QuadruplicateCard {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.wild = false;
    this.used = false;
    this.which = tempWhich;
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[3], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Need:", 50, 115);
      optionCardGraphics[this.which].text("Ace", 57, 143);
    }
    if (this.wild || overPlay){
    optionCardGraphics[this.which].image(wildIMG[3], 75, 125, 150, 250);
      optionCardGraphics[this.which].fill(255);
    } 
    optionCardGraphics[this.which].text("Quadruplicate", 15, 203);
    optionCardGraphics[this.which].text("Card", 57, 225);
    optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Four Knights", 21, 30);
  }
  use(tempCardScore, tempCardSuit) {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    //creates 3 new battle cards with the same value and suit as the original card
    for (let i = 0; i < 3; i++){
    cardInDeckObjects.push(
      new BattleCard(300 - 100 * i, 500, cardInDeckObjects.length + 1));
      //following is insurance to keep the suit and vlaue the same.
    cardInDeckObjects[cardInDeckObjects.length - 1].suit = cardInDeckObjects[tempCardSuit].suit;
      cardInDeckObjects[cardInDeckObjects.length - 1].cardScore = tempCardScore;
  }
    //if wild/overplay you can quadruplicate any card so the bonus checkers need to be here
    if (tempCardScore == 1){
        characterBonus[2] += 3;
    }
    if (tempCardScore == 10){
      characterBonus[1] += 3;
    }
  }
}

class NeedSuitCard {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;
    //on details screen the suit is always the same
    if (oCardDetailsScreen[0] == 36){
      this.suit = 3;
    }else{
      this.suit = int(random(4));
    }
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[2], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Deal 5 Damage", 10, 203);
    }
    optionCardGraphics[this.which].fill(255);
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[2], 75, 125, 150, 250);
    optionCardGraphics[this.which].text("Deal 9 Damage", 10, 203);
    } 
    optionCardGraphics[this.which].text("Royal Flush", 28, 30);
    optionCardGraphics[this.which].fill(0);
    optionCardGraphics[this.which].text("Need:", 50, 115);
    //different text depending on this.suit
    if (this.suit == 0){
      optionCardGraphics[this.which].text("Heart", 50, 143);
    }
    if (this.suit == 1){
      optionCardGraphics[this.which].text("Club", 54, 143);
    }
    if (this.suit == 2){
      //diamond is a huge word so smaller textSize
      optionCardGraphics[this.which].textSize(18);
      optionCardGraphics[this.which].text("Diamond", 44, 143);
    }
    if (this.suit == 3){
      optionCardGraphics[this.which].text("Spade", 48, 143);
    }
  }
  use(tempCardScore) {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    if (multiplayerSelect == 0) {
      //extremely standard attacking card. check for multiplayer if yes check turn if no check for wild
      if (overPlay || this.wild) {
        enemyHealth -= 9;
        //every attacking card does double damage and removes the status icon if powercharge is active
        if (playerCharge) {
          enemyHealth -= 9;
          playerCharge = false;
          removeStatusIcon(6, -1);
        }
      }
      if (!this.wild && !overPlay) {
        enemyHealth -= 5;
        //every attacking card does double damage and removes the status icon if powercharge is active
        if (playerCharge) {
          enemyHealth -= 5;
          playerCharge = false;
          removeStatusIcon(6, -1);
        }
      }
    }
    if (multiplayerSelect == 3) {
      if (whoseTurn == 1) {
        if (!player2Dodge) {
          player2Health -= 5;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            player2Health -= 5;
            playerCharge = false;
          }
        }else if (player2Dodge) {
          removeStatusIcon(7,2);
          player2Dodge = false;
          splashThing = new SplashMessage(12);
        }
      } else if (whoseTurn == 2) {
        if (!player1Dodge) {
          player1Health -= 5;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (player2Charge) {
            player1Health -= 5;
            player2Charge = false;
          }
        } else if (player1Dodge) {
          player1Dodge = false;
          removeStatusIcon(7,1);
          splashThing = new SplashMessage(12);
        }
      }
    }
  }
}

class TwoPoison{
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[2], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Deal 3 Damage", 11, 203);
      optionCardGraphics[this.which].text("& Inflict Poison", 11, 225);
    }
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[2], 75, 125, 150, 250);
      optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Deal 6 Damage", 11, 203);
    optionCardGraphics[this.which].text("& Inflict Poison", 11, 225);
    } 
    optionCardGraphics[this.which].fill(0);
    optionCardGraphics[this.which].text("Need:", 50, 115);
      optionCardGraphics[this.which].text("2", 72, 143);
    optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Ivy", 63, 30);
  }
  use() {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    //standard attacking card except it always poisons the target
      if (multiplayerSelect == 0) {
        if (!overPlay && !this.wild) {
          enemyHealth = enemyHealth - 3;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            enemyHealth = enemyHealth - 3;
            playerCharge = false;
            removeStatusIcon(6, -1);
          }
        }
        if (overPlay || this.wild) {
          enemyHealth = enemyHealth - 6;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            enemyHealth = enemyHealth - 6;
            playerCharge = false;
            removeStatusIcon(6, -1);
          }
        }
        if (!poisonStat[0]) {
          addStatusIcon(1,0);
        }
        poisonStat[0] = true;
      }
      if (multiplayerSelect == 3) {
        if (whoseTurn == 1) {
          if (!player2Dodge) {
            player2Health = player2Health - 3;
            //every attacking card does double damage and removes the status icon if powercharge is active
            if (playerCharge) {
              player2Health -= 3;
              playerCharge = false;
              removeStatusIcon(6, 1);
            }
            if (!poisonStat[2]) {
              addStatusIcon(1,2);
            }
            poisonStat[2] = true;
          } else if (player2Dodge) {
            player2Dodge = false;
            removeStatusIcon(7, 2);
            splashThing = new SplashMessage(12);
          }
        } else if (whoseTurn == 2) {
          if (!player1Dodge) {
            player1Health -= 3;
            //every attacking card does double damage and removes the status icon if powercharge is active
            if (player2Charge) {
              player1Health -= 3;
              player2Charge = false;
              removeStatusIcon(6,2)
            }
            if (!poisonStat[1]) {
              addStatusIcon(1,1);
            }
            poisonStat[1] = true;
          }else if (player1Dodge) {
          player1Dodge = false;
          removeStatusIcon(7, 1);
            splashThing = new SplashMessage(12);
        }
        } 
      }
  }
}

class FreeGuessCard {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.uses = 0;
    this.which = tempWhich;
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[4], 75, 125, 150, 250);
    optionCardGraphics[this.which].text("Need:", 50, 115);
      //the queen needs two aces to use this card, while every other character needs a 9 or 10
      if ((playerCharacter == 2 && whoseTurn == 1) || (player2Character == 2 && whoseTurn == 2)){
        optionCardGraphics[this.which].text("Pair of", 46, 143);
        optionCardGraphics[this.which].text("Aces", 53, 165);
      }else{
        optionCardGraphics[this.which].text("9 or 10", 46, 143);
      }
       optionCardGraphics[this.which].text("+1 Free Guess", 15, 203);
    }
    optionCardGraphics[this.which].fill(255);
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[4], 75, 125, 150, 250);
    optionCardGraphics[this.which].text("+1 Free Guess", 15, 203);
    }  
    optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Theory", 45, 30);
  }
  use() {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    if (multiplayerSelect == 0) {
      freeGuess++;
    }
    if (multiplayerSelect == 3) {
      if (whoseTurn == 1) {
        freeGuess++;
      } else if (whoseTurn == 2) {
        freeGuess2++;
      }
    }
  }
}

class PickpocketCard {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.used = false;
    this.wild = false;
    this.which = tempWhich;
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[2], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Deal 6 Damage", 11, 195);
      optionCardGraphics[this.which].text("& Inflict", 45, 217);
      optionCardGraphics[this.which].text("Pickpocket", 27, 239);
    }
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[2], 75, 125, 150, 250);
      optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Deal 14 Damage", 7, 195);
    optionCardGraphics[this.which].text("& Inflict", 45, 217);
    optionCardGraphics[this.which].text("Pickpocket", 27, 239);
    }  
    optionCardGraphics[this.which].fill(0);
    optionCardGraphics[this.which].text("Min:", 57, 115);
    optionCardGraphics[this.which].text("6", 72, 143);
    optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Raid", 55, 30);
  }
  use(tempCardScore) {
    mainScore[0] += 50;
    numOfOCard++;
    sparkle.play();
    this.used = true;
    //very standard attacking card except it also inflicts pickpocket
      if (multiplayerSelect == 0) {
        if (!overPlay && !this.wild) {
          enemyHealth = enemyHealth - 6;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            enemyHealth = enemyHealth - 6;
            playerCharge = false;
            removeStatusIcon(6, -1);
          }
        }
        if (overPlay || this.wild) {
          enemyHealth = enemyHealth - 14;
          //every attacking card does double damage and removes the status icon if powercharge is active
          if (playerCharge) {
            enemyHealth = enemyHealth - 14;
            playerCharge = false;
            removeStatusIcon(6, -1);
          }
        }
        if (!pickpocketStat[0]) {
          addStatusIcon(4,0);
        }
        pickpocketStat[0] = true;
      }
      if (multiplayerSelect == 3) {
        if (whoseTurn == 1) {
          if (!player2Dodge) {
            player2Health -= 6;
            //every attacking card does double damage and removes the status icon if powercharge is active
            if (playerCharge) {
              player2Health -= 6;
              playerCharge = false;
              removeStatusIcon(6, 1);
            }
            if (!pickpocketStat[2]) {
              addStatusIcon(4,2);
            }
            pickpocketStat[2] = true;
          } else if (player2Dodge) {
            player2Dodge = false;
            removeStatusIcon(7, 2);
            splashThing = new SplashMessage(12);
          }
        } else if (whoseTurn == 2) {
          if (!player1Dodge) {
            player1Health -= 6;
            //every attacking card does double damage and removes the status icon if powercharge is active
            if (player2Charge) {
              player1Health -= 6;
              player2Charge = false;
              removeStatusIcon(6,2)
            }
            if (!pickpocketStat[1]) {
              addStatusIcon(4,1);
            }
            pickpocketStat[1] = true;
          }  else if (player1Dodge) {
          player1Dodge = false;
          removeStatusIcon(7, 1);
          splashThing = new SplashMessage(12);
        }
        } 
      }
  }
}

class CureStatus {
  constructor(tempX, tempY, tempWhich) {
    this.x = tempX;
    this.y = tempY;
    this.wild = false;
    this.used = false;
    this.which = tempWhich;    
  }
  create() {
    //every option card has a look for wild mode and normal mode. the two ways a card can be wild is if it is overplay or it is randomly made wild. Also this.which states which option card graphic should be updated
    if (multiplayerSelect == 0){
    if (!this.wild && !overPlay){
      optionCardGraphics[this.which].image(oCardIMG[4], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Cure Player", 28, 203);
      optionCardGraphics[this.which].text("Debuffs", 44, 225);
      optionCardGraphics[this.which].text("Min:", 57, 115);
      optionCardGraphics[this.which].text("6", 72, 143);
    }
    optionCardGraphics[this.which].fill(255);
    if (this.wild || overPlay){
      optionCardGraphics[this.which].image(wildIMG[4], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Cure Player", 28, 203);
      optionCardGraphics[this.which].text("Debuffs", 44, 225);
    } 
    }
    if (multiplayerSelect == 3){
      optionCardGraphics[this.which].image(oCardIMG[4], 75, 125, 150, 250);
      optionCardGraphics[this.which].text("Cure One", 35, 203);
      optionCardGraphics[this.which].text("Debuff", 47, 225);
      optionCardGraphics[this.which].text("Min:", 57, 115);
      optionCardGraphics[this.which].text("6", 72, 143);
    }
    optionCardGraphics[this.which].fill(255);
    optionCardGraphics[this.which].text("Antidote", 40, 30);
  }
  use(tempCardScore) {
    mainScore[0] += 50;
    numOfOCard++;
    heal.play();
    this.used = true;
    if (multiplayerSelect == 0) {
      //if singleplayer simply look for which status they have that can be cured. If they have a status remove its icon and get rid of their status.
      if (poisonStat[1]){
        removeStatusIcon(1, -1);
        poisonStat[1] = false;
      }
      if (weakenStat[1]){
        removeStatusIcon(2, -1);
        weakenStat[1] = false;
      }
      if (freezeStat[1]){
        removeStatusIcon(3, -1);
        freezeStat[1] = false;
      }
    }
    //if it is multiplayer it only cures one of the status effects not all so...
    if (multiplayerSelect == 3) {
      let chance = [];
      //check whoseTurn it is 
      if (whoseTurn == 1) {
        //check which status player one has afflicted and push its id into chance array
        if (poisonStat[1]){
          chance.push(1);
        }
        if (weakenStat[1]){
          chance.push(2);
        }
        if (freezeStat[1]){
          chance.push(3);
        }
        //shuffle chance array
        chance = shuffle(chance);
        //check if chance is empty (which should never happen as this card only appears if they are inflicted but just in case)
        if (chance[0] != null){
          //cure whatever chance element 0 is
          removeStatusIcon(chance[0], 1);
          if (chance[0] == 1){
            poisonStat[1] = false;
          }
          if (chance[0] == 2){
            weakenStat[1] = false;
          }
          if (chance[0] == 3){
            freezeStat[1] = false;
          }
        }
      } else if (whoseTurn == 2) {
        //check which status player two has afflicted and push its id into chance array
        if (poisonStat[2]){
          chance.push(1);
        }
        if (weakenStat[2]){
          chance.push(2);
        }
        if (freezeStat[2]){
          chance.push(3);
        }
        //shuffle chance array
        chance = shuffle(chance);
        //check if chance is empty (which should never happen as this card only appears if they are inflicted but just in case)
        if (chance[0] != null){
          //cure whatever chance element 0 is
          removeStatusIcon(chance[0], 2);
          if (chance[0] == 1){
            poisonStat[2] = false;
          }
          if (chance[0] == 2){
            weakenStat[2] = false;
          }
          if (chance[0] == 3){
            freezeStat[2] = false;
          }
        }
      }
    }
  }
}
//#profit