class BattleDice { 
  constructor(tempX, tempY, tempID) {
    //create battle dice stats
    this.x = tempX;
    this.y = tempY;
    this.ID = tempID;
    //at the beginning of a battle battle cards can only have a score of 1-6
    this.score = int(random(1, 7));
    this.timer = 0;
    this.dodge = false;
  }
  attack() {
    //timer is used for the small pause the dice do before attacking
    this.timer = this.timer + 1;
    //the id*15 is to make the dice off sync
    if (this.timer > 90 + this.ID * 15) {
      if (this.timer < 100 + this.ID * 15){
        this.y -= 4;
      }else{
        this.y += 20; 
      }
    }
  }
  show() {
    //pickpocket removes the dice
    if (!this.pickpocket) {
      //images for dice based on score
      if (this.score != 0){
        image(diceIMG[this.score - 1], this.x, this.y, 80, 80);
      }
    }
  }
}

class BattleCard {
  constructor(tempX, tempY, tempCardNum) {
    this.x = tempX;
    this.y = tempY;
    this.smoothDrag = false;
    this.cardNum = tempCardNum;
    this.defaultX = tempX;
    //this.freeze is for if player is frozen make about half the cards frozen
    this.freeze = int(random(3));
  }
  drag() {
    //card dragging. this simply makes cardIsSmoothlyDraggingVa = this.cardnum and cardIsSmoothlyDraggingVa in a different section of the code makes the card = mousex/y. I do it this way as makeing the card = mousex/y here in the object was too laggy because it had to constantly see if mouse is still over the card everytime it updates the location of the card. (which it usually wasn't because it was so slow). this system fixes the problem though is admittedly more complex
    if (mouseIsPressed) {
      if (
        mouseX > (this.x - 40) * scaleNum &&
        mouseX < (this.x + 40) * scaleNum &&
        mouseY > (this.y - 65) * scaleNum &&
        mouseY < (this.y + 65) * scaleNum
      ) {
        if (cardIsBeingKept != this.cardNum) {
          this.smoothDrag = true;
          if (cardIsSmoothlyDraggingVa == -2) {
            cardIsSmoothlyDraggingVa = this.cardNum;
          }
        }
      }
    }
  }
  appear() {
    if (this.cardScore > 0){
    //if card is a heart
    if (this.suit == 0) {
      image(heartIMG[this.cardScore - 1], this.x, this.y, 80, 130);
    }
    //if card is club
    if (this.suit == 1) {
      image(clubIMG[this.cardScore - 1], this.x, this.y, 80, 130);
    }
    //if card is diamond
    if (this.suit == 2) {
      image(diamondIMG[this.cardScore - 1], this.x, this.y, 80, 130);
    }
    //if card is a spade
    if (this.suit == 3) {
      image(spadeIMG[this.cardScore - 1], this.x, this.y, 80, 130);
    }
    //freezing card
      //checks if it is player 1's turn and they are frozen or player 2 and frozen or if singlplayer and frozen
      if ((multiplayerSelect == 0 && freezeStat[1]) || (((freezeStat[1] && whoseTurn == 1) || (freezeStat[2] && whoseTurn ==2 )) && multiplayerSelect == 3)) {
        //gives a small second for a quick glance at the cards before freezing it
        if (millis() > timer[12] + 1000) {
          //if this.freeze is two then cover the card and play the sound while also making this.freeze = 3 so the sound doesn't repeat
          if (this.freeze > 1) {
            if (this.freeze < 3){
              //kinda conveluted way of making the frozenSound play once
              frozenSound.play();
              frozenSound.jump(0.2);
              this.freeze = 3;
            }
            //frozen text
            image(frozenCard, this.x - 5, this.y, 100, 130);
            if (millis() < timer[12] + 2500) {
              fill(173, 216, 230);
              textSize(22);
              text("Frozen", this.x - 30, this.y - 75);
            }
          }
        }
      }
    }
  }
}

class AceCards {
  //ace pick cards
  constructor(tempX, tempY, tempNum) {
    this.x = tempX;
    this.y = tempY;
    this.width = 40;
    this.height = 65;
    this.num = tempNum;
  }
  choose() {
    if (
      mouseX > (this.x - 20) * scaleNum &&
      mouseX < (this.x + 20) * scaleNum &&
      mouseY > (this.y - 32.5) * scaleNum &&
      mouseY < (this.y + 32.5) * scaleNum
    ) {
      image(spadeIMG[this.num - 1], this.x, this.y - 15, 40, 65);
      if (mouseIsPressed && !mouseOverlap) {
        if (tutorial == 0) {
          //sets value for aceChosenValue to this card's value
          aceChosenValue = this.num;
          //switches getAceValue[0] if it was equal to aceChosenValue
          while (getAceValue[0] == aceChosenValue) {
            getAceValue[0] = int(random(1, 11));
          }
          //stop player choosing value mode
          playerPickAceValue = false;
          //check all cards for a cardscore equal to the chosen value and change said cards
          for (let oy = 0; oy < cardInDeckObjects.length; oy++) {
            if (cardInDeckObjects[oy] != -1){
            while (cardInDeckObjects[oy].cardScore == aceChosenValue) {
              cardInDeckObjects[oy].cardScore = int(random(1, 11));
              cardInDeckObjects[oy].cardScore = cardInDeckObjects[oy].cardScore;
            }
          }
        }
          aceCardsPick = [];
        }
        //same for tutorial but ensures only ace card 8 can be picked
        if (tutorial == 5) {
          if (this.num == 8 && tutorialText == 4) {
            if (mouseIsPressed && !mouseOverlap) {
              aceChosenValue = this.num;
              tutorialText++;
          while (getAceValue[0] == aceChosenValue) {
            getAceValue[0] = int(random(1, 11));
          }
          playerPickAceValue = false;
          for (let oy = 0; oy < cardInDeckObjects.length; oy++) {
            if (cardInDeckObjects[oy] != -1){
            while (cardInDeckObjects[oy].cardScore == aceChosenValue) {
              cardInDeckObjects[oy].cardScore = int(random(1, 11));
              cardInDeckObjects[oy].cardScore = cardInDeckObjects[oy].cardScore;
            }
          }
        }
              aceCardsPick = [];
            }
          }
          //force ace card 2 to be picked
          if (this.num == 2 && tutorialText == 8) {
            if (mouseIsPressed && !mouseOverlap) {
              mouseOverlap = true;
              tutorialText++;
              aceChosenValue = this.num;
              playerPickAceValue = false;
              aceCardsPick = [];
            }
          }
        }
        mouseOverlap = true;
      }
      //small triangle hovering above ace card
      fill(240, 0, 0);
      triangle(
        this.x - 10,
        this.y - 61.5,
        this.x,
        this.y - 50,
        this.x + 10,
        this.y - 61.5
      );
      getAceValue[1] = this.num;
    }else {
      image(spadeIMG[this.num - 1], this.x, this.y, 40, 65);
    }
  }
}

class CharacterSelectCards {
  constructor(tempX, tempY, charNum) {
    this.x = tempX;
    this.y = tempY;
    this.character = charNum;
    this.width = 150;
    this.height = 250;
    this.spin = 0;
  }
  choose() {
    if (
      mouseX > (this.x - 75) * scaleNum &&
      mouseX < (this.x + 75) * scaleNum &&
      mouseY > (this.y - 125) * scaleNum &&
      mouseY < (this.y + 125) * scaleNum
    ) {
      if (mouseIsPressed && !mouseOverlap) {
        click.play();
        playerHealth = playerMaxHealth;
        //do the following if not on leaderBoardPick
        if (screen != 12) {
          //if choosing player 2 character
          if (multiplayerSelect == 2) {
            player2Character = this.character;
            //look a way screen
            screen = 22;
            //make enemy image for player 2 the character player 2 is
            enemyObject[2] = new EnemyStatsObject(1190, 120, player2Character * -1, 0, 0, 0);
            multiplayerSelect = 3;
            //reset variables
            turnCount = 0;
            enemyDifficulty = [0, 0, 0, 0,];
            whoseTurn = 1;
            oCardDetailsScreen = [0, false];
            startCardBattleSetupV = 0;
            player1Health = player1MaxHealth;
            player2Health = player2MaxHealth;
            player1DisplayHealth = player1Health;
            player2DisplayHealth = player2Health;
            guessPenalty = [false, false];
            //whoseTurn used for the look away screen and multiplayer word choose
            whoseTurn = 2;
            //timer[3] is for look away screen flashing text
            timer[3] = round(millis());
          }
          if (multiplayerSelect == 1) {
            playerCharacter = this.character;
            multiplayerSelect = 2;
            whoseTurn = 1;
            //enemy image for player 1 character
            enemyObject[1] = new EnemyStatsObject(1190, 120, playerCharacter * -1, 0, 0, 0);
            //look a way screen
            screen = 22;
            //timer[3] for flashing look away screen text
            timer[3] = round(millis());
          }
          if (multiplayerSelect == 0) {
            playerCharacter = this.character;
            //witch unique option card board variables
            if (this.character == 5) {
              optionCardAppearArray = [23, 24, -1, -1, -1, -1];
              witchCardNum = 0;
              for(let hg = 0; hg < 11; hg++){
                witchDeck[hg] = false;
              }
            }
            if (!endlessSelect) {
              //not endless mode level screen setup
              screen = 4;
              menuReset();
               makeLevelSelectScreen();
              //wildInGame is activated along with increase in max health so I can use it to find out what max health should be. The reason I have to check this is because endless mode has slightly higher max health
              if (wildInGame) {
                playerMaxHealth = 45;
              } else {
                playerMaxHealth = 30;
              }
              playerHealth = playerMaxHealth;
            }
            if (endlessSelect) {
              music("battle");
              //check words then enemy select screen 
               screen = 19;
              //enemy difficulty, endless road, and mainScore reset
              enemyDifficulty = [0, 3, 0, 3];
              mainScore = [0, 0, 0];
              endlessCount = [1, 1];
              if (wildInGame) {
                playerMaxHealth = 60;
              } else {
                playerMaxHealth = 50;
              }
              playerHealth = playerMaxHealth;
               wordGameSetup();
            }
          }
        }
        if (screen == 12) {
          //if on leaderboad pick screen
          playerCharacter = this.character;
          screen = 13;
        }
        mouseOverlap = true;
      }
      characterText = this.character;
    }
  }
  show() {
    push();
    //spinning, I have no clue how to work in 3d, I couldn't find an easier way to make a two sided textured plane so I did it this way.
    if (characterText == this.character && endGame == 0) {
      //creates where the character cards are based on character unlock
      if (characterUnlock == 5) {
        translate(this.x + 59 - (this.character - 1) * 40, this.y + 10, 75);
      } else if (characterUnlock == 6) {
        translate(this.x + 59 - (this.character - 1) * 34, this.y + 10, 75);
      } else {
        translate(this.x + 59 - (this.character - 1) * 24, this.y + 10, 75);
      }
      //spin, because of the persepctive I can't use the same timing for when to switch the texture. but through trial and error I found an equation that works for every character unlock.
      if (
        this.spin >=
          132 - (28 - (characterUnlock - 5) * 6.5) * (this.character - 1) &&
        this.spin <
          312 - (28 - (characterUnlock - 5) * 6.5) * (this.character - 1)
      ) {
        texture(specialIMG[0]);
      } else {
        //if not back of the card make it the 
        texture(faceCardIMG[this.character - 1]);
      }
      // reset spin
      if (this.spin > 362) {
        this.spin = 0;
      }
      rotateY(this.spin);
      this.spin += 7;
      plane(150 * 0.9, 250 * 0.9);
    } else {
      image(faceCardIMG[this.character - 1], this.x, this.y, 150, 250);
      this.spin = 0;
    }
    pop();
  }
}

class LevelSelect {
  constructor(tempX, tempY, tempID) {
    this.x = tempX;
    this.y = tempY;
    this.ID = tempID;
  }
  highlight() {
    if (
      mouseX > (this.x - 75) * scaleNum &&
      mouseX < (this.x + 75) * scaleNum &&
      mouseY > (this.y - 75) * scaleNum &&
      mouseY < (this.y + 75) * scaleNum
    ) {
      if (mouseIsPressed && !mouseOverlap) {
        mouseOverlap = true;
        //check if the level has been unlocked
        if (levelUnlock >= this.ID){
          click.play();
          music("battle");
          //reset score
          mainScore = [0, 0, 0];
          playerHealth = playerMaxHealth;
          levelScreen = this.ID;
          screen = 19;
          freeGuess = 0;
          //stop keep card variables from carrying over
          keepACard = false;
          keepACardID[0] = -1;
          cardIsBeingKept = -1;
        //different enemy difficulty based on which level
        if (this.ID == 1) {
          enemyDifficulty = [0, 3, 0, 3];
          chosenWord = random(wordsLVL1);
        }
        if (this.ID == 2) {
          enemyDifficulty = [0, 3, 0, 3];
          chosenWord = random(wordsLVL2);
        }
        if (this.ID == 3) {
          enemyDifficulty = [2, 4, 2, 4];
          chosenWord = random(wordsLVL3);
        }
        if (this.ID == 4) {
          enemyDifficulty = [3, 4, 3, 4];
          chosenWord = random(wordsLVL4);
        }
        if (this.ID == 5) {
          enemyDifficulty = [3, 4, 3, 4];
          chosenWord = random(wordsLVL5);
        }
        if (this.ID == 6) {
          enemyDifficulty = [4, 5, 4, 5];
          chosenWord = random(wordsLVL6);
        }
        //splits up chosen word into key codes array
        chosenWordSplit = unchar(split(chosenWord, ""));
        wordGameSetup();
        }else{
          //reject click if not unlocked level
          error.play();
        }
      }
      image(note1, this.x, this.y, 150, 150);
    } else {
      //different sticky note image if mouse is hovering over it
      image(note2, this.x, this.y, 150, 150);
    }
    if (levelUnlock < this.ID) {
      //lock image if not level unlocked. it has a slight rotation to fit the stickynote
      push();
      translate(this.x, this.y);
      rotate(-8);
      image(lock, 0, - 25, 60, 60);
      pop();
    } else {
      textFont(schoolBell);
      textSize(20);
      fill(0);
      //level theme text and icon both have a slight rotation to fit the sticky note
      push();
      translate(this.x, this.y);
      rotate(-8);
      if (this.ID == 1) {
        text("Animal Theme", -55 , -32);
      }
      if (this.ID == 2) {
        text("School Theme", -55, -32);
      }
      if (this.ID == 3) {
        text("Food Theme", -52, -32);
      }
      if (this.ID == 4) {
        text("     Video \nGame Theme", -55, -32);
      }
      if (this.ID == 5) {
        text("Cinema Theme", -56, -32);
      }
      if (this.ID == 6) {
        text("   American \nHistory Theme", -60, -32);
      }
      image(iconIMG[this.ID - 1], 0, 25, 70, 70);
       pop();
    }
    //tape flourish
    fill(190, 190, 250, 220);
    rect(this.x - 50, this.y - 85, 80, 30);
  }
}

class EnemySelect {
  constructor(tempX, tempY, tempID) {
    this.x = tempX;
    this.y = tempY;
    this.ID = tempID;
  }
  highlight() {
    if (
      mouseX > (this.x - 75) * scaleNum &&
      mouseX < (this.x + 75) * scaleNum &&
      mouseY > (this.y - 50) * scaleNum &&
      mouseY < (this.y + 25) * scaleNum
    ) {
      if (mouseIsPressed && !mouseOverlap && !nextEnemy && this.ID >= 0) {
        if (tutorial == 0) {
          click.play();
          //various reset variables
          tutorialNoBCard = false;
          tutorialNoOCard = false;
          tutorialNoEndTurn = false;
          tutorialNoLetter = false;
          enemyUnleashed = false;
          characterBonus = [0, 0, 0, 0, 0, 0, 0];
          goodGuess = 0;
          numOfOCard = 0;
          numOfOCardDetractor = 0;
          numOfEnemy = 0;
          wrongGuess = [0, 0, 0];
          enemyID = this.ID;
          screen = 3;
          mouseOverlap = true;
          startCardBattleSetupV = 0;
          overPlay = false;
          optionCardBoard = [];
          if (playerCharacter == 5 && multiplayerSelect == 0){
            optionCardAppearArray = [23, 24, -1, -1, -1, -1];
              witchCardNum = 0;
              for(let hg = 0; hg < 11; hg++){
                witchDeck[hg] = false;
              }
          }
          if (multiplayerSelect == 3) {
            //multiplayer variables
            whoseTurn = whoseTurnMain;
            splashThing = new SplashMessage(whoseTurn + 2);
            player1Health = player1MaxHealth;
            player2Health = player2MaxHealth;
            player1DisplayHealth = player1Health;
            player2DisplayHealth = player2Health;
            endlessPick = int(random(7));
            //wrong guess penaltys
            if (guessPenalty[0]) {
              player1Health -= 10;
              guessPenalty[0] = false;
            }
            if (guessPenalty[1]) {
              player2Health -= 10;
              guessPenalty[1] = false;
            }
          }
          //reset Option card images
          for (let i = 0; i < 6; i++){
            optionCardGraphics[i].clear();
            optionCardGraphics[i].fill(0);
          optionCardGraphics[i].textSize(22);
          }
          //remove extra battle cards
          if (cardInDeckObjects.length >= 5) {
            cardInDeckObjects.splice(5, 6);
          }
          //create enemy
          enemyStats();
        } else {
          //basic tutorial progression
          if (tutorialText == 4 && this.ID == 1) {
            mouseOverlap = true;
            screen = 3;
            tutorialText = 5;
            enemyObject[0] = new EnemyStatsObject(1190, 120,-7, 2, false, 3);
          }
        }
      }
      //character tutorial activator
      if (this.ID == -1 && mouseIsPressed && !mouseOverlap) {
        enemyObject[0] = new EnemyStatsObject(1190, 120, -7, 2, false, 2);
        tutorial = characterText + 1;
        click.play();
      }
      //guess phrase activator
      if (this.ID == -2 && mouseIsPressed && !mouseOverlap && !tutorialNoLetter) {
        celebrate2 = [];
        screen = 15;
        music("word");
        //mainScore[2] creates round score which endless mode is based off of
        if (endlessSelect) {
          mainScore[2] = mainScore[0] - mainScore[1];
        }
        //add character bonus if in nextEnemy because you can't go back to battle.
        if (nextEnemy){
          characterBonusAdd();
          }
        nextEnemy = false;
        guessMode = true;
        //timer[10] is used for the guess phrase text flash
        timer[10] = round(millis());
        splashThing = new SplashMessage(5);
        //create delete key for the index card
        if (multiplayerSelect == 3) {
          pickLetters2[26] = new Letter(842, 523, 8);
        }
        pickLetters[26] = new Letter(842, 523, 8);
        if (
          multiplayerSelect == 0 ||
          (multiplayerSelect == 3 && whoseTurnMain == 2)
        ) {
          //for as long as chosenWordSplit guessPhrase and guessWordSplit arrays are created. guessPhrase is the letterCards when guessing and guessWordSplit is the ids of the guessed letters. guessWordSplit is what is compared to chosenWordSplit to see if the guess is correct
          for (let op = 0; op < chosenWordSplit.length; op++) {
            guessPhrase[op] = 0;
            guessWordSplit[op] = -1;
            //remove spaces for guessPhrase
            if (hiddenWord[op].ID == 32) {
              guessPhrase[op] = new WordGuess(50 + 75 * op, 80, 32, true, op);
              guessWordSplit[op] = 32;
            }
          }
        }
        if (multiplayerSelect == 3 && whoseTurnMain == 1) {
          for (let op = 0; op < chosenWordSplit2.length; op++) {
            //make guessPhrase and guessWordSplit the same length as the chosenWord
            guessPhrase[op] = 0;
            guessWordSplit[op] = -1;
            //look through hiddenWord2 for spaces and if there is any remove them from the guessPhrase array
            if (hiddenWord2[op].ID == 32) {
              guessPhrase[op] = new WordGuess(50 + 75 * op, 80, 32, true, op);
              guessWordSplit[op] = 32;
            }
          }
        }
        //nextLine is used for the letter cards to make them have two lines of text if the word is long enough
        nextLine = [0, 0];
      }
      //use free guesses activator
      if (this.ID == -3 && mouseIsPressed && !mouseOverlap) {
        splashThing = new SplashMessage(2);
        //word game screen
        screen = 15;
        music("word");
        wordMode = true;
      }
      //enemy selectors during nextEnemy
      if (mouseIsPressed && !mouseOverlap && nextEnemy && this.ID >= 0) {
        //get rid of fireworks
        celebrate2 = [];
        if (tutorial == 0) {
          //check if it is an enemy selector and if it is reveal a vowel only work if not all the vowels are revealed, same for reveal a constonant
          if (
            this.ID == 3 ||
            this.ID == 4 ||
            (this.ID == 2 && vowelV < vowelDetect.length) ||
            (this.ID == 1 && freeLetter < freeLetterReveal.length)
          ) {
            //change enemy id and create new enemy
            enemyID = this.ID;
            mouseOverlap = true;
            enemyStats();
            nextEnemy = false;
            tutorialNoBCard = false;
            tutorialNoOCard = false;
            tutorialNoEndTurn = false;
            tutorialNoLetter = false;
            click.play();
          } else {
            //if all constonants or vowels are revealed do nothing if the player clicked reveal said letter
            mouseOverlap = true;
            error.play();
          } 
        }
      }
      noStroke();
      //spotlight creator and highlight for the enemy
      fill(255, 200, 0, 80);
      triangle(this.x - 75, this.y, this.x, 0, this.x + 75, this.y);
      fill(255);
      ellipse(this.x, this.y, 150, 50);
      if (this.ID == -1) {
        //tutorial selector punching bag image
        image(punchingBag, this.x, this.y - 25, 90, 135);
      }
      textFont(schoolBell);
      textSize(25);
      if (multiplayerSelect == 0) {
        //various icons based on enemy difficulty and change in colored text
        if (enemyDifficulty[this.ID - 1] > 8) {
          image(bossIcon, this.x + int(random(-10, 11)), this.y - 35 + int(random(-4, 5)), 150, 180);
          fill(0);
          //makes clarity boxes for bossDifficulty
          rect(this.x - 100, this.y - 90, 200, 30);
          if (this.ID != 4){
            rect(this.x - 160, this.y - 135, 300, 40);
          }
          fill(186, 0, 0);
          text("- Boss Difficulty", this.x - 85, this.y - 65);
        } else if (enemyDifficulty[this.ID - 1] > 5) {
          fill(202, 20, 20);
          text("- Hard Difficulty", this.x - 85, this.y - 65);
          //shake enemy icon if mouse hovering over it by randomly adding to x and y shake it more if higher difficulty
          image(enemyIcon, this.x + 20 + int(random(-8, 9)), this.y - 45 + int(random(-2, 3)), 150, 180);
        } else if (enemyDifficulty[this.ID - 1] > 2) {
          fill(255, 100, 100);
          text("- Medium Difficulty", this.x - 95, this.y - 65);
          //shake enemy icon if mouse hovering over it by randomly adding to x and y shake it more if higher difficulty
          image(enemyIcon, this.x + 20 + int(random(-5, 6)), this.y - 45 + int(random(-2, 3)), 150, 180);
        } else if (this.ID > 0) {
          fill(255);
          //shake enemy icon if mouse hovering over it by randomly adding to x and y shake it more if higher difficulty
          image(enemyIcon, this.x + 20 + int(random(-2, 3)), this.y - 45 + int(random(-2, 3)), 150, 180);
          text("- Low Difficulty", this.x - 85, this.y - 65);
        }
      }
      if (multiplayerSelect == 3 && this.ID > 0){
        image(enemyIcon, this.x + 20 + int(random(-5, 6)), this.y - 45 + int(random(-2, 3)), 150, 180);
        if (endlessPick == 0){
          //different text color for endlessPick 0 cuz the background is actually very light
          if (this.ID == 2 || this.ID == 4){
            fill(255);
          }else{
            fill(0);
          }
        }else{
          fill(255);
        }
      }
      textSize(35);
      if (this.ID == 1) {
        //detect if all constonants are revealed
        if (freeLetter < freeLetterReveal.length) {
          text("Reveal A Consonant", this.x - 145, this.y - 100);
        } else if (multiplayerSelect == 0) {
          fill(0);
          rect(this.x - 160, this.y - 135, 380, 40);
          fill(200, 30, 120);
          text("All Consonants Revealed", this.x - 135, this.y - 100);
        } else {
          fill(200, 30, 120);
          textSize(25);
          text("All Player 1's Consonants Are Revealed", this.x - 185, this.y - 100);
        }
        if (multiplayerSelect == 3) {
          //detect if player 2's constonants are all revealed
          if (freeLetter2 >= freeLetterReveal2.length) {
            fill(200, 30, 120);
            textSize(25);
            text("All Player 2's Consonants Are Revealed", this.x - 185, this.y - 65);
          }
        }
      }
      if (this.ID == 2) {
        //detect if all vowels are revealed
        if (vowelV < vowelDetect.length) {
          text("Reveal A Vowel", this.x - 115, this.y - 100);
        } else if (multiplayerSelect == 0) {
          fill(0);
          rect(this.x - 160, this.y - 135, 330, 40);
          fill(200, 30, 120);
          text("All Vowels Revealed", this.x - 125, this.y - 100);
        } else {
          fill(200, 30, 120);
          textSize(25);
          text("All Player 1's Vowels Are Revealed", this.x - 185, this.y - 100);
        }
        if (multiplayerSelect == 3) {
          //detect if player 2's vowels are all revealed
          if (vowelV2 >= vowelDetect2.length) {
            fill(200, 30, 120);
            textSize(25);
            text("All Player 2's Vowels Are Revealed", this.x - 185, this.y - 65);
          }
        }
      }
      if (this.ID == 3) {
        text("Free Guess", this.x - 85, this.y - 100);
      }
      if (this.ID == 4) {
        text("Choose A Letter To Reveal", this.x - 185, this.y + 80);
      }
    } else {
      fill(160);
      ellipse(this.x, this.y, 150, 50);
      //different icons based on if the enemy difficulty of the corresponding enemy is high enough
      if (enemyDifficulty[this.ID - 1] > 8) {
      image(bossIcon, this.x, this.y - 35, 150, 180);
    } else if (this.ID == -1) {
      //if it is a tutorial enemy then show the punching bag
      image(punchingBag, this.x, this.y - 25, 90, 135);
    } else if (this.ID != -2 && this.ID != -3) {
      image(enemyIcon, this.x + 20, this.y - 45, 150, 180);
    }
    }
    //other special enemy select options
    if (this.ID == -1) {
      textSize(35);
      fill(255, 0, 100);
      textFont(schoolBell);
      text("Character \n Tutorial", this.x - 66, this.y - 115);
    }
    if (this.ID == -2) {
      textSize(45);
      fill(200, 0, 100);
      textFont(schoolBell);
      text("Guess \nPhrase", this.x - 60, this.y - 90);
    }
    if (this.ID == -3) {
      textSize(45);
      fill(200, 0, 100);
      textFont(schoolBell);
      text("Use Free \nGuesses", this.x - 60, this.y - 90);
    }
  }
}

class TutorialArrow {
  //tutorial arrows which need an x, y and rotation
  constructor(tempX, tempY, tempRotate) {
    this.x = tempX;
    this.y = tempY;
    push();
    translate(tempX, tempY);
    rotate(tempRotate);
    image(arrow, 0, 0, 100, 40);
    pop();
  }
}

class EndlessRoad {
  constructor(tempX, tempID) {
    this.x = tempX;
    this.y = 300;
    this.id = tempID;
  }
  show() {
    //endlessRoad icons based on which round the road represents
    ellipse(this.x, 300, 200, 50);
    if (this.id > 11) {
      this.id -= 11;
    }
    if (this.id == 4 || this.id == 9) {
      //if the id = 4 or 9 it is a break spot so make the regen icon instead of enemy
      image(statusIMG[4], this.x, this.y - 25, 60, 60);
    } else {
      image(enemyIcon, this.x + 20, this.y - 45, 150, 180);
    }
  }
  move() {
    this.x -= 10;
  }
}

class EndlessHelp {
  constructor(tempX, tempID) {
    this.x = tempX;
    this.y = 540;
    this.ID = tempID;
  }
  click() {
    if (
      mouseX > (this.x - 100) * scaleNum &&
      mouseX < (this.x + 100) * scaleNum &&
      mouseY > (this.y - 50) * scaleNum &&
      mouseY < (this.y + 50) * scaleNum
    ) {
      stroke(255);
    strokeWeight(5);
      fill(255, 0, 0);
    rect(this.x - 100, this.y - 50, 200, 100, 20);
    noStroke();
      if (mouseIsPressed && !mouseOverlap) {
        //using the buttons 
        if (this.ID == 0) {
          playerHealth += 10;
        }
        if (this.ID == 1) {
          endlessKeep[0] = true;
        }
        if (this.ID == 2) {
          endlessKeep[1] = true;
        }
        if (this.ID == 3) {
          mainScore[0] += 1500;
        }
        //bring player to the next round.
        endlessCount[0]++;
        endlessCount[1]++;
        screen = 19;
        wordGameSetup();
        endlessOptions = [];
        endlessChr = [];
      }
    }else{
      stroke(255);
    strokeWeight(5);
      fill(0);
    rect(this.x - 100, this.y - 50, 200, 100, 20);
    noStroke();
    }
    textFont(schoolBell);
    fill(255);
    textSize(35);
    //endless help buttons appearance based on id
    if (this.ID == 0) {
      text("Heal 10 \nHealth", this.x - 52, this.y - 5);
      //heal
    }
    if (this.ID == 1) {
      //powercharge
      text("Gain Power\n   Charge", this.x - 75, this.y - 5);
    }
    if (this.ID == 2) {
      //wild special
      text("Wild Special \nAttack Card", this.x - 80, this.y - 5);
    }
    if (this.ID == 3) {
      //score
      text("Add 1500 \nto Score", this.x - 58, this.y - 5);
    }
  }
}

class BackButton {
  constructor(tempX, tempY) {
    this.x = tempX;
    this.y = tempY;
  }
  check() {
    push();
    translate(this.x, this.y);
    rotate(180);
    image(arrow, 0, 0, 100, 50);
    pop();
    if (
      mouseX > (this.x - 50) * scaleNum &&
      mouseX < (this.x + 50) * scaleNum &&
      mouseY > (this.y - 25) * scaleNum &&
      mouseY < (this.y + 25) * scaleNum
    ) {
      if (mouseIsPressed && !mouseOverlap) {
        backSound.play();
        celebrate = [];
        celebrate2 = [];
        //different screen changes based on which screen you are on
        if (screen == 2 || screen == 11 || screen == 12 || screen == 18 || screen == 21 || screen == 23) {
          //all screens where back button brings you to the main menu
          screen = 9;
        }
        if (screen == 3 && oCardDetailsScreen[0] == 0 && !nextEnemy) {
          //endGame is where you confirm if you want to exit battle
          endGame = 3;
          cardIsSmoothlyDraggingVa = -2;
        }
        if (screen == 4) {
          //choose level > character select screen
          screen = 2;
          level = [];
          makeCharacterCards();
           music("menu");
        }
        if (screen == 5) {
          //enemy select(tutorial) > main menu
          if (tutorial == 1) {
            screen = 9;
            tutorialText = 0;
            tutorial = 0;
          } else {
            if (multiplayerSelect == 0) {
              if (!endlessSelect) {
                //enemy select > level select screen (non endless)
                screen = 4;
                menuReset();
                 makeLevelSelectScreen();
                 music("menu");
              }
              if (endlessSelect) {
                //enemy select -> confirm mainmenu (endless mode)
                if (endlessCount[1] != 1) {
                  endGame = 3;
                } else {
                  //if on very first round of endless mode you just go back to the main menu
                  screen = 9;
                }
              }
            }
          }
          if (multiplayerSelect == 3) {
            //enemy select > confirm main menu if multiplayer
            endGame = 3;
          }
        }
        if (screen == 8) {
          if (endlessSelect){
            //game over screen -> score screen (endless)
            screen = 7;
            music("winner");
            //timer[6] is score screen timer
            timer[6] = round(millis());
          }else{
            //game over screen > character select screen
            menuReset();
          screen = 2;
          makeCharacterCards();
             music("menu");
          }
        }
        if (screen == 13) {
          //leaderBoard screen > leaderboardpick (if you didn't unlock a character card this round)
          if (characterCardUnlock[0] == 0){
          screen = 12;
          makeCharacterCards();
             music("menu");
            //if you score in leaderboard but leave before typing your name get rid of textinput and undo leaderboard[55-59] which track if you made the leaderboard
          if (leaderBoard[55]) {
            leaderBoardInput.remove();
          }
          leaderBoard[55] = false;
          leaderBoard[56] = false;
          leaderBoard[57] = false;
          leaderBoard[58] = false;
          leaderBoard[59] = true;
        }else{
          //if you unlocked character card then go to new Ability screen
            screen = 20;
            optionCardGraphics[8] = createGraphics(150, 250);
        }
      }
        if (screen == 14) {
          // multiplayer winner screen > main menu
          player1Health = player1MaxHealth;
          player2Health = player2MaxHealth;
          screen = 9;
        }
        if (screen == 15 && !guessMode) {
          if (multiplayerSelect == 3) {
            //word game screen > check words then enemyselect screen (multiplayer)
            screen = 19;
          }
          if (wordMode){
            //if useing freeguess backbutton brings you back to battle
            screen = 3;
            wordMode = false;
            nextEnemy = true;
            splashThing = new SplashMessage(8);
            crashSafe();
          }else{
          if (multiplayerSelect == 0) {
            //singleplayer word game screen > confirm main menu
            endGame = 3;
          }
        }
        }
        if (screen == 24){
          //special thanks screen > score screen
          if (characterCardUnlock[0] == 8){
            screen = 7;
            characterCardUnlock[0] = 8;
            music("winner");
            //timer[6] is used for the score screen reveal
            timer[6] = round(millis());
          }else{
            //special thanks > credits
          screen = 11;
          }
        }
        if (endGame == 0){
          tutorial = 0; 
        tutorialText = 0;
        }
        mouseOverlap = true;
      }
    }
  }
}

class StatusIcon {
  constructor(tempID, tempCharacter) {
    this.ID = tempID;
    this.Character = tempCharacter;
    //tempCharacter marks which character -1 - player singleplayer mode, 0 - enemy, 1 - player 1 multi, 2 - player 2 multi,
    if (tempCharacter == 0) {
      this.y = 55;
    }
    if (tempCharacter == -1) {
      this.y = 482;
    }
  }
  show(tempX) {
    //y value based on character
    if (this.Character == 1) {
      if (whoseTurn == 1) {
        this.y = 415;
      }
      if (whoseTurn == 2) {
        this.y = 50;
      }
    }
    if (this.Character == 2) {
      if (whoseTurn == 1) {
        this.y = 50;
      }
      if (whoseTurn == 2) {
        this.y = 415;
      }
    }
    //icon appearance based on which status
    //status effects id is 1 = poison, 2 = weaken, 3 = freeze, 4 = pickpocket, 5 = regen, 6 = charge, 7 = dodge, 8 = block
      image(statusIMG[this.ID - 1], tempX, this.y, 20, 20);
  }
}

class EnemyAbility {
  constructor(tempX, tempID) {
    this.x = tempX;
    this.y = 200;
    this.ID = tempID;
  }
  show() {
    textFont(anton);
    textSize(30);
    fill(255);
    image(EA, this.x, this.y, 200, 200);
    //make tint translucent for the dice images
    tint(255, 100);
    //different abilities based on id
    if (this.ID == 1) {
      image(diceIMG[5], this.x, this.y - 3, 70, 70);
      text("Seraph", this.x - 40, this.y - 60);
      textSize(22);
      fill(0);
      text("If Dice = 6", this.x - 40, this.y + 70);
      text("Heal 6 Health", this.x - 60, this.y + 92);
    }
    if (this.ID == 2) {
      image(diceIMG[5], this.x, this.y - 3, 70, 70);
      text("Corrosion", this.x - 58, this.y - 60);
      textSize(22);
      fill(0);
      text("If Dice = 6", this.x - 40, this.y + 70);
      text("Poison Player", this.x - 60, this.y + 92);
    }
    if (this.ID == 3) {
      image(diceIMG[0], this.x, this.y - 3, 70, 70);
      text("Sub Zero", this.x - 53, this.y - 60);
      textSize(22);
      fill(0);
      text("If Dice = 1", this.x - 40, this.y + 70);
      text("Freeze Player", this.x - 60, this.y + 92);
    }
    if (this.ID == 4) {
      image(diceIMG[5], this.x, this.y - 3, 70, 70);
      text("Mitigate", this.x - 50, this.y - 60);
      textSize(22);
      fill(0);
      text("If Dice = 6", this.x - 40, this.y + 70);
      text("Regen Buff", this.x - 45, this.y + 92);
    }
    if (this.ID == 5) {
      text("Debilitate", this.x - 58, this.y - 60);
      fill(0);
      textSize(22);
      text("If Dice Damage > 9", this.x - 80, this.y + 70);
      text("Weaken Player", this.x - 68, this.y + 92);
    }
    if (this.ID == 6) {
      image(diceIMG[3], this.x, this.y - 3, 70, 70);
      text("Klepto", this.x - 37, this.y - 60);
      textSize(22);
      fill(0);
      text("If Dice = 4", this.x - 40, this.y + 70);
      text("Pickpocket Player", this.x - 78, this.y + 91);
    }
    tint(255);
  }
}

class EnemyStatsObject {
  constructor(tempX, tempY, tempID, tempNumOfDice, tempDiceIncrease, tempLimit) {
    this.x = tempX;
    this.y = tempY;
    //tempID shows wheter the enemy is a boss or not, or if it is a mulitplayer character
    this.ID = tempID;
    this.numOfDice = tempNumOfDice;
    this.diceIncrease = tempDiceIncrease;
    if (this.ID == 0){
      //this.which randomly determines enemy img and name
      this.which = int(random(0, 13));
    }
    if (this.ID == 1){
      this.which = int(random(0,6));
    }
    //tempLimit shows the max amount of dice an enemy can have. enemyUnleashed removes the limit and makes it 6
    if (!enemyUnleashed) {
      this.limit = tempLimit;
    }
    if (enemyUnleashed) {
      this.limit = 6;
    }
    //tutorial dummy name
    if (this.ID == -7){
      enemyName = "Mr. Dummy Dum";
    }
    if (this.ID == 0){
      //enemy names which correspond with the image
      if (this.which == 0){
        enemyName = "Sketchy Etch";
      }
      if (this.which == 1){
        enemyName = "Stick Gang";
      }
      if (this.which == 2){
        enemyName = "Gobble Claw";
      }
      if (this.which == 3){
        enemyName = "Jack In The Draw";
      }
      if (this.which == 4){
        enemyName = "Elesqueak";
      }
      if (this.which == 5){
        enemyName = "Crocodrilo";
      }
      if (this.which == 6){
        enemyName = "Gunicorn";
      }
      if (this.which == 7){
        enemyName = "Hoodley Boodley";
      }
      if (this.which == 8){
        enemyName = "ROB IT";
        randomAbility = 4;
      }
      if (this.which == 9){
        enemyName = "Mr. & Mrs. Staples";
      }
      if (this.which == 10){
        enemyName = "Trample Stamp";
      }
      if (this.which == 11){
        enemyName = "Death Snow";
        randomAbility = 2;
      }
      if (this.which == 12){
        enemyName = "Weirdly Realistic Orange";
      }
    }
    if (this.ID == 1){
      //boss names that correspond with the images
      if (this.which == 0){
        enemyName = "???";
      }
      if (this.which == 1){
        enemyName = "Mom's Magic Card";
      }
      if (this.which == 2){
        enemyName = "Chip";
      }
      if (this.which == 3){
        enemyName = "Roe Jan & Boe";
      }
      if (this.which == 4){
        enemyName = "Kindle Candle";
      }
      if (this.which == 5){
        enemyName = "Nyx";
      }
    }
  }
  show() {
    if (shakeV < 14) {
      //make enemy image red if just attacked
      tint(200, 0, 0);
    }
    //normal enemy images
    if (this.ID == 0 && this.which < 12){
      image(enemyIMG[this.which], this.x, this.y, 230, 270);
    }
    //the orange is slightly too big to be in the same spot as the other enemies (the orange is the only one i didn't draw and instead used free art, so the other enemy images are the same dimensions)
    if (this.ID == 0 && this.which == 12){
      image(enemyIMG[12], this.x, this.y, 200, 200);
    }
    //boss images
    if (this.ID == 1){
      //boss images which are also same dimensions
      image(bossIMG[this.which], this.x, this.y, 230, 270);
    }
    //multiplayer character images
    if (this.ID < 0 && this.ID != -7 && this.ID != -6) {
      if (this.ID != -3 && this.ID != -2){
        push();
        scale(-1, 1);
        //rotates some player character chibi images so they face correct way
          image(chibiIMG[this.ID * -1 - 1], -this.x, this.y, 230, 270);
        pop();
      }else{
      image(chibiIMG[this.ID * -1 - 1], this.x, this.y, 230, 270);
      }
    }
    //tutorial punching bag image
    if (this.ID == -7) {
      image(punchingBag, this.x, this.y, 162, 243);
    }
    tint(255);
  }
  shake() {
    let shakeMove = shuffle([-20, -15, 15, 20]);
    //movement for enemy got attacked shake. I used to use int(random(-20,20)); but i like the shuffle more so it shakes the image more distance.
    this.x += shakeMove[0];
  }
}

class Letter {
  constructor(tempX, tempY, tempID) {
    //randomly shifted x and y along with rotation for the letters to give a more handwritten feel for the theme
    this.x = tempX + int(random(-2, 2));
    this.y = tempY + int(random(6, 13));
    this.ID = tempID;
    this.guessed = false;
    this.r = int(random(-8, 8));
  }
  show() {
    fill(0);
    textFont(schoolBell);
    //show letters if it hasn't been guess already or if guessmode is active and it isn't the delete button
    if (!this.guessed || (guessMode && this.ID != 8)) {
      textSize(45);
      push();
      translate(this.x +4, this.y + 35);
      rotate(this.r)
      text(char(this.ID), 0, 0);
      pop();
    }
    //delete key
    if (this.ID == 8) {
      fill(200);
      rect(this.x, this.y, 110, 40);
      textSize(35);
      fill(0);
      text("Delete", this.x + 15, this.y + 30);
    }
  }
  check() {
    let k = false;
    if (this.ID != 8) {
      if (
        (mouseX > (this.x - 5) * scaleNum &&
          mouseX < (this.x + 50) * scaleNum &&
          mouseY > this.y * scaleNum &&
          mouseY < (this.y + 40) * scaleNum &&
          mouseIsPressed &&
          !mouseOverlap) ||
        (keyIsPressed && keyCode == this.ID && !keyOverlap && endGame == 0)
      ) {
        if (mouseIsPressed) {
          mouseOverlap = true;
        }
        if (!this.guessed && !guessMode) {
          this.guessed = true;
          if (
            multiplayerSelect == 0 ||
            (multiplayerSelect == 3 && whoseTurnMain == 2)
          ) {
            for (let u = 0; u < chosenWordSplit.length; u++) {
              //check chosenWordSplit for the same ID number as this letter that you guessed
              if (this.ID == chosenWordSplit[u]) {
                for (let j = 0; j < chosenWordSplit.length; j++) {
                  //if the hidden word id is the same as this letter's id
                  if (hiddenWord[j].ID == this.ID) {
                    if (hiddenWord[j].hidden) {
                      //if said hiddenword hasn't been unveiled already
                      hiddenWord[j].hidden = false;
                      //if it is a vowel remove it from vowelDetct so revealing a vowel doesn't reveal the already revealed vowel
                      if (
                        this.ID == 65 ||
                        this.ID == 69 ||
                        this.ID == 73 ||
                        this.ID == 79 ||
                        this.ID == 85
                      ) {
                        for (let i = 0; i < vowelDetect.length; i++) {
                          if (vowelDetect[i] == j) {
                            vowelDetect.splice(i, 1);
                          }
                        }
                      } else {
                        for (let i = 0; i < freeLetterReveal.length; i++) {
                          //remove it from freeLetterReveal if it is a constonant
                          if (freeLetterReveal[i] == j) {
                            freeLetterReveal.splice(i, 1);
                          }
                        }
                      }
                      //k is to detect whether the letter was in the word
                      k = true;
                      heal.play();
                      checkWords();
                    }
                  }
                }
              }
            }
          }
          //same as above for multiplayer player 1 turn which checks player 2's word
          if (multiplayerSelect == 3) {
            if (whoseTurnMain == 1) {
              for (let u = 0; u < chosenWordSplit2.length; u++) {
                if (this.ID == chosenWordSplit2[u]) {
                  for (let j = 0; j < chosenWordSplit2.length; j++) {
                    if (hiddenWord2[j].ID == this.ID) {
                      if (hiddenWord2[j].hidden) {
                        hiddenWord2[j].hidden = false;
                        if (
                          this.ID == 65 ||
                          this.ID == 69 ||
                          this.ID == 73 ||
                          this.ID == 79 ||
                          this.ID == 85
                        ) {
                          for (let i = 0; i < vowelDetect2.length; i++) {
                            if (vowelDetect2[i] == j) {
                              vowelDetect2.splice(i, 1);
                            }
                          }
                        } else {
                          for (let i = 0; i < freeLetterReveal2.length; i++) {
                            if (freeLetterReveal2[i] == j) {
                              freeLetterReveal2.splice(i, 1);
                            }
                          }
                        }
                        k = true;
                        heal.play();
                        checkWords();
                      }
                    }
                  }
                }
              }
            }
          }
          //if not k then the letter wasn't in the word
          if (!k) {
            if (
              this.ID == 65 ||
              this.ID == 69 ||
              this.ID == 73 ||
              this.ID == 79 ||
              this.ID == 85
            ) {
              //if vowel lose 800 score and add to wrongGuess[1] for the score board
              if (freeGuess == 0 && multiplayerSelect == 0) {
                mainScore[0] -= 800;
                mainScore[2] -= 800;
                wrongGuess[1]++;
              }
              error.play();
            } else {
              //if constonant lose 500 score and add to wrongGuess[0]
              if (freeGuess == 0 && multiplayerSelect == 0) {
                mainScore[0] -= 500;
                mainScore[2] -= 500;
                wrongGuess[0]++;
              }
              error.play();
            }
          }
          //remove from freeguess if there were any
          if ((freeGuess > 0 && multiplayerSelect == 0) || (multiplayerSelect == 3 && whoseTurnMain == 1)) {
            freeGuess--;
          }
          if (multiplayerSelect == 3) {
            if (whoseTurnMain == 2) {
              freeGuess2--;
            }
          }
          crashSafe();
        }
        if (
          multiplayerSelect == 0 ||
          (multiplayerSelect == 3 && whoseTurnMain == 2)
        ) {
          //if during guessmode and you havent guessed for every letter create a new lettercard which acts as the guess marker
          if (guessMode && guessLetterDetect != chosenWordSplit.length) {
            if (guessLetterDetect <= chosenWordSplit.length) {
              if (hiddenWord[guessLetterDetect].ID == 32) {
                //guessLetterDetect shows how many letters you have guess
                guessLetterDetect++;
              }
              if (guessPhrase[guessLetterDetect] == 0) {
                guessPhrase[guessLetterDetect] = new WordGuess(50 + 75 * guessLetterDetect, 80, this.ID, true, guessLetterDetect);
                guessWordSplit[guessLetterDetect] = this.ID;
              }
            }
            guessLetterDetect++;
          }
        }
        if (multiplayerSelect == 3 && whoseTurnMain == 1) {
          if (guessMode && guessLetterDetect != chosenWordSplit2.length) {
            if (guessLetterDetect <= chosenWordSplit2.length) {
              if (hiddenWord2[guessLetterDetect].ID == 32) {
                guessLetterDetect++;
              }
              if (guessPhrase[guessLetterDetect] == 0) {
                guessPhrase[guessLetterDetect] = new WordGuess(50 + 75 * guessLetterDetect, 80, this.ID, true, guessLetterDetect);
                guessWordSplit[guessLetterDetect] = this.ID;
              }
            }
            guessLetterDetect++;
          }
        }
      }
    }
    if (this.ID == 8) {
      //if the delete button
      if (
        (mouseX > this.x * scaleNum &&
          mouseX < (this.x + 110) * scaleNum &&
          mouseY > this.y * scaleNum &&
          mouseY < (this.y + 40) * scaleNum &&
          mouseIsPressed &&
          !mouseOverlap) ||
        (keyIsPressed && keyCode == this.ID && !keyOverlap)
      ) {
        if (mouseIsPressed) {
          mouseOverlap = true;
        }
        //you can't delete if you haven't guessed anything.
        if (guessLetterDetect > 0) {
          if (
            multiplayerSelect == 0 ||
            (multiplayerSelect == 3 && whoseTurnMain == 2)
          ) {
            //if the next guess letter is a space skip it
            if (hiddenWord[guessLetterDetect - 1].ID == 32) {
              guessLetterDetect--;
            }
          }
          if (multiplayerSelect == 3 && whoseTurnMain == 1) {
            if (hiddenWord2[guessLetterDetect - 1].ID == 32) {
              guessLetterDetect--;
            }
          }
          //remove the letter card
          guessLetterDetect--;
          guessPhrase[guessLetterDetect] = 0;
          guessWordSplit[guessLetterDetect] = -1;
        }
      }
    }
    if (keyIsPressed && keyCode == this.ID && !keyOverlap) {
      //stop multiple keys being pressed if you held the button
      keyOverlap = true;
    }
  }
}

class WordGuess {
  constructor(tempX, tempY, tempID, tempGuess, tempWhich) {
    this.x = tempX - nextLine[1];
    this.y = tempY + nextLine[0];
    this.which = tempWhich;
    //if the letter is off screen then move this letter to the next line
    if (this.x > width / scaleNum - 100) {
      nextLine[0] = 100;
      nextLine[1] = this.x;
    }
    this.ID = tempID;
    this.hidden = true;
    this.guess = tempGuess;
    if (!this.guess) {
      //if there is a space card greater than x = 700 and it is the first line then move it to the next line. (the space rule is to try and avoid splitting the same word on two seperate lines.)
      if (this.ID == 32 && this.x > 700 && this.y == 95) {
        nextLine[0] = 100;
        nextLine[1] = this.x;
      }
    }
    if (
      multiplayerSelect == 0 ||
      (multiplayerSelect == 3 && whoseTurnMain == 2)
    ) {
      //if this is for guessing letters just make the x or y the same as the hiddenWord no nextLine needed
      if (this.guess && this.ID != 32) {
        this.x = hiddenWord[guessLetterDetect].x;
        this.y = hiddenWord[guessLetterDetect].y;
      }
    }
    if (multiplayerSelect == 3 && whoseTurnMain == 1) {
      if (this.guess && this.ID != 32) {
        this.x = hiddenWord2[guessLetterDetect].x;
        this.y = hiddenWord2[guessLetterDetect].y;
      }
    }
  }
  visual() {
    textFont(anton);
    //id == 32 means it is a space so don't show the card
    if (this.ID != 32) {
      if (this.guess) {
        image(specialIMG[3], this.x, this.y, 54, 90);
        fill(255);
      } else {
        image(specialIMG[2], this.x, this.y, 54, 90);
        fill(0);
      }
      textSize(40);
      //if the letter is revealed or it is guessing the letter then show which letter the card represents
      if (!this.hidden || this.guess) {
        text(char(this.ID), this.x - 9, this.y + 15);
      }
      //if letter is hidden then show the question mark
      if (this.hidden && !this.guess) {
        image(specialIMG[1], this.x, this.y, 54, 90);
        fill(255);
        text("?", this.x - 8, this.y + 15);
      }
    }
  }
  click() {
    if (
      mouseX > (this.x - 27) * scaleNum &&
      mouseX < (this.x + 27) * scaleNum &&
      mouseY > (this.y - 45) * scaleNum &&
      mouseY < (this.y + 45) * scaleNum
    ) {
      if (mouseIsPressed && !mouseOverlap) {
        mouseOverlap = true;
        //for choose a letter to reveal if the letter is not already revealed or it is not a space then reveal the letter, make chooseLetterTime = false, and check if all letters are revealed
        if (this.hidden && this.ID != 32) { 
          click.play();
          this.hidden = false;
          chooseLetterTime = false;
          checkWords();
          //the following remove said letter from the constonant/vowel reveal
          if (
          multiplayerSelect == 0 ||
          (multiplayerSelect == 3 && whoseTurnMain == 2)
        ) {
          if (
            this.ID == 65 ||
            this.ID == 69 ||
            this.ID == 73 ||
            this.ID == 79 ||
            this.ID == 85
          ) {
            for (let i = 0; i < vowelDetect.length; i++) {
              if (vowelDetect[i] == this.which) {
                vowelDetect.splice(i, 1);
              }
            }
          } else {
            for (let i = 0; i < freeLetterReveal.length; i++) {
              if (freeLetterReveal[i] == this.which) {
                freeLetterReveal.splice(i, 1);
              }
            }
          }
        } else if (multiplayerSelect == 3 && whoseTurnMain == 1) {
          if (
            this.ID == 65 ||
            this.ID == 69 ||
            this.ID == 73 ||
            this.ID == 79 ||
            this.ID == 85
          ) {
            for (let i = 0; i < vowelDetect2.length; i++) {
              if (vowelDetect2[i] == this.which) {
                vowelDetect2.splice(i, 1);
              }
            }
          } else {
            for (let i = 0; i < freeLetterReveal2.length; i++) {
              if (freeLetterReveal2[i] == this.which) {
                freeLetterReveal2.splice(i, 1);
              }
            }
          }
        }
          crashSafe();
        } else {
          error.play();
        } 
      }
      if (this.ID != 32){
      //small triangle hovering above hidden letters if it isn't a space
      fill(200, 0, 0);
      triangle(
        this.x - 30,
        this.y - 70,
        this.x,
        this.y - 50,
        this.x + 30,
        this.y - 70
      );
      }
    }
  }
}

class FireWork {
  constructor(tempX, tempY) {
    this.x = tempX;
    this.y = tempY;
    this.timer = int(random(10));
    //size starts off as zero
    this.size = 0;
    //random color
    this.color = [int(random(255)), int(random(255)), int(random(255))];
  }
  animate() {
    this.timer++;
    fill(this.color[0], this.color[1], this.color[2], 185);
    //increase size for a bit then decrease
    if (this.timer < 40) {
      this.size += int(random(10));
    }
    if (this.timer >= 40) {
      this.size -= int(random(10));
    }
    //if size is lowered past zero essentially reset the firework and make a new one
    if (this.size < 0) {
      this.done = true;
    }
    noStroke();
    circle(this.x, this.y, this.size);
  }
}

class Confetti {
  constructor(tempX, tempY, tempID) {
    this.ID = tempID;
    this.x = tempX;
    this.y = tempY;
    //three types of confetti. Id == 0 is the colored confetti on score screens. id == 1 is white rain things falling down and id == 2 is the colored rain for credits
    if (this.ID == 0) {
      this.shape = int(random(2));
      this.move = int(random(1, 10));
      this.size = [random(8, 10), random(10, 20), random(15, 30)];
      this.color = [int(random(255)), int(random(255)), int(random(255)), 235];
      this.strafe = int(random(-4, 4));
    } else {
      if (this.ID == 2){
        this.color = [int(random(255)), int(random(255)), int(random(255)), 235];
        this.move = int(random(4, 10));
        this.size = random(20, 65);
      }else{
        this.color = [255, 255, 255];
        this.move = int(random(10, 25));
        this.size = random(10, 45);
      }
      
      this.strafe = 0;
    }
  }
  animate() {
    fill(this.color[0], this.color[1], this.color[2], 235);
    //make confetti fall
    if (this.y <= 600) {
      this.y += this.move;
      this.x += this.strafe;
    }
    if (this.y > 600) {
      this.done = true;
    }
    noStroke();
    //randomized shape if colored confetti
    if (this.shape == 0) {
      circle(this.x, this.y, this.size[0]);
    }
    if (this.shape == 1) {
      rect(this.x, this.y, this.size[2], this.size[1]);
    }
    if (this.ID == 1) {
      rect(this.x, this.y, 2, this.size);
    }
    if (this.ID == 2) {
      rect(this.x, this.y, 6, this.size);
    }
  }
}

class SplashMessage {
  constructor(tempID) {
    //incase sound repeats stop the noise
    splashSound.stop();
    this.x = 1000;
    //if it is a boss defeated message play oplay
    if (tempID == 1) {
      oPlay.play();
      //for odd characters the message goes right to left
      if (playerCharacter%2 != 0){
        this.x = 1300;
      }
      //for even characters message goes left to right
      if (playerCharacter%2 == 0){
        this.x = 0;
      }
    }
    this.y = 300;
    this.ID = tempID;
    if (tempID != 3 && tempID != 4 && tempID != 8 && tempID != 1 && tempID != 12){
      //some messages play the splashSound
      splashSound.play();
    }
    this.timer = round(millis());
  }
  goDoTheThing() {
    //different appearances depending on id
    if (this.ID == 1) {
      image(cutInIMG[playerCharacter - 1], this.x, 300, 1200, 900);
      push();
      textFont(anton);
      textSize(100);
      if (playerCharacter%2 != 0){
        rotate(-10);      
        fill(250, 20, 20);
        text("Boss Defeated!", this.x - 180, this.y + 390);
      }
      if (playerCharacter%2 == 0){
        rotate(20);  
        fill(150, 20, 20);
          text("Boss Defeated!", this.x - 470, this.y + 90);
      }
      pop();
      //boss defeated have a smaller window of appearance
      if (millis() > this.timer + 1400) {
        splashThing = 0;
      }
    }
    push();
    textFont(anton);
    fill(0);
    textSize(80);
    rotate(-10);
    //guess letters splash messaged (used for beginning the word game section)
    if (this.ID == 2) {
      text("Guess Letters!", this.x, this.y);
    }
    //player 1 turn splash message (used during multiplayer)
    if (this.ID == 3) {
      //clarity box which is the player's color
      fill(0, 170);
      rect(this.x - 24, this.y - 82, 468, 108);
      fill(200, 0, 0, 170);
      rect(this.x - 20, this.y - 78, 460, 100);
      fill(255);
      text("Player 1 Turn!", this.x, this.y);
    }
    //player 2 turn splash message (used during multiplayer)
    if (this.ID == 4) {
      push();
      textFont(anton);
      //clarity box which is the player's color
      fill(0, 170);
      rotate(20);
      rect(this.x - 24, this.y - 82, 488, 108);
      fill(0, 0, 200, 170);
      rect(this.x - 20, this.y - 78, 480, 100);
      fill(255);
      textSize(80);
      text("Player 2 Turn!", this.x, this.y);
      pop();
    }
    //guess the phrase splash message (used when clicking guess phrase button)
    if (this.ID == 5) {
      push();
      textFont(anton);
      textSize(80);
      text("Guess The \nPhrase!", this.x, this.y);
      pop();
    }
    //choose a letter to reveal splash message (used when defeating enemyID = 4)
    if (this.ID == 6) {
      //there is a different background when choosing a letter to reveal with multiplayer being light colored and singleplayer having a dark background so different text color helps make it legible
      if (multiplayerSelect == 0){
        fill(255);
      }else{
        fill(0);
      }
      text("Choose A Letter \n  To Reveal!", this.x, this.y);
    }
    //over play begin splash message (used when over play begins duh)
    if (this.ID == 9) {
      //clarity box which is the red and black like the wild cards
      fill(0, 170);
      rect(this.x - 24, this.y - 82, 558, 108);
      fill(200, 0, 0, 170);
      rect(this.x - 20, this.y - 78, 550, 100);
      fill(255);
      text("Over Play Begin!", this.x, this.y);
    }
    //hail mary guess splash message (used when you run out of all score in the word game phase)
    if (this.ID == 10) {
      fill(250, 0, 0);
      text("Hail Mary Guess!", this.x - 20, this.y);
    }
    //correct splash message (used when you correclty guess a word or )
    if (this.ID == 11) {
      fill(250, 0, 0);
      text("CORRECT!", this.x - 20, this.y);
    }
    pop();
    textFont(anton);
    fill(255);
    textSize(80);
    //match over splash message (used when someone wins multiplayer)
    if (this.ID == 7) {
      text("MATCH OVER!", this.x, this.y);
    }
    //back to battle (used when returning to battle from use free guesses)
    if (this.ID == 8) {
      text("Back To Battle", this.x, this.y);
    }
    if (this.ID == 12) {
      //the dodge icon only occurs in multiplayer as it is too distracting and annoying/confusing in singleplayer
      //clarity box which is the dodge status green
      textSize(40);
      fill(0, 170);
      rect(this.x - 100, this.y - 265, 230, 70);
      fill(0, 210, 0);
      image(statusIMG[6], this.x - 60, this.y - 230, 50, 50);
      text("DODGED!", this.x - 20, this.y - 210);
      //dodge has shorter time
      if (millis() > this.timer + 1400) {
        splashThing = 0;
      }
    }
    if (this.ID > 1) {
      //remove the message after a set time
      if (millis() > this.timer + 1600) {
        splashThing = 0;
      }
    }
    //moves the message
    if (millis() < this.timer + 190) {
      if (this.ID == 1){
        if (playerCharacter%2 != 0){
        this.x -= 70;
      }
      if (playerCharacter%2 == 0){
        this.x += 70;
      }
      }else{
        this.x -= 70;
      }
    }
    //because the x changes every frame where the message is located is based on the frame rate so the following ensures that the message is on screen
    if (millis() > this.timer + 190 && millis() < this.timer + 220){
      if (this.ID == 1){
        if (playerCharacter%2 != 0){
        this.x = 740;
      }
      if (playerCharacter%2 == 0){
        this.x = 600;
      }
      }else if (this.ID != 13){
        this.x = 740;
      }
      if (this.ID == 12){
        this.x = 1090;
      } 
    }
    //small figit to keep the message alive
    if (millis() > this.timer + 190 && this.timer < millis < this.timer + 1600) {
      this.x += int(random(-8, 8));
      this.y += int(random(-3, 3));
    }
  }
}

class Cloud{
  constructor(){
    //which randomly chooses if cloud starts on the right or left side
    let which = int(random(2));
    this.which = which;
    //either start the cloud on the left or right side of the screen
    if (which == 0){
      this.x = (-125 - int(random(500)));
    }else{
      this.x = (1425 + int(random(500)));
    }
    //random y, size, speed, and id image
    this.y = int(random(30, 130));
    this.ID = int(random(4))
    this.speed = round(random(0.5,4), 2);
    this.size = int(random(120, 250));
    this.transparency = int(random(190, 255));
    this.color = int(random(30, 255));
  }
  move(tempID){
    //cloud image is random and size is random. (all clouds images are the same dimensions so the size works out)
    tint(this.color, this.transparency);
    image(cloudIMG[this.ID], this.x, this.y, this.size, this.size * 3/5);
    tint(255);
    if (tempID < 3){
      //it looked bad when the clouds who appear over the logo went directly over the logo so the following block of code changes their y value to be slightly above or below but still overlapping the logo. it looks better
      if (this.y > 35 && this.y < 100){
        let newY = shuffle([int(random(30, 35)), int(random(100, 130))]);
        this.y = newY[0];
      }
    }
    //if the cloud started on the right side of the screen move it left
    if (this.which == 1){
      this.x -= this.speed
      if (this.x < -200){
        //make a new cloud if the cloud goes off screen
        cloudArray[tempID] = new Cloud();
      }
    }else{
      //if the cloud started on the left side of the screen move it right
      this.x += this.speed
      if (this.x > 1500){
        cloudArray[tempID] = new Cloud();
      }
    }
  }
}

class OptionsUpDown{
  constructor(tempID){
    this.ID = tempID;
    //different placement based on id
    if (this.ID == 0){
      this.x = 850;
      this.y = 165;
    }
    if (this.ID == 1){
      this.x = 1030;
      this.y = 165;
    }
    if (this.ID == 2){
      this.x = 860
      this.y = 430;
    }
    if (this.ID == 3){
      this.x = 1030;
      this.y = 430;
    }
    if (this.ID == 4){
      this.x = 860
      this.y = 370;
    }
    if (this.ID == 5){
      this.x = 1030;
      this.y = 370;
    }
    //get just the arrow head from the back arrow
    this.img = arrow.get(1040, 0, 400, 780);
  }
  show(){
    push();
    //if it is a up arrow make it rotate up
    if (this.ID % 2 == 0){
      translate(this.x + 10, this.y - 23);
      rotate(270);
      image(this.img, 0, 0, 30, 35);
    }else{
      //if down arrow rotate it down
      translate(this.x + 10, this.y - 17);
      rotate(90);
      image(this.img, 0, 0, 30, 35);
    }
    pop();
  }
  click(){
    if (
        mouseX > (this.x - 10) * scaleNum &&
        mouseX < (this.x + 30) * scaleNum &&
        mouseY > (this.y - 40) * scaleNum &&
        mouseY < (this.y) * scaleNum
      ) {
      fill(255, 0, 0);
      rect(this.x - 10, this.y - 40, 40, 40);
      if (mouseIsPressed && !mouseOverlap){
        mouseOverlap = true;
        if (this.ID == 0){
          //id == 0 and 1 changes canvas size 
          scaleNum += 0.01;
          //move the camera to be centered and resize canvas
          resizeCanvas(1300 * scaleNum, 600 * scaleNum);
          currCamera.move(650 * scaleNum, 300 * scaleNum, 0);
        }
        if (this.ID == 1){
          scaleNum -= 0.01;
          //move the camera to be centered and resize canvas
          resizeCanvas(1300 * scaleNum, 600 * scaleNum);
          currCamera.move(650 * scaleNum, 300 * scaleNum, 0);
        }
        if (this.ID == 2){
          //id == 2 and 3 change volume
          volumeNum += 0.01;
          hit1.setVolume(0.2 * volumeNum);
          frozenSound.setVolume(0.7 * volumeNum);
          hit2.setVolume(0.9 * volumeNum);
          oPlay.setVolume(0.7 * volumeNum);
          land.setVolume(0.4 * volumeNum);
          sparkle.setVolume(0.5 * volumeNum);
          splashSound.setVolume(0.2 * volumeNum);
          bigHit.setVolume(0.4 * volumeNum);
          hurt.setVolume(0.7 * volumeNum);
          hurt2.setVolume(0.7 * volumeNum);
          gun.setVolume(volumeNum);
          click.setVolume(volumeNum);
          heal.setVolume(volumeNum);
          error.setVolume(0.7 * volumeNum);
        }
        if (this.ID == 3){
          volumeNum -= 0.01;
          hit1.setVolume(0.2 * volumeNum);
          frozenSound.setVolume(0.7 * volumeNum);
          hit2.setVolume(0.9 * volumeNum);
          oPlay.setVolume(0.7 * volumeNum);
          land.setVolume(0.4 * volumeNum);
          sparkle.setVolume(0.5 * volumeNum);
          splashSound.setVolume(0.2 * volumeNum);
          bigHit.setVolume(0.4 * volumeNum);
          gun.setVolume(volumeNum);
          hurt.setVolume(0.7 * volumeNum);
          hurt2.setVolume(0.7 * volumeNum);
          click.setVolume(volumeNum);
          heal.setVolume(volumeNum);
          error.setVolume(0.7 * volumeNum);
        }
        if (this.ID == 4){
          //id 4 and 5 change music volumes
          volumeNum2 += 0.01;
          menuTheme.setVolume(0.1 * volumeNum2);
          battleTheme.setVolume(0.13 * volumeNum2);
          bossTheme.setVolume(0.09 * volumeNum2);
          wordGameTheme.setVolume(0.7 * volumeNum2);
          winnerTheme.setVolume(0.1 * volumeNum2);
        }
        if (this.ID == 5){
          volumeNum2 -= 0.01;
          menuTheme.setVolume(0.1 * volumeNum2);
          battleTheme.setVolume(0.13 * volumeNum2);
          bossTheme.setVolume(0.09 * volumeNum2);
          wordGameTheme.setVolume(0.7 * volumeNum2);
          winnerTheme.setVolume(0.1 * volumeNum2);
        }
        click.play();
      }
    }else{
      fill(0);
      rect(this.x - 10, this.y - 40, 40, 40);
    }
  }
}
//#profit