//The King's Hand
//By Jason Le 
//Thanks to the Coding Train Youtube Channel as I learnt everything from his videos (this is the first time I have ever programed using p5), this is also the first time I have ever made a game complete from scratch (as in programming, art, (i am not an artist) and concept
//Another thanks to the game Dicey Dungeons which I took a lot of inspiration from when thinking of the mechanics of the of the game.

//Fundamental Global Variables
let loading = true;
let loadTracker = 0;
let screen = 0;
let endGame = 0; 
//screen scaleNum and tempScale deals with the scale of the canvas according to screen size
let scaleNum = 1;
let tempScale = [];
//volumeNum deals with sound effects while voleumeNum2 deals with music volume
let volumeNum = 1;
let volumeNum2 = 1;
let middleOfGame = false;
//-mouseOverlap and keyOverlap prevents dual clicks/ key presses
let mouseOverlap = true;
let keyOverlap = false;
p5.disableFriendlyErrors = true;

//timers. [0] title word wave, [1] player weaken text, [2] option card wave, [3] look away text flash, [4] endless road movement, [5] heal effect for rage mode, [6] score board appearance, [7] red hurt screen flash, [8] enemy health bar change flourish, [9] leaderboard text flash, [10] guessmode text flash, [11] multiplayer wintner text flash
let timer = [0, 0, 0];
//Ultimate Stats (playerHealth, mainScore chosenword, hiddenword, chosenWordSplit, enemyDifficulty1, 2, 3)
let ultimateStats;
//multiplayer select signifies if player is in singleplayer or multiplayer mode
let multiplayerSelect = 0;
//playerTurn states if it is the singleplayer turn to attack
let playerTurn = true;
//whoseturn deals with whose turn it is in a mulitplayer battle while whoseTurnMain deals with whose turn it is in multiplayer overall
let whoseTurn = 1;
let whoseTurnMain = 1;
let turnCount = 0;
//startCardBattleSetupV ensures that the startCardBattleSetup function occurs once duing the setup of a player's turn
let startCardBattleSetupV = 0;
//optionButton is an array that houses the option screen arrows
let optionButton = [];

//Leaderboard Variables. the leaderBoard array houses all leaderboard stats in the order of (name round score) it first starts with the king's stats first place through 3rd place then the queen etc...
let leaderBoard = [];
let leaderBoardID;

//Title screen variables
let cloudArray = [];
let titleY = [68, 68, 68, 85];

//Level Variables
//levelScreen tracks what level the player is currently on, level array houses the level select sticky notes, and levelUnlock trakcs which levels are unlocked 
let levelScreen = 0;
let level = [];
let levelUnlock = 1;

//Letter Setup Variables
//letters array houses the guessing letters for the word game screen, chooseLetterTime states whether the player is picking a letter to reveal
let letters = [];
let chooseLetterTime = false;
//nextLine is used when making the hidden word in order to have longer words or phrases appear on two lines
let nextLine = [0, 0];
//wordMode is true when the player is using free guesses and still in battle, this is to stop the player from loosing score on a free guess
let wordMode = false;

//Guess Mode Variables
let guessMode = false;
//guessPhrase is an array that houses the objects that show what word you are guessing
let guessPhrase = [];
//guessLetterDetect detects if the player guessed all letters
let guessLetterDetect = 0;
//guessWordSplit houses the ids of the word the player guessed
let guessWordSplit = [];
//guessPenalty is for multiplayer if a player guess the word wrong they recieve a penalty the next batle they are in
let guessPenalty = [false, false];

//Word Game Variables
//freeLetter tracks how many constonants are in a hidden word, while freeLetterReveal tracks which character in the word are constonants
let freeLetter = 0;
let freeLetterReveal = [];
let freeGuess = 0;
//vowelV and vowelDetect do the same as freeLetter but for vowels
let vowelDetect = [];
let vowelV = 0;
//hidden Word is an array that houses the hidden letters
let hiddenWord = [];
//chosenWord tracks the hidden word is, while chosenWordSplit houses the ids of the letters in the word
let chosenWord;
let chosenWordSplit;
//pickletters is an array that houses the objects whihc are used on the keyboard in the wordGameScreen
let pickLetters = [];
//characters ids in the order of the standard qwerty keyboard
let qwertyOrder = [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 65, 83, 68, 70, 71, 72, 74, 75, 76, 90, 88, 67, 86, 66, 78, 77];

//Multiplayer Word Game Variables
//all the following variables are the same as the section above but are used for multiplayer to keep track of seperate words
let freeLetter2 = 0;
let freeLetterReveal2 = [];
let freeGuess2 = 0;
let vowelDetect2 = [];
let vowelV2 = 0;
let hiddenWord2 = [];
let chosenWord2;
let chosenWordSplit2 = [];
let pickLetters2 = [];

//Animal Theme Words
let wordsLVL1 = ["DINOSAUR", "GIANT PANDA", "RED PANDA", "DOMESTICATED DOG", "PET KITTEN", "PTERODACTYL", "BLOB FISH", "HAMMERHEAD SHARK", "CLOWNFISH", "CHIMERA", "GORILLA", "BLUE WHALE", "PUFFERFISH", "CROCODILE", "WYVERN", "DRAGON", "TORTOISE", "CHIMPANZEE", "COCKROACH", "MAMMALS", "ELEPHANT", "WOOLLY MAMMOTH", "POLAR BEAR", "BALD EAGLE", "SEA OTTER", "PLATYPUS", "BULLFROG", "HUMMINGBIRD", "RATTLESNAKE", "CATTLE", "GIRAFFE", "CAPYBARA", "RACOON", "AMPHIBIAN", "SQUIRREL", "HEDGEHOG", "RHINOCEROS", "HAMSTER", "REPTILE", "WILDEBEEST", "GREAT WHITE SHARK", "JELLYFISH", "AARDVARK", "GUINEA PIG", "GERMAN SHEPHERD", "ALLIGATOR", "MOUNTAIN GOAT", "PYTHON SNAKE", "ANACONDA", "CATERPILLAR", "ARTIC FOX", "KANGAROO", "ANGLERFISH", "KING PENGUIN", "ANTEATER", "AXOLOTL", "TARANTULA", "CATFISH", "ARMADILLO", "BLACK BEAR", "LABRADOR RETRIEVER", "WATER SCORPION", "BARRACUDA", "OCTOPUS", "BLOODHOUND", "BRACHIOSAURUS", "BUMBLEBEE", "BARNACLE", "BUTTERFLY", "BLACK WIDOW", "CENTIPEDE", "CHEETAH", "CHIPMUNK", "CHAMELEON", "CHICKADEE", "SALMON FISH", "CORAL SNAKE", "CARIBOU", "VIPER SNAKE", "SPARROW", "LEOPARD", "COCKATOO", "DALMATIAN", "DOLPHIN", "KILLER WHALE", "WOODPECKER", "DRAGONFLY", "EARTHWORM", "BANDICOOT", "PHOENIX", "ECHIDNA", "VULTURE", "ELECTRIC EEL", "FOXHOUND", "SALAMANDER", "FLAMINGO" ,"FRUIT FLY", "PANTHER", "GROUNDHOG", "GOLDFISH", "HERCULES BEETLE", "HIPPOPOTAMUS", "HERMIT CRAB", "HOUSEFLY", "JACKRABBIT", "CHAMELEON", "LADYBUG", "GRASSHOPPER", "LABRADOODLE", "CRICKET", "NAKED MOLE RAT", "NARWHAL", "CARDINAL", "PARAKEET", "POISON DART FROG", "PHEASANT", "PEACOCK", "CITY PIGEON", "REINDEER", "ROOSTER", "ROYAL PENGUIN", "SEA DRAGON", "SPIDER MONKEY", "SPIDER PIG", "SWORDFISH", "ORANGUTAN", "STARFISH", "SPERM WHALE", "TIGER SHARK", "TYRANNOSAURUS REX", "TERMITE", "VENUS FLYTRAP", "WARTHOG", "STINGRAY", "BUFFALO", "FENNEC FOX", "BROWN BEAR", "GRIZZLY BEAR", "PORCUPINE", "ALBATROSS", "KOMODO DRAGON"];

//School Theme Words
let wordsLVL2 = ["GIVE ME YOUR PHONE", "SCHOOL LUNCH", "NORTH STAR", "HIGH SCHOOL", "FUTURE BUSINESS LEADERS", "SUBSTITUTE TEACHER", "FRESHMAN YEAR", "SOPHOMORE STUDENT", "JUNIOR GRADE LEVEL", "SENIORITIS", "TEACHER PET", "CLASSROOM", "PRINCIPAL", "CLASS CLOWN", "SUPERINTENDENT", "MECHANICAL PENCIL", "NOTEBOOK PAPER", "PERIODIC TABLE", "LUNCH LADY", "ALPHABETICAL ORDER", "TRANSFER STUDENT", "SPELLING BEE", "CLASS IS NOW DISMISSED", "CLASS IS IN SESSION", "GROUP PROJECT", "HOMEWORK", "COMPUTER ROOM", "MIDDLE SCHOOL", "ELEMENTARY SCHOOL", "FIELD TRIP", "PLEDGE OF ALLEGIANCE", "TEST STUDY GUIDE", "COMMUNITY COLLEGE", "BACHELORS DEGREE", "ASSOCIATES DEGREE", "MASTERS DEGREE", "BACKPACK", "CLASSMATE", "DETENTION", "MITOCHONDRIA", "CAFETERIA", "CLASS SCHEDULE", "CLUBMATES", "CHROMEBOOK", "SKIPPING CLASS", "KINDERGARTEN", "TEACHER LOUNGE", "PACER TEST", "TARDY POLICY", "SEMESTER BREAK", "MARKER BOARD", "ANNOUNCEMENTS", "SCHOOL NEWSPAPER", "TARDY POLICY", "DETENTION", "SCHOOL MASCOT", "MULTIPLICATION TABLE", "SCHOOL ID", "ONLINE LEARNING", "PARENT TEACHER CONFERENCE", "UPPERCLASSMAN", "GRADUATION", "CAP AND GOWN", "UNIVERSITY", "WINTER BREAK", "SUMMER BREAK", "MARKER BOARD", "PLACEMENT TEST", "COLD LUNCH", "RECESS TIME", "PLAYGROUND", "HONOR ROLL", "DIPLOMA", "TEXTBOOK", "SEMESTER","SYLLABUS", "SCHOOL BULLY", "ASSIGNMENT", "BUS RIDE", "SCIENCE LAB", "STUDENT COUNCIL", "DEBATE TEAM", "BOOK REPORT", "VALEDICTORIAN", "COMPREHENSION", "KNOWLEDGE", "LEARNING", "PRESENTATION", "VOCABULARY", "TRUANCY POLICY", "EXPULSION", "SUSPENSION", "SCHOOL UNIFORM", "EXTRACURRICULAR", "PEER PRESSURE", "ORCHESTRA", "COUNSELOR", "ADVANCED PLACEMENT", "BOARDING SCHOOL", "BIOLOGY", "CURRICULUM", "EDUCATION", "EXTRA CREDIT", "EXCHANGE STUDENT", "STUDY ABROAD", "HOMESCHOOLING", "PRESCHOOL", "PUBLIC SCHOOL", "POP QUIZ", "SCHOLARSHIP", "PERSONAL STATEMENT", "SCHOOL BUS", "SCIENCE FAIR", "SOCIOLOGY", "STUDENT LOAN", "PAYING TUITION", "VISUAL LEARNER", "READING TIME", "SCHOOL SPIRIT", "FRAT HOUSE", "SORORITY SISTERS", "ZOOM MEETING", "SEMINARS", "FRACTIONS", "FACULTY", "ACADEMY", "ADDITION", "MULTIPLICATION", "DIVISION", "SUBTRACTION", "READING TIME", "SCHOOL BULLY", "POPULAR KIDS"];

//Food Theme Words
let wordsLVL3 = ["CHEESEBURGER", "PLAIN HAMBURGER", "TEQUILLA SHOT", "STONEBAKED PIZZA", "MOZZARELLA STICKS", "KETCHUP BOTTLE", "BURRITO WRAP", "FRENCH TOAST STICKS", "BACON AND EGGS", "BELGIAN WAFFLE", "MAPLE SYRUP", "FAST FOOD", "RESTAURANT", "KITCHEN", "EXPIRED MILK", "SODA OR POP", "PINK SAUCE", "SWEET AND SOUR SHRIMP", "ALFREDO SAUCE", "MARINARA SAUCE", "SPAGHETTI NOODLE", "TORTILLA", "ALPHABET SOUP", "FRENCH FRIES", "A SLICE OF BREAD", "PEANUT BUTTER SANDWICH", "CHOCOLATE CHIP COOKIE", "ICE CREAM", "COOKIES AND CREAM", "STRAWBERRY", "VANILLA FLAVOR", "CHOCOLATE", "WHOPPER BURGER", "WEDDING CAKE", "UTENSILS", "WATER BOTTLE", "DECAF COFFEE", "SPARKLING WATER", "MACAROON", "MACARONI NOODLES", "POTATO CHIPS", "HEAD CHEF", "SEAFOOD DISH", "CANNIBALISM", "FRUITS AND VEGETABLES", "FIVE COURSE MEAL", "HERSHEY CHOCOLATE", "FRIED RICE", "SCRAMBLED EGGS", "A STACK OF PANCAKES", "BON APPETIT", "PRINGLES", "STRING CHEESE", "DESSERT MENU", "MAIN COURSE MEAL", "APPETIZER", "BREAKFAST MENU", "ALL YOU CAN EAT BUFFET", "WENDYS FOFOFO", "KUNG PAO CHICKEN", "BARBEQUE", "PULLED PORK", "GRILLED CHICKEN", "SALAMI LID", "CHICKEN NUGGETS", "STUFFED CRUST", "PEPPERONI", "FRESH AVACADO", "NO TOPPINGS", "GRAPEFRUIT", "CORN ON A COB", "ORANGE JUICE", "MILK GALLON", "MEASURING CUP", "TEASPOON", "BUTTER KNIFE", "GREEN APPLE", "WHITE BREAD", "WHOLE GRAIN BREAD", "MCDONALDS", "BURGER KING", "MILKSHAKE", "GREEN EGGS AND HAM", "FISH AND CHIPS", "BAGGUETTE", "CHILI DOGS", "GHOST PEPPER", "CAROLINA REAPER", "CULINARY", "OVEN MITTS", "SPILLING", "DAIRY PRODUCT", "WATERMELON", "SPICY CURRY", "SWEET POTATO", "CABBAGE", "RANCH DRESSING", "KETCHUP", "SHISH KEBAB", "BALOGNA", "CRISPY BACON", "FRIED RICE", "CONDIMENTS", "DUMPLINGS", "SANDWICH", "CUISINE", "DEEP FRYING", "AIR FRYER", "PRESSURE COOK", "GARNISH", "PASTRY CHEF", "RATATOUILLE", "SEASONING", "BONE IN CHICKEN", "BONELESS CHICKEN", "KIT KAT BAR", "BLUEBERRY MUFFIN", "OREO COOKIE", "PEPPERMINT", "LOW CALORIE DIET", "CARBOHYDRATE", "VEGETARIAN", "MINT CHOCOLATE CHIP", "VEGGIE BURGER", "CHEWING", "HOME COOKED MEAL", "VENDING MACHINE", "SALTINE CRACKER", "STARVATION", "COOKIE DOUGH", "LASAGNA"];

//Video Games Theme Words
let wordsLVL4 = ["KONAMI CODE", "NINTENDO", "ELECTRONIC ARTS", "CHEAT CODES", "CEL SHADING", "PLAYSTATION", "XBOX SERIES X", "NINTENDO SWITCH", "GAMECUBE", "GAME BOY", "ARCADE MACHINE", "GAME AWARDS", "FAMICON SYSTEM", "DONKEY KONG", "INTELLIVISION", "SUPER MARIO BROTHERS", "CALL OF DUTY", "SONIC THE HEDGEHOG", "UNREAL ENGINE", "VIDEO GAMES", "GAME CONTROLLER", "THE LEGEND OF ZELDA", "BANDAI NAMCO", "ATARI GAMES", "POKEMON GAME", "MINIGAME", "HEALTH BAR", "LETS PLAY", "JOYSTICK", "CONTROLLER RUMBLE", "FIRST PERSON SHOOTER", "ROLE PLAYING GAME", "SPACE INVADERS", "INDIE GAME DEVELOPER", "THIRD PARTY GAME", "FIRST PARTY GAME", "PICK UP AND PLAY", "MULTIPLAYER", "SINGLEPLAYER", "ENDLESS ENTERTAINMENT", "CUTSCENE", "PLATFORMER", "STATS MENU", "POWERUPS", "NEW GAME PLUS", "TETRIS BLOCK", "MAIN MENU", "FRIEND CODE", "ROLLBACK NETCODE", "FIGHTING GAME", "OPEN WORLD GAME", "DANCE DANCE REVOLUTION", "NES ZAPPER", "BLIZZARD ENTERTAINMENT", "BAYONETTA", "XENOBLADE", "GUILTY GEAR", "STREET FIGHTER", "MORTAL KOMBAT", "GEARS OF WAR", "SPEEDRUNNER", "EMULATOR", "FRAMES PER SECOND", "MOBILE GAMES", "LEADERBOARDS", "ESPORTS TEAM", "CONSOLE VS PC", "GAMEPAD", "TRIPLE A GAME", "EIGHT BIT", "AWAY FROM KEYBOARD", "AIMBOT", "BETA TESTER", "ALPHA RELEASE", "AREA OF EFFECT", "BATTLE ROYAL", "BATTLE PASS", "MICROTRANSACTION", "BONUS STAGE", "DEBUFF", "STATUS EFFECT", "CARTRIDGE", "CHARACTER CREATOR", "CLOUD GAMING", "COMPLETIONIST", "GAME THEORY", "COOPERATIVE GAME", "CRITICAL HIT", "CROSS PLATFORM", "DOWNLOADABLE CONTENT", "DUNGEON CRAWLING", "HACK AND SLASH", "EXPERIENCE POINT", "FAST TRAVEL", "FINAL BOSS", "FREE TO PLAY", "GATCHA GAME", "GAME OVER", "GOOD GAME", "GAME OF THE YEAR", "HANDHELD", "HIT POINTS", "HITBOX", "IDLE ANIMATION", "USER INTERFACE", "LOCAL MULTIPLAYER", "MATCHMAKING", "MINIMAP", "MOTION CONTROL", "MULTIPLATFORM", "NEWBIE PLAYER", "NO SCOPE", "PACK IN GAME", "PARTY GAME", "PAY TO WIN", "PERMADEATH", "PHYSICAL RELEASE", "DIGITAL ONLY", "DOWNLOAD CODE", "PLAYTESTING", "POGGERS", "POWER UP", "PUBLIC LOBBY", "QUICK TIME EVENT", "QUICK SAVE", "RAGE QUIT", "RANDOM ENCOUNTER", "TURN BASED", "REAL TIME STRATEGY", "REPLAY VALUE", "RETRO GAMING", "RHYTHM GAME", "ROGUELIKE", "RNGESUS", "ROM HACKING", "SANDBOX GAME", "SAVE SCUMMING", "SAVE POINT", "SEASON PASS", "SEQUENCE BREAK", "SHOVELWARE", "SIDE SCROLLER", "SKILL TREE", "SOFTLOCK", "DARK SOULS", "SPAWN CAMPING", "SPLASH DAMAGE", "SPLIT SCREEN", "STRATEGY GUIDE", "TEAM KILL", "VISUAL NOVEL", "DAY ONE PATCH", "LOADING TIME", "CHARACTER SELECT MENU", "GRAND THEFT AUTO", "FORTNITE", "MINECRAFT", "RED DEAD REDMPTION", "COUNTERStRIKE", "GOD OF WAR", "ELDEN RING", "ANGRY BIRDS", "CANDY CRUSH", "STARDEW VALLEY", "ELDER SCROLLS", "SKILL ISSUE", "RESUME GAME", "PROFILE PICTURE", "USERNAME", "PLANTS VS ZOMBIES", "SUBNAUTICA", "DEATH STRANDING", "BREATH OF THE WILD", "GOAT SIMULATOR"];

//Cinema Theme Words
let wordsLVL5 = ["THE GODFATHER", "CINEMA EXPERIENCE", "THE BIG SCREEN", "THREE DIMENSIONS", "THE FOURTH WALL", "CINEMATIC UNIVERSE", "SMELLOVISION", "BOX OFFICE", "THE SILVER SCREEN", "SURROUND SOUND", "TICKET SALES", "MOTION PICTURE", "CINEMATOGRAPHY", "FEATURETTE", "FILMMAKING", "MOVIE THEATER", "SCREENPLAY", "HOLLYWOOD", "FEATURE FILM", "BLOCKBUSTER", "ROMANTIC COMEDY", "PULP FICTION", "CAPTAIN AMERICA", "POST CREDITS SCENE", "FILM PROJECTOR", "INCEPTION", "TOP BILLING", "BEST PICTURE", "DUTCH CAMERA ANGLE", "DOLLY CAMERA ZOOM", "THE TERMINATOR", "ANTOLOGY FILM", "ASPECT RATIO", "BLOOPERS", "BODY DOUBLE", "STUNT DOUBLE", "SURPRISE CAMEO", "CAMERA ANGLE", "CATCHPHRASE", "COMPUTER GENERATED", "METHOD ACTING", "CHICK FLICK", "CLAYMATION", "CLIFFHANGER", "COMIC RELIEF", "COMING OF AGE FILM", "COMPOSITION", "CHECHOVS GUN", "MACGUFFIN", "TITLE CRAWL", "FILM CRITIC", "CROSS FADE", "DEUS EX MACHINA", "DIGETIC SOUND", "SOUND EFFECTS", "DIRECTORS CUT", "ESTABLISHING SHOT", "EPILOUGE", "EXECUTIVE PRODUCER", "EXTREME CLOSE UP", "FILM NOIR", "FISH EYE LENS", "FLASHBACK", "FOLEY ARTIST", "FORESHADOWING", "FRAME RATE","HANDHELD SHOT", "HIGH DEFINITION", "HITTING YOUR MARK", "ICONOGRAPHY", "ROTTEN TOMATOES", "INSERT SHOT", "JUMP CUT", "INTERMISSION", "LEITMOTIF", "MAGIC HOUR", "MATCH CUT", "MELODRAMA", "MOCKUMENTARY", "DOCUMENTARY", "MONEY SHOT", "ONE LINER", "PRODUCTION DESIGN", "ROTOSCOPING", "ROUGH CUT", "SCREEN WRITER", "SHOWRUNNER", "SHUTTER SPEED", "SLOW MOTION", "SPLIT REEL", "STATIC SHOT", "STEADICAM", "THE TITANIC", "THE GREAT GATSBY", "THE SOUND OF MUSIC", "STAR WARS", "HARRY POTTER", "LORD OF THE RINGS", "THE DARK KNIGHT", "FERRIS BULLER", "FORREST GUMP", "DEADPOOL", "SCHINDLERS LIST", "FIGHT CLUB", "THE MATRIX", "WIZARD OF OZ", "BACK TO THE FUTURE", "SPIRITED AWAY", "THE INCREDIBLES", "TOY STORY", "RATATOUILLE", "THE LION KING", "WHIPLASH", "INDIANA JONES", "HARRISON FORD", "BRAD PITT", "LEONARDO DICAPRIO", "AVENGERS ENDGAME", "CITIZEN KANE", "A CLOCKWORK ORANGE", "MONTY PYTHON", "JURASSIC PARK", "STORY BOARD", "VISUAL EFFECTS", "INSIDE OUT", "MONSTERS INC", "GROUNDHOG DAY", "ALADDIN", "SNOW WHITE", "REEL TAPE", "ACADEMY AWARDS", "SHOWTIME", "TYPECAST", "CELEBRITY"];

//American History Theme Words
let wordsLVL6 = ["THE CIVIL WAR", "GREAT DEPRESSION", "AMERICAN REVOLUTION", "REVOLUTIONARY WAR", "PROHIBITION", "GEORGE WASHINGTON", "ABRAHAM LINCOLN", "WATERGATE SCANDAL", "CONSTITUTIONAL CONVENTION", "FEDERALIST", "PATRIOTIC ARMY", "GETTYSBURG ADDRESS", "DECLARATION OF INDEPENDANCE", "ALEXANDER HAMILTON", "THOMAS JEFFERSON", "BENJAMIN FRANKLIN", "WHISKEY REBELLION", "BOSTON TEA PARTY", "LOUISIANA PURCHASE", "MONROE DOCTRINE", "DRED SCOTT DECISION", "JIM CROW LAWS", "PLESSY V FERGUSON", "FIRESIDE CHAT", "FRANKLIN D ROOSEVELT", "STOCK MARKET CRASH", "ATOMIC BOMB", "COLD WAR WITH RUSSIA", "VIETNAM WAR", "CUBAN MISSILE CRISIS", "HARRY TRUMAN", "LEAGUE OF NATIONS", "MARTIN LUTHER KING JR", "RONALD REAGAN", "LEWIS AND CLARK", "THEODORE ROOSEVELT", "BILL OF RIGHTS", "CIVIL LIBERTIES", "CIVIL RIGHTS ACT", "VOTING RIGHTS ACT", "WOMEN SUFFERAGE", "AMENDMENTS", "BROWN V BOARD", "FREEDOM OF SPEECH", "REDCOATS", "EMANCIPATION", "BIG STICK POLICY", "BLEEDING KANSAS", "BUS BOYCOTT", "CAPITALISM", "THE RED SCARE", "COLUMBIAN EXCHANGE", "DOMINO THEORY", "THE DUST BOWL", "ELECTORAL COLLEGE", "GRANDFATHER CLAUSE", "GREAT AWAKENING", "GREAT PLAINS", "BLACK LIVES MATTER", "IMPERIALISM", "INDIAN REMOVAL", "TRAIL OF TEARS", "OPEN DOOR POLICY", "NATIONALISM", "PATRIOTIC", "THE NEW DEAL", "MANHATTAN PROJECT", "LITERACY TEST", "PANAMA CANAL", "PLANTATION", "POLL TAX", "SCOPES TRIALS", "SHARECROPPING", "UNALIENABLE RIGHTS", "SOCIAL SECURITY", "MANIFEST DESTINY", "ANACONDA PLAN", "ANTIFEDERALIST", "BAY OF PIGS FIASCO", "CAMP DAVID ACCORDS", "JIMMY CARTER", "CARPETBAGGERS", "THE GREAT COMPROMISE", "CONEY ISLAND", "CHIEF JUSTICE", "FREDERICK DOUGLAS", "FUGITIVE SLAVE LAW", "GREENBACK PARTY", "HOOVERVILLES", "IMPLIED POWERS", "IRANIAN HOSTAGE CRISIS", "KANSAS NEBRASKA ACT", "KNIGHTS OF LABOR", "KNOW NOTHING PARTY", "DOVES AND HAWKS", "LAISSEZ FAIRE", "UNITED NATIONS", "LEND LEASE ACT", "LITTLE ROCK NINE", "MALCOLM X", "JAMES MADISON", "MARSHALL PLAN", "NATIONALIST", "ROSA PARKS", "SEPERATE BUT EQUAL", "PEARL HARBOR", "PING PONG DIPLOMACY", "POPULAR SOVEREIGNTY", "SHAYS REBELLION", "SHERMAN ANTITRUST ACT", "STAMP ACT", "TEMPERANCE", "SOJOUMER TRUTH", "WAR POWERS ACT", "YELLOW JOURNALISM", "ZIMMERMANN TELEGRAM", "SECRET SERVICE", "TENOCHTITLAN"];

//Enemy Variables
let enemyName = "Dummy Dumb";
//nextEnemy is a variable that marks whether the player is in the choosing next enemy phase
let nextEnemy = false;
//enemy difficulty marks how hard the four different enemies should be 
let enemyDifficulty = [0, 0, 0, 0];
//enemyUnleashed is a variable that becomes false after a player defeats a boss enemy, It makes all enemies increase the number of dice they have
let enemyUnleashed = false;
let enemyObject = [];
//enemyID tracks which enemy the player is fighting currently
let enemyID = 0;
//enemyTurnSDS ensures that the enemyTurnSetup function happens only once
let enemyTurnSDS = 0;
let enemyChars = [];
//shakeV shakes the enemy image when an attack is landed
let shakeV = 15;
//randomAbility gives a chance of the enemy having an ability
let randomAbility;

//Score Variables
//mainScore[0] is the overall score, mainScore[1] is used on the score screen as a flourish, mainScore[2] is the round score used in endless mode only
let mainScore = [0, 0, 0];
//numOfOCard tracks how many option cards have been used in a match while numOfOCardDetractor tracks how much damage the Joker's special attack card should do
let numOfOCard = 0;
let numOfOCardDetractor = 0;
//numofEnemy tracks how many enemies have been defeated
let numOfEnemy = 0;
//characterBonus tracks a special score bonus every character has for doing special actions
let characterBonus = [0, 0, 0, 0, 0, 0, 0];
//wrongGuess and goodGuess tracks if the player made an incorrect guess or correct guess respectively. 
//wrongGuess[0] tracks incorrect constonant guesses, [1] is for vowels, and [2] is for phrase guesses
let wrongGuess = [0, 0, 0];
let goodGuess = 0;

//Special Flare Variables
//celebrate2 houses the confetti/rain things on various screens, celebrate is for the fireworks
let celebrate = [];
let celebrate2 = [];
//splashThing houses various splash messages 
let splashThing = 0;

//Endless Mode Variables
//endlessSelect tracks if the player is in endless mode, endlessCount[0 and 1] track what round of endlessmode the player is on
let endlessSelect = false;
let endlessCount = [1, 1];
let endlessChr = [];
let endlessOptions = [];
let endlessKeep = [false, false];
let endlessPick = 0;

//Card Deck Variables
let cardInDeckObjects = [];
let cardIsSmoothlyDraggingVa = -2;

//Player Character Card Variables
let playerCharacter = 1;
let player2Character = 1;
//chcaracterCardUnlock tracks which exclusive card the player has unlocked
let characterCardUnlock = [0];
let characterCards = [];
//characterText is used for the character select screen which text should be shown
let characterText = 1;
//characterUnlock tracks how many characters the player has unlocked
let characterUnlock = 5;

//Health Variables
let playerHealth = 30;
let playerMaxHealth = 30;
let enemyHealth = 25;
//display health is so that the health bar will actually decreases after an attack
let enemyDisplayHealth = enemyHealth;
let enemyHealthMax = enemyHealth;
let player1Health = 50;
let player1DisplayHealth = player1Health;
let player1MaxHealth = player1Health;
let player2Health = 50;
let player2DisplayHealth = player2Health;
let player2MaxHealth = player2Health;

//Tutorial Variables
//-Tutorial 1 - Basic, 2 - King, 3 - Queen etc...
let tutorial = 0;
let tutorialText = 0;
//tutorialOn is to activate tutorial once (the first time you play) then never again [guess, overplay, rage];
let tutorialOn = [true, true, true];
//the following 5 variables limit what a player can do. in order there is stop dragging battle cards, stop using certain option cards, stop ending turn, stop text progression, and stop guessing letters
let tutorialNoBCard = false;
let tutorialNoOCard = false;
let tutorialNoEndTurn = false;
let tutorialNoArrow = [false, false];
let tutorialNoLetter = false;
//help arrows are used during tutorials to point at something significant
let helpArrows = [];

//Wild/Overplay Variables
//overPlay tracks if over play is active
let overPlay = false;
//wildInGame tracks if the player unlocked having wild cards in battle. wildChance is later used as the chance of a card in battle being iwld
let wildInGame = false;
let wildChance;

//Option Card Board Variables
//optionCardAppearArray houses the ids for which option cards will appear during a turn
let optionCardAppearArray = [-1, -1, -1, -1, -1];
//optionCardBoard houses the option card objects
let optionCardBoard = [0, 0, 0, 0, 0, 0];
//optionCardGraphics houses the graphics of the option cards
let optionCardGraphics = [];
//ik is used to make the option cards made a wave
let ik = 0;
//oCardAttack is used to make the option cards attack by going to the top of the screen
let oCardAttack = 0;
//oCardDetailsScreen[0] is tracks which option card details screen should be shown oCardDetailsScreen[1] is used to make the graphic of the option card on the option card details screen
let oCardDetailsScreen = [0, false];
//doubleText - some option cards have text that needs to change in battle, double text is used for that b tracking which board slot said option card is in the order goes as  [acespecial, syringe, magazine, tracker]
let doubleText = [-1, -1, -1, 0];

//Option Card Variables (only some option cards need extra variables)
//-Option Card 2 - Adding
//adding variables track the score of the card scores to add
let AddingCardScore1 = [0, 0];
let overPlayAdd;
//-Option Card 3 - Dodge
//different dodge activators
let dodgeNextAttack = 0;
let dodgeGreatestAttack = false;
let dodgeAllAttack = false;
let player1Dodge = false;
let player2Dodge = false;
//-Option Card 9 - Keep A Card
//keep a card variables track the aspects of the kept card to be cloned next turn
let keepACard = false;
let keepACardID = [0, 0];
let keepACardScore = 0;
let keepACardSuit = 0;
let cardIsBeingKept;
//-Option Card 12 - Get Ten Card
let tenCardNeeded = 0;
//-Option Card 17 - Ace Special Attack
//ace special atack card variables track which value the player chose
let playerPickAceValue = false;
let aceCardsPick = [];
let aceChosenValue = 0;
//-Option Card 21 - Random Enemy Status
//kalV tracks which card value was used on the random enemy status card was used first
let kalV;
//-Option Card 22 - Jack Special Attack
//-numOfStatus[0] keeps track of status in battle currently, numOfStatus[1] tracks total status in battle which is used for score.
let numOfStatus = [0, 0];
//-Option Card 23/24 - Witch Spell Book
//witchDeck houses the option cards that the witch has, witchDeck1 and 2 do the same for multiplayer players
let witchDeck = [];
let witchDeck1 = [];
let witchDeck2 = [];
//witchCardNum tracks how many option cards the witch has to prevent her from having too many
let witchCardNum = 0;
let witchCardNum1 = 0;
let witchCardNum2 = 0;
//witchCards1 and 2 are used to copy the optionCardAppeary array during multiplayer so that each player has a seperate option card board
let witchCards1 = [];
let witchCards2 = [];
//-Option Card 25 - Subtract
//subtract variables track the card score used on the subtract card
let subtractCardScore = [0, 0];
let overPlaySubtract;
//-Option Card 30 - Get Ace Card
let getAceValue = [0, 0];

//Status Variables
//-Status Icon Variables
let playerStatus = [];
let enemyStatus = [];
//for all status arrays it is [isEnemyAfflicted, isPlayerAfflicted(singleplayer) or is player1Afflicted(multiplaer), isPlayer2Afflicted (multiplayer)]
let poisonStat = [false, false, false];
let weak;
let weakenStat = [false, false, false];
let freezeStat = [false, false, false];
let enemyFreezeV = false;
let enemyFreezeChance = [1, 0, 0, 0];
let pickpocketStat = [false, false, false];
let regenStat = [false, false, false];
let enemyRage = [false, false];
let playerCharge = false;

//Status Variables - multiplayer
//player 1 and status arrays house the status icons for multiplayer
let player1Status = [];
let player2Status = [];
let player2Charge = false;

//Enemy Ability Variables
let enemyAbilityObject = [];
let numOfAbility = 0;
//let ability is for enemy abilites the order is [0-heal, 1-poison, 2-freeze, 3-regen, 4-weaken 5-pickpocket]
let letAbility = [false, false, false, false, false, false];
let rageMode = false;

//Dice Variables
let dice = [];
let diceAttack;
let diceNumber;
let diceScoreTotal = 0;

//Image Arrays
let heartIMG = [];
let spadeIMG = [];
let diamondIMG = [];
let clubIMG = [];
let faceCardIMG = [];
let diceIMG = [];
let chibiIMG = [];
let backIMG = [];
let enemyIMG = [];
let bossIMG = [];
let cutInIMG = [];
let logoIMG = [];
let cloudIMG = [];
let loseIMG = [];
let celebrateIMG = [];
let iconIMG = [];
let backgroundIMG = [];
let statusIMG = [];
let oCardIMG = [];
let wildIMG = [];
let specialIMG = [];

function preload() {
  //all drawing are made by me except a few which are public domain
  logoIMG[3] = loadImage("OtherImages/Logo4.png");
  schoolBell = loadFont("Fonts/Schoolbell-Regular.ttf");
  //health = loadImage("OtherImages/HealthBar.png");
  healthSheet = loadImage("ImageSheets/HealthSheet.png", getHealth);
  //this paper texture is from public domain
  paper = loadImage("BackgroundImages/paperBackground.png");
}

function getHealth(){
  //health drawings by me
  //the healthSheet is 3 seperate health drawins so I get sepereate images from the sheet in the following code block
  health = healthSheet.get(0, 0, 680, 111);
  health2 = healthSheet.get(0, 111, 680, 111);
  health3 = healthSheet.get(0, 222, 680, 111);
}

function setup() {
  function loadALot() {
    //the loadALot function occurs whenever an image/sound has finished loading in the setUp function. so since loadTracker adds every time loadALot is run I am effectively tracking how many images/sound files are loaded
    loadTracker++;
    //since I know how many files need to be loaded (78) after loadTracker equals 78 then make loading false which stops the loading screen, gets images from the image sheets, and starts the game
    if (loadTracker >= 78) {
      loading = false;
      //Gets seperate images from the image sheets (the reason why they are such weird widths and hieghts are because when I download the images to my mac (yes i used a mac to make this entire game and hated every second of it) there is a max file size so the image is compressed making the widths of the images weird)
      for (let cl = 0; cl < 4; cl++){
        cloudIMG[cl] = cloudSheet.get(495*cl, 0, 495, 299);
        //letter card, guess letter card, revealed letter card and back of deck card, all by me
        specialIMG[cl] = specialSheet.get(480*cl, 0, 480, 800)
      }
       for (let oCard = 0; oCard < 5; oCard++){
         //option cards and wild card all by me in google drawings using basic shapes
        oCardIMG[oCard] = optionCardSheet.get(480*oCard, 0, 480, 800);
        wildIMG[oCard] = wildSheet.get(480*oCard, 0, 480, 800);
      }
      for (let r = 0; r < 6; r++){
        //Icon Images drawn by me
        iconIMG[r] = iconSheet.get(302*r, 0, 302, 301);
        //Boss Images drawn by me
        bossIMG[r] = bossSheet.get(416.6*r, 0, 416.6, 555);
        //Celebrate Images drawn by me
        celebrateIMG[r] = celebrateSheet.get(416.6*r, 0, 416.6, 544);
        //Chibi Images drawn by me
        chibiIMG[r] = chibiSheet.get(416.6*r, 0, 416.6, 555);
        //Enemy Images drawn by me
        enemyIMG[r] = enemySheet.get(416.6*r, 0, 416.6, 555);
        enemyIMG[r+6] = enemySheet2.get(416.6*r, 0, 416.6, 555);
        //dice images are free use
        diceIMG[r] = diceSheet.get(416*r, 0, 416, 416);
        //character cards are drawn by me (very proud of these)
        faceCardIMG[r] = characterCardSheet.get(197.5*r, 0, 197.5, 326);
      }
      for (let e = 0; e < 7; e++){
        //Losing Images drawn by me
        loseIMG[e] = loseSheet.get(357.14*e, 0, 357.14, 476);
      }
      for (let st = 0; st < 8; st++){
        //weakness and charge icon both use a public domain sword icon
    //https://www.google.com/url?sa=i&url=https%3A%2F%2Ffreesvg.org%2Fmetal-sword-icon&psig=AOvVaw0AUd3rSHpOS6WAxuR4nuoe&ust=1667230637101000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCMCkgaKkiPsCFQAAAAAdAAAAABAU
    //dodge icon uses a free use person icon
    //guard icon uses a free use shield icon
        statusIMG[st] = statusSheet.get(96*st, 0, 96, 96);
      }
      for (let w = 0; w < 10; w++){
        //Card deck images are public domain
        heartIMG[w] = heartSheet.get(250*w, 0, 250, 339);
        spadeIMG[w] = spadeSheet.get(250*w, 0, 250, 339);
        diamondIMG[w] = diamondSheet.get(250*w, 0, 250, 339);
        clubIMG[w] = clubSheet.get(250*w, 0, 250, 339);
      }
    }
  }
  
  //Sets scale based on the less of either the width of widow or height according to the original porportion of the canvas I made the game in.
  tempScale[0] = displayWidth / 1300;
  tempScale[1] = displayHeight / 600;
  //I subtract from the scale for lag reasons (I work on a mac and so it gets laggy if your computer is much better than go to the options menu and increase the screen size)
  tempScale[2] = round(min(tempScale) - 0.25, 2);
  scaleNum = tempScale[2];
  createCanvas(1300 * scaleNum, 600 * scaleNum, WEBGL);

  //Various other fundamental setups.
  frameRate(50);
  imageMode(CENTER);
  angleMode(DEGREES);
  //By using a 3d camera which faces a 2d plane which houses the game, the game is essentially 2d but I have the benefits of 3d. (Mostly camera movement and 3d planes/objects) (there may be a better way to do it but IDK if/what it is)
  currCamera = createCamera();
  //To my knowledge there is no way to move the camera in terms of absolute position only relative so this makes the camera in the middle of the 2d plane with the game.
  currCamera.move(650 * scaleNum, 300 * scaleNum, 0);
  
  //Logo Word Images drawn by me with a licensed font
  for (let i = 0; i < 3; i++) {
    logoIMG[i] = loadImage("OtherImages/Logo" + str(i + 1) + ".png", loadALot);
  }
  
  //Because the image sheets are never referenced again making them local variables helps make the game run faster and possibly use less memory (I can't tell if local variables do use less memory from the bit of research I did into them.)
  
  //Card Deck Images
  //all card images are public domain
  let heartSheet = loadImage("ImageSheets/HeartSheet.png", loadALot);
  let spadeSheet = loadImage("ImageSheets/SpadeSheet.png", loadALot);
  let diamondSheet = loadImage("ImageSheets/DiamondSheet.png", loadALot);
  let clubSheet = loadImage("ImageSheets/ClubSheet.png", loadALot);

  //Cloud Images drawn by me
  let cloudSheet = loadImage("ImageSheets/CloudSheet.png", loadALot);
  
  //Icons, bosses, celebrate poses, chibi forms, enemies, and lose poses sheets all drawn by me
  let iconSheet = loadImage("ImageSheets/IconsSheet.png", loadALot);
  let bossSheet = loadImage("ImageSheets/BossSheet.png", loadALot);
  let celebrateSheet = loadImage("ImageSheets/CelebrateSheet.png", loadALot);
  let chibiSheet = loadImage("ImageSheets/ChibiSheet.png", loadALot);
  let enemySheet = loadImage("ImageSheets/EnemySheet1.png", loadALot);
  let enemySheet2 = loadImage("ImageSheets/EnemySheet2.png", loadALot);
  let loseSheet = loadImage("ImageSheets/LoseSheet.png", loadALot);
  
  //Character Card Images drawn by me
  let characterCardSheet = loadImage("ImageSheets/CharacterCardsSheet.png", loadALot);
  
  //dice are free use
  let diceSheet = loadImage("ImageSheets/DiceSheet.png", loadALot);
  
  //Option Card Images made by me in google drawings with basic shapes
  let optionCardSheet = loadImage("ImageSheets/OCardSheet.png", loadALot);
  let wildSheet = loadImage("ImageSheets/WildSheet.png", loadALot);
  let specialSheet = loadImage("ImageSheets/SpecialCardsSheet.png", loadALot);
   rightPage = loadImage("OtherImages/SpellBookRight.png", loadALot);
   rightPage2 = loadImage("OtherImages/SpellBookRight2.png", loadALot);
   leftPage = loadImage("OtherImages/SpellBookLeft2.png", loadALot);
  cardBox = loadImage("OtherImages/CardBox.png", loadALot);
  
  //Status Icon Images by me in google drawing
  let statusSheet = loadImage("ImageSheets/StatusSheet.png", loadALot);
  //frozen card and freeze icon both have free use icons
  frozenCard = loadImage("OtherImages/frozen Card.png", loadALot);

  //Fonts (i got the license for the font but idk where to show it)
  cabinSketch = loadFont("Fonts/CabinSketch-Bold.ttf", loadALot);
  anton = loadFont("Fonts/Anton-Regular.ttf", loadALot);

  //Other Images drawn by me
  arrow = loadImage("OtherImages/BackArrow.png", loadALot);
  //public domain lock image
  //https://freesvg.org/1542668334
  lock = loadImage("OtherImages/lock icon.png", loadALot);
  //free use stickynote image (the other one is just a square I made)
  note1 = loadImage("OtherImages/note1.png", loadALot);
  note2 = loadImage("OtherImages/note2.png", loadALot);
  credit = loadImage("OtherImages/Credits.png", loadALot);

  for (let jd = 0; jd < 7; jd++) {
    //Background Images drawn by me
    backgroundIMG[jd] = loadImage("BackgroundImages/Background" + str(jd) + ".png", loadALot);
  }
  //the orange svg is free use
  enemyIMG[12] = loadImage("OtherImages/Enemy13.svg", loadALot);
  //boss icons, enemy icons and EA shape thing by me
  bossIcon = loadImage("OtherImages/BossIcon.png", loadALot);
  enemyIcon = loadImage("OtherImages/EnemyIcon.png", loadALot);
  EA = loadImage("OtherImages/EnemyAbility.png", loadALot);

  //Back Sprite Images by me
  for (let i = 0; i < 6; i++) {
    backIMG[i] = loadImage("BackImages/Back" + str(i + 1) + ".png", loadALot);
  }
  
  punchingBag = loadImage("OtherImages/PunchingBag.png", loadALot);
  rageIcon = loadImage("OtherImages/RageIcon.png", loadALot);

  //Cut In Images by me (especially proud of these)
  for (let i = 0; i < 6; i++) {
    cutInIMG[i] = loadImage("CutInImages/Cutin" + str(i + 1) + ".png", loadALot);
  }

  //Sounds
  //all sounds are free use from youtube
  gun = loadSound("Audio/GUN.wav", loadALot);
  hit1 = loadSound("Audio/Attack.mp3", loadALot);
  hit1.setVolume(0.2);
  hit2 = loadSound("Audio/Wack.mp3", loadALot);
  hit2.setVolume(0.9);
  bigHit = loadSound("Audio/Big Hit.mp3", loadALot);
  bigHit.setVolume(0.4);
  click = loadSound("Audio/Clink.wav", loadALot);
  oPlay = loadSound("Audio/Start all out attack.wav", loadALot);
  oPlay.setVolume(0.7);
  land = loadSound("Audio/Land.mp3", loadALot);
  land.setVolume(0.4);
  sparkle = loadSound("Audio/Sparkle2.mp3", loadALot);
  sparkle.setVolume(0.5);
  heal = loadSound("Audio/heal item get.wav", loadALot);
  error = loadSound("Audio/Error.mp3", loadALot);
  error.setVolume(0.7);
  splashSound = loadSound("Audio/Splash Sound.mp3", loadALot);
  splashSound.setVolume(0.2);
  frozenSound = loadSound("Audio/Frozen.mp3", loadALot);
  frozenSound.setVolume(0.7);
  hurt = loadSound("Audio/hurt.mp3", loadALot);
  hurt.setVolume(0.7);
  hurt2 = loadSound("Audio/hurt2.mp3", loadALot);
  hurt2.setVolume(0.7);
  backSound = loadSound("Audio/back.wav", loadALot);
  //music comes from youtube audio library and as such are free use. (It astounds me how many recognizeable songs are from the same like 3 people on youtube audio libraries. They are recognizeable because they are free use and are in so many youtube videos as background music)
  menuTheme = loadSound("Audio/Dog Park.mp3", loadALot);
  menuTheme.setVolume(0.1);
  battleTheme = loadSound("Audio/NormalBattle.mp3", loadALot);
  battleTheme.setVolume(0.13);
  bossTheme = loadSound("Audio/Open Wide.mp3", loadALot);
  bossTheme.setVolume(0.09);
  wordGameTheme = loadSound("Audio/Fenster's Explanation.mp3", loadALot);
  wordGameTheme.setVolume(0.7);
  winnerTheme = loadSound("Audio/Rockstar.mp3", loadALot);
  winnerTheme.setVolume(0.1);
  //The next section checks if the player was in the middle of a battle. If middleOfGame returns as true then it looks through the ultimateStats Variable which houses essential variables to recreate the battle they were in.
  let game = getItem("middle?");
  //check if there is previous data for the key "middle?" if there is data then make middleOfGame equal to it
  if (game !== null) {
    middleOfGame = game;
  }
  //check if middleOfGame was true
  if (middleOfGame) {
    //ultimateStats houses [playerHealth, mainScore, enemyDifficulty1, 2, 3, freeLetter, vowelV, playerCharacter]
    ultimateStats = getItem("stats");
    chosenWord = getItem("choosenWord");
    //hiddenWordStore copies the objects that house the hidden words (the cards with question marks). However it seems local storage doesn't work with objects perfectly so we do a roundabout way later.
    let hiddenWordStore = getItem("hiddenWord");
    chosenWordSplit = getItem("chosenWordSplit");
    //freeLetterReveal list the order constonants are revealed. vowelDetect does the same for vowels.
    freeLetterReveal = getItem("reveal");
    vowelDetect = getItem("vowel");
    freeGuess = getItem("guess");
    //Checks if the game you were in was endless mode or not
    let end = getItem("endless");
    if (end != null && end != "no") {
      endlessCount = end;
      endlessSelect = true;
      endlessPick = getItem("hintEndless");
      mainScore[2] = getItem("score2");
    } else {
      levelScreen = getItem("whichLevel");
    }
    //Checks if a player was in overPlay due to low health.
    if (ultimateStats != null) {
      if (ultimateStats[0] > 0) {
        playerHealth = ultimateStats[0];
      } else {
        playerHealth = 1;
      }
      //Copies variables from ultimateStats
      mainScore[0] = ultimateStats[1];
      enemyDifficulty[0] = ultimateStats[2];
      enemyDifficulty[1] = ultimateStats[3];
      enemyDifficulty[2] = ultimateStats[4];
      enemyDifficulty[3] = ultimateStats[5];
      freeLetter = ultimateStats[6];
      vowelV = ultimateStats[7];
      playerCharacter = ultimateStats[8];
    }
    //using hiddenWordStore while objects don't store the objects, the parameters are stored so we can create proper WordGuess objects based off of the hiddenWordStore
    if (hiddenWordStore != null) {
      for (let d = 0; d < hiddenWordStore.length; d++) {
        nextLine = [0, 0];
        hiddenWord[d] = new WordGuess(hiddenWordStore[d].x, hiddenWordStore[d].y, hiddenWordStore[d].ID, false, d);
        //Then we check hiddenWordStore.hidden parameter to unhide the new hiddenWord objects
        if (!hiddenWordStore[d].hidden) {
          hiddenWord[d].hidden = false;
        }
      }
      newLetters(false);
    }
  }
  //makes enemy select/guess mode/tutorial/use free guess selects (they are always there but can only be clicked on when they need to)
  //enemyChars[0] == reveal a constonant, [1] is vowel, [2] is free guess, and [3] is choose a letter
  enemyChars[0] = new EnemySelect(370, 400, 1);
  enemyChars[1] = new EnemySelect(670, 490, 2);
  enemyChars[2] = new EnemySelect(970, 400, 3);
  enemyChars[3] = new EnemySelect(670, 330, 4);
  //character tutorial select is enemyChars[4]
  enemyChars[4] = new EnemySelect(1130, 550, -1);
  //guess phrase select is enemyChars[5];
  enemyChars[5] = new EnemySelect(1170, 500, -2);
  //use free guesses select is enemyChars[6];
  enemyChars[6] = new EnemySelect(1170, 350, -3);
  //make back button which is also always there but sometimes is able to be clicked and shown
  back = new BackButton(70, 27);
  //Uses local storage to get level unlocks, leaderboard and character cards/ characters unlocked.
  //check which levels are unlocked.
  let jads = getItem("levelProgress");
  //check if there is previous data for the key "levelProgress" if there is data then make levelUnlock equal to it
  if (jads !== null) {
    if (jads[1] != null) {
      levelUnlock = 2;
    } else {
      levelUnlock = jads;
    }
  }
  //check if there is previous data for the key "lead" if there is data then make leaderBoard equal to it
  let top = getItem("lead");
  if (top !== null) {
    leaderBoard = top;
  } else {
    //if no previous leaderboard data, Make empty leaderboard
    for (let i = 0; i < 55; i++) {
      leaderBoard[i] = "----";
    }
    //make characters to beat for chrcards
    leaderBoard[0] = "Karane";
    leaderBoard[9] = "Emilia";
    leaderBoard[18] = "Bibi";
    leaderBoard[27] = "Ferdinand";
    leaderBoard[36] = "Ahko";
    leaderBoard[45] = "Flare";
    for (let ad = 0; ad < 6; ad++) {
      leaderBoard[ad * 9 + 1] = "2";
      leaderBoard[ad * 9 + 2] = "3000";
    }
  }
  //Check for character cards that are unlocked
  let chrCardUnlock = getItem("cards");
  //check if there is previous data for the key "cards" if there is data then make characterCardUnlock equal to it
  if (chrCardUnlock !== null) {
    characterCardUnlock = chrCardUnlock;
    characterCardUnlock[0] = 0;
  }
  //Check if they have unlocked wilds in battle
  let wildStandin = getItem("wild");
  //check if there is previous data for the key "wild" if there is data then make wildInGame equal to it
  if (wildStandin !== null) {
    wildInGame = wildStandin;
    //if they unlocked wildInGame then they also unlocked increase max health
    player1MaxHealth = 60;
    player2MaxHealth = 60;
    playerMaxHealth = 45;
  }
  //Check how many characters have then unlocked
  let chrUnlock = getItem("characters");
  //check if there is previous data for the key "characters" if there is data then make characterUnlock equal to it
  if (chrUnlock !== null) {
    characterUnlock = chrUnlock;
  }
  //Check if they have gone through the tutorials before
  let tutorialFirst = getItem("tutorial?");
  //check if there is previous data for the key "tutorial?" if there is data then make tutorialOn equal to it
  if (tutorialFirst !== null) {
    tutorialOn = tutorialFirst;
  }
  //leaderBoard[55] is a marker if a person make the leaderboard after endless. [56 - 58] says which position they are in 56 - first, 57 - second, 58 - third, [59] just makes leaderboard update once
  leaderBoard[55] = false;
  leaderBoard[56] = false;
  leaderBoard[57] = false;
  leaderBoard[58] = false;
  leaderBoard[59] = true;
  for (let i = 0; i < 6; i++) {
    //originally i drew the option card images and text in the draw loop but i swtiched to graphics as it makes the game run better
    optionCardGraphics[i] = createGraphics(150, 250);
    optionCardGraphics[i].imageMode(CENTER);
    optionCardGraphics[i].textSize(22);
    optionCardGraphics[i].fill(0);
    optionCardGraphics[i].textFont(anton);
  }
}

function draw() {
  scale(scaleNum);
  noStroke();
  //Makes the notebook paper background
  background(255);
  image(paper, 650, 300, 1300, 600);
  fill(20);
  circle(40, 140, 46);
  //Transparent paper crinkle effect
  if (loading) {
    //show Loading Screen if image/sound assests are still loading
    textFont(schoolBell);
    textSize(100);
    fill(0);
    //sketching drop shadow
    text("SKETCHING.", 416, 94);
    //add a period when thing are loaded
    for (let i = 0; i < 7; i++) {
      if (loadTracker > i * 10 + 10) {
        text(".", 876 + i * 30, 94);
      }
    }
    fill(200, 0, 100);
    text("SKETCHING.", 410, 90);
    for (let i = 0; i < 7; i++) {
      if (loadTracker > i * 10 + 10) {
        text(".", 870 + i * 30, 90);
      }
    }
    //percent counter with text shadow
    textSize(50);
    fill(0);
    text(round(loadTracker / 78 * 100) + "%", 853, 492);
    fill(200, 0, 100);
    text(round(loadTracker / 78 * 100) + "%", 848, 490);
    push();
    strokeWeight(9);
    stroke(0);
    fill(255);
    rect(330, 500, 600, 35);
    tint(0);
    image(health, 630, 517.5, 600, 35);
    noStroke();
    //make the loading bar
    let loadV = (600 * loadTracker) / 78;
    rect(930, 500, -600 + loadV, 35);
    tint(255);
    translate(650, 300);
    //spin the logo
    rotate((333 * loadTracker) / 78);
    image(logoIMG[3], 0, 0);
    pop();
  } else {
    tint(255);
    //Background depending on what screen it is on
    if (screen != 21 && screen != 3 && screen != 5) {
      //the default (castle) background is on screen unless screen = 21(which is the option screen), screen == 3 (battle), or screen == 5 (enemy select).
      image(backgroundIMG[0], 650, 300, 1320, 600);
    } else if (screen == 3 || screen == 5) {
      //if battle or enemy select screen then make the background correspond to the level or the word theme if in endlessmode
      if (endlessSelect || multiplayerSelect == 3) {
        image(backgroundIMG[endlessPick], 650, 300, 1320, 600);
      }
      if (multiplayerSelect == 0 && !endlessSelect) {
        image(backgroundIMG[levelScreen], 650, 300, 1320, 600);
      }
    }
    //tutorials have a generic grey background
    if (tutorial > 0 && tutorial < 8) {
      background(80);
    }
    //Click to Begin Menu.
    if (screen == 0) {
      clickTestMenu();
    }
    if (screen == 1) {
      mainMenu();
      //When a player goes to the main menu the first frame while middleOfGame is true it activates crashSafe() which ensures that middleOfGame won't activate if they close out of the game.
      if (middleOfGame) {
        middleOfGame = false;
        crashSafe();
      }
    }
    //Choose character menu
    if (screen == 2) {
      textSize(75);
      textFont(cabinSketch);
      fill(0);
      //look to see if it is single player (multiplayerSelect == 0 means singleplayer)
      if (multiplayerSelect == 0) {
        text("Choose Your Character", 270, 80);
      }
      //if mulitplayerSelect is greater than 0 then it is multiplayer so change the text to say which player is choosing their character 
      if (multiplayerSelect > 0) {
        text("Player " + multiplayerSelect +" Choose Your Character", 170, 80);
      }
      //character select function lets the player click the character cards
      characterSelectMenu();
      //backButtonFun creates the back button in the top left corner and lets the player click said button
      backButtonFun();
      //When a player goes to the character menu the first frame while middleOfGame is true it activates crashSafe() which ensures that middleOfGame won't activate if they close out of the game.
      if (middleOfGame) {
        middleOfGame = false;
        crashSafe();
      }
    }
    //Level select screen
    if (screen == 4) {
      textSize(55);
      textFont(cabinSketch);
      fill(0);
      text("Choose The Level", 440, 80);
      //for loop to make every level sticky note be clicked
      for (let i = 0; i < 6; i++) {
        level[i].highlight();
      }
      //create back button for top left
      backButtonFun();
      //When a player goes to the level select menu the first frame while middleOfGame is true it activates crashSafe() which ensures that middleOfGame won't activate if they close out of the game.
      if (middleOfGame) {
        middleOfGame = false;
        statusReset();
        crashSafe();
      }
    }
    //Enemy select menu
    if (screen == 5) {
      //unactivate nextEnemy 
      nextEnemy = false;
      textSize(55);
      fill(255);
      //make back button
      backButtonFun();
      //create enemy selects
      enemySelectMenu();
      //make middle of game true so we can save data in local storage
      if (tutorial == 0 && multiplayerSelect == 0) {
        middleOfGame = true;
      }
    }
    //Move onto the next endless round screen
    if (screen == 6) {
      fill(0);
      textFont(anton);
      textSize(60);
      //make round and overall score info
      text("Round:", 30, 80);
      text(endlessCount[1], 210, 80);
      text("Score:", 350, 80);
      text(mainScore[0], 520, 80);
      fill(160);
      //for loop to show the entire endless road 
      for (let end = 0; end < 8; end++) {
        endlessChr[end].show();
      }
      if (millis() > timer[4] + 3000) {
        //Move the endless road until the left most road is off screen after a set time
        if (endlessChr[0].x >= -80) {
          for (let end2 = 0; end2 < 8; end2++) {
            endlessChr[end2].move();
          }
        }
        //If the endless road is 5 or 10 give bonus
        if (millis() > timer[4] + 4000) {
          if (endlessCount[0] == 5 || endlessCount[0] == 10) {
            for (let ugh = 0; ugh < 4; ugh++) {
              //for the bonus buttons show then and let them be clickable
              if (endlessOptions[ugh] != null){
                endlessOptions[ugh].click();
              }
            }
          }
        }
        //if endlessCount[0] isnt 5 or 10 then start the next battle
        if (millis() > timer[4] + 5000) {
          if (endlessCount[0] != 5 && endlessCount[0] != 10) {
            //Screen 19 does nothing for endless mode but it leads into the choose your enemy screen.
            screen = 19;
            music("battle");
            //Gets rid of endless road array to save assets
            endlessChr = [];
            //wordGameSetup randomly choose the word and setup the hiddenWord objects,
            wordGameSetup();
          }
        }
      }
      //make chibi player on endess road
      image(chibiIMG[playerCharacter - 1], 100, 245, 161, 189);
    }
    //score screen
    if (screen == 7) {
      scoreScreen();
    }
    //game over screen
    if (screen == 8) {
      gameOverScreen();
    }
    //Reset various stats on the main menu then goes to main menu screen.
    if (screen == 9) {
      menuReset();
      music("menu");
      screen = 1;
    }
    //Tutorial offer screen
    if (screen == 10) {
      fill(0);
      textSize(65);
      textFont(schoolBell);
      text("Would You Like To Play The Short Tutorial?", 90, 100);
      //yes button
      if (
        mouseX > 200 * scaleNum &&
        mouseX < 370 * scaleNum &&
        mouseY > 230 * scaleNum &&
        mouseY < 335 * scaleNum
      ) {
        if (mouseIsPressed && !mouseOverlap) {
          //if yes button is pressed make tutorial = basics tutorial
          tutorial = 1;
          tutorialText = 0;
          click.play();
          music("menu");
        }
        //change text color if mouse hovering over it
        fill(100, 100, 180);
        text("Yes", 253, 302);
        fill(255, 0, 0);
        text("Yes", 250, 300);
      } else {
        fill(210, 0, 0);
        text("Yes", 253, 302);
        fill(0);
        text("Yes", 250, 300);
      }
      //no button
      if (
        mouseX > 850 * scaleNum &&
        mouseX < 1020 * scaleNum &&
        mouseY > 230 * scaleNum &&
        mouseY < 335 * scaleNum
      ) {
        if (mouseIsPressed && !mouseOverlap) {
          //if no button is pressed go to main menu
          tutorial = 0;
          tutorialText = 0;
          screen = 9;
          click.play();
        }
        //change text color if mouse hovering over it
        fill(100, 100, 180);
        text("No", 903, 302); 
        fill(255, 0, 0);
        text("No", 900, 300);
      } else {
        fill(210, 0, 0);
        text("No", 903, 302);
        fill(0);
        text("No", 900, 300);
      }
    }
    //credits screen
    if (screen == 11) {
      creditsScreen();
    }
    //pick which leaderboard
    if (screen == 12) {
      leaderBoardScreenPick();
    }
    //leaderboard screen
    if (screen == 13) {
      leaderBoardScreen();
    }
    //Multiplayer Winner screen
    if (screen == 14) {
      background(40);
      party(0);
      //spotlight for winner
      fill(255, 200, 0, 80);
      triangle(1270, 600, 990, 0, 710, 600);
      //make back button
      backButtonFun();
      textSize(75);
      textFont(cabinSketch);
      //timer for flashing text
      if (millis() > timer[11] + 3000) {
        timer[11] = round(millis());
      }
      if (millis() > timer[11] + 1500) {
        fill(0, 0, 255);
      } else {
        fill(255, 0, 0);
      }
      //check who lost due to whose health is zero
      if (player1Health <= 0) {
        //if player 2 wins make celebrate image based off their character and make lose image based off of other player's character
        text("Player 2 Wins!", 200, 70);
        image(celebrateIMG[player2Character - 1], 990, 360, 480, 600);
        image(loseIMG[playerCharacter - 1], 680, 430, 384, 502);
      }
      if (player2Health <= 0) {
        //if player 1 wins make celebrate image based off their character and make lose image based off of other player's character
        text("Player 1 Wins!", 200, 70);
        image(celebrateIMG[playerCharacter - 1], 990, 360, 480, 600);
        image(loseIMG[player2Character - 1], 680, 430, 384, 502);
      }
      fill(255);
      textFont(cabinSketch);
      textSize(45);
      //write the actual words the players had
      text("       Player 1's Actual Phrase Was: \n" + chosenWord, 90, 145);
      text("    Player 2's Actual Phrase Was: \n" + chosenWord2, 90, 260);
    }
    //word game screen
    if (screen == 15 && !chooseLetterTime) {
      wordGameScreen();
    }
    //multiplayer setup the text inputs
    if (screen == 16) {
      multiplayerWordChooseSetup();
    }
    //multiplayer players choose their words
    if (screen == 17) {
      multiplayerWordChoose();
    }
    //if in the middle of a game this screen ask if you want to return to battle
    if (screen == 18) {
      returnToGame();
    }
    //This screen leads into choose your enemy screen while also checking if all letters of either hidden word are revealed (this is mainly used for multiplayer)
    if (screen == 19) {
      screen = 5;
      level = [];
      checkWords();
    }
    //new ability unlocked screen
    if (screen == 20) {
      newAbilityScreen();
    }
    //options screen
    if (screen == 21) {
      optionsScreen();
    }
    // look away screen (use in multiplayer)
    if (screen == 22) {
      lookAwayScreen();
    }
    //hidden screen for unlocking everything 
    if (screen == 23) {
      specialUnlockScreen();
    }
    //special thanks screen
    if (screen == 24) {
      specialThanksScreen();
    }
    //Overplay check
    if (tutorial == 0) {
      if (!overPlay && playerHealth <= 0) {
        //tutorialOn[1] is true only when the player begins the game. This is what activates the overplay tutorial.
        if (tutorialOn[1]) {
          tutorialText = 0;
          tutorialOn[1] = false;
          tutorial = 9;
        }
        overPlay = true;
        music("boss");
        playerHealth = 0;
        //Overplay creates the splashmessage and makes health = 0 along with remove any extra cards in deck.
          splashThing = new SplashMessage(9);
          crashSafe();
          if (cardInDeckObjects.length >= 5) {
            cardInDeckObjects.splice(5, 6);
          }
      }
      //This is the bonuses that occur when an enemy is defeated. waiting for splashThing to be over is for boss enemies where a splash message occurs and it looks better to wait for it to go away then activate nextEnemy
      if (enemyHealth <= 0 && !nextEnemy && splashThing == 0 && screen == 3) {
        if (enemyID == 1) {
          //freeLetterReveal is a randomized order of the constonants in the hiddenWord free letter keeps track of how many freeLetters have been revealed.
          hiddenWord[freeLetterReveal[freeLetter]].hidden = false;
          freeLetter++;
        }
        if (enemyID == 2) {
          //vowelDetect does the same as freeLetterReveal for vowels same with vowelV for freeLetter
          hiddenWord[vowelDetect[vowelV]].hidden = false;
          vowelV++;
        }
        //if enemyID == 3 add free guess
        if (enemyID == 3) {
          freeGuess++;
        }
        //if enemyID == 4 make it choose letter time and make a splash message for choosing letters
        if (enemyID == 4) {
          chooseLetterTime = true;
          splashThing = new SplashMessage(6);
        }
        nextEnemy = true;
        numOfEnemy++;
        checkWords();
        //Gives extra bonus if boss is an enemy,
        if (enemyDifficulty[enemyID - 1] > 8) {
          //makes enemy become hard difficulty (cuz it adds two after this)
          enemyDifficulty[enemyID - 1] = 4;
          //enemyUnleashed means all enemies don't have a limit on how many dice they have (or aleast a high limit)
          enemyUnleashed = true;
          rageMode = false;
          freeGuess++;
        }
        //Increases all enemy difficulties.
        for (let pd = 0; pd < enemyDifficulty.length; pd++) {
          enemyDifficulty[pd]++;
        }
        //Increases enemyDifficulty that the player is currently against gets an extra increase.
        enemyDifficulty[enemyID - 1]++;
        //uses local storage to save ultimateStats
        crashSafe();
      }
    }
    //One time player turn setup.
    if (screen == 3 && startCardBattleSetupV == 0) {
      startCardBattleSetup();
      startCardBattleSetupV = 1;
      if (
        (playerCharacter == 4 && whoseTurn == 1) ||
        (player2Character == 4 && whoseTurn == 2)
      ) {
        //if player was is the ace when setting up the game create the cards the ace picks from
        playerPickAceValue = true;
        for (let ace = 1; ace < 11; ace++) {
          aceCardsPick[ace] = new AceCards(625 + ace * 50, 400, ace);
        }
      }
    }
    if (screen == 3) {
      startCardBattle();
      //ensures that multiplayer health can go over the max
      if (multiplayerSelect == 3) {
        if (player1Health > player1MaxHealth) {
          player1Health = player1MaxHealth;
        }
        if (player2Health > player2MaxHealth) {
          player2Health = player2MaxHealth;
        }
      }
      //if enemy has rage make the icon
      if (rageMode && !enemyRage[0]) {
        image(rageIcon, 600, 40, 80, 140);
      }
      //activate Rage when enemy health is below half and enemy has rage and it is the player's turn
      if (enemyHealth < enemyHealthMax / 2 && rageMode && playerTurn) {
        //Rage tutorial which activates only once when the game is first started
        if (tutorialOn[2] && !overPlay) {
          tutorial = 10;
          tutorialText = 0;
          tutorialOn[2] = false;
        }
        enemyRage[0] = true;
        //Enemy rage is a status, and increases num of dice
        if (!enemyRage[1]) {
          numOfStatus[0]++;
          numOfStatus[1]++;
          enemyObject[0].numOfDice += 1;
          enemyRage[1] = true;
          //timer[5] is a timer for the healing effect
          timer[5] = round(millis());
        }
      }
      //Clarity box for turn and score
      fill(130, 200);
      rect(860, 10, 420, 45);
      fill(255);
      textSize(40);
      textFont(schoolBell);
      if (multiplayerSelect == 0) {
        //Overheal check
        if (playerHealth > playerMaxHealth) {
          playerHealth = playerMaxHealth;
        }
        if (enemyHealth > enemyHealthMax) {
          enemyHealth = enemyHealthMax;
        }
        //Enemy picture
        if (tutorial != 1) {
          enemyObject[0].show();
        }
        //Score only appears if single player
        text("Score: " + mainScore[0], 1010, 45);
      }
      //turn counter
      text("Turn: " + turnCount, 870, 45);
      if (playerTurn) {
        //tutorial 1 (the basics tutorial) doesn't have an enemy image so it doesn't shake
        if (tutorial != 1) {
          if (multiplayerSelect == 0) {
            //Shake enemy image if enemy was just attacked
            if (shakeV < 14) {
              enemyObject[0].shake();
              shakeV++;
            }
            //ensure position is reset for enemy image after random shaking
            if (shakeV == 14) {
              enemyObject[0].x = 1190;
            }
          }
          //Shake but for multiplayer images
          if (multiplayerSelect == 3) {
            if (whoseTurn == 1) {
              if (shakeV == 0) {
                if (player2Character == 2 || player2Character == 5) {
                  //female hurt sound
                  hurt2.play();
                } else {
                  //male hurt sound
                  hurt.play();
                }
              }
              if (shakeV < 14) {
                //enemyObject[2] houses player 2's chibi image so if it is player 1's turn shake player 2's image
                enemyObject[2].shake();
                shakeV++;
              }
              if (shakeV == 14) {
                enemyObject[2].x = 1190;
              }
            }
            if (whoseTurn == 2) {
              if (shakeV == 0) {
                if (playerCharacter == 2 || playerCharacter == 5) {
                  //female hurt sound if playing a female character
                  hurt2.play();
                } else {
                  //male hurt sound
                  hurt.play();
                }
              }
              //enemyObject[1] houses player 1's chibi image so if it is player 2's turn shake player 1's image
              if (shakeV < 14) {
                enemyObject[1].shake();
                shakeV++;
              }
              if (shakeV == 14) {
                enemyObject[1].x = 1190;
              }
            }
          }
        }
        //make back button in top left corner
        backButtonFun();
        for (let w = 0; w < cardInDeckObjects.length; w++) {
          //This lets the cards in deck be dragged and visualized
          if (cardInDeckObjects[w] != -1) {
            if (!playerPickAceValue && !tutorialNoBCard && oCardDetailsScreen[0] == 0) {
              cardInDeckObjects[w].drag();
            }
            cardInDeckObjects[w].appear();
            //the card moves much smoother using this method with cardIsSmoothlyDraggingVa instead of constantly calculating if the mouses is above the card then moving it (trust me).
            if (cardIsSmoothlyDraggingVa == [w + 1]) {
              cardInDeckObjects[w].x = mouseX / scaleNum;
              cardInDeckObjects[w].y = mouseY / scaleNum;
            }
          }
        }
        //Ace is choosing their value
        if (playerPickAceValue && !nextEnemy && endGame == 0) {
          fill(0, 0, 0, 50);
          rect(-50, -50, 1400, 700);
          fill(255);
          textSize(20);
          text("Pick A Card -->", 520, 400);
          for (let ace2 = 1; ace2 < 11; ace2++) {
            if (aceCardsPick[ace2] != null){
              aceCardsPick[ace2].choose();
            }
          }
        }
        //Small Attack animation for the option Cards
        if (oCardAttack != 0) {
          oCardAttack.attack();
          //if the attack card goes off screen get rid of it
          if (oCardAttack.y < -80) {
            //play hit sound
            hit1.play();
            //make shakeV = 0 so the enemy image shakes
            shakeV = 0;
            oCardAttack = 0;
            if (multiplayerSelect == 3) {
              //shake camera in multiplayer
              currCamera.move(10, 0, 0);
              setTimeout(cameraShake, 30);
            }
          }
        }
        if (tutorial == 0 && ((playerCharacter != 5 && whoseTurn == 1) || (player2Character != 5 && whoseTurn == 2))) {
          //Small flourish to make option cards do a small wave
          timer[2] = timer[2] + 1;
          //make the optionCardBoard's y higher if  timer[2] = 20. 
          if (timer[2] == 20) {
            if (ik > 0) {
              optionCardBoard[ik - 1].y = 225;
            }
            if (ik < 6) {
              optionCardBoard[ik].y = 200;
            }
            if (ik == 6) {
              optionCardBoard[5].y = 225;
            }
            ik++;
            if (ik <= 6) {
              timer[2] = 0;
            }
          }
          if (ik == 7) {
            if (timer[2] >= int(random(90, 210))) {
              ik = 0;
              timer[2] = 0;
            }
          }
        }
        //Healing effect of enemy with Rage
        if (enemyRage[0] && !nextEnemy && enemyHealth > 0) {
          if (millis() > timer[5] + 2000) {
            enemyHealth++;
            timer[5] = round(millis());
          }
        }
        //Card is being Kept visual
        if (keepACard) {
          image(lock, optionCardBoard[keepACardID[1]].x, optionCardBoard[keepACardID[1]].y, 60, 60);
          //keepACardID[0] tracks which battle card is being kept, keepACardID[1] tracks which option card
          cardInDeckObjects[keepACardID[0]].y = optionCardBoard[keepACardID[1]].y;
          cardInDeckObjects[keepACardID[0]].x = optionCardBoard[keepACardID[1]].x;
        }
        //tutorial for overplay occurs in battle
        if (tutorial == 9) {
          tutorialOverplay();
        }
        //tutorial for rage occurs in battle
        if (tutorial == 10) {
          tutorialRage();
        }
      }
      //enemyTurn setup
      if (!playerTurn && multiplayerSelect == 0) {
        //some setup for enemy's turn such as removing all battle cards and option cards
        if (enemyTurnSDS == 0) {
          enemyTurnSetup();
          cardInDeckObjects = [];
          optionCardBoard = [];
        }
        enemyTurn();
      }
      //Shows Weakened text when player is weakened
      if (weakenStat[1] & (multiplayerSelect == 0) || (multiplayerSelect == 3 && ((weakenStat[2] && whoseTurn == 2) || (weakenStat[1] && whoseTurn == 1)))) {
      }
      //weaken text appears for a few seconds
      if (millis() > timer[1] + 1300 && millis() < timer[1] + 3500) {
        //make several rectangles to make weakened text more ledgible
        fill(0, 150);
        rect(650, 460, 510, 50);
        fill(210);
        rect(820, 455, 180, 60);
        fill(150, 20, 170);
        textSize(35);
        textFont(anton);
        text("Weakened", 840, 500);
        image(statusIMG[1], 750, 485, 70, 70);
      }
      //Next enemy section of a battle.
      if (nextEnemy) {
        //endlesskeep[1] is for endless mode wild special attack card which turns off after one enemy.
        endlessKeep[1] = false;
        //prevens battle cards movin
        tutorialNoBCard = true;
        //prevents using some option cards
        tutorialNoOCard = true;
        //prevents ending turn
        tutorialNoEndTurn = true;
        //dims background
        fill(0, 0, 0, 180);
        rect(-50, -50, 1400, 700);
        //if it isn't for choosing a letter to reveal show next enemy
        if (!chooseLetterTime) {
          enemySelectMenu();
        }
      }
      //red damage flash
      if (timer[7] > millis()) {
        fill(205, 0, 0, 130);
        rect(0, 0, 1330, 620);
      }
    }
    //choose a letter to reveal
    if (chooseLetterTime) {
      chooseLetter();
    }
    //tutorials, 1 - basics 2-7 - characters, 8 - guessing, 9 - overplay, 10 - rage
    if (tutorial != 0){
      if (tutorial == 1) {
        tutorialBasics();
      }
      if (tutorial == 2) {
        tutorialKing();
      }
      if (tutorial == 3) {
        tutorialQueen();
      }
      if (tutorial == 4) {
        tutorialJack();
      }
      if (tutorial == 5) {
        tutorialAce();
      }
      if (tutorial == 6) {
        tutorialWitch();
      }
      if (tutorial == 7) {
        tutorialJoker();
      }
      if (tutorial == 8) {
        tutorialWordGame();
      }
    }
    //oCardDetails screen
    if (screen == 3) {
      //oCardDetailsScreen equals which option card should be given details
      if (oCardDetailsScreen[0] != 0) {
        oCardDetailsPage();
      }
    }
    //Makes SplashMessages move and appear
    if (splashThing != 0) {
      splashThing.goDoTheThing();
    }
    //if menu is paused don't let player use battle cards, end turn, use option cards or click anything other than the menu options
    if (endGame != 0) {
      tutorialNoBCard = true;
      tutorialNoOCard = true;
      tutorialNoEndTurn = true;
      mouseOverlap = true;
    }
    //PauseMenu (endGame 3 is when person pauses a battle, 4 is pressing escape and 5 is a confirm you want to end the game.)
    if (endGame == 3 || endGame == 4 || endGame == 5) {
      fill(0, 180);
      rect(-50, -50, 1400, 700);
      fill(0);
      strokeWeight(4);
      stroke(255);
      textFont(anton);
      textSize(45);
      if (endGame == 3) {
        //Main menu button, which only appears in certain battles.
        rect(540, 230, 240, 60);
        fill(255);
        if (
          mouseX > 530 * scaleNum &&
          mouseX < 800 * scaleNum &&
          mouseY > 230 * scaleNum &&
          mouseY < 290 * scaleNum
        ) {
          if (mouseIsPressed) {
            if (!endlessSelect) {
              if (multiplayerSelect == 0) {
                screen = 9;
              }
              if (multiplayerSelect == 3) {
                //makes next turn splash message during multiplayer. it intentionally keeps the same turn to avoid acidental clicking a battle.
                if (screen == 3) {
                  screen = 19;
                  splashThing = new SplashMessage(whoseTurnMain + 2);
                }
                if (screen == 5) {
                  //screen = 9 leads to main menu after reseting some variables.
                  screen = 9;
                }
              }
            } else if (endlessSelect && tutorial == 0) {
              //backing out of a battle in endless mode still scores your performance
              screen = 8;
              music("none");
              //adds character bonus and score for which round you are on. if you back out of endless mode
              characterBonusAdd();
              mainScore[0] += endlessCount[1] * 500;
              mainScore[2] += endlessCount[1] * 500;
              //playerHealth = 1445, essentially acts as a tell if the player was sent to the score screen at the end of endless mode. (why did I use playerhealth instead of a different variable? IDK felt like it)
              //also add option card score bonus
              mainScore[2] += numOfOCard * 50;
              playerHealth = 1445;
            } else {
              screen = 9;
            }
            endGame = 0;
            backSound.play();
            oCardDetailsScreen = [0, false];
            optionCardBoard = [0, 0, 0, 0, 0];
            cardInDeckObjects = [];
            tutorialOn[1] = false;
            tutorialNoBCard = false;
            tutorialNoOCard = false;
            tutorialNoEndTurn = false;
            tutorialNoLetter = false;
            if (tutorial != 0) {
              tutorial = 0;
              tutorialText = 0;
            }
          }
          fill(255, 0, 0);
          if (multiplayerSelect == 0) {
            text("Main Menu", 562, 280);
          } else {
            text("Exit Battle", 570, 280);
          }
        } else {
          fill(255);
          if (multiplayerSelect == 0) {
            text("Main Menu", 562, 280);
          } else {
            text("Exit Battle", 570, 280);
          }
        }
      }
      //back To game button
      if (endGame == 3 || endGame == 4) {
        fill(0);
        rect(520, 150, 280, 60);
        rect(555, 390, 220, 60);
        if (
          mouseX > 520 * scaleNum &&
          mouseX < 810 * scaleNum &&
          mouseY > 150 * scaleNum &&
          mouseY < 210 * scaleNum
        ) {
          if (mouseIsPressed) {
            click.play();
            if (tutorial == 0) {
              tutorialNoBCard = false;
              tutorialNoOCard = false;
              tutorialNoLetter = false;
              tutorialNoEndTurn = false;
            }
            endGame = 0;
          }
          fill(255, 0, 0);
          text("Back To Game", 538, 200);
        } else {
          fill(255);
          text("Back To Game", 538, 200);
        }
        //Quit game button
        if (
          mouseX > 535 * scaleNum &&
          mouseX < 785 * scaleNum &&
          mouseY > 390 * scaleNum &&
          mouseY < 460 * scaleNum
        ) {
          if (mouseIsPressed) {
            endGame = 5;
            click.play();
          }
          fill(255, 0, 0);
          text("Quit Game", 577, 440);
        } else {
          fill(255);
          text("Quit Game", 577, 440);
        }
      }
      //Confirm quit button
      if (endGame == 5) {
        fill(255);
        text("Do You Want To Quit The Game?", 330, 100);
        if (
          mouseX > 200 * scaleNum &&
          mouseX < 370 * scaleNum &&
          mouseY > 230 * scaleNum &&
          mouseY < 335 * scaleNum
        ) {
          if (mouseIsPressed) {
            click.play();
            music("none");
            //IDk how to make a button exit the game so I hope this counts.
            remove();
          }
          fill(255, 0, 0);
          text("Yes", 250, 300);
        } else {
          fill(255);
          text("Yes", 250, 300);
        }
        if (
          mouseX > 850 * scaleNum &&
          mouseX < 1020 * scaleNum &&
          mouseY > 230 * scaleNum &&
          mouseY < 335 * scaleNum
        ) {
          if (mouseIsPressed) {
            endGame = 0;
            click.play();
            if (tutorial == 0) {
              tutorialNoBCard = false;
              tutorialNoOCard = false;
              tutorialNoEndTurn = false;
              tutorialNoLetter = false;
            }
          }
          fill(255, 0, 0);
          text("No", 900, 300);
        } else {
          fill(255);
          text("No", 900, 300);
        }
      }
      noStroke();
    }
  }
}

function clickTestMenu() {
  //creates and moves the title plus logo
  titleWords();
  if (mouseIsPressed) {
    //checks if you were in middle of a battle.
    if (!middleOfGame) {
      //if you weren't in the middle of a battle go to tutorial offer screen
      screen = 10;
    } else {
      //if you were in middle of game go to return to game screen
      screen = 18;
    }
    mouseOverlap = true;
  }
  textFont(cabinSketch);
  textSize(30);
  fill(255);
  text("Click Your Mouse To Begin", 490, 500);
}

function returnToGame() {
  //middleOfGame saver
  textSize(55);
  textFont(schoolBell);
  fill(0);
  text("It Appears You Were In The Middle Of A Battle.", 180, 55);
  text("Do You Want To Continue?", 350, 110);
  textSize(35);
  text("Press Space if Yes, \n       or the \nBack Button if No", 520, 165);
  backButtonFun();
  if (keyIsPressed && keyCode == 32) {
    if (playerHealth > 1) {
      screen = 3;
      //weirdly the music would be extremely loud when returning to battle so I manually set the volume here
      music("battle");
      battleTheme.setVolume(0.13);
      //make AceChosenValue to be a random number
      aceChosenValue = int(random(2, 11));
      //make getAceValue[0] one less than aceChosenValue so they aren't the same number and an infinite loop is made
      getAceValue[0] = aceChosenValue - 1;
      if (playerCharacter == 5) {
        //clear the option card board for the witch
        optionCardAppearArray = [23, 24, 2, -1, -1, -1];
      }
      enemyID = 3;
    enemyStats();
    nextEnemy = true;
    } else {
      //if playerHealth was less than one then go to word game screen
      //weirdly the music would be extremely loud when returning to battle so I manually set the volume here
      screen = 15;
      music("word");
      wordGameTheme.setVolume(0.7);
      nextEnemy = false;
    }
  }
}

function titleWords() {
  //small function to make title and logo hop
  textFont(cabinSketch);
  textSize(80);
  fill(0);
  image(logoIMG[3], 840, titleY[3], 200, 200);
  image(logoIMG[0], 200, titleY[0]);
  image(logoIMG[1], 435, titleY[1]);
  image(logoIMG[2], 710, titleY[2]);
  //Make title words bounce up and down
  if (millis() > timer[0] + 5000) {
    titleY[0] = 50;
  }
  if (millis() > timer[0] + 5500) {
    titleY[0] = 68;
    titleY[1] = 50;
  }
  if (millis() > timer[0] + 6000) {
    titleY[1] = 68;
    titleY[2] = 50;
  }
  if (millis() > timer[0] + 6500) {
    titleY[2] = 68;
    titleY[3] = 65;
  }
  if (millis() > timer[0] + 7000) {
    titleY[3] = 85;
    timer[0] = round(millis());
  }
}

function menuReset() {
  //various variables and arrays that need to be reset when the main menu or level screen is open.
  splashThing = 0;
  optionCardBoard = [];
  celebrate = [];
  celebrate2 = [];
  playerHealth = 45;
  multiplayerSelect = 0;
  endlessKeep = [false, false];
  pickLetters = [];
  pickLetters2 = [];
  freeLetter = 0;
  freeLetterReveal = [];
  freeGuess = 0;
  vowelDetect = [];
  vowelV = 0;
  hiddenWord = [];
  freeLetter2 = 0;
  freeLetterReveal2 = [];
  freeGuess2 = 0;
  vowelDetect2 = [];
  vowelV2 = 0;
  guessMode = false;
  overPlay = false;
  hiddenWord2 = [];
  chosenWordSplit = [];
  chosenWordSplit2 = [];
  guessPhrase = [];
  guessWordSplit = [];
  guessLetterDetect = 0;
  endlessPick = 0;
  levelScreen = 0;
  numOfOCard = 0;
  numOfOCardDetractor = 0;
  numOfEnemy = 0;
  enemyUnleashed = false;
  goodGuess = 0;
  nextEnemy = false;
  characterBonus = [0, 0, 0, 0, 0, 0, 0, 0];
  numOfShotCards = 0;
  wrongGuess = [0, 0, 0];
  endlessSelect = false;
  whoseTurn = 1;
  tutorialNoBCard = false;
  tutorialNoOCard = false;
  tutorialNoEndTurn = false;
  tutorialNoLetter = false;
  timer[0] = round(millis());
  titleY = [68, 68, 68, 85];
  enemyObject = [];
  //reset status and effects
  statusReset();
  if (screen == 9){
    //clear level Array if about to go to main menu
    level = [];
    //create clouds is about to go to main menu
    for (let i = 0; i < 10; i++) {
      cloudArray[i] = new Cloud();
    } 
  }
  //delete localstorage to save on memory
   localStorage.removeItem("stats");
    localStorage.removeItem("chosenWord");
    localStorage.removeItem("hiddenWord");
    localStorage.removeItem("chosenWordSplit");
    localStorage.removeItem("reveal");
    localStorage.removeItem("vowel");
    localStorage.removeItem("guess");
    localStorage.removeItem("hintEndless");
    localStorage.removeItem("whichLevel");
    localStorage.removeItem("middle?");
}

function mainMenu() {
  //moves clouds
  for (let i = 3; i < 10; i++) {
    cloudArray[i].move(i);
  }
  titleWords();
  //moves clouds also but this for three of the clouds they are in front of the title text 
  for (let j = 0; j < 3; j++) {
    cloudArray[j].move(j);
  }
  textFont(schoolBell);
  textSize(50);
  //all main menu options have a text shadow to help the text stand out on the half white half black background
  //singleplayer button
  if (
    mouseX > 100 * scaleNum &&
    mouseX < 435 * scaleNum &&
    mouseY > 120 * scaleNum &&
    mouseY < 180 * scaleNum
  ) {
    if (mouseIsPressed && !mouseOverlap) {
      screen = 2;
      click.play();
      //mouseOverlap is to ensure you don't accidently click two things if you hold the mouse down
      mouseOverlap = true;
      //singleplayer button brings you to character select menu so make those cards
      makeCharacterCards();
      //clear clouds
      cloudArray = [];
    }
    fill(100, 100, 180);
    text("-Singleplayer", 162, 162);
    fill(255, 0, 0);
    text("-Singleplayer", 160, 160);
  } else {
    fill(210, 0, 0);
    text("-Singleplayer", 112, 162);
    fill(0);
    text("-Singleplayer", 110, 160);
  }
  //multiplayer button
  if (
    mouseX > 100 * scaleNum &&
    mouseX < 425 * scaleNum &&
    mouseY > 190 * scaleNum &&
    mouseY < 250 * scaleNum
  ) {
    if (mouseIsPressed && !mouseOverlap) {
      screen = 2;
      click.play();
      //multiplayerSelect signifies that the player is choosing multiplayer
      multiplayerSelect = 1;
      mouseOverlap = true;
      //multiplayer button brings you to character select menu so make those cards
      makeCharacterCards();
      //clear clouds
      cloudArray = [];
      //splash message showing it is player one's turn to pick a character
      splashThing = new SplashMessage(3);
    }
    fill(100, 100, 180);
    text("-Multiplayer", 162, 232);
    fill(255, 0, 0);
    text("-Multiplayer", 160, 230);
  } else {
    fill(190, 0, 0);
    text("-Multiplayer", 112, 232);
    fill(0);
    text("-Multiplayer", 110, 230);
  }
  //leaderBoards button
  if (
    mouseX > 100 * scaleNum &&
    mouseX < 460 * scaleNum &&
    mouseY > 260 * scaleNum &&
    mouseY < 320 * scaleNum
  ) {
    if (mouseIsPressed && !mouseOverlap) {
      screen = 12;
      click.play();
      mouseOverlap = true;
      //leaderboards button brings you to character select menu so make those cards
      makeCharacterCards();
      //clear clouds
      cloudArray = [];
    }
    fill(100, 100, 180);
    text("-Leaderboards", 162, 302);
    fill(255, 0, 0);
    text("-Leaderboards", 160, 300);
  } else {
    fill(190, 0, 0);
    text("-Leaderboards", 112, 302);
    fill(0);
    text("-Leaderboards", 110, 300);
  }
  //endless mode button
  if (
    mouseX > 100 * scaleNum &&
    mouseX < 340 * scaleNum &&
    mouseY > 330 * scaleNum &&
    mouseY < 390 * scaleNum
  ) {
    if (mouseIsPressed && !mouseOverlap) {
      screen = 2;
      click.play();
      endlessSelect = true;
      mouseOverlap = true;
      playerHealth = playerMaxHealth;
      //endless mode button brings you to character select menu so make those cards
      makeCharacterCards();
      //clear clouds
      cloudArray = [];
    }
    fill(100, 100, 180);
    text("-Endless", 162, 372);
    fill(255, 0, 0);
    text("-Endless", 160, 370);
  } else {
    fill(190, 0, 0);
    text("-Endless", 112, 372);
    fill(0);
    text("-Endless", 110, 370);
  }
  //options button
  if (
    mouseX > 100 * scaleNum &&
    mouseX < 350 * scaleNum &&
    mouseY > 400 * scaleNum &&
    mouseY < 460 * scaleNum
  ) {
    if (mouseIsPressed && !mouseOverlap) {
      screen = 21;
      click.play();
      //clear clouds
      cloudArray = [];
      //makes option arrows
      for (let ade = 0; ade < 6; ade++) {
        optionButton[ade] = new OptionsUpDown(ade);
      }
    }
    fill(100, 100, 180);
    text("-Options", 162, 442);
    fill(255, 0, 0);
    text("-Options", 160, 440);
  } else {
    fill(190, 0, 0);
    text("-Options", 112, 442);
    fill(0);
    text("-Options", 110, 440);
  }
  //credits button
  if (
    mouseX > 100 * scaleNum &&
    mouseX < 330 * scaleNum &&
    mouseY > 470 * scaleNum &&
    mouseY < 530 * scaleNum
  ) {
    if (mouseIsPressed && !mouseOverlap) {
      screen = 11;
      click.play();
      //clear clouds
      cloudArray = [];
    }
    fill(100, 100, 180);
    text("-Credits", 162, 512);
    fill(255, 0, 0);
    text("-Credits", 160, 510);
  } else {
    fill(190, 0, 0);
    text("-Credits", 112, 512);
    fill(0);
    text("-Credits", 110, 510);
  }
}

function makeCharacterCards() {
  characterText = 0;
  //create character cards to be evenly spaced across the total width of the canvas
  for (let i = 1; i < characterUnlock; i++) {
    characterCards[i] = new CharacterSelectCards(((width / characterUnlock) * i) / scaleNum, 245, i);
  }
}

function characterSelectMenu() {
  //allow Character select cards to spin and bee seen/ clicked
  for (let j = 1; j < characterUnlock; j++) {
    characterCards[j].choose();
    characterCards[j].show();
  }
  textFont(schoolBell);
  fill(255);
  textSize(55);
  //Chibi images for each character
  if (characterText != 0) {
    image(chibiIMG[characterText - 1], 140, 500, 230, 270);
  }
  //Various character description text
  if (characterText == 1) {
    text("The King of Hearts", 250, 450);
    textSize(35);
    text("-The King is built around achieving high card values to", 300, 490);
    text("deal large damage.", 280, 525);
  }
  if (characterText == 2) {
    text("The Queen of Clubs", 250, 450);
    textSize(35);
    text("-The Queen is built around overwhelming the enemy ", 300, 490);
    text("with many low card values to deal repeated", 280, 525);
    text("incremental damage.", 280, 560);
  }
  if (characterText == 3) {
    text("The Jack of Diamonds", 250, 450);
    textSize(35);
    text("-The Jack is built around defeating his enemy by", 300, 490);
    text("inflicting them with debuffs while casting buffs on", 280, 525);
    text("himself.", 280, 560);
  }
  if (characterText == 4) {
    text("The Ace of Spades", 250, 450);
    textSize(35);
    text("-The Ace is built around landing precise shots with ", 300, 490);
    text("specific card values to deal extreme damage.", 280, 525);
  }
  if (characterText == 5) {
    text("The Red Witch Jessica", 250, 450);
    textSize(35);
    text("-The Witch is built around creating pairs to use a ", 300, 490);
    text("variety of unique spells.", 280, 525);
  }
  if (characterText == 6) {
    text("The Black Joker", 250, 450);
    textSize(35);
    text("-The Joker is built around adapting to the random ", 300, 490);
    text("chaos of the board. Nobody knows what the Joker's", 280, 525);
    text("strategy is, not even him.", 280, 560);
  }
  noStroke();
  //Make the tutorial button
  if (characterText != 0 && multiplayerSelect == 0) {
    enemyChars[4].highlight();
  }
}

function makeLevelSelectScreen() {
  //Making level select sticky notes
  for (let i = 0; i < 6; i++) {
    level[i] = new LevelSelect(300 + i * 160, 200, i + 1);
  }
}

function enemySelectMenu() {
  textFont(cabinSketch);
  //in multiplayer make the player turns loop
  if (multiplayerSelect == 3) {
    if (whoseTurnMain > 2) {
      whoseTurnMain = 1;
    }
    textSize(25);
    fill(255);
    rect(150, 5, 740, 50);
    text("- Hold Space To See Your Word", 940, 575);
  }
  if (multiplayerSelect == 0 || (whoseTurnMain == 2 && multiplayerSelect == 3)) {
    //UI for multiplayer players depending on whose turn it is
    if (multiplayerSelect == 3) {
      fill(200, 0, 0);
      textSize(45);
      text("Opponent (Player 1's) Hidden Word:", 160, 45);
      fill(255);
      textFont(schoolBell);
      text("Free Guesses: " + freeGuess2, 10, 580);
      text("Player 2", 10, 535);
      text("Your Stats:", 10, 490);
    }
    //hidden word shows in either multiplayer while it is player 2's turn or it is singleplayer
    for (let o = 0; o < hiddenWord.length; o++) {
      hiddenWord[o].visual();
    }
  }
  //check for if multiplayer mode and it is player 1's turn
  if (multiplayerSelect == 3 && whoseTurnMain == 1) {
    fill(0, 0, 200);
    textSize(45);
    text("Opponent (Player 2's) Hidden Word:", 160, 45);
    fill(255);
    textFont(schoolBell);
    text("Free Guesses: " + freeGuess, 10, 580);
    text("Player 1", 10, 535);
    text("Your Stats:", 10, 490);
    //show player 2's hidden word
    for (let o = 0; o < hiddenWord2.length; o++) {
      hiddenWord2[o].visual();
    }
  }
  //only let the enemies be selected if player is not in a tutorial or player is in tutorial 1 and tutorial text is > 2
  if (tutorial == 0 || (tutorialText > 2 && tutorial == 1)) {
    //Enemy options show and can be clicked
    for (let i = 0; i < 4; i++) {
      enemyChars[i].highlight();
    }
    //Guess phrase option if in nextEnemy or in multiplayer mode then let the option be clicked
    if (nextEnemy || multiplayerSelect == 3) {
      enemyChars[5].highlight();
    }
    //use free guesses if nextEnemy and more than one freeGuess this only appears in multiplayer
    if (nextEnemy && freeGuess > 0 && multiplayerSelect == 0) {
      enemyChars[6].highlight();
    }
  }
  fill(255);
  textSize(45);
  //Other information when in nextEnemy or screen 5
  if (multiplayerSelect == 0) {
    //theme hints
    hints();
    //if tutorial is zero and not in nextEnemy show the back of the player
    if (tutorial == 0){
      if (!nextEnemy){
    image(backIMG[playerCharacter - 1], 200, 431.04, 450.56, 337.92);
      }
    //clarity box for score and free guess info
    fill(20, 130);
    rect(20, 490, 330, 110);
    fill(255);
    textFont(schoolBell);
    text("Score: " + mainScore[0], 30, 535);
    text("Free Guesses: " + freeGuess, 30, 580);
    }
  }
  //if endless mode there is also info for which round you are on
  if (endlessSelect) {
    fill(20, 130);
    rect(20, 440, 200, 50);
    fill(255);
    text("Round: " + endlessCount[1], 30, 490);
  }
  //Small detail to change text if in nextEnemy
  if (screen == 5) {
    textFont(anton);
    textSize(50);
    if (tutorial == 0 && multiplayerSelect == 0) {
      text("Choose Your Enemy", 430, 580);
      text("Hidden Word:", 160, 45);
    }
  }
  if (nextEnemy) {
    textSize(50);
    text("Choose Your Next Enemy", 420, 580);
    text("Hidden Word:", 160, 45);
  }
  //Show your hidden word if hold space on your turn
  if (keyIsPressed && keyCode == 32 && multiplayerSelect == 3) {
    fill(0, 180);
    rect(-50, -50, 1400, 700);
    fill(255);
    textSize(45);
    text("Your Hidden Word:", 160, 45);
    //check whose turn it is and show the corresponding word
    if (whoseTurnMain == 2) {
      for (let wordVisual2 = 0; wordVisual2 < hiddenWord2.length; wordVisual2++
      ) {
        hiddenWord2[wordVisual2].visual();
      }
    } else {
      for (let wordVisual = 0; wordVisual < hiddenWord.length; wordVisual++) {
        hiddenWord[wordVisual].visual();
      }
    }
  }
}

function leaderBoardScreenPick() {
  //small screen for leaderboard select
  //make back button
  backButtonFun();
  fill(0);
  textSize(65);
  textFont(cabinSketch);
  text("Leaderboards", 420, 80);
  //let the character cards spin and be chosen
  for (let j = 1; j < characterUnlock; j++) {
    characterCards[j].choose();
    characterCards[j].show();
  }
  textFont(schoolBell);
  fill(255);
  textSize(45);
  text("Based On Endless Mode", 440, 480);
}

function leaderBoardScreen() {
  //disable middle of game and save data
  if (middleOfGame) {
    middleOfGame = false;
    crashSafe();
  }
  background(20);
  //make the back button
  backButtonFun();
  textSize(65);
  textFont(cabinSketch);
  fill(255);
  //name round score
  //i in this function works as an index for the leaderboard array the order is [1st place name, 1st round, 1st score, 2nd name etc...] and the leaderboard array has all leaderboard data for every character in one array so every 9 dataset another character's leaderboard info is kept
  let i = (playerCharacter - 1) * 9;
  image(chibiIMG[playerCharacter - 1], 100, 470, 230, 270);
  image(faceCardIMG[playerCharacter - 1], 100, 200, 150, 250);
  //write text for the player character
  if (playerCharacter == 1) {
    text("Leaderboards - King", 200, 80);
  }
  if (playerCharacter == 2) {
    text("Leaderboards - Queen", 200, 80);
  }
  if (playerCharacter == 3) {
    text("Leaderboards - Jack", 200, 80);
  }
  if (playerCharacter == 4) {
    text("Leaderboards - Ace", 200, 80);
  }
  if (playerCharacter == 5) {
    text("Leaderboards - Jessica", 200, 80);
  }
  if (playerCharacter == 6) {
    text("Leaderboards - Joker", 200, 80);
  }
  textSize(40);
  text("Name:", 290, 150);
  text("Round:", 610, 150);
  text("Score:", 830, 150);
  fill(255, 233, 26);
  text("1st:", 200, 215);
  //i serves as an index equal to 9* the player characte id. Since the data for each character is 9 items of the array we can display all the info using the following code.  
  text(leaderBoard[i], 290, 215);
  text(leaderBoard[i + 1], 610, 215);
  text(leaderBoard[i + 2], 830, 215);
  fill(192);
  text("2nd:", 200, 320);
  text(leaderBoard[i + 3], 290, 320);
  text(leaderBoard[i + 4], 610, 320);
  text(leaderBoard[i + 5], 830, 320);
  fill(153, 76, 0);
  text("3rd", 200, 425);
  text(leaderBoard[i + 6], 290, 425);
  text(leaderBoard[i + 7], 610, 425);
  text(leaderBoard[i + 8], 830, 425);  
  //leaderBoard[55] is used as a way to mark if a person made the leader board and the following code creates the text input for the name.
  if (leaderBoard[55]) {
    if (timer[9] == -1) {
      //create the input with 8 character max length
      leaderBoardInput = createInput("").attribute("maxlength", 8);
      leaderBoardInput.parent("inputA");
      //position the input box and size it
      leaderBoardInput.position(340 * scaleNum, 260 * scaleNum);
      leaderBoardInput.size(200 * scaleNum, 50 * scaleNum);
      //leaderBoardID is used later as an index to replace the name slot with whatever name you put in
      leaderBoardID = i;
    }
    //when the input is changed run the function leaderBoardName
    leaderBoardInput.changed(leaderBoardName);
    //flashing text marker timer
    if (millis() > timer[9] + 3000) {
      timer[9] = round(millis());
    }
    fill(255);
    textSize(40);
    //show your score if you came from an endless round
    text("You", 290, 550);
    text(endlessCount[1], 610, 550);
    text(mainScore[0], 830, 550);
    textSize(65);
    //leaderBoard[56] marks if player beat the previous top score. if they did congradulate them
    if (leaderBoard[56]) {
      fill(255, 0, 0);
      text("New Record!", 900, 80);
      if (millis() > timer[9] + 2000) {
        //along with the timer mark first place with a golden rectangle
        fill(255, 233, 26);
        rect(0, 180, 1400, 50);
        textSize(40);
        //make the text black to be more legible on the golden background
        fill(0);
        text("1st:", 200, 215);
        text(leaderBoard[i], 290, 215);
        text(leaderBoard[i + 1], 610, 215);
        text(leaderBoard[i + 2], 830, 215);
      }
      image(arrow, 70, 205, 100, 40);
    }
    //leaderboard[57] marks if they made second place
    if (leaderBoard[57]) {
      fill(255, 0, 0);
      text("Congrats!", 900, 80);
      if (millis() > timer[9] + 2000) {
        //along with the timer make a silver rectangle to mark second place
        fill(192);
        rect(0, 285, 1400, 50);
        textSize(40);
        //make text black to be more legible on the silver background
        fill(0);
        text("2nd:", 200, 320);
        text(leaderBoard[i + 3], 290, 320);
        text(leaderBoard[i + 4], 610, 320);
        text(leaderBoard[i + 5], 830, 320);
      }
      image(arrow, 70, 310, 100, 40);
    }
    //leaderboard[58] marks third place
    if (leaderBoard[58]) {
      fill(255, 0, 0);
      text("Congrats!", 900, 80);
      if (millis() > timer[9] + 2000) {
        //make a bronze rectangle to mark the 3rd place
        fill(153, 76, 0);
        rect(0, 390, 1400, 50);
        textSize(40);
        //make text black to be more legible on the bronze background
        fill(0);
        text("3rd:", 200, 425);
        text(leaderBoard[i + 6], 290, 425);
        text(leaderBoard[i + 7], 610, 425);
        text(leaderBoard[i + 8], 830, 425);
      }
      image(arrow, 70, 415, 100, 40);
    }
    //leaderBoardID marks what i was for the input
    if (leaderBoardID == i) {
      //text for the input
      fill(255, 180);
      rect(-50, -50, 1400, 700);
      fill(255, 0, 0);
      textSize(40);
      text("Enter Your Name:", 340, 210);
      textSize(30);
      text("(Max 8 Characters)", 340, 250);
    }
  }
}

function leaderBoardName() {
  //this function is what sets whatever name the player inputed in and puts it into the leaderboard slot
  //first it checks what place the player's name belongs in. if leaderboard[55] is true player made first place, if [56] then second place if [58] then third place
  if (leaderBoard[56]) {
    leaderBoard[leaderBoardID] = this.value();
  }
  if (leaderBoard[57]) {
    leaderBoard[leaderBoardID + 3] = this.value();
  }
  if (leaderBoard[58]) {
    leaderBoard[leaderBoardID + 6] = this.value();
  }
  //remove the input and the text then store the new leaderboard data
  leaderBoardInput.remove();
  leaderBoardID = -5;
  storeData();
}

function optionsScreen() {
  let fs = fullscreen();
  backButtonFun();
  fill(0);
  textSize(80);
  textFont(cabinSketch);
  //write options screen text
  text("Options", 420, 70);
  textFont(schoolBell);
  textSize(60);
  text("Screen Size:                    " + round((scaleNum / tempScale[2]) * 100) + "%", 250, 165);
  text("Music:                           " + round(volumeNum2 * 100) + "%", 250, 370);
  text("Sound Effects:                 " + round(volumeNum * 100) + "%", 250, 440);
  text("- Test:", 270, 510);
  //fullscreen button for if fullscreen isn't already active
  if (!fs) {
    if (
      mouseX > 890 * scaleNum &&
      mouseX < 980 * scaleNum &&
      mouseY > 190 * scaleNum &&
      mouseY < 240 * scaleNum
    ) {
      if (mouseIsPressed && !mouseOverlap) {
        click.play();
        mouseOverlap = true;
        //turn on full screen
        fullscreen(!fs);
        //and make the canvas take up the entire screen. but the porportions still need to be equal or the game will become weird. So I take the minimum number of the width/height divided by the pixels I originally made the game in.
        let tempScaleFull = [];
        tempScaleFull[0] = displayWidth / 1300;
  tempScaleFull[1] = displayHeight / 600;
  tempScaleFull[2] = round(min(tempScaleFull), 2);
  scaleNum = tempScaleFull[2];
        //resize the camera and move the camera to be centered.
        resizeCanvas(1300 * scaleNum, 600 * scaleNum);
        currCamera.move(650 * scaleNum, 300 * scaleNum, 0);
      }
      fill(255, 0, 0);
    }
    text("On", 900, 235);
    fill(0);
    text("- Fullscreen:", 270, 235);
    //default screen size button
    if (
      mouseX > 850 * scaleNum &&
      mouseX < 1050 * scaleNum &&
      mouseY > 260 * scaleNum &&
      mouseY < 330 * scaleNum
    ) {
      if (mouseIsPressed && !mouseOverlap) {
        mouseOverlap = true;
        click.play();
        //make the scaleNum to be default
        scaleNum = tempScale[2];
        //resize canvas and move camera to be centered
        resizeCanvas(1300 * scaleNum, 600 * scaleNum);
        currCamera.move(650 * scaleNum, 300 * scaleNum, 0);
      }
      fill(255, 0, 0);
    }
    text("Default", 860, 305);
    textSize(30);
    fill(255, 0, 0);
    text("* Warning: Enlarging Screen Size May Cause Lag", 220, 305);
  } else {
    fill(255, 0, 0);
    text("* Warning: Fullscreen May Cause Lag.", 220, 235);
  }
  fill(0);
  //test button for sound effects
  if (
    mouseX > 880 * scaleNum &&
    mouseX < 1010 * scaleNum &&
    mouseY > 440 * scaleNum &&
    mouseY < 520 * scaleNum
  ) {
    if (mouseIsPressed && !mouseOverlap) {
      mouseOverlap = true;
      let x = int(random(8));
      //random sounds that I think are usually the loudest/most prevalent
      if (x == 0) {
        gun.play();
      }
      if (x == 1) {
        oPlay.play();
      }
      if (x == 2) {
        land.play();
      }
      if (x == 3) {
        bigHit.play();
      }
      if (x == 4) {
        hit1.play();
      }
      if (x == 5) {
        hit2.play();
      }
      if (x == 6) {
        heal.play();
      }
      if (x == 7) {
        error.play();
      }
    }
    fill(255, 0, 0);
  }
  textSize(60);
  text("Play", 890, 510);
  //make the 6 options arrow buttons and let them be clicked
  for (let i = 0; i < 6; i++) {
    optionButton[i].click();
    optionButton[i].show();
  }
  //test if volume numbers are too high or too low
  if (volumeNum <= 0) {
    volumeNum = 0;
  }
  if (volumeNum > 1.7) {
    volumeNum = 1.7;
  }
  if (volumeNum2 <= 0) {
    volumeNum2 = 0;
  }
  if (volumeNum2 > 1.7) {
    volumeNum2 = 1.7;
  }
  //check if scale number is too low
  if (scaleNum < 0.3) {
    scaleNum = 0.3;
    //resize canvas and move it to be centered
    resizeCanvas(1300 * scaleNum, 600 * scaleNum);
    currCamera.move(650 * scaleNum, 300 * scaleNum, 0);
  }
}

function creditsScreen() {
  //credits screen
  image(credit, 650, 300, 1300, 600);
  //make colorful rain confetti thing
  party(2);
  //make back button
  backButtonFun();
  //if space is pressed go to special thanks screen
  if (keyIsPressed && keyCode == 32) {
    screen = 24;
  }
  fill(0);
  textSize(60);
  textFont(cabinSketch);
  text("Press Space", 100 , 550);
}

function specialThanksScreen() {
  background(0);
  //make colored rain 
  party(2);
  //make back button
  backButtonFun();
  fill(255);
  textSize(25);
  //make tiny image of me (yes that is me)
  rect(1000, 500, 120, 100);
  image(loseIMG[6], 980, 500, 307, 401);
  text("             Hello! This is Jason Le the creator of The King's Hand. I would like to thank you for playing my game.\n\n      I started working on this game September 21, 2022 and finished this game on February 8, 2023. In those few months \nI learnt so much and worked so hard. This was my first game in the p5 library and I couldn't be more proud of it. I put \neverything I wanted to into this game and more. The last game I made was in 8th grade and so as I write this in my \nsenior year of highschool, I wanted to make this game the epitome of everything I have learnt in high school and \nespecially in FBLA. There are many people I want to thank including my two FBLA advisers Mr. Ball and Mr. Streff. I \noriginally joined the club because of the former president, Abby's random invitation one day in French class, my \nsophomore year. She told me I wouldn't need to do that much work in the club so I decided to join for fun. It's funny how \none random casual invitation can change two whole years of a person's life. Here I am a proud officer of the club and \ncompleting the most ambitious project I have ever made. As I move forward into college I will take what I have learnt \nfrom my time in FBLA. When I look back on my high school career, one of the first things I will think about is my FBLA \nexperiences. My only regret is that I didn't join the club sooner. \n     I would like to thank my entire FBLA club especially the previously mentioned Abby and Gracyn. Furthermore I would \nlike to thank The Coding Train youtube channel as I learnt everything about p5.js from their videos and my own \npersistance. And finally, I would like to once again thank you for playing my game.\n\n                                     - Jason Le, Game Director, Artist, Programmer, and Proud FBLA Officer", 55, 50);
  //check if the player is on this screen after finishing the final level. if they are write fin in the bottom left of the screen
  if (characterCardUnlock[0] == 8){
    textSize(45);
    fill(200, 0, 100);
    text("FIN", 1200, 565);
  }  
}

function gameOverScreen() {
  //Game over Screen
  background(0);
  playerTurn = true;
  nextEnemy = false;
  //make back button
  backButtonFun();
  fill(255);
  textSize(60);
  textFont(cabinSketch);
  text("GAME OVER", 450, 100);
  //reset score
  if (!endlessSelect) {
    mainScore = [0, 0, 0];
  }
  //write the actual phrase if single player mode
  if (multiplayerSelect == 0) {
    text("The Actual Phrase Was: \n" + chosenWord, 350, 200);
  }
  fill(80);
  rect(358, 380, 530, 220);
  fill(180);
  rect(358, 570, 530, 30);
  //draw the loose image along with the other card player (which is actually me fun fact)
  image(loseIMG[playerCharacter - 1], 600, 430, 384, 502);
  image(loseIMG[6], 620, 430, 384, 502);
}

function music(which) {
  //check the which parameter and depending on what it is play said music while stopping other songs
  if (which == "menu") {
    battleTheme.stop();
    bossTheme.stop();
    wordGameTheme.stop();
    winnerTheme.stop();
    //if the song was already playing just keep playing the song
    if (!menuTheme.isPlaying()) {
      menuTheme.loop();
    }
  }
  if (which == "battle") {
    menuTheme.stop();
    bossTheme.stop();
    wordGameTheme.stop();
    winnerTheme.stop();
     //if the song was already playing just keep playing the song
    if (!battleTheme.isPlaying()) {
      battleTheme.loop();
      //i like starting the battle theme a .6 seconds into the song so it is a more energetic beginning
      battleTheme.jump(0.6);
    }
  }
  if (which == "boss") {
    menuTheme.stop();
    battleTheme.stop();
    wordGameTheme.stop();
    winnerTheme.stop();
     //if the song was already playing just keep playing the song
    if (!bossTheme.isPlaying()) {
      bossTheme.loop();
    }
  }
  if (which == "word") {
    menuTheme.stop();
    battleTheme.stop();
    bossTheme.stop();
    winnerTheme.stop();
     //if the song was already playing just keep playing the song
    if (!wordGameTheme.isPlaying()) {
      wordGameTheme.loop();
    }
  }
  if (which == "winner") {
    menuTheme.stop();
    battleTheme.stop();
    bossTheme.stop();
    wordGameTheme.stop();
     //if the song was already playing just keep playing the song
    if (!winnerTheme.isPlaying()) {
      winnerTheme.loop();
      //i like starting the winner theme a minute in so that the song drop somewhat fits with the final score reveal
      winnerTheme.jump(60);
    }
  }
  //turn off all music
  if (which == "none") {
    menuTheme.stop();
    battleTheme.stop();
    bossTheme.stop();
    wordGameTheme.stop();
    winnerTheme.stop();
  }
}

function oCardAttackAnimation(which) {
  //optioncard animation this creates the card at the same x and y + 40 as the option card that was used which we know which card was used through the which parameter
  oCardAttack = new OptionCardAttack(optionCardBoard[which].x, optionCardBoard[which].y);
  //play the attack sound
  gun.play();
}

function optionCardSetup() {
  //Every character (except the joker) has a special card that is always in the first slot of the option card board so the following checks which character is being used and sets the first slot of the optionCardAppearArray to be the id of the special character card
  if (
    (playerCharacter == 1 && whoseTurn == 1) ||
    (player2Character == 1 && whoseTurn == 2)
  ) {
    optionCardAppearArray[0] = 1;
  }
  if (
    (playerCharacter == 2 && whoseTurn == 1) ||
    (player2Character == 2 && whoseTurn == 2)
  ) {
    optionCardAppearArray[0] = 6;
  }
  if (
    (playerCharacter == 3 && whoseTurn == 1) ||
    (player2Character == 3 && whoseTurn == 2)
  ) {
    optionCardAppearArray[0] = 22;
  }
  if (
    (playerCharacter == 4 && whoseTurn == 1) ||
    (player2Character == 4 && whoseTurn == 2)
  ) {
    optionCardAppearArray[0] = 17;
  }
  if (
    (playerCharacter == 5 && whoseTurn == 1) ||
    (player2Character == 5 && whoseTurn == 2)
  ) {
    //witch has two special cards (her book)
    optionCardAppearArray[0] = 23;
    optionCardAppearArray[1] = 24;
  }
  // for loop checks the option card array for each option card which is assigned a number
  fill(0);
  //double text is for option cards that need text updated
  //doubleText is reset
  doubleText = [-1, -1, -1, 0];
  for (let g = 0; g < 6; g++) {
    //check for the three cards that need double text acespecial, Syringe, magazine
    if (optionCardAppearArray[g] == 17) {
      //if it finds the card that needs doubleText keep track of which position they are in and doubleText[1] adds to track how may of said cards are in battle
      doubleText[0] = g;
      doubleText[3]++;
    }
    if (optionCardAppearArray[g] == 21) {
      doubleText[1] = g;
      doubleText[3]++;
    }
    if (optionCardAppearArray[g] == 30) {
      doubleText[2] = g;
      doubleText[3]++;
    }
    if (optionCardBoard[g] == 0 || optionCardBoard[g] == null) {
      //normally optioncardappeararray will never equal 1 (or the other special attack cards) but they are here for joker if he has them (except the witch who's book pages never appear for the joker)
      //the following huge block of code checks through the optionCardAppearArray and makes the corresponding option card in the optionCardBoard slot
      if (optionCardAppearArray[g] == 1) {
        optionCardBoard[g] = new KingSpecialAttack(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 2) {
        optionCardBoard[g] = new AddingCard(g * 170 + 125, 225, g);
        //the witch's special card is a wild adding card so the following checks if the player is the witch and if they have unlocked the special card
        if (playerCharacter == 5 && multiplayerSelect == 0) {
          if (characterCardUnlock[5] && tutorial == 0) {
            optionCardBoard[2].wild = true;
          }
        }
      }
      if (optionCardAppearArray[g] == 3) {
        optionCardBoard[g] = new DodgeOptionCard(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 4) {
        optionCardBoard[g] = new RedrawCard(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 5) {
        optionCardBoard[g] = new DuplicateCard(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 6) {
        optionCardBoard[g] = new QueenSpecialAttack(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 7) {
        optionCardBoard[g] = new SplitCardCard(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 8) {
        optionCardBoard[g] = new HealCard(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 9) {
        optionCardBoard[g] = new KeepCardCard(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 10) {
        optionCardBoard[g] = new AddOneCard(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 11) {
        optionCardBoard[g] = new SubtractOneCard(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 12) {
        optionCardBoard[g] = new GetTenCard(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 13) {
        optionCardBoard[g] = new HealThreeCard(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 14) {
        optionCardBoard[g] = new NeedOddDamage(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 15) {
        optionCardBoard[g] = new NeedEvenDamage(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 16) {
        optionCardBoard[g] = new DealDoubleDamage(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 17) {
        optionCardBoard[g] = new AceSpecialAttack(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 18) {
        optionCardBoard[g] = new MultiplyCard(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 19) {
        optionCardBoard[g] = new PowerCharge(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 20) {
        optionCardBoard[g] = new WeakenSelf(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 21) {
        optionCardBoard[g] = new EnemyRandomStatus(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 22) {
        optionCardBoard[g] = new JackSpecialAttack(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 23) {
        optionCardBoard[g] = new WitchSpecialLeft(125, 225, g);
      }
      if (optionCardAppearArray[g] == 24) {
        optionCardBoard[g] = new WitchSpecialRight(295, 225, g);
      }
      if (optionCardAppearArray[g] == 25) {
        optionCardBoard[g] = new SubtractCard(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 26) {
        optionCardBoard[g] = new BlockCard(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 27) {
        optionCardBoard[g] = new SevenDamage(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 28) {
        optionCardBoard[g] = new TenDamage(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 29) {
        optionCardBoard[g] = new DoubleDamage(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 30) {
        optionCardBoard[g] = new GetAceCard(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 31) {
        optionCardBoard[g] = new FiftyFifty(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 32) {
        optionCardBoard[g] = new AddTwoCard(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 33) {
        optionCardBoard[g] = new SubtractTwoCard(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 34) {
        optionCardBoard[g] = new OCardStronger(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 35) {
        optionCardBoard[g] = new QuadruplicateCard(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 36) {
        optionCardBoard[g] = new NeedSuitCard(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 37) {
        optionCardBoard[g] = new TwoPoison(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 38) {
        optionCardBoard[g] = new FreeGuessCard(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 39) {
        optionCardBoard[g] = new PickpocketCard(g * 170 + 125, 225, g);
      }
      if (optionCardAppearArray[g] == 40) {
        optionCardBoard[g] = new CureStatus(g * 170 + 125, 225, g);
      }
      //if endlesskeep[1] is true that means the player chose to have a wild special so the following makes the special card wild (or if the witch it makes the adding card wild) 
      if (endlessKeep[1]) {
        optionCardBoard[0].wild = true;
        if (playerCharacter == 5 && optionCardBoard[2] != 0) {
          optionCardBoard[2].wild = true;
        }
      }
      //mainly used for the witch to mark empty optioncardboards
      if (optionCardAppearArray[g] == -1) {
        optionCardGraphics[g].clear();
        optionCardBoard[g] = 0;
      }
      //make the graphics for the option cards
      if (optionCardBoard[g] !== 0) {
        optionCardGraphics[g].clear();
        optionCardGraphics[g].fill(0);
        optionCardGraphics[g].textSize(22);
        optionCardBoard[g].create();
      }
    }
  }
  if (tutorial == 0) {
    //wild in game creater
    if (wildInGame && multiplayerSelect == 0 && !overPlay) {
      if (playerCharacter != 5) {
        //much harder to get wild in chance for joker due to how frequently he gets a chance of getting it
        if (playerCharacter == 6) {
          //make wildChance a random number
          wildChance = int(random(17));
        } else {
          wildChance = int(random(10));
        }
        //if wildChance = 1 then make a random card wild also add to characterBonus[6] which is the joker's character bonus based off of having wild cards
        if (wildChance == 1) {
          characterBonus[6]++;
          let thisOne = int(random(1, 6));
          optionCardBoard[thisOne].wild = true;
          //clear the graphic of the wild as the need to take on their wild appearance
          optionCardGraphics[thisOne].clear();
          optionCardGraphics[thisOne].fill(0);
          optionCardGraphics[thisOne].textSize(22);
          optionCardBoard[thisOne].create();
        }
      }
      if (playerCharacter == 5) {
        //slightly harder to get wild in chance for witch due to always having a chance every time you use her book
        wildChance = int(random(13));
        //if wildChance = 1 and the witch has an option card to make wild then...
        if (wildChance == 1 && witchCardNum > 0) {
          //check which option card slot has a card.
          for (let yi = 3; yi < 6; yi++) {
            if (optionCardBoard[yi] != 0) {
              //when you find an option card make it wild and clear the graphics to make the graphic take a wild appearance
              optionCardBoard[yi].wild = true;
              optionCardGraphics[yi].clear();
              optionCardGraphics[yi].fill(0);
              optionCardGraphics[yi].textSize(22);
              optionCardBoard[yi].create();
              //make yi = 6 which stops the for loop
              yi = 6;
            }
          }
        }
      }
    }
  }
}

function startCardBattleSetup() {
  //Timer[8] is used to make the enemy health bars change for a flourish
  timer[8] = round(millis());
  //Change the value the get ten card and magazine needs
  tenCardNeeded = shuffle([6, 7, 7, 7, 8, 8, 8, 9]);
  getAceValue[0] = int(random(1, 11));
  //remove the dodge status effects
  if (dodgeNextAttack != 0) {
    dodgeNextAttack = 0;
  }
  if (dodgeAllAttack) {
    dodgeAllAttack = false;
    removeStatusIcon(7, -1);
  }
  //cardInDeckPicker is used for battle card suits
  let cardInDeckPicker = [
    int(random(4)),
    int(random(4)),
    int(random(4)),
    int(random(4)),
    int(random(4)),
  ];
  // shuffles the four suits to be used in the deck and randomizes what cars you get
  //I use shuffle like this instead of random as I don't want repeats in the exact same card ex: there won't be two four of hearts.
  let cardInDeckHeart = shuffle([1, 2, 3, 4, 5, 6]);
  let cardInDeckSpade = shuffle([1, 2, 3, 4, 5, 6]);
  let cardInDeckDiamond = shuffle([1, 2, 3, 4, 5, 6]);
  let cardInDeckClub = shuffle([1, 2, 3, 4, 5, 6]);
  //The following creates and shuffles the option card board for each character. each character has can recieve different cards.
  if (tutorial == 0 || tutorial == 10 || tutorial == 9) {
    if (
      (playerCharacter == 1 && whoseTurn == 1) ||
      (player2Character == 1 && whoseTurn == 2)
    ) {
      optionCardAppearArray = [2, 3, 4, 5, 8, 9, 10, 12, 13, 14, 15, 32, 36, 38];
      //characterCardUnlock checks whether the player has unlocked each character's special card and if they have add it to the deck.
      if (characterCardUnlock[1]) {
        optionCardAppearArray.push(19);
      }
    }
    if (
      (playerCharacter == 2 && whoseTurn == 1) ||
      (player2Character == 2 && whoseTurn == 2)
    ) {
      optionCardAppearArray = [3, 4, 5, 7, 8, 11, 13, 16, 20, 25, 33, 36, 37, 38];
      //characterCardUnlock checks whether the player has unlocked each character's special card and if they have add it to the deck.
      if (characterCardUnlock[2]) {
        optionCardAppearArray.push(35);
      }
    }
    if (
      (playerCharacter == 3 && whoseTurn == 1) ||
      (player2Character == 3 && whoseTurn == 2)
    ) {
      optionCardAppearArray = [2, 3, 4, 5, 8, 13, 14, 15, 18, 21, 32, 36, 38, 39];
      //characterCardUnlock checks whether the player has unlocked each character's special card and if they have add it to the deck.
      if (characterCardUnlock[3]) {
        optionCardAppearArray.push(31);
      }
    }
    if (
      (playerCharacter == 4 && whoseTurn == 1) ||
      (player2Character == 4 && whoseTurn == 2)
    ) {
      optionCardAppearArray = [2, 3, 4, 5, 7, 8, 10, 11, 12, 13, 18, 25, 32, 33, 38];
      //characterCardUnlock checks whether the player has unlocked each character's special card and if they have add it to the deck.
      if (characterCardUnlock[4]) {
        optionCardAppearArray.push(30);
      }
      //The ace can get all battle card values at the beginning of the game.
      cardInDeckHeart = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      cardInDeckSpade = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      cardInDeckDiamond = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      cardInDeckClub = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    }
    if (
      (playerCharacter == 5 && whoseTurn == 1) ||
      (player2Character == 5 && whoseTurn == 2)
    ) {
      let p = false;
      if (multiplayerSelect == 3) {
        //if it is the beginning turns of multiplayer the witch gets a complete new option card board
        if (turnCount == 1 || turnCount == 2) {
          //witchCardNum checks how many option cards the Withc has it can't be greater than 3
          witchCardNum = 0;
          optionCardAppearArray = [23, 24, 2, -1, -1, -1];
          //Witch deck is used to prevent dupicate cards by stating if there is already that card in the deck but at the beginning of the battle they are all false since no option cards currently.
          for (let j = 0; j < 10; j++) {
            witchDeck[j] = false;
          }
        }
        //if it isn't the beginning turns then make the option card board and withcardnum the same as it was last turn which was saved when the player ended their turn.
        if (turnCount != 2 && turnCount != 1) {
          if (whoseTurn == 1) {
            optionCardAppearArray = witchCards1;
            witchDeck = witchDeck1;
            witchCardNum = witchCardNum1;
          }
          if (whoseTurn == 2) {
            optionCardAppearArray = witchCards2;
            witchDeck = witchDeck2;
            witchCardNum = witchCardNum2;
          }
        }
      }
      //add Cauldron card and make it's witchDeck full (true)
      optionCardAppearArray[2] = 2;
      witchDeck[3] = true;
    }
    if (
      (playerCharacter == 6 && whoseTurn == 1) ||
      (player2Character == 6 && whoseTurn == 2)
    ) {
      //I use shuffles instead of int(random()) because there can be no repeats also some numbers can not appear
      //fill x with all optionCards
      let x = [];
      for (dee = 0; dee < 39; dee++) {
        x[dee] = dee + 1;
      }
      //remove specific cards like character exclusive cards, witch pages, etc...
      x.splice(18, 1);
      x.splice(21, 2);
      x.splice(22, 1);
      x.splice(24, 3);
      if (characterCardUnlock[6]) {
        x.splice(27, 1);
      } else {
        x.splice(26, 2);
      }
      optionCardAppearArray = x;
      //make ace chosen value random
      aceChosenValue = int(random(1, 11));
      getAceValue[1] = aceChosenValue;
    }
  }
  if (
    (playerCharacter != 5 && whoseTurn == 1) ||
    (player2Character != 5 && whoseTurn == 2)
  ) {
    //unless you are the witch check if the player is frozen, poison or weaken
    if (whoseTurn == 1) {
      if (poisonStat[1] || weakenStat[1] || freezeStat[1]) {
        //if the player is frozen, weaken, or poisoned then add the 40th option card which cures status
        optionCardAppearArray.push(40);
      }
    }
    //do the same but for player 2
    if (whoseTurn == 2) {
      if (poisonStat[2] || weakenStat[2] || freezeStat[2]) {
        optionCardAppearArray.push(40);
      }
    }
    //shuffle the boards unless you are the witch
    optionCardAppearArray = shuffle(optionCardAppearArray);
  }
  //overplay remove healing if overplay is activated by losing all your health. (physic the other healing card is changed into free guess)
  if (playerHealth <= 0 && overPlay) {
    for (let agh = 0; agh < optionCardAppearArray.length; agh++) {
      if (optionCardAppearArray[agh] == 13) {
        optionCardAppearArray.splice(agh, 1);
      }
    }
  }
  //create new battle cards
  for (let o = 0; o < 5; o++) {
    cardInDeckObjects[o] = new BattleCard(700 + o * 100, 500, o + 1);
  }
  //the following line of code just ensures that atlease one card will get frozen over. (in the unlikely case that all happen to not freeze over it owuld look like the status did nothing or didn't work so this was put to fix that.)
  cardInDeckObjects[int(random(5))].freeze = 2;
  // checks the picker variable for which number it randomly generated. depending on number it chooses a suit
  //I use shuffle like this instead of random as I don't want repeats in the exact same card ex: there won't be two four of hearts.
  for (let i = 0; i < 5; i++) {
    if (cardInDeckPicker[i] == 0) {
      cardInDeckObjects[i].cardScore = cardInDeckHeart[i];
    }
    if (cardInDeckPicker[i] == 1) {
      cardInDeckObjects[i].cardScore = cardInDeckSpade[i];
    }
    if (cardInDeckPicker[i] == 2) {
      cardInDeckObjects[i].cardScore = cardInDeckDiamond[i];
    }
    if (cardInDeckPicker[i] == 3) {
      cardInDeckObjects[i].cardScore = cardInDeckClub[i];
    }
    cardInDeckObjects[i].suit = cardInDeckPicker[i];
    //add to queen's bonus if she happens to get aces
    if (cardInDeckObjects[i].cardScore == 1) {
      characterBonus[2]++;
    }
  }
  //if a card was kept
  if (keepACard) {
    //if they kept a card other than the original 5 make the kept card the first battle card instead
    if (keepACardID[0] > 4) {
      keepACardID[0] = 4;
    }
    //making the card score and suit the same as the kept card
    cardInDeckObjects[keepACardID[0]].cardScore = keepACardScore;
    cardInDeckObjects[keepACardID[0]].suit = keepACardSuit;
    //reset keep a card variables
    keepACardScore = 0;
    keepACardID[0] = -1;
    keepACardSuit = 0;
    keepACard = false;
    cardIsBeingKept = -1;
  }
  //status effects
  if (multiplayerSelect == 0) {
    //if pickpocketed remove that card
    if (pickpocketStat[1]) {
      cardInDeckObjects[4] = -1;
      pickpocketStat[1] = false;
      removeStatusIcon(4, -1);
    }
    //heal player if they have regen and it isn't overplay
    if (regenStat[1] && !overPlay) {
      heal.play();
      playerHealth += int(random(1, 4));
    }
    //poison player if they are poison and it isn't overplay
    if (poisonStat[1] && !overPlay) {
      playerHealth -= int(random(2, 3));
      //poison can not kill a player
      if (playerHealth <= 0) {
        playerHealth = 1;
      }
    }
  }
  //Status effects but for multiplayer based on turn
  if (multiplayerSelect == 3) {
    if (pickpocketStat[2] && whoseTurn == 2) {
      cardInDeckObjects.splice(4, 1);
      pickpocketStat[2] = false;
      removeStatusIcon(4, 2);
    }
    if (pickpocketStat[1] && whoseTurn == 1) {
      cardInDeckObjects.splice(4, 1);
      pickpocketStat[1] = false;
      removeStatusIcon(4, 1);
    }
  }
  //weaken and lower battle cards if they are weak
  if ((whoseTurn == 1 && weakenStat[1]) || (weakenStat[2] && whoseTurn == 2)) {
    weak = setTimeout(playerWeak, 1500);
    timer[1] = round(millis());
  } else {
    timer[1] = 0;
  }
  //create option cards based on optionCardAppearArray
  optionCardSetup();
}

function startCardBattle() {
  fill(255);
  textFont(schoolBell);
  textSize(25);
  //end turn text and card
  text("End Turn", 1175, 420);
  push();
  //specialIMG[0] is flipped so the scale unflips it
  scale(-1, 1);
  image(specialIMG[0], -1220, 500, 80, 130);
  pop();
  //name Clarity Box
  fill(50, 200);
  rect(350, 0, 482, 45);
  //Singleplayer ui for battles
  if (multiplayerSelect == 0) {
    //back image based on the playerCharacter
    image(backIMG[playerCharacter - 1], 200, 431.04, 450.56, 337.92);
    fill(255);
    textSize(40);
    //character name based on player character
    if (playerCharacter == 1) {
      text("King", 330, 415);
    }
    if (playerCharacter == 2) {
      text("Queen", 330, 415);
    }
    if (playerCharacter == 3) {
      text("Jack", 330, 415);
    }
    if (playerCharacter == 4) {
      text("Ace", 330, 415);
    }
    if (playerCharacter == 5) {
      text("Jessica", 330, 415);
    }
    if (playerCharacter == 6) {
      text("Joker", 330, 415);
    }
    noStroke();
    //make healthbar orange if enemy is enraged
    if (!enemyRage[0]) {
      fill(0);
    } else if (enemyRage[0]) {
      fill(255, 165, 0);
    }
    rect(346, 36, 508, 38);
    fill(0);
    rect(326, 429, 168, 43);
    //place for player health
    fill(170, 2, 3);
    //the map function makes two variables of different ammounts smootlhly correlate. Since the playerMax health is different than the width value of the player's health bar i need to map the two variables to make the health bar smoothly decrease and increase
    let playerHealthVariable = map(playerHealth, 0, playerMaxHealth, 0, 160);
    noStroke();
    push();
    imageMode(CORNER);
    fill(0);
    image(health, 330, 433, 160, 35);
    rect(490, 433, -(160 - playerHealthVariable), 35);
    pop();
    //makes health bar actually decrease/increase when hurt
    if (enemyHealth > enemyDisplayHealth) {
      enemyDisplayHealth += 0.5;
    }
    if (enemyHealth < enemyDisplayHealth) {
      enemyDisplayHealth -= 0.5;
    }
    //place for enemy health
    //the map function makes two variables of different ammounts smootlhly correlate. Since the enemyMax health is different than the width value of the enemy's health bar i need to map the two variables to make the health bar smoothly decrease and increase
    let enemyHealthBarVariable = map(enemyDisplayHealth, 0, enemyHealthMax, 0, 500);
    if (enemyHealthBarVariable <= 0) {
      enemyHealthBarVariable = 0;
    }
    fill(150, 2, 3);
    push();
    imageMode(CORNER);
    //makes health change for a flourish
    if (millis() > timer[8] + 600) {
      timer[8] = round(millis());
    }
    if (millis() > timer[8] + 400) {
      image(health3, 350, 40, 500, 30);
    } else if (millis() > timer[8] + 200) {
      image(health2, 350, 40, 500, 30);
    } else {
      image(health, 350, 40, 500, 30);
    }
    fill(0);
    //makes a black rectangle that covers the enemyhealth bar to make it look like the health bar disappears
    rect(850, 40, -(500 - enemyHealthBarVariable), 30);
    pop();
    textFont(schoolBell);
    fill(255);
    //health text
    textSize(30);
    text("Health:  " + enemyHealth, 360, 68);
    text("Health: " + playerHealth, 335, 462);
    textSize(20);
    //write the max health but in a different text size to make it less confusing
    text("/" + enemyHealthMax, 492, 70);
    text("/" + playerMaxHealth, 459, 464);
    //enemy and player status icons
    for (let stat = 0; stat < enemyStatus.length; stat++) {
      enemyStatus[stat].show(stat * -30 + 830);
    }
    for (let stat2 = 0; stat2 < playerStatus.length; stat2++) {
      playerStatus[stat2].show(stat2 * 30 + 340);
    }
    textSize(44);
    //Enemy names
    fill(255);
    textFont(cabinSketch);
    text(enemyName, 360, 34);
  }

  if (multiplayerSelect == 3) {
    //Clarity Box for multiplayer name
    fill(50, 200);
    rect(350, 355, 400, 45);
    //multiplayer if you a player loses all their health let the other player get their benefits
    if (player1Health <= 0 || player2Health <= 0) {
      if (player1Health <= 0) {
        //check which enemy id you picked 1 = reveal a constonant, 2 - reveal vowel, 3 - free guess, 4 - choose a letter to reveal
        if (enemyID == 1) {
          if (freeLetter < freeLetterReveal.length) {
            hiddenWord[freeLetterReveal[freeLetter]].hidden = false;
            freeLetter++;
          } else {
            //if all the constonants were revealed just add a free guess
            freeGuess2++;
          }
        }
        if (enemyID == 2) {
          if (vowelV < vowelDetect.length) {
            hiddenWord[vowelDetect[vowelV]].hidden = false;
            vowelV++;
          } else {
            //if all the vowels were revealed just add a free guess
            freeGuess2++;
          }
        }
        if (enemyID == 3) {
          freeGuess2++;
        }
        //if the player has a free guess or enemyID is 4 (aka choose a letter to reveal) make the screen = to a screen which will let them use their free guess or choose a letter
        if (freeGuess2 > 0 || enemyID == 4) {
          whoseTurnMain = 2;
          screen = 15;
          music("word");
          if (enemyID != 4) {
            //guess letter splash message
            splashThing = new SplashMessage(2);
          } else {
            //choose letter splash message
            chooseLetterTime = true;
            splashThing = new SplashMessage(6);
          }
        } else {
          //if not enemyID == 4 and zero free guesses go back to enemyselect screen
          screen = 19;
          //change the turn
          if (whoseTurnMain == 2) {
            whoseTurnMain = 1;
          } else {
            whoseTurnMain = 2;
          }
          //make a splash message to whosever turn it is
          splashThing = new SplashMessage(whoseTurnMain + 2);
        }
      }
      if (player2Health <= 0) {
        //check which enemy id you picked 1 = reveal a constonant, 2 - reveal vowel, 3 - free guess, 4 - choose a letter to reveal
        if (enemyID == 1) {
          if (freeLetter2 < freeLetterReveal2.length) {
            hiddenWord2[freeLetterReveal2[freeLetter2]].hidden = false;
            freeLetter2++;
          } else {
            //if all the constonants were revealed just add a free guess
            freeGuess++;
          }
        }
        if (enemyID == 2) {
          if (vowelV2 < vowelDetect2.length) {
            hiddenWord2[vowelDetect2[vowelV2]].hidden = false;
            vowelV2++;
          } else {
            //if all the vowels were revealed just add a free guess
            freeGuess++;
          }
        }
        if (enemyID == 3) {
          freeGuess++;
        }
        //if the player has a free guess or enemyID is 4 (aka choose a letter to reveal) make the screen = to a screen which will let them use their free guess or choose a letter
        if (freeGuess > 0 || enemyID == 4) {
          screen = 15;
          music("word");
          whoseTurnMain = 1;
          if (enemyID != 4) {
            //guess letters splash message
            splashThing = new SplashMessage(2);
          } else {
            chooseLetterTime = true;
            //choose letters splash message
            splashThing = new SplashMessage(6);
          }
        } else {
          //if not enemyID == 4 and zero free guesses go back to enemyselect screen
          screen = 19;
          //change the turn
          if (whoseTurnMain == 2) {
            whoseTurnMain = 1;
          } else {
            whoseTurnMain = 2;
          }
          //make a splash message for whose turn it is
          splashThing = new SplashMessage(whoseTurnMain + 2);
        }
      }
      //reset healths
      player1Health = player1MaxHealth;
      player2Health = player2MaxHealth;
      player1DisplayHealth = player1Health;
      player2DisplayHealth = player2Health;
    }
    //Other player chibi enemy images
    if (whoseTurn == 1) {
      enemyObject[2].show();
    }
    if (whoseTurn == 2) {
      enemyObject[1].show();
    }
    //player healths
    fill(0);
    rect(346, 31, 508, 38);
    rect(346, 396, 508, 38);
    //the map function makes two variables of different ammounts smootlhly correlate. Since the playerMax health is different than the width value of the player's health bar i need to map the two variables to make the health bar smoothly decrease and increase 
    let player1HealthVariable = map(player1DisplayHealth, 0, player1MaxHealth, 0, 500);
    let player2HealthVariable = map(player2DisplayHealth, 0, player2MaxHealth, 0, 500);
    if (whoseTurn == 1) {
      //if player 1's turn show their character's back image
      image(backIMG[playerCharacter - 1], 200, 431.04, 450.56, 337.92);
      push();
      //Health Bar
      imageMode(CORNER);
      image(health, 350, 400, 500, 30);
      image(health, 350, 35, 500, 30);
      fill(0);
      //make the black rectangle that makes the health look like it went down
      rect(850, 400, -(500 - player1HealthVariable), 30);
      rect(850, 35, -(500 - player2HealthVariable), 30);
      pop();
      fill(255);
      textSize(40);
      //make name labels and health numbers
      text("(Player 1)", 500, 390);
      textSize(30);
      text("Player 2", 360, 30);
      text("Health: " + player2Health, 360, 62);
      text("Health: " + player1Health, 360, 428);
      textSize(20);
      text("/" + player2MaxHealth, 484, 64);
      text("/" + player1MaxHealth, 484, 428);
    }
    if (whoseTurn == 2) {
      //if player = 2 then show their character back
      image(backIMG[player2Character - 1], 200, 431.04, 450.56, 337.92);
      push();
      imageMode(CORNER);
      image(health, 350, 35, 500, 30);
      image(health, 350, 400, 500, 30);
      fill(0);
      //make the black rectangle that make the health look like it decreased
      rect(850, 35, -(500 - player1HealthVariable), 30);
      rect(850, 400, -(500 - player2HealthVariable), 30);
      pop();
      fill(255);
      textSize(40);
      //make health labels
      text("(Player 2)", 500, 390);
      textSize(30);
      text("Player 1", 360, 30);
      text("Health: " + player1Health, 360, 62);
      text("Health: " + player2Health, 360, 428);
      textSize(20);
      text("/" + player1MaxHealth, 484, 64);
      text("/" + player2MaxHealth, 484, 428);
    }
    textSize(40);
    fill(255);
    //Name Text for the characters depending on whose turn it is
    if (
      (playerCharacter == 1 && whoseTurn == 1) ||
      (player2Character == 1 && whoseTurn == 2)
    ) {
      text("King", 360, 390);
    }
    if (
      (playerCharacter == 2 && whoseTurn == 1) ||
      (player2Character == 2 && whoseTurn == 2)
    ) {
      text("Queen", 360, 390);
    }
    if (
      (playerCharacter == 3 && whoseTurn == 1) ||
      (player2Character == 3 && whoseTurn == 2)
    ) {
      text("Jack", 360, 390);
    }
    if (
      (playerCharacter == 4 && whoseTurn == 1) ||
      (player2Character == 4 && whoseTurn == 2)
    ) {
      text("Ace", 360, 390);
    }
    if (
      (playerCharacter == 5 && whoseTurn == 1) ||
      (player2Character == 5 && whoseTurn == 2)
    ) {
      text("Jessica", 360, 390);
    }
    if (
      (playerCharacter == 6 && whoseTurn == 1) ||
      (player2Character == 6 && whoseTurn == 2)
    ) {
      text("Joker", 360, 390);
    }
    //Player 1 && 2 health movement
    if (player1Health >= player1DisplayHealth) {
      player1DisplayHealth = player1DisplayHealth + 0.5;
    }
    if (player1Health <= player1DisplayHealth) {
      player1DisplayHealth = player1DisplayHealth - 0.5;
    }
    if (player2Health >= player2DisplayHealth) {
      player2DisplayHealth = player2DisplayHealth + 0.5;
    }
    if (player2Health <= player2DisplayHealth) {
      player2DisplayHealth = player2DisplayHealth - 0.5;
    }
    //Player 1 & 2 status icons
    for (let stat = 0; stat < player1Status.length; stat++) {
      player1Status[stat].show(stat * -30 + 830);
    }
    for (let stat2 = 0; stat2 < player2Status.length; stat2++) {
      player2Status[stat2].show(stat2 * -30 + 830);
    }
  }
  //if it is player's turn
  if (playerTurn) {
    textFont(anton);
    //this allows the optionCardGraphics graphics to do the wave flourish
    for (let zd = 0; zd < optionCardBoard.length; zd++) {
      if (optionCardBoard[zd] != 0) {
        image(optionCardGraphics[zd], optionCardBoard[zd].x, optionCardBoard[zd].y);
      }
    }
    textSize(22);
    fill(0);
    //doubleText is used for option cards that have text that needs to be updated during battle. IE: ace special, magazine and syringe
    //doubleText[3] checks how many of said cards are in battle, when making the cards it added one to doubleText[3] and when the card is used it subtracts from it so if doubleText[3] is more than zero there has to be a one of the option cards in battle
    if (doubleText[3] != 0) {
      for (let ugh = 0; ugh < 3; ugh++) {
        if (doubleText[ugh] != -1) {
          //doubleText also stores which boardslot the option card was in so we can use it to use the Show function of the option card which houses the text
          optionCardBoard[doubleText[ugh]].show();
        }
      }
    }
    //The right and left page both don't fit into the normal size of an option card so the following code just places the image attop the graphic of the option card
    if (
      (playerCharacter == 5 && whoseTurn == 1) ||
      (player2Character == 5 && whoseTurn == 2)
    ) {
      //multiplayer has different witch right page
      if (multiplayerSelect == 0) {
        image(rightPage, 297, 225, 195, 250);
      } else {
        image(rightPage2, 297, 225, 195, 250);
      }
      image(leftPage, 125, 225, 150, 250);
    }
    //checks if the mouse is over an unused option card
    for (let IHT = 0; IHT < optionCardBoard.length; IHT++) {
      if (
        mouseX > (optionCardBoard[IHT].x - 80) * scaleNum &&
        mouseX < (optionCardBoard[IHT].x + 80) * scaleNum &&
        mouseY > (optionCardBoard[IHT].y - 130) * scaleNum &&
        mouseY < (optionCardBoard[IHT].y + 130) * scaleNum
      ) {
        if (optionCardBoard[IHT] != 0) {
          //red tint to card that you hover over
          tint(255, 0, 0, 90);
          noStroke();
          if (optionCardAppearArray[IHT] != 23 && optionCardAppearArray[IHT] != 24){
          image(specialIMG[2], optionCardBoard[IHT].x, optionCardBoard[IHT].y, 160, 260);
          }else{
            //because im so focused on tiny details i added a slightly different filter to the witch pages because the original filter (specialIMG[2]) has the ocard design on it so it looked odd having it on the witch's pages (im obsessed oaky? (yes i spell oaky like that))
            fill(255, 0, 0, 80);
            if (optionCardAppearArray[IHT] == 23){
            rect(optionCardBoard[IHT].x - 80, optionCardBoard[IHT].y - 130, 155, 260);
            }else{
              rect(optionCardBoard[IHT].x - 95, optionCardBoard[IHT].y - 130, 180, 260);
            }
          }
          tint(255);
          fill(200, 0, 100);
          //adds a little message to inform that you can click option cards for details (Because a lot and i mean a lot of peopel forget that)
          rect(mouseX / scaleNum, mouseY / scaleNum - 22, 130, 26);
          fill(255);
          textSize(20);
          text("Click For Info", mouseX / scaleNum + 10, mouseY / scaleNum);
        }
      }
    }
  }
}

function enemyStats() {
  //enemyStats function is making a new enemy
  statusReset();
  //reset turnCount and option card details screen
  oCardDetailsScreen = [0, false];
  turnCount = 1;
  if (multiplayerSelect == 0) {
    //intentionally made to have many random abilities numbers do nothing.
    randomAbility = int(random(11));
    //only bosses can have 2 abilities they also always have rage and more health
    let randomAbility2;
    //enemyDifficulty, 0 - reveal constonant, 1 - reveal vowel, 2 - free guess, 3 - choose letter.
    if (enemyDifficulty[enemyID - 1] > 8) {
      music("boss");
      randomAbility2 = int(random(8));
      while (randomAbility == randomAbility2) {
        randomAbility2 = int(random(8));
      }
      rageMode = true;
      //enemyStatsObject([x], [y], [1 = boss, 0 = normal enemy, -1/-2 = multiplayer], [num of dice], [whether dice num will increase], [limit of dice])
      enemyObject[0] = new EnemyStatsObject(1190, 120, 1, int(random(3, 5)), true, 4);
      //enemy health is seperate as multiplayer uses same object but doesn't have enemy health variable
      enemyHealth = int(random(60, 70));
    } else if (enemyDifficulty[enemyID - 1] > 5) {
      enemyObject[0] = new EnemyStatsObject(1190, 120, 0, int(random(2, 4)), true, 4);
      enemyHealth = int(random(40, 55));
    } else if (enemyDifficulty[enemyID - 1] > 2) {
      enemyObject[0] = new EnemyStatsObject(1190, 120, 0, int(random(2, 4)), true, 3);
      enemyHealth = int(random(38, 48));
    } else {
      enemyObject[0] = new EnemyStatsObject(1190, 120, 0, 2, false, 3);
      enemyHealth = int(random(35, 40));
    }
    //Abilities based on randomAbility and randomAbility2
    //if random ability is lower than 6 (there are 6 enemy abilities so anything above 6 does nothing intentionally) make the corresponding ability true
    if (randomAbility < 6){
        //let ability lets the enemy ability have it's effect in order it is  [heal, poison, freeze, regen, weaken, pickpocket]
        letAbility[randomAbility] = true;
        numOfAbility++;
        enemyAbilityObject[numOfAbility - 1] = new EnemyAbility(260 + numOfAbility * 230, randomAbility + 1);
    }
    //if there is a second random ability check if it is lower than 6 (there are 6 enemy abilities so anything above 6 does nothing intentionally)
    if (randomAbility2 != null){
      if (randomAbility2 < 6){
          //let ability lets the enemy ability have it's effect in order it is  [heal, poison, freeze, regen, weaken, pickpocket]
          letAbility[randomAbility2] = true;
          numOfAbility++;
          enemyAbilityObject[numOfAbility - 1] = new EnemyAbility(260 + numOfAbility * 230, randomAbility2 + 1);
      }
    }
    enemyDisplayHealth = enemyHealth;
    enemyHealthMax = enemyHealth;
  }
}

function statusReset() {
  //reset status effects and other variables usually when a new enemy is set
  //gets rid of option card attack animation
  oCardAttack = 0;
  //removes all status effects.
  enemyStatus = [];
  if (nextEnemy) {
    //reset numOfStatus but add regen and powercharge which stays between enemies
    numOfStatus[0] = 0;
    if (regenStat[1]) {
      numOfStatus[0]++;
    }
    if (playerCharge) {
      numOfStatus[0]++;
    }
  }
  //get rid of all enemy status
  poisonStat[0] = false;
  weakenStat[0] = false;
  freezeStat[0] = false;
  pickpocketStat[0] = false;
  regenStat[0] = false;
  enemyRage = [false, false];
  rageMode = false;
  if (!nextEnemy) {
    //removes player status effects if it isn't in nextEnemy
    playerStatus = [];
    poisonStat[1] = false;
    weakenStat[1] = false;
    freezeStat[1] = false;
    pickpocketStat[1] = false;
    regenStat[1] = false;
    dodgeNextAttack = 0;
    dodgeGreatestAttack = false;
    dodgeAllAttack = false;
    numOfStatus = [0, 0];
    if (!endlessKeep[0] || !endlessSelect) {
      playerCharge = false;
    }
  }
  //endlessKeep is if you selected having power charge in endless mode this gives you power charge every turn
  if (endlessKeep[0] && endlessSelect) {
    if (!playerCharge){
      addStatusIcon(6, -1);
    }
    playerCharge = true;
  }
  //Multiplayer remove status
  player1Status = [];
  player2Status = [];
  playerPickAceValue = false;
  poisonStat[2] = false;
  weakenStat[2] = false;
  freezeStat[2] = false;
  player2FreezeV = false;
  pickpocketStat[2] = false;
  regenStat[2] = false;
  player2Charge = false;
  //letAbility and numOfAbility is for enemy abilites which also get reset
  for (let i = 0; i < 6; i++) {
    letAbility[i] = false;
  }
  enemyAbilityObject = [];
  numOfAbility = 0;
}

function enemyTurnSetup() {
  //force the enemyObject to stop shaking inc ase the player clicked it before the shake animation was finished
  enemyObject[0].x = 1190;
  shakeV = 14;
  diceScoreTotal = 0;
  //makes dice based on num of dice of the enemy
  for (let s = 0; s < enemyObject[0].numOfDice; s++) {
    dice.push(new BattleDice(1000 - s * 100, -40 - 120 * s, s));
  }
  //if num of dice is less than the enemy's limit and diceIncrease is true add a dice for next round
  if (enemyObject[0].numOfDice < enemyObject[0].limit && enemyObject[0].diceIncrease) {
    //if num of dice is lower than the limit have a 66% chance of increasing num of dice
    let maybe = int(random(3));
    if (maybe < 2){
      enemyObject[0].numOfDice++;
    }
  }
  //freeze chance shuffles
  if (freezeStat[0]) {
    enemyFreezeChance = shuffle([1, 0, 0, 0]);
  }
  enemyFreezeV = false;
  //heal if regen is on
  if (regenStat[0]) {
    heal.play();
    enemyHealth += 6;
  }
  //damage if poisoned
  if (poisonStat[0]) {
    enemyHealth -= 4;
    if (enemyHealth <= 0) {
      enemyHealth = 1;
    }
  }
  //prevent this function enemyTurnSetup from occuring again
  enemyTurnSDS = 1;
  diceAttack = false;
  diceNumber = 0;
  //if player was frozen un freeze them
  if (freezeStat[1]) {
    freezeStat[1] = false;
    removeStatusIcon(3, -1);
  }
  turnCount++;
}

function enemyTurn() {
  //show enemy abilities if the enemy has one
  if (numOfAbility != 0) {
    for (let yu = 0; yu < enemyAbilityObject.length; yu++) {
      enemyAbilityObject[yu].show();
    }
  }
  //clarity box for dice damage
  fill(150, 180);
  rect(1040, 65, 220, 90);
  fill(255);
  textSize(35);
  textFont(schoolBell);
  //show diceScoreTotal which is the total dice damage
  text("Dice Damage:", 1050, 100);
  textSize(45);
  text(diceScoreTotal, 1050, 150);
  for (let i = 0; i < dice.length; i++) {
    if (dice[i] != -1){
      dice[i].show();
      //Show dice and if the dice is above 120 y move them down
      if (dice[i].y < 120 && dice[i].timer < 90) {
        dice[i].y += 10;
      }
      //once dice reach 110 play sound and add their score to diceScore total and shake camera
      if (dice[i].y == 110) {
        land.play();
        currCamera.move(10, 0, 0);
        setTimeout(cameraShake, 30);
        diceScoreTotal = diceScoreTotal + dice[i].score;
        //also do abilities if enemies have them
        if (dice[i].score == 6) {
          //poison if score = 6
          if (letAbility[1]) {
            if (!poisonStat[1]) {
              addStatusIcon(1, -1);
            }
            poisonStat[1] = true;
          }
          //if dice = 6 grant regen
          if (letAbility[3]) {
            if (!regenStat[0]) {
              addStatusIcon(5, 0);
              heal.play();
            }
            regenStat[0] = true;
          }
          //heal if dice = 6
          if (letAbility[0]) {
            enemyHealth += 6;
            heal.play();
          }
        }
        //pickpocket player if dice = 4
        if (dice[i].score == 4) {
          if (letAbility[5]) {
            if (!pickpocketStat[1]) {
              addStatusIcon(4, -1);
            }
            pickpocketStat[1] = true;
          }
        }
        //if dice = 1 free player
        if (dice[i].score == 1) {
          if (letAbility[2]) {
            if (!freezeStat[1]) {
              addStatusIcon(3, -1);
            }
            freezeStat[1] = true;
          }
        }
        //if dice score total is over 9 weaken player
        if (diceScoreTotal > 9) {
          if (letAbility[4]) {
            if (!weakenStat[1]) {
              addStatusIcon(2, -1);
            }
            weakenStat[1] = true;
          }
        }
      }
      //dice attack being true after a few seconds so the player can see what dice are about to attack. Unless the enemy was sucessfully frozen then diceAttack never becomes true 
      if (diceAttack) {
        dice[i].attack();
      }
      //check if enemy is frozen based on enemyFreezeChance
      if (dice[dice.length - 1].y == 120) {
        //if not freeze check pickpocket
        if (!freezeStat[0] || enemyFreezeChance[0] != 1) {
          if (pickpocketStat[0]) {
            //pickpocket text and removing from score
            diceScoreTotal -= dice[dice.length - 1].score;
            dice[dice.length - 1] = -1;
            diceNumber++;
            setTimeout(pickpocket, 3500);
          }
        }
        if (!freezeStat[0]) {
          diceAttack = true;
        }
        if (freezeStat[0]) {
          //continue enemy attack the enemy freeze chance wasn't sucessul
          if (enemyFreezeChance[0] != 1) {
            diceAttack = true;
          }
          if (enemyFreezeChance[0] == 1) {
            //if frozen stop enemy turn
            textSize(40);
            fill(173, 216, 230);
            textFont(anton);
            text("Frozen", 870, 80);
            tint(255, 140);
            image(statusIMG[2], dice[i].x, dice[i].y, 80, 80);
            tint(255);
            //undo the freeze on the enemy after a set time
            if (!enemyFreezeV) {
              setTimeout(freeze, 2500);
              enemyFreezeV = true;
              frozenSound.play();
            }
          }
        }
      }
      //check if enemy is weaken and it lower the dice values
      if (weakenStat[0]) {
        if (dice[0].timer > 20 && dice[0].timer < 95) {
          textSize(40);
          fill(150, 20, 170);
          textFont(anton);
          //if enemy is pickpocketed then weaken text is lower so they don't overlap
          if (!pickpocketStat[0]) {
            text("Weakened", 870, 80);
          } else {
            text("Weakened", 870, 190);
          }
        }
        //lowers dice score by one if weakened and after s set time
        if (dice[i].timer == 20) {
          if (dice[i].score > 1) {
            dice[i].score = dice[i].score - 1;
            diceScoreTotal = diceScoreTotal - 1;
          }
        }
      }
      //when dice off screen play the hit noises depending on how strong the dice attack was
      if (dice[i].y > height / scaleNum) {
        if (diceScoreTotal > enemyObject[0].numOfDice * 4) {
          bigHit.play();
        } else {
          hit2.play();
        }
        //for tutorials it adds 0.5 since there is always 2 dice it progesses text by one except for tutorial 9 (overplay) which doesn't need it
        if (tutorial != 0 && tutorial != 9) {
          tutorialText += 0.5;
        }
        //this is for dodge greatest dice it starts by checking the largest value 6 and goes down looking for dice of the same value
        for (let y = 6; y > 0; y--) {
          for (let u = 0; u < dice.length; u++) {
            if (dodgeGreatestAttack) {
              if (dice[u].score == y) {
                dice[u].dodge = true;
                //block status icon and dodge greatest is the same variable
                removeStatusIcon(8, -1);
                removeStatusIcon(7, -1);
                dodgeGreatestAttack = false;
                y = 0;
              }
            }
          }
        }
        //this is the actual damage first checks for any dodge status
        if (!dodgeAllAttack) {
          if (!dodgeGreatestAttack) {
            if (dodgeNextAttack == 0) {
              if (!dice[i].dodge) {
                //camera shake
                currCamera.move(10, 0, 0);
                setTimeout(cameraShake, 30);
                if (!overPlay){
                  playerHealth -= dice[i].score;
                }
                //timer[7] is for the red flash
                timer[7] = round(millis()) + 700;
                //hurt noise depending on gender of character
                if (playerCharacter == 2 || playerCharacter == 5) {
                  //the hurt sounds are the same just the female one is higher pitch
                  hurt2.play();
                } else {
                  hurt.play();
                }
              }
            }
          }
        }
        //dice number is to make sure all dice land before going to player turn
        diceNumber++;
        dice[i] = -1;
        if (dodgeNextAttack != 0) {
          dodgeNextAttack--;
          removeStatusIcon(7, -1);
          removeStatusIcon(8, -1);
        }
      }
    }
  }
  if (pickpocketStat[0] && dice[dice.length -1] == -1){
    textSize(40);
    fill(253, 218, 13);
    textFont(anton);
    text("Pickpocket", 870, 80);
  }
  //makes it player turn again
  if (diceNumber >= dice.length) {
    playerTurn = true;
    startCardBattleSetupV = 0;
    enemyTurnSDS = 0;
    dice = [];
    if (freezeStat[1]) {
      timer[12] = round(millis());
    }
  }
}

function addStatusIcon(ID, person) {
  //singleplayer status icons person = -1 means single player person, person = 0 means enemy
  //status effects id is 1 = poison, 2 = weaken, 3 = freeze, 4 = pickpocket, 5 = regen, 6 = charge, 7 = dodge, 8 = block
  if (person == -1) {
    playerStatus.push(new StatusIcon(ID, -1));
  }
  if (person == 0) {
    enemyStatus.push(new StatusIcon(ID, 0));
  }
  //multiplayer status icons person = 1 means player 1, person = 2 means player 2
  if (person == 1) {
    player1Status.push(new StatusIcon(ID, 1));
  }
  if (person == 2) {
    player2Status.push(new StatusIcon(ID, 2));
  }
  numOfStatus[0]++;
  numOfStatus[1]++;
}

function removeStatusIcon(ID, person) {
  //remove status based on id and person parameters. person = -1 means singleplayer player, person = 0 means enemy
  //status effects id is 1 = poison, 2 = weaken, 3 = freeze, 4 = pickpocket, 5 = regen, 6 = charge, 7 = dodge, 8 = block
  if (person == -1) {
    for (let j = 0; j < playerStatus.length; j++) {
      if (playerStatus[j].ID == ID) {
        playerStatus.splice(j, 1);
        numOfStatus[0]--;
      }
    }
  }
  if (person == 0) {
    for (let j = 0; j < enemyStatus.length; j++) {
      if (enemyStatus[j].ID == ID) {
        enemyStatus.splice(j, 1);
        numOfStatus[0]--;
      }
    }
  }
  //person = 1 means player 1 multiplayer, person = 2 means player 2 multiplayer
  if (person == 1) {
    for (let j = 0; j < player1Status.length; j++) {
      if (player1Status[j].ID == ID) {
        player1Status.splice(j, 1);
        numOfStatus[0]--;
      }
    }
  }
  if (person == 2) {
    for (let j = 0; j < player2Status.length; j++) {
      if (player2Status[j].ID == ID) {
        player2Status.splice(j, 1);
        numOfStatus[0]--;
      }
    }
  }
}

function playerWeak() {
  //weakend functions
  //lower card scores by one
  if (multiplayerSelect == 0) {
    for (let o = 0; o < cardInDeckObjects.length; o++) {
      if (cardInDeckObjects[o] != 0 && cardInDeckObjects[o] != -1) {
        if (cardInDeckObjects[o].cardScore > 1) {
          cardInDeckObjects[o].cardScore -= 1;
        }
      }
    }
  }
  //lower card scores if it is a weakened player's turn
  if (multiplayerSelect == 3) {
    if (
      (weakenStat[2] && whoseTurn == 2) ||
      (weakenStat[1] && whoseTurn == 1)
    ) {
      for (let o = 0; o < cardInDeckObjects.length; o++) {
        if (cardInDeckObjects[o] != 0 && cardInDeckObjects[o] != -1) {
          if (cardInDeckObjects[o].cardScore > 1) {
            cardInDeckObjects[o].cardScore -= 1;
          }
        }
      }
    }
  }
}

function freeze() {
  //dice number = dice.length disables the enemy attack
  diceNumber = dice.length;
  enemyFreezeChance = shuffle([1, 0, 0, 0]);
  freezeStat[0] = false;
  removeStatusIcon(3, 0);
}

function pickpocket() {
  //enemy pickpocket function removes the status icona and makes the enemy no longer pickpocketed
  if (pickpocketStat[0]) {
    removeStatusIcon(4, 0);
  }
  pickpocketStat[0] = false;
}

function removeBattleCard(which) {
  //gets rid of the battle card by moving it offscreen and setting its cardscore to zeor
  cardInDeckObjects[which].cardScore = 0;
  cardInDeckObjects[which].x = 2000;
  cardInDeckObjects[which].defaultX = 2000;
}

function defaultBattleCard(which) {
  //makes option card move to its default deck position
  cardInDeckObjects[which].x = cardInDeckObjects[which].defaultX;
  cardInDeckObjects[which].y = 500;
}

function lookAwayScreen() {
  //quick look away screen for multiplayer
  background(30);
  textSize(100);
  textFont(cabinSketch);
  fill(255, 0, 0);
  if (millis() > timer[3] + 500) {
    fill(255);
  }
  if (millis() > timer[3] + 1000) {
    fill(255, 0, 0);
  }
  if (millis() > timer[3] + 1500) {
    fill(255);
  }
  text("Player " + ((whoseTurn % 2) + 1) + " Look Away!", 200, 100);
  if (millis() > timer[3] + 2000) {
    screen = 16;
  }
}

function player1WordChoose() {
  let letterCheck = true;
  //resets Next line so that the letter cards appear correctly
  nextLine = [0, 0];
  //move back to word select screen
  whoseTurn = 2;
  screen = 16;
  //chosenWord tracks which work player 1 chose
  chosenWord = this.value();
  //splits up the word into letters and turns the letters into its respective number key code
  chosenWordSplit = unchar(split(this.value(), ""));
  word1Input.remove();
  for (let i = 0; i < chosenWordSplit.length; i++) {
    //checks the choseWordSplit for lower case numbers (which are ids 97-123) and makes the lower case letters upper case by subtracting 32 as all lower case letters are 32 more than their uppercase letter. 
    if (chosenWordSplit[i] >= 97 && chosenWordSplit[i] <= 123) {
      chosenWordSplit[i] -= 32;
    }
    if (
      ((chosenWordSplit[i] < 65 || chosenWordSplit[i] > 91) &&
        chosenWordSplit[i] != 32) ||
      chosenWordSplit[0] == 32
    ) {
      //this checks for special characters which would be numbers below 65 or above 91 besides 32 which is a space. if there are any reset the input and make player choose a different word
      whoseTurn = 1;
      error.play();
      screen = 16;
      letterCheck = false;
    }
  }
  let u = 0;
  let r = [];
  vowelDetect = [];
  vowelV = 0;
  freeLetter = 0;
  //makes guess letters for player 1 and 2 in the shape of a keyboard
  newLetters(true);
  //makes letter cards for hidden wrod
  for (let j = 0; j < chosenWordSplit.length; j++) {
    hiddenWord[j] = new WordGuess(50 + 75 * j, 95, chosenWordSplit[j], false, j);
    //checks for vowels and puts them in voweldetect
    if (
      chosenWordSplit[j] == 65 ||
      chosenWordSplit[j] == 69 ||
      chosenWordSplit[j] == 73 ||
      chosenWordSplit[j] == 79 ||
      chosenWordSplit[j] == 85
    ) {
      vowelDetect[u] = j;
      u++;
    }
  }
  //make freeLetterReveal which tracks where the constonants are
  for (let u = 0; u < chosenWordSplit.length; u++) {
    freeLetterReveal[u] = u;
  }
  //remove vowels from freeLetterReveal
  for (let hg = 0; hg < vowelDetect.length; hg++) {
    freeLetterReveal.splice(vowelDetect[hg] - hg, 1);
  }
  //remove track spaces in chosenWordSplit
  for (let k = 0; k < chosenWordSplit.length; k++) {
    if (chosenWordSplit[k] == 32) {
      r[r.length] = k;
    }
  }
  //remove spaces from FreeletterReveal usig r[] which housed the spaces
  for (let rl = r.length; rl >= 0; rl--) {
    for (let z = 0; z < freeLetterReveal.length; z++) {
      if (freeLetterReveal[z] == r[rl]) {
        freeLetterReveal.splice(z, 1);
      }
    }
  }
  //shuffle the objects and move to characterselect for player 2
  if (letterCheck) {
    vowelDetect = shuffle(vowelDetect);
    freeLetterReveal = shuffle(freeLetterReveal);
    screen = 2;
    splashThing = new SplashMessage(4);
  }
}

function player2WordChoose() {
  ////resets Next line so that the letter cards appear correctly
  nextLine = [0, 0];
  chosenWord2 = this.value();
  let letterCheck = true;
  //split up the word and make it a list of numbers based on the letter's id
  chosenWordSplit2 = unchar(split(this.value(), ""));
  //remove the input
  word2Input.remove();
  for (let i = 0; i < chosenWordSplit2.length; i++) {
    //checks the choseWordSplit for lower case numbers (which are ids 97-123) and makes the lower case letters upper case by subtracting 32 as all lower case letters are 32 more than their uppercase letter. 
    if (chosenWordSplit2[i] >= 97 && chosenWordSplit2[i] <= 123) {
      chosenWordSplit2[i] -= 32;
    }
    if (
      ((chosenWordSplit2[i] < 65 || chosenWordSplit2[i] > 91) && chosenWordSplit2[i] != 32) || chosenWordSplit2[0] == 32
    ) {
      //this checks for special characters which would be numbers below 65 or above 91 besides 32 which is a space. if there are any reset the input and make player choose a different word
      letterCheck = false;
      whoseTurn = 2;
      screen = 16;
      error.play();
    }
  }
  //makes guess letters for player 1 and 2 in the shape of a keyboard
  let x;
  let y;
  let r = [];
  let u = 0;
  vowelDetect2 = [];
  vowelV2 = 0;
  freeLetter2 = 0;
  for (let j = 0; j < chosenWordSplit2.length; j++) {
    hiddenWord2[j] = new WordGuess( 50 + 75 * j, 95, chosenWordSplit2[j], false, j);
    if (
      chosenWordSplit2[j] == 65 ||
      chosenWordSplit2[j] == 69 ||
      chosenWordSplit2[j] == 73 ||
      chosenWordSplit2[j] == 79 ||
      chosenWordSplit2[j] == 85
    ) {
      vowelDetect2[u] = j;
      u++;
    }
  }
  for (let u = 0; u < chosenWordSplit2.length; u++) {
    freeLetterReveal2[u] = u;
  }
  for (let hg = 0; hg < vowelDetect2.length; hg++) {
    freeLetterReveal2.splice(vowelDetect2[hg] - hg, 1);
  }
  for (let k = 0; k < chosenWordSplit2.length; k++) {
    if (chosenWordSplit2[k] == 32) {
      r[r.length] = k;
    }
  }
  for (let rl = r.length; rl >= 0; rl--) {
    for (let z = 0; z < freeLetterReveal2.length; z++) {
      if (freeLetterReveal2[z] == r[rl]) {
        freeLetterReveal2.splice(z, 1);
      }
    }
  }
  vowelDetect2 = shuffle(vowelDetect2);
  freeLetterReveal2 = shuffle(freeLetterReveal2);
  if (letterCheck) {
    screen = 19;
    music("battle");
    whoseTurnMain = int(random(1, 3));
    freeGuess = 0;
    freeGuess2 = 0;
    splashThing = new SplashMessage(whoseTurnMain + 2);
  }
}

function multiplayerWordChooseSetup() {
  //make text inputs for multiplayer
  if (whoseTurn == 1) {
    //create input with 26 max characters
    word1Input = createInput("").attribute("maxlength", 26);
    word1Input.parent("inputA");
    //position and size the inputs
    word1Input.position(270 * scaleNum, 300 * scaleNum);
    word1Input.size(800 * scaleNum, 50 * scaleNum);
    //make the font size 40 px
    word1Input.style("font-size", "40px");
  }
  if (whoseTurn == 2) {
    //create input with max 26 characters
    word2Input = createInput("").attribute("maxlength", 26);
    //position and size inputs
    word2Input.parent("inputA");
    word2Input.position(270 * scaleNum, 300 * scaleNum);
    word2Input.size(800 * scaleNum, 50 * scaleNum);
    //make font size 40 px
    word2Input.style("font-size", "40px");
  }
  screen = 17;
}

function multiplayerWordChoose() {
  //multiplayer choose word screen
  fill(0);
  textFont(schoolBell);
  textSize(55);
  text(" - No Special Characters or Numbers.", 170, 160);
  text(" - Max 26 Characters", 170, 210);
  text(" - Capitalization Does Not Matter", 170, 260);
  fill(255);
  text("(Words/Phrases 6+ Characters Recommended)", 130, 480);
  textFont(cabinSketch);
  if (whoseTurn == 1) {
    fill(0, 0, 200);
    word1Input.changed(player1WordChoose);
    text("Type A Word/Phrase For Player 2 To Guess:", 170, 65);
  }
  if (whoseTurn == 2) {
    fill(200, 0, 0);
    word2Input.changed(player2WordChoose);
    text("Type A Word/Phrase For Player 1 To Guess:", 170, 65);
    fill(200, 0, 0);
    textFont(schoolBell);
    //additional text to tell player 2 how long player 1's word was
    text("Player 1 Chose A Word/Phrase With " + chosenWordSplit.length + " Characters", 120, 410);
  }
}

function hints() {
  //hints based on which level or endless word category
  textFont(anton);
  if (screen != 15) {
    fill(255);
  } else {
    fill(0);
  }
  //text themes depending on either the level in single player or whatever random theme endless mode picks for the word. (for mulitplayer endlessPick also serves as which background the battle should take place on)
  if (endlessPick == 1 || levelScreen == 1) {
    text("Theme: Animals", 730, 45);
  }
  if (endlessPick == 2 || levelScreen == 2) {
    text("Theme: School", 730, 45);
  }
  if (endlessPick == 3 || levelScreen == 3) {
    text("Theme: Food", 730, 45);
  }
  if (endlessPick == 4 || levelScreen == 4) {
    text("Theme: Video Games", 730, 45);
  }
  if (endlessPick == 5 || levelScreen == 5) {
    text("Theme: Cinema", 730, 45);
  }
  if (endlessPick == 6 || levelScreen == 6) {
    text("Theme: American History", 730, 45);
  }
}

function checkWords() {
  let hiddenCheck = 0;
  let hiddenCheck2 = 0;
  //check if all letters in a hidden word are revealed if they are send the player to the score screen or Multiplayer victor screen
  if (!wordMode) {
    if (multiplayerSelect == 3) {
      //if it is multiplayer mode check through all of player 2's hidden word and add to hiddenCheck2 for every space and unhidden letter
      for (let i = 0; i < chosenWordSplit2.length; i++) {
        if (hiddenWord2[i].ID == 32) {
          hiddenCheck2++;
        }
        if (!hiddenWord2[i].hidden) {
          hiddenCheck2++;
        }
      }
      //if hiddenCheck2 equals the amount of letters in the word then all the of player 2's letters are reaveled and player 1 won
      if (hiddenCheck2 == chosenWordSplit2.length) {
        //send them to winner screen
        screen = 14;
        music("winner");
        timer[11] = round(millis());
        splashThing = new SplashMessage(7);
        //make player 2 loose
        player2Health = 0;
      }
    }
    //this check for the hidden word runs for singple player and for player 1's hidden word in multiplayer
    for (let j = 0; j < chosenWordSplit.length; j++) {
      //the for loop looks through the entirety of hiddenWord and adds to hiddenCheck if the hiddenWord element is either not hidden or is a space.
      if (hiddenWord[j].ID == 32) {
        hiddenCheck++;
      }
      if (!hiddenWord[j].hidden) {
        hiddenCheck++;
      }
    }
    //if hiddenCheck equals how many letters are in the word then that means all the letters are revealed and they won
    if (hiddenCheck == chosenWordSplit.length) {
      if (multiplayerSelect == 0) {
        //score screen fo single player
        screen = 7;
        music("winner");
        //timer[6] is used for the score screen reveal
        timer[6] = round(millis());
        splashThing = new SplashMessage(11);
        if (screen == 3){
          characterBonusAdd();
        }
      }
      if (multiplayerSelect == 3) {
        //multiplayer victor screen
        screen = 14;
        music("winner");
        timer[11] = round(millis());
        splashThing = new SplashMessage(7);
        //since player 1's word was fully revealed they lost
        player1Health = 0;
      }
    }
  }
}

function chooseLetter() {
  //letter choose time activator
  if (multiplayerSelect == 0 || (whoseTurn == 2 && multiplayerSelect == 3)) {
    if (multiplayerSelect == 3) {
      fill(200, 0, 0);
      textSize(45);
      text("Opponent (Player 1's) Hidden Word:", 160, 45);
    }
    //shows the hidden word and lets players click them to reveal them
    for (let o = 0; o < hiddenWord.length; o++) {
      hiddenWord[o].visual();
      hiddenWord[o].click();
    }
  }
  if (multiplayerSelect == 3 && whoseTurn == 1) {
    fill(0, 0, 200);
    textSize(45);
    text("Opponent (Player 2's) Hidden Word:", 160, 45);
    //shows the hidden word and lets players click them to reveal them for multiplayer
    for (let o = 0; o < hiddenWord2.length; o++) {
      hiddenWord2[o].visual();
      hiddenWord2[o].click();
    }
  }
  textSize(60);
  fill(255);
  textFont(cabinSketch);
  text("Choose A Letter To Reveal", 200, 500);
}

function newLetters(multiplayer){
  //this is to make the pickLetters in the shape of a keyboard.
  let x;
  let y;
  for (let i = 0; i < 26; i++) {
    //the first 10 letters go on the first row
    if (i < 10) {
      y = 410;
      x = i;
    }
    //the next 9 letters go on the second row 
    if (i >= 10 && i < 19) {
      y = 464;
      x = i - 9.5;
    }
    //the last 7 letters go on the third row
    if (i >= 19) {
      y = 524;
      x = i - 17.8;
    }
    pickLetters[i] = new Letter(350 + x * 60, y, qwertyOrder[i]);
    //the multiplayer parameter is to determine if the second keyboard needs to be made. There needs to be two as they track what letters each player has already guessed
    if (multiplayer){
      pickLetters2[i] = new Letter(350 + x * 60, y, qwertyOrder[i]);
    }
  }
}

function wordGameSetup() {
  //clear hidden word and necessary variables first
  hiddenWord = [];
  freeLetterReveal = [];
  nextLine = [0, 0];
  //randomly select category if endless mode
  if (endlessSelect) {
    let endlessPickChoice = shuffle([1, 1, 2, 2, 3, 3, 4, 5, 6]);
    endlessPick = endlessPickChoice[0];
    if (endlessPick == 1) {
      //animal words
      chosenWord = random(wordsLVL1);
    }
    if (endlessPick == 2) {
      //school words
      chosenWord = random(wordsLVL2);
    }
    if (endlessPick == 3) {
      //food words
      chosenWord = random(wordsLVL3);
    }
    if (endlessPick == 4) {
      //video game words
      chosenWord = random(wordsLVL4);
    }
    if (endlessPick == 5) {
      //cinema words
      chosenWord = random(wordsLVL5);
    }
    if (endlessPick == 6) {
      //american history theme
      chosenWord = random(wordsLVL6);
    }
    chosenWordSplit = unchar(split(chosenWord, ""));
  }
  let r = [];
  let m = 0;
  vowelDetect = [];
  vowelV = 0;
  freeLetter = 0;
  //makes guess letters for player 1 and 2 in the shape of a keyboard
  newLetters(false);
  for (let j = 0; j < chosenWordSplit.length; j++) {
    hiddenWord[j] = new WordGuess(50 + 75 * j, 95, chosenWordSplit[j], false, j);
    if (
      chosenWordSplit[j] == 65 ||
      chosenWordSplit[j] == 69 ||
      chosenWordSplit[j] == 73 ||
      chosenWordSplit[j] == 79 ||
      chosenWordSplit[j] == 85
    ) {
      vowelDetect[m] = j;
      m++;
    }
  }
  //find vowels and constonants and spaces
  for (let u = 0; u < chosenWordSplit.length; u++) {
    freeLetterReveal[u] = u;
  }
  for (let hg = 0; hg < vowelDetect.length; hg++) {
    freeLetterReveal.splice(vowelDetect[hg] - hg, 1);
  }
  for (let k = 0; k < chosenWordSplit.length; k++) {
    if (chosenWordSplit[k] == 32) {
      r[r.length] = k;
    }
  }
  for (let rl = r.length; rl >= 0; rl--) {
    for (let z = 0; z < freeLetterReveal.length; z++) {
      if (freeLetterReveal[z] == r[rl]) {
        freeLetterReveal.splice(z, 1);
      }
    }
  }
  vowelDetect = shuffle(vowelDetect);
  freeLetterReveal = shuffle(freeLetterReveal);
}

function wordGameScreen() {
  //Backbutton appears only if not guessing
  if (!guessMode) {
    backButtonFun();
  }
  //hiddenCheck is used for hidden letters that you guess correctly if you guess the entire phrase
  let hiddenCheck = 0;
  //notecard image
  fill(255);
  rect(290, 355, 740, 245);
  fill(200, 0, 100);
  rect(290, 410, 740, 5);
  fill(173, 216, 230);
  //I don't use the line statement cuz it always is on the top layer and that annoys me.
  rect(290, 465, 740, 5);
  rect(290, 520, 740, 5);
  rect(290, 575, 740, 5);
  fill(0);
  textSize(45);
  if (multiplayerSelect == 0) {
    image(backIMG[playerCharacter - 1], 200, 431.04, 450.56, 337.92);
    if (!endlessSelect) {
      //non endless mode show the overall score (mainScore[0])
      textFont(cabinSketch);
      text("Score:  " + mainScore[0], 620, 400);
      //check for if the score hits or goes below zero and activates Hail Marry Guess
      if (mainScore[0] <= 0 && !wordMode && !guessMode) {
        guessMode = true;
        splashThing = new SplashMessage(10);
        //create the backspace button for guessing
        pickLetters[26] = new Letter(842, 523, 8);
        if (
          multiplayerSelect == 0 ||
          (multiplayerSelect == 3 && whoseTurnMain == 2)
        ) {
          //make guessPhrase the same length as chosenWordSplit
          for (let op = 0; op < chosenWordSplit.length; op++) {
            guessPhrase[op] = 0;
            guessWordSplit[op] = -1;
            //if hidden word id == 32 it is a space key so remove it
            if (hiddenWord[op].ID == 32) {
              guessPhrase[op] = new WordGuess(50 + 75 * op, 80, 32, true, op);
              guessWordSplit[op] = 32;
            }
          }
        }
      }
    }
    //show hints
    hints();
    textFont(anton);
    text("Hidden Word:", 160, 45);
    textFont(cabinSketch);
    if (endlessSelect) {
      //wordMode is for using free guesses in battle
      if (!wordMode) {
        text("Score:  " + mainScore[2], 620, 400);
      }
      //Hail Marry guess for endless mode
      if (mainScore[2] <= 0 && !wordMode && !guessMode && !nextEnemy) {
        guessMode = true;
        splashThing = new SplashMessage(10);
        //make back space key
        pickLetters[26] = new Letter(842, 523, 8);
        if (
          multiplayerSelect == 0 ||
          (multiplayerSelect == 3 && whoseTurnMain == 2)
        ) {
          //make guessPhrase and guessWordSplit the same length as chosenWordSplit
          for (let op = 0; op < chosenWordSplit.length; op++) {
            guessPhrase[op] = 0;
            guessWordSplit[op] = -1;
            //if the hiddenWord id == 32 then it is a space and remove them
            if (hiddenWord[op].ID == 32) {
              guessPhrase[op] = new WordGuess(50 + 75 * op, 80, 32, true, op);
              guessWordSplit[op] = 32;
            }
          }
        }
      }
    }
    //Freeguess and using free guesses below
    text("Free Guess: " + freeGuess, 300, 400);
    //wordMode = using free guess 
    if (wordMode) {
      //if out of free guesses bring player back to the battle
      if (freeGuess <= 0) {
        screen = 3;
        wordMode = false;
        nextEnemy = true;
        music("battle");
        splashThing = new SplashMessage(8);
        //crash safe to save the newly reveal letters
        crashSafe();
        checkWords();
      }
    }
  }
  //multiplayer notecard text
  if (multiplayerSelect == 3) {
    fill(255);
    rect(140, 10, 470, 50);
    textFont(cabinSketch);
    if (whoseTurnMain == 1) {
      image(backIMG[playerCharacter - 1], 200, 431.04, 450.56, 337.92);
      fill(0, 0, 200);
      textSize(45);
      text("Player 2 Hidden Word:", 160, 45);
      fill(0);
      text("Player  1's   Free Guesses: " + freeGuess, 300, 400);
    }
    if (whoseTurnMain == 2) {
      image(backIMG[player2Character - 1], 200, 431.04, 450.56, 337.92);
      fill(200, 0, 0);
      textSize(45);
      text("Player 1 Hidden Word:", 160, 45);
      fill(0);
      text("Player  2's   Free Guesses: " + freeGuess2, 300, 400);
    }
  }
  //guess letters
  if (
    multiplayerSelect == 0 ||
    (multiplayerSelect == 3 && whoseTurnMain == 2)
  ) {
    //show guessletters and if tutorialNoLetter = false then let the player click them
    for (let i = 0; i < pickLetters.length; i++) {
      pickLetters[i].show();
      if (!tutorialNoLetter) {
        pickLetters[i].check();
      }
    }
    //show hidden word
    for (let j = 0; j < chosenWordSplit.length; j++) {
      hiddenWord[j].visual();
    }
  }
  //let players click the guess letters for player 2's hidden word
  if (multiplayerSelect == 3 && whoseTurnMain == 1) {
    for (let i = 0; i < pickLetters2.length; i++) {
      pickLetters2[i].show();
      pickLetters2[i].check();
    }
    //show player 2's hidden word
    for (let j = 0; j < chosenWordSplit2.length; j++) {
      hiddenWord2[j].visual();
    }
  }
  //multiplayer mode always brings you here when you gain a free guess so it kicks you out when free guesses are out.
  if (multiplayerSelect == 3 && !guessMode) {
    if (whoseTurnMain == 2) {
      if (freeGuess2 <= 0) {
        screen = 19;
        whoseTurnMain = 1;
        splashThing = new SplashMessage(3);
      }
    }
    if (whoseTurnMain == 1) {
      if (freeGuess <= 0) {
        screen = 19;
        whoseTurnMain = 2;
        splashThing = new SplashMessage(4);
      }
    }
  }
  if (guessMode) {
    //flashing text for guess mode
    if (millis() > timer[10] + 1500) {
      fill(255, 0, 100);
    } else {
      fill(0);
    }
    if (millis() > timer[10] + 3000) {
      timer[10] = round(millis());
    }
    textSize(65);
    textFont(schoolBell);
    //if statement checks if guessLetterDetect is the same length as chosenWordsplit (Which will mean they are ready to submit the guess)
    if (
      (guessLetterDetect == chosenWordSplit.length &&
        (multiplayerSelect == 0 ||
          (whoseTurnMain == 2 && multiplayerSelect == 3))) ||
      (multiplayerSelect == 3 &&
        whoseTurnMain == 1 &&
        guessLetterDetect == chosenWordSplit2.length)
    ) {
      //this changes the flashing text to the submit guess button
      if (
        (mouseX > 410 * scaleNum &&
          mouseX < 810 * scaleNum &&
          mouseY > 270 * scaleNum &&
          mouseY < 355 * scaleNum) ||
        (keyIsPressed && keyCode == 13 && !keyOverlap && endGame == 0)
      ) {
        push();
        fill(255);
        stroke(0);
        strokeWeight(2);
        rect(410, 270, 400, 80);
        pop();
        fill("blue");
        //pressing enter or clicking button submits the letter
        if (
          (mouseIsPressed && !mouseOverlap) ||
          (keyIsPressed && keyCode == 13)
        ) {
          if (mouseIsPressed) {
            mouseOverlap = true;
          }
          if (keyIsPressed) {
            keyOverlap = true;
          }
          //another check starts true and becomes false if an incorrect letter is found
          let anotherCheck = true;
          if (multiplayerSelect == 0 || whoseTurnMain == 2) {
            for (let io = 0; io < chosenWordSplit.length; io++) {
              if (guessWordSplit[io] != chosenWordSplit[io]) {
                anotherCheck = false;
              }
            }
          }
          if (multiplayerSelect == 3 && whoseTurnMain == 1) {
            for (let io = 0; io < chosenWordSplit2.length; io++) {
              if (guessWordSplit[io] != chosenWordSplit2[io]) {
                anotherCheck = false;
              }
            }
          }
          if (anotherCheck) {
            //various victory screens for multiplayer/singleplayer
            if (multiplayerSelect == 0) {
              screen = 7;
              music("winner");
              splashThing = new SplashMessage(11);
              timer[6] = round(millis());
            }
            if (multiplayerSelect == 3) {
              screen = 14;
              music("winner");
              timer[11] = round(millis());
              splashThing = new SplashMessage(7);
              //turning loser health to zero is how I detect who won on the victory screen
              if (whoseTurnMain == 2) {
                player1Health = 0;
              }
              if (whoseTurnMain == 1) {
                player2Health = 0;
              }
            }
            guessLetterDetect = 0;
            heal.play();
            //extra scores for any hidden letters
            if (endlessSelect) {
              for (let hiddenCheck = 0; hiddenCheck < hiddenWord.length; hiddenCheck++) {
                if (hiddenWord[hiddenCheck].hidden && hiddenWord[hiddenCheck].ID != 32
                ) {
                  mainScore[0] += 150;
                  mainScore[2] += 150;
                  goodGuess++;
                }
              }
              //lower all difficulty by 3 in endless mode for the next round
              for (let pd = 0; pd < enemyDifficulty.length; pd++) {
                enemyDifficulty[pd] -= 3;
                if (enemyDifficulty[pd] < 0) {
                  enemyDifficulty[pd] = 0;
                }
              }
            }
            //extra score for hidden letters in nonendless mode
            if (!endlessSelect) {
              for (let hiddenCheck = 0; hiddenCheck < hiddenWord.length; hiddenCheck++) {
                if (hiddenWord[hiddenCheck].hidden && hiddenWord[hiddenCheck].ID != 32) {
                  mainScore[0] += 150;
                  goodGuess++;
                }
              }
            }
          } else {
            //if guess is wrong remove guess letters
            guessMode = false;
            pickLetters.splice(26, 1);
            if (multiplayerSelect == 0) {
              //lose score for incorrect guess
              if (!endlessSelect && mainScore[0] > 0) {
                wrongGuess[2]++;
                mainScore[0] -= 1500;
              }
              if (endlessSelect && mainScore[2] > 0) {
                mainScore[2] -= 1500;
                mainScore[0] -= 1500;
                wrongGuess[2]++;
              }
            }
            //if you fail by getting your score below zero go to game over screen 
            if (mainScore[0] <= 0 && !endlessSelect) {
              screen = 8;
              music("none");
              splashThing = 0;
            }
            //failing endlessmode is based off of mainScore[2] which represents the score they get every round not overall
            if (mainScore[2] <= 0 && endlessSelect) {
              screen = 8;
              music("none");
              playerHealth = 1445;
              mainScore[0] += endlessCount[1] * 500;
              mainScore[2] += endlessCount[1] * 500;
            }
            //get rid of guessPhrase and guessLetterDetect
            guessPhrase = [];
            guessLetterDetect = 0;
            error.play();
            if (whoseTurnMain == 2 || multiplayerSelect == 0) {
              if (whoseTurnMain == 2 && multiplayerSelect == 3) {
                //add two free guesses to the other player if the guess was wrong in multiplayer
                freeGuess = freeGuess + 2;
                //turn on guess penalty for player 1 because they got the guess wrong
                guessPenalty[1] = true;
                //change the turn and make a splashmessage for their turn while also changing the screen
                whoseTurnMain = 1;
                splashThing = new SplashMessage(3);
                screen = 19;
              }
              //clear guessWordSplit
              for (let jk = 0; jk < chosenWordSplit.length; jk++) {
                guessWordSplit[jk] = -1;
              }
            } else if (multiplayerSelect == 3 && whoseTurnMain == 1) {
              //add two free guesses to the other player if the guess was wrong in multiplayer
              freeGuess2 = freeGuess2 + 2;
              //turn on guess penalty for player 1 because they got the guess wrong
              guessPenalty[0] = true;
              //change the turn and make a splashmessage for their turn while also changing the screen
              whoseTurnMain = 2;
              splashThing = new SplashMessage(4);
              screen = 19;
              //clear guessWordSplit
              for (let jk = 0; jk < chosenWordSplit2.length; jk++) {
                guessWordSplit[jk] = -1;
              }
            }
          }
        }
      }
      //submit guess button text
      text("Submit Guess?", 420, 335);
    } else {
      text("Guess The Phrase!", 400, 335);
    }
    for (let i = 0; i < guessPhrase.length; i++) {
      if (guessPhrase[i] != 0) {
        guessPhrase[i].visual();
      }
    }
  }
  //show guess mode button if it isn't already guess mode
  if (!guessMode) {
    enemyChars[5].highlight();
  }
}

function newAbilityScreen() {
  //new card serves as the object for the newly unlocked card
  let newCard;
  background(0);
  party(0);
  textSize(60);
  fill(255);
  textFont(anton);
  //characterCardUnlock[0] indicates which card was unlocked
  if (characterCardUnlock[0] != 0) {
    text("New Character Card Unlocked:", 320, 80);
    textSize(40);
    text("A New Powerful Card Has Been Unlocked Exclusively For The", 200, 140);
    if (characterCardUnlock[0] == 1) {
      text("King of Hearts.", 150, 180);
      newCard = new PowerCharge(0, 0, 8);
    }
    if (characterCardUnlock[0] == 2) {
      text("Queen of Clubs.", 150, 180);
      newCard = new QuadruplicateCard(600, 320, 8);
    }
    if (characterCardUnlock[0] == 3) {
      text("Jack of Diamond.", 150, 180);
      newCard = new FiftyFifty(600, 320, 8);
    }
    if (characterCardUnlock[0] == 4) {
      text("Ace of Spades.", 150, 180);
      newCard = new GetAceCard(600, 320, 8);
    }
    if (characterCardUnlock[0] == 5) {
      text("Red Witch Jessica.", 150, 180);
      newCard = new AddingCard(600, 320, 8);
      newCard.wild = true;
    }
    if (characterCardUnlock[0] == 6) {
      text("Black Joker.", 150, 180);
      newCard = new OCardStronger(600, 320, 8);
    }
  }
  //if instead an ability/character was unlocked the levelScreen tells us which one 
  if (levelScreen == 2) {
    text("New Character Unlocked:", 350, 80);
    textSize(40);
    text("The Red Witch Jessica Is Now Playable.", 340, 160);
    image(faceCardIMG[4], 600, 320, 150, 250);
  }
  if (levelScreen == 3) {
    text("New Ability Unlocked:", 350, 80);
    textSize(40);
    text("Wild Cards Will Now Occasionally \nAppear In Battle.", 200, 200);
    text("Max Health Increased.", 200, 330);
    player1MaxHealth = 60;
    player2MaxHealth = 60;
  }
  if (levelScreen == 4) {
    text("New Character Unlocked:", 350, 80);
    textSize(40);
    text("The Black Joker Is Now Playable.", 370, 160);
    image(faceCardIMG[5], 600, 320, 150, 250);
  }
  text("Press Enter To Return", 410, 500);
  //makes the newCard apepar as an option card
  if (newCard != null) {
    optionCardGraphics[8].clear();
    optionCardGraphics[8].imageMode(CENTER);
    optionCardGraphics[8].textSize(22);
    optionCardGraphics[8].fill(0);
    optionCardGraphics[8].textFont(anton);
    newCard.create();
    image(optionCardGraphics[8], 600, 320);
  }
  //press enter to return
  if (keyIsPressed && keyCode == 13) {
    //not unlocking a character card sends you back to score screen which you would have been at before hand
    if (characterCardUnlock[0] == 0) {
      screen = 7;
      music("winner");
      timer[6] = round(millis());
    } else {
      //unlocking a character card sends you to leaderboards pick screen
      characterCardUnlock[0] = 0;
      screen = 12;
      makeCharacterCards();
      //remove the text input if there was one
      if (leaderBoard[55]) {
        leaderBoardInput.remove();
      }
      //reset leaderboard markers
      leaderBoard[55] = false;
      leaderBoard[56] = false;
      leaderBoard[57] = false;
      leaderBoard[58] = false;
      leaderBoard[59] = true;
      timer[9] = 0;
    }
    optionCardGraphics.splice(8, 1);
    //stores newly unlocked character cards
    storeUnlocks();
  }
}

function specialUnlockScreen() {
  background(0);
  //make the white rain things
  party(1);
  //make the back button
  backButtonFun();
  textSize(50);
  fill(255);
  text("Special Unlocks:", 100, 150);
  textSize(40);
  text("- The Witch And Joker Are Now Playable \n- All Character Exclusive Endgame Cards Are Now Unlocked \n- Wild Cards Now Appear In Battle \n- Max Health Has Been Increased  \n- All Levels Are Unlocked", 140, 220);
}

function characterBonusAdd() {
  //characterBonuse[numOfTenCards, numOfAces, numOfStatus, numOfAceShots, numOfBookUses, numofWildCards in Battle]
  if (playerCharacter == 1) {
    //If King add 100 score to both round score for endless and overall score for every ten card
    mainScore[0] += characterBonus[1] * 100;
    mainScore[2] += characterBonus[1] * 100;
  }
  if (playerCharacter == 2) {
    //If queen add 50 score to both round score for endless and overall score for every ace card
    mainScore[0] += characterBonus[2] * 50;
    mainScore[2] += characterBonus[2] * 50;
  }
  if (playerCharacter == 3) {
    //If Jack add 150 score to both round score for endless and overall score for every status effect 
    mainScore[0] += numOfStatus[1] * 150;
    mainScore[2] += numOfStatus[1] * 150;
  }
  if (playerCharacter == 4) {
    //If Ace add 50 score to both round score for endless and overall score for every Ace shot used
    mainScore[0] += characterBonus[4] * 50;
    mainScore[2] += characterBonus[4] * 50;
  }
  if (playerCharacter == 5) {
    //If Witch add 50 score to both round score for endless and overall score for every spell book used 
    mainScore[0] += characterBonus[5] * 50;
    mainScore[2] += characterBonus[5] * 50;
  }
  if (playerCharacter == 6) {
    //If Joker add 150 score to both round score for endless and overall score for every wild card used
    mainScore[0] += characterBonus[6] * 150;
    mainScore[2] += characterBonus[6] * 150;
  }
  //adds score based on number of enemies defeated
  mainScore[0] += numOfEnemy * 200;
  mainScore[2] += numOfEnemy * 200;
}

function scoreScreen() {
  guessWordSplit = [];
  guessPhrase = [];
  //turn off crash safe if it is either not endless mode or it is the end of an endless round
  if (!endlessSelect || playerHealth == 1445) {
    if (middleOfGame) {
      middleOfGame = false;
      crashSafe();
    }
  }
  background(40);
  fill(255);
  rect(680, 40, 10, 530);
  rect(920, 40, 10, 530);
  textSize(65);
  textFont(anton);
  //score titles depending on if it the final endless round or if it isn't endlessmode
  if (!endlessSelect) {
    text("Score", 100, 75);
  } else if (playerHealth != 1445) {
    text("Round Score", 100, 75);
  } else {
    text("Final Score", 100, 75);
  }
  textSize(50);
  if (playerHealth == 1445) {
    //round text (playerHealth == 1445 means you are done with your endless run IE: ran out of score during guess the word on endlessmode)
    //I realize that you don't need multiple text for the following scoreboard as alot of the text is on the same y level but it would shift the scores slighly because the score could be 4 digits, 3 digits, etc so it bothered me.
    if (millis() > timer[6] + 500) {
      //Show round score if it is the final endless round and after a set time
      text("Round:", 100, 125);
      text(endlessCount[1], 600, 125);
      text("x 500", 740, 125);
      text(endlessCount[1] * 500, 1040, 125);
    }
  }
  if (millis() > timer[6] + 1000) {
    //show enemy defeated score after 1 second
    text("Enemies Defeated:", 100, 175);
    text(numOfEnemy, 600, 175);
    text("x 200", 740, 175);
    text(numOfEnemy * 200, 1040, 175);
  }
  if (millis() > timer[6] + 2000) {
    //show option cards used score after 2 seconds
    text("Option Cards Used:", 100, 225);
    text(numOfOCard, 600, 225);
    text("x 50", 740, 225);
    text(numOfOCard * 50, 1040, 225);
  }
  if (millis() > timer[6] + 3000) {
    //show individual character bonuses label after 3 seconds
    text("Character Bonus", 100, 275);
    if (millis() > timer[6] + 4000) {
      //show character bonuses after 4 seconds
      if (playerCharacter == 1) {
        //every character has a different bonus the King gets 100 score for every ten card he achieved
        text("-Number of Ten Cards:", 100, 325);
        text("x 100", 740, 325);
        text(characterBonus[1] * 100, 1040, 325);
      }
      if (playerCharacter == 2) {
        //every character has a different bonus the Queen gets 50 score for every ace card she achieved
        text("-Number of Ace Cards:", 100, 325);
        text("x 50", 740, 325);
        text(characterBonus[2] * 50, 1040, 325);
      }
      if (playerCharacter == 3) {
        //every character has a different bonus the Jack gets 150 score for every status effect
        text("-Number of Status:", 100, 325);
        text(numOfStatus[1], 600, 325);
        text("x 150", 740, 325);
        text(numOfStatus[1] * 150, 1040, 325);
      } else {
        text(characterBonus[playerCharacter], 600, 325);
      }
      if (playerCharacter == 4) {
        //every character has a different bonus the Ace gets 50 score for every ace shot he used
        text("-Number of Ace Shots:", 100, 325);
        text("x 50", 740, 325);
        text(characterBonus[4] * 50, 1040, 325);
      }
      if (playerCharacter == 5) {
        //every character has a different bonus the Witch gets 100 score for each spell she made
        text("-Number of Spells:", 100, 325);
        text("x 50", 740, 325);
        text(characterBonus[5] * 50, 1040, 325);
      }
      if (playerCharacter == 6) {
        //every character has a different bonus the Joker gets 100 score for each wild card he got
        text("-Number of Wilds:", 100, 325);
        text("x 150", 740, 325);
        text(characterBonus[6] * 150, 1040, 325);
      }
    }
  }
  //incorrect guesses
  if (millis() > timer[6] + 5000) {
    text("Incorrect Guesses:", 100, 375);
    text(wrongGuess[0] + wrongGuess[1] + wrongGuess[2], 600, 375);
    //wrongGuess[0] is for wrong constonant guesses, [1] is for vowels and [2] is for the entire phrase guesses each have different penalties.
    text(wrongGuess[0] * -500 + wrongGuess[1] * -800 + wrongGuess[2] * -1500,1040,375);
  }
  //shows correct guesses for hidden letters after a set time
  if (millis() > timer[6] + 6000) {
    if (guessMode) {
      text("Correct Guess Bonus:", 100, 425);
      text(goodGuess, 600, 425);
      text("x 150", 740, 425);
      text(goodGuess * 150, 1040, 425);
    }
    //shows round total at which sums up everything during the final endless mode round.
    if (playerHealth == 1445) {
      text(mainScore[2], 1040, 480);
      text("Round Total:", 100, 480);
      rect(80, 425, 1100, 5);
    }
  }
  text("Press Space To Return", 100, 550);
  //the next section slowly adds up the score til it equals the overall score
  if (
    millis() > timer[6] + 7500 &&
    millis() < timer[6] + 12500 &&
    timer[6] != -1
  ) {
    background(40);
    textSize(65);
    textFont(anton);
    text("Score:", 400, 200);
    //endlessmode skips the build up
    if (endlessSelect) {
      timer[6] -= 5000;
      land.play();
    }
    //mainscore adds till you get to the actual score
    if (!endlessSelect) {
      text(mainScore[1], 400, 265);
      if (mainScore[0] > mainScore[1]) {
        mainScore[1] += 50;
      }
      if (mainScore[0] == mainScore[1]) {
        //when it does equal the overall score go to the next section of the score screen
        timer[6] = 520;
        land.play();
      }
    }
  }
  //ending score board 
  if (millis() > timer[6] + 12500 && timer[6] != -1) {
    background(40);
    //yes, the party order is weird but this is how it turned out oops.
    //different confetti based on score. 
    if (mainScore[0] >= 5500) {
      party(0);
    } else if (mainScore[0] >= 1500) {
      party(2);
    } else {
      party(1);
    }
    fill(255);
    textSize(65);
    textFont(anton);
    //endless mode also states previous score 
    if (endlessSelect) {
      text("Previous Score: " + mainScore[1], 425, 140);
      text("+ Round Score:", 390, 205);
      if (mainScore[2] != null && mainScore[2] != 0) {
        text(mainScore[2], 840, 205);
      }
      rect(370, 222, 750, 5);
      text("= Overall Score: " + mainScore[0], 390, 300);
    }
    text("Press Space To Return", 400, 400);
    text("Press Enter To See Stats", 400, 465);
    if (!endlessSelect) {
      mainScore[1] = mainScore[0];
      text("Score:", 400, 200);
      text(mainScore[0], 400, 265);
      fill(180);
      //different congratulation messages based on score (don't appear on endless mode)
      if (mainScore[0] > 9000) {
        //godlike has a moving text shadow cuz i think it looks cool
        text("GODLIKE!", 400 + random(-15, 16), 100 + random(-15, 16));
        fill(255, 0, 0);
        text("GODLIKE!", 400, 100);
      } else if (mainScore[0] > 7000) {
        //impossible has a moving text shadow cuz i think it looks cool
        text("Impossible!", 400 + random(-15, 16), 100 + random(-15, 16));
        fill(255, 0, 0);
        text("Impossible!", 400, 100);
      } else if (mainScore[0] >= 5500) {
        //amazing has a text shadow
        text("Amazing!", 404, 102);
        fill(255, 0, 0);
        text("Amazing!", 400, 100);
      } else if (mainScore[0] >= 3500) {
        //terrific has a text shadow
        text("Terrific!", 404, 102);
        fill(255, 0, 0);
        text("Terrific!", 400, 100);
      } else if (mainScore[0] >= 1500) {
        fill(255, 0, 0);
        text("Great!", 400, 100);
      } else {
        fill(255, 0, 0);
        text("Good!", 400, 100);
      }
    }
    image(celebrateIMG[playerCharacter - 1], 200, 360, 384, 480);
  }
  //if levelscreen is the corresponding one then it sends player to new ability screen or the special thanks screen
  if (levelScreen == levelUnlock) {
    levelUnlock++;
    if (levelScreen == 2) {
      //unlock the witch character
      characterUnlock = 6;
      //new ability screen
      screen = 20;
      //make a graphic for the witch character card
      optionCardGraphics[8] = createGraphics(150, 250);
    }
    if (levelScreen == 3) {
      //increase max health
      playerMaxHealth = 45;
      //turn on wild in Game
      wildInGame = true;
      //new ability Screen
      screen = 20;
    }
    if (levelScreen == 4) {
      //unlock joker
      characterUnlock = 7;
      //new ability screen
      screen = 20;
      //make graphic for joker character card
      optionCardGraphics[8] = createGraphics(150, 250);
    }
    if (levelScreen == 6) {
      //even though it isn't a charactercard unlocked it serves the same purpose. this is to mark that the special thanks screen was accessed through beating the final level
      characterCardUnlock[0] = 8;
      //special thanks screen
      screen = 24;
    }
  }
  //the following huge chunk of code is to add to the leaderboard if the player qualified
  if (endlessSelect) {
    //check if this is the final endless round (playerHealth == 1445)
    if (playerHealth == 1445) {
      //let i be an index that is based of of their playerCharacter
      let i = (playerCharacter - 1) * 9;
      if (leaderBoard[59]) {
        //leaderboard checker for endlessmode
        //the following if statement checks if your score was greater than the first place or if there is nobody in first place
        if (mainScore[0] > leaderBoard[i + 2] || leaderBoard[i + 2] == "----") {
          //unlocks the character card if you get first place  and their card isn't already unlocked
          if (
            characterCardUnlock[playerCharacter] == null ||
            !characterCardUnlock[playerCharacter]
          ) {
            //unlock the character's exclusive card and mark that that card is unlocked
            characterCardUnlock[playerCharacter] = true;
            characterCardUnlock[0] = playerCharacter;
          }
          //leaderboard[55] states if you made a leaderboard, [56-58] is about which slot you made
          leaderBoard[55] = true;
          leaderBoard[56] = true;
          //name round score
          //this moves all the previous leaderboard places down one slot
          for (let p = 5; p > 0; p--) {
            leaderBoard[i + (p + 3)] = leaderBoard[i + p];
          }
          //this sets the new first place as your stats
          leaderBoard[i + 3] = leaderBoard[i];
          leaderBoard[i + 2] = mainScore[0];
          leaderBoard[i + 1] = endlessCount[1];
          leaderBoard[i] = "----";
          timer[9] = -1;
        } else if (
          ///the following if statement checks if your score was greater than the second place or if there is nobody in second place
          (mainScore[0] > leaderBoard[i + 5] || leaderBoard[i + 5] == "----") &&
          mainScore[0] <= leaderBoard[i + 2]
        ) {
          leaderBoard[55] = true;
          leaderBoard[57] = true;
          //make the second place the third place elements
          for (let p = 5; p > 2; p--) {
            leaderBoard[i + (p + 3)] = leaderBoard[i + p];
          }
          //make your score the new second place data
          leaderBoard[i + 5] = mainScore[0];
          leaderBoard[i + 4] = endlessCount[1];
          leaderBoard[i + 3] = "----";
          timer[9] = -1;
        } else if (
          //the following if statement checks if your score was greater than the third place or if there is nobody in third place
          (mainScore[0] > leaderBoard[i + 8] || leaderBoard[8] == "----") &&
          mainScore[0] <= leaderBoard[i + 5]
        ) {
          leaderBoard[55] = true;
          leaderBoard[58] = true;
          //make your score the third place now
          leaderBoard[i + 9] = leaderBoard[i + 6];
          leaderBoard[i + 8] = mainScore[0];
          leaderBoard[i + 7] = endlessCount[1];
          leaderBoard[i + 6] = "----";
          timer[9] = -1;
        }
        //leaderboard[59] is just a self destructing variable so it isn't constantly checking the leaderboard while you are on the scorescreen
        leaderBoard[59] = false;
      }
    }
  }
  storeData();
}

function party(id) {
  //celebration flourish by making confetti and fireworks different ids make it either confetti, confetti and fireworks, or rain? idk what the white/colorful things are I just think it looks nice
  //if id = 0 then make fire works and colorful confetti, if id = 1 make white rain, if id = 2 make colorful rain
  for (let i = 0; i < 75; i++) {
    if (celebrate2[i] == 0 || celebrate2[i] == null) {
      celebrate2[i] = new Confetti(random(20, 1280), random(0, -600), id);
    }
  }
  for (let j = 0; j < celebrate2.length; j++) {
    celebrate2[j].animate();
    if (celebrate2[j].done) {
      celebrate2[j] = 0;
    }
  }
  //check if id = 0 if it does make fireworks
  if (id == 0) {
    for (let i = 0; i < 15; i++) {
      if (celebrate[i] == 0 || celebrate[i] == null) {
        celebrate[i] = new FireWork(random(50, 1250), random(50, 550));
      }
    }
    for (let j = 0; j < celebrate.length; j++) {
      celebrate[j].animate();
      if (celebrate[j].done) {
        celebrate[j] = 0;
      }
    }
  }
}

function cameraShake() {
  //camera shake, since the camera can only move relatively first move the camera 10 to the right then half a second later 10 to the left, this ensures that the camera always returns to its original position and shakes
  currCamera.move(-10, 0, 0);
}

function storeData() {
  //store data after battle ended and score updates
  storeItem("levelProgress", levelUnlock);
  storeItem("lead", leaderBoard);
}

function storeUnlocks() {
  //store data when in new ability screen
  storeItem("cards", characterCardUnlock);
  storeItem("characters", characterUnlock);
  storeItem("wild", wildInGame);
}

function crashSafe() {
  //storing data to bring a player back form middle of game
  storeItem("middle?", middleOfGame);
  if (multiplayerSelect == 0) {
    if (nextEnemy || overPlay || (screen == 15 && !chooseLetterTime)) {
      //player health, score chosenword, hiddenword, chosenWordSplit, enemydifficulty1, 2, 3,
      ultimateStats = [playerHealth, mainScore[0], enemyDifficulty[0], enemyDifficulty[1], enemyDifficulty[2], enemyDifficulty[3], freeLetter, vowelV, playerCharacter,];
      //store other essential data for recreating a game
      storeItem("stats", ultimateStats);
      storeItem("choosenWord", chosenWord);
      storeItem("hiddenWord", hiddenWord);
      storeItem("chosenWordSplit", chosenWordSplit);
      storeItem("reveal", freeLetterReveal);
      storeItem("vowel", vowelDetect);
      storeItem("guess", freeGuess);
      if (endlessSelect) {
        //endless mode store a few other variables including round score, round number and hints
        storeItem("endless", endlessCount);
        storeItem("hintEndless", endlessPick);
        storeItem("score2", mainScore[2]);
      } else {
        //non endless mode store which level you are on
        storeItem("endless", "no");
        storeItem("whichLevel", levelScreen);
      }
    }
    }
  if (!middleOfGame) {
    //remove stored items when i can, it saves on memory
    localStorage.removeItem("stats");
    localStorage.removeItem("chosenWord");
    localStorage.removeItem("hiddenWord");
    localStorage.removeItem("chosenWordSplit");
    localStorage.removeItem("reveal");
    localStorage.removeItem("vowel");
    localStorage.removeItem("guess");
    localStorage.removeItem("hintEndless");
    localStorage.removeItem("whichLevel");
    localStorage.removeItem("score2")
  }
}

function backButtonFun() {
  //check if the back button is clicked
  back.check();
  fill(255);
  textSize(15);
  textFont(anton);
  if (screen == 8 && endlessSelect) {
    //results is only when during a game over because the back button actually brings you to the results screen not main menu
    text("Results", 60, 33);
  } else {
    text("Back", 60, 33);
  }
}

function mousePressed() {
  //The following is the end turn card
  //check if the player can press the end turn card which means they are in battle but tutorialNoEndTurn is false, and they aren't picking an ace card. and they aren't on an option card detail screen
  if (
    !playerPickAceValue &&
    !tutorialNoEndTurn &&
    oCardDetailsScreen[0] == 0 &&
    screen == 3
  ) {
    if (
      mouseX > 1180 * scaleNum &&
      mouseX < 1260 * scaleNum &&
      mouseY > 435 * scaleNum &&
      mouseY < 665 * scaleNum
    ) {
      mouseOverlap = true;
      //stop weak function from occuring
      clearTimeout(weak);
      timer[1] = 0;
      //if not in overplay and with an alive enemey make it the enmy turn.
      if (!overPlay && enemyHealth > 0) {
        if (multiplayerSelect == 0) {
          playerTurn = false;
        }
      }
      //if in overplay this brings you to word game screen
      if (overPlay) {
        screen = 15;
        music("word");
        //make word game splashmessage unless tutorial starts
        if (!tutorialOn[0]) {
          splashThing = new SplashMessage(2);
        }
        //mainScore[2] is the round score which equallys the overall score([0]) minus the score from all previous rounds ([1]). Endless word games are based off of round score not overall score.
        if (endlessSelect) {
          mainScore[2] = mainScore[0] - mainScore[1];
        }
        //add character bonueses as this is the end of the battle portion
        characterBonusAdd();
        //playerhealth = one is just to stop some functions from activiating
        playerHealth = 1;
        if (tutorialOn[0] && multiplayerSelect == 0 && mainScore[0] > 1) {
          //tutorial for word game which turns itself off
          tutorialOn[0] = false;
          tutorial = 8;
          tutorialtext = 0;
        }
      }
      //multiplayer the following is for making it the other player's turn.
      if (multiplayerSelect == 3) {
        //stop weakness from happening if the other player was weakened
        turnCount++;
        if (whoseTurn == 1) {
          if (playerCharacter == 5) {
            //for witch this stores the option card board for player 1's next turn
            witchCards1 = optionCardAppearArray;
            witchDeck1 = witchDeck;
            witchCardNum1 = witchCardNum;
          }
          whoseTurn = 2;
          //if player 2 was poisoned they lose their health
          if (poisonStat[2]) {
            player2Health -= 2;
            if (player2Health <= 0) {
              player2Health = 1;
            }
          }
          //player 2 heal from regen
          if (regenStat[2]) {
            heal.play();
            player2Health += int(random(1, 4));
          }
          if (freezeStat[2]) {
            timer[12] = round(millis());
          }
          //freeze status for player 1
          if (freezeStat[1]) {
            freezeStat[1] = false;
            removeStatusIcon(3, 1);
          }
        } else if (whoseTurn == 2) {
          //same as above but for player 2 turn end
          if (player2Character == 5) {
            witchCards2 = optionCardAppearArray;
            witchDeck2 = witchDeck;
            witchCardNum2 = witchCardNum;
          }
          whoseTurn = 1;
          if (poisonStat[1]) {
            player1Health -= 2;
            if (player1Health <= 0) {
              player1Health = 1;
            }
          }
          if (regenStat[1]) {
            heal.play();
            player1Health += int(random(1, 4));
          }
          if (freezeStat[1]) {
            timer[12] = round(millis());
          }
          if (freezeStat[2]) {
            freezeStat[2] = false;
            removeStatusIcon(3, 2);
          }
        }
        //Remove extra card in deck
        if (cardInDeckObjects.length >= 5) {
          cardInDeckObjects.splice(5, 6);
        }
        //clear board and option card graphics
        optionCardBoard = [];
        for (let gg = 0; gg < 6; gg++) {
          optionCardGraphics[gg].clear();
        }
        //restart setup and make splashmessage
        startCardBattleSetupV = 0;
        splashThing = new SplashMessage(whoseTurn + 2);
      }
      //for when tutorial requires ending turn the text continues
      if (tutorial != 0) {
        tutorialText++;
      }
    }
  }
  //Option cards details screen
  //check if they clicked on an option card
  for (let jk = 0; jk < optionCardBoard.length; jk++) {
    if (
      mouseX > (optionCardBoard[jk].x - 75) * scaleNum &&
      mouseX < (optionCardBoard[jk].x + 75) * scaleNum &&
      mouseY > 100 * scaleNum &&
      mouseY < 350 * scaleNum
    ) {
      //check if they aren't already in an option card screen, and they aren't draggging a card and if they aren't paused. Along with if they are not in next enemy and if it is in the middle of a battle
      if (
        !mouseOverlap &&
        oCardDetailsScreen[0] == 0 &&
        cardIsSmoothlyDraggingVa == -2 &&
        endGame == 0 &&
        !nextEnemy &&
        screen == 3
      ) {
        if (optionCardBoard[jk] != 0 && tutorial < 8) {
          mouseOverlap = true;
          oCardDetailsScreen[0] = optionCardAppearArray[jk];
          oCardDetailsScreen[1] = true;
          //optionCardGraphics[7] is for option card details screen to show the option card image
          optionCardGraphics[7] = createGraphics(150, 250);
          optionCardGraphics[7].imageMode(CENTER);
          optionCardGraphics[7].textSize(22);
          optionCardGraphics[7].fill(0);
          optionCardGraphics[7].textFont(anton);
          if ((tutorial == 6 && tutorialText == 3) || tutorialText == 4) {
            if (oCardDetailsScreen[0] == 23 || oCardDetailsScreen[0] == 24) {
              tutorialText++;
            }
          }
        }
      }
    }
  }
  //closing option card details screen
  if (oCardDetailsScreen[0] != 0) {
    if (mouseIsPressed && !mouseOverlap) {
      oCardDetailsScreen[0] = 0;
      //remove option card graphic
      optionCardGraphics[7].clear();
      if (tutorial == 1) {
        if (tutorialText == 9) {
          tutorialText = 10;
        }
      }
    }
  }
  //click progression for tutorial text
  if (tutorial != 0) {
    if (mouseX > 162 * scaleNum || mouseY > 68 * scaleNum) {
      if (mouseIsPressed && !mouseOverlap) {
        if (!tutorialNoArrow[1]) {
          mouseOverlap = true;
          tutorialText++;
        }
      }
    }
  }
}

function mouseReleased() {
  mouseOverlap = false;
  // show that card is not being dragged
  cardIsSmoothlyDraggingVa = -2;
  //stop dragging card if mouseReleased
  if (screen == 3 && playerTurn && !nextEnemy) {
    for (let w = 0; w < cardInDeckObjects.length; w++) {
      if (cardInDeckObjects[w] != -1) {
        cardInDeckObjects[w].smoothDrag = false;
        //if card is too far left/right return card to default
        if (
          (cardInDeckObjects[w].x > 1120 || cardInDeckObjects[w].x < 70 || cardInDeckObjects[w].y < 0 || cardInDeckObjects[w].y > 600) &&
          cardInDeckObjects[w].x != 2000
        ) {
          //cardInDeckObjects.x = 2000 means that the card is out of the game
          cardInDeckObjects[w].x = cardInDeckObjects[w].defaultX;
          cardInDeckObjects[w].y = 500;
        }
      }
    }
    // this for loop checks the five cards to see if they are placed on an options card.
    if (oCardDetailsScreen[0] == 0) {
      for (let i = 0; i < cardInDeckObjects.length; i++) {
        if (cardInDeckObjects[i] != -1) {
          for (let jk = 0; jk < 6; jk++) {
            if (
              cardInDeckObjects[i].x > jk * 170 + 50 && //option card x and y values
              cardInDeckObjects[i].x < jk * 170 + 200 &&
              cardInDeckObjects[i].y > 100 &&
              cardInDeckObjects[i].y < 350
            ) {
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 1) {
                //king special
                if (!tutorialNoOCard) {
                  if (optionCardBoard[jk] != 0) {
                    if (tutorial == 1) {
                      if (tutorial == 1) {
                        tutorialText++;
                      }
                    }
                    optionCardBoard[jk].use(cardInDeckObjects[i].cardScore);
                    //attack cards play the animation while sending jk to the oCardAttackAnimation function which tells which option card board slot the animation should play over
                    oCardAttackAnimation(jk);
                    //get rid of battle card used
                    cardInDeckObjects[i] = -1;
                  }
                } else {
                  //if tutorialOCard is true then reject battle card
                  defaultBattleCard(i);
                  error.play();
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 2) {
                //adding card has two seperate uses that do different things
                //the second use of the adding card makes the new battle card the value of the two previous battle cards combined
                if (optionCardBoard[jk].uses == 1) {
                  //adding card
                  optionCardBoard[jk].useAgain(cardInDeckObjects[i].cardScore);
                  cardInDeckObjects[i].cardScore = AddingCardScore1[1];
                  defaultBattleCard(i);
                  if (tutorial == 1) {
                    tutorialText = 17;
                  }
                  if (overPlay || optionCardBoard[jk].wild) {
                    cardInDeckObjects[overPlayAdd].cardScore =
                      AddingCardScore1[1];
                    //because the battle card's defaultX was changed to be offscreen I do the following to replace the default x for overplay Adding card
                    if (overPlayAdd <= 4) {
                      cardInDeckObjects[overPlayAdd].defaultX =
                        700 + overPlayAdd * 100;
                    } else if (overPlayAdd > 4) {
                      cardInDeckObjects[overPlayAdd].defaultX =
                        1100 - overPlayAdd * 100;
                    }
                    defaultBattleCard(overPlayAdd);
                    if (playerCharacter == 5) {
                      optionCardBoard[jk] = 0;
                    }
                  }
                }
                //the first use of the adding card tracks the value of the battle card used and removes said battle card
                if (optionCardBoard[jk].uses == 0) {
                  optionCardBoard[jk].use(cardInDeckObjects[i].cardScore);
                  removeBattleCard(i);
                  if (overPlay || optionCardBoard[jk].wild) {
                    overPlayAdd = i;
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 3) {
                if (optionCardBoard[jk] != 0) {
                  //dodge card needs min 4 for single player, or for multiplayer either min 6 or max 4 for queen multiplayer
                  if (
                    (multiplayerSelect == 0 &&
                      cardInDeckObjects[i].cardScore >= 4) ||
                    (multiplayerSelect == 3 &&
                      cardInDeckObjects[i].cardScore >= 6 &&
                      ((whoseTurn == 1 && playerCharacter != 2) ||
                        (whoseTurn == 2 && player2Character != 2))) ||
                    (cardInDeckObjects[i].cardScore <= 4 &&
                      ((whoseTurn == 1 && playerCharacter == 2) ||
                        (whoseTurn == 2 && player2Character == 2)))
                  ) {
                    optionCardBoard[jk].use(cardInDeckObjects[i].cardScore);
                    cardInDeckObjects[i] = -1;
                  } else {
                    //reject battle card
                    defaultBattleCard(i);
                    error.play();
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 4) {
                //redraw card
                if (optionCardBoard[jk].uses < 3) {
                  optionCardBoard[jk].use(cardInDeckObjects[i].cardScore, i);
                  //return battle card
                  defaultBattleCard(i);
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 5) {
                //duplicate card
                if (optionCardBoard[jk] != 0) {
                  //duplicate needs the cardscore to be copied and i which is to copy the suit for the new card and the length of the array for the new card stats
                  optionCardBoard[jk].use(
                    cardInDeckObjects[i].cardScore,
                    i,
                    cardInDeckObjects.length + 1
                  );
                  //return battle card
                  defaultBattleCard(i);
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 6) {
                if (!tutorialNoOCard) {
                  //queen special
                  if (cardInDeckObjects[i].cardScore <= 3) {
                    optionCardBoard[jk].use(cardInDeckObjects[i].cardScore);
                    //attack cards play the animation while sending jk to the oCardAttackAnimation function which tells which option card board slot the animation should play over
                    oCardAttackAnimation(jk);
                    cardInDeckObjects[i] = -1;
                    if (tutorial == 3) {
                      tutorialText++;
                    }
                  } else {
                    //reject battle card if score too high
                    defaultBattleCard(i);
                    error.play();
                  }
                } else {
                  //reject battle card if tutorialNoOCard is true
                  defaultBattleCard(i);
                  error.play();
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 7) {
                //split card
                if (optionCardBoard[jk] != 0) {
                  if (cardInDeckObjects[i].cardScore > 1) {
                    if (optionCardBoard[jk].wild || overPlay){
                      //attack cards play the animation while sending jk to the oCardAttackAnimation function which tells which option card board slot the animation should play over
                      oCardAttackAnimation(jk);
                    }
                    //split option card is similar to duplicate card needs same variables
                    optionCardBoard[jk].use(
                      cardInDeckObjects[i].cardScore,
                      i,
                      cardInDeckObjects.length + 1
                    );
                    //return battle card
                    defaultBattleCard(i);

                    if (tutorial == 3) {
                      tutorialText = 4;
                    }
                  } else {
                    //reject battle card if card score is too low
                    defaultBattleCard(i);
                    error.play();
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 8) {
                //heal card
                if (optionCardBoard[jk] != 0) {
                  //heal card checks player health because it can't be used if maxhealth
                  if (multiplayerSelect == 0) {
                    if (
                      (playerHealth < playerMaxHealth && !overPlay) ||
                      (overPlay && cardInDeckObjects[i].cardScore >= 5)
                    ) {
                      optionCardBoard[jk].use(cardInDeckObjects[i].cardScore);
                      cardInDeckObjects[i] = -1;
                    } else {
                      //reject battle card
                      defaultBattleCard(i);
                      error.play();
                    }
                  }
                  if (multiplayerSelect == 3) {
                    if (whoseTurn == 1) {
                      if (player1Health < player1MaxHealth) {
                        optionCardBoard[jk].use(cardInDeckObjects[i].cardScore);
                        cardInDeckObjects[i] = -1;
                      } else {
                        //reject battle card if too high hp
                        defaultBattleCard(i);
                        error.play();
                      }
                    }
                    if (whoseTurn == 2) {
                      if (player2Health < player2MaxHealth) {
                        optionCardBoard[jk].use(cardInDeckObjects[i].cardScore);
                        cardInDeckObjects[i] = -1;
                      } else {
                        //reject battle card if too high hp
                        defaultBattleCard(i);
                        error.play();
                      }
                    }
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 9) {
                //this checks if you place a card ontop of the keep card when a card is being kept
                if (keepACard && i != keepACardID[0]) {
                  defaultBattleCard(i);
                }
                // keep card card
                if (!keepACard) {
                  if (optionCardBoard[jk] != 0) {
                    //keep a card requires the card score, suit, which battle card slot it was and which option card slot the keep a card is located in
                    optionCardBoard[jk].use(cardInDeckObjects[i].cardScore, cardInDeckObjects[i].suit, i, jk);
                    //cardIsBeingKept is to stop kept card from being dragged
                    cardIsBeingKept = cardInDeckObjects[i].cardNum;
                    cardInDeckObjects[i].x = optionCardBoard[jk].x;
                    cardInDeckObjects[i].y = 225;
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 10) {
                // add one card
                if (optionCardBoard[jk] != 0) {
                  //ace cards loop if the value goes over 10 other characters get an error
                  if (
                    cardInDeckObjects[i].cardScore < 10 ||
                    (playerCharacter == 4 && whoseTurn == 1) ||
                    (player2Character == 4 && whoseTurn == 2)
                  ) {
                    optionCardBoard[jk].use(cardInDeckObjects[i].cardScore);
                    //return battle card
                    defaultBattleCard(i);
                    cardInDeckObjects[i].cardScore =
                      optionCardBoard[jk].newScore;
                  } else {
                    //reject battle card
                    defaultBattleCard(i);
                    error.play();
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 11) {
                // subtract one card
                if (optionCardBoard[jk] != 0) {
                  //ace cards loop if the value goes under 1 other characters get an error
                  if (
                    cardInDeckObjects[i].cardScore > 1 ||
                    (playerCharacter == 4 && whoseTurn == 1) ||
                    (player2Character == 4 && whoseTurn == 2)
                  ) {
                    optionCardBoard[jk].use(cardInDeckObjects[i].cardScore);
                    //return battle card
                    defaultBattleCard(i);
                    cardInDeckObjects[i].cardScore =
                      optionCardBoard[jk].newScore;
                  } else {
                    //reject battle card
                    defaultBattleCard(i);
                    error.play();
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 12) {
                //get ten card
                if (optionCardBoard[jk] != 0) {
                  if (cardInDeckObjects[i].cardScore == tenCardNeeded[0]) {
                    optionCardBoard[jk].use();
                    //return battle card
                    cardInDeckObjects[i].cardScore = 10;
                    defaultBattleCard(i);
                  } else {
                    //reject battle card
                    defaultBattleCard(i);
                    error.play();
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 13) {
                // heal 5 card/regen
                if (optionCardBoard[jk] != 0) {
                  if (tutorial == 4) {
                    tutorialText = 5;
                  }
                  if (multiplayerSelect == 0) {
                    //can't use card unless you aren't at full health but you can get regen at full health
                    if (
                      playerHealth < playerMaxHealth ||
                      cardInDeckObjects[i].cardScore > 4
                    ) {
                      optionCardBoard[jk].use(cardInDeckObjects[i].cardScore);
                      cardInDeckObjects[i] = -1;
                    } else {
                      //reject battle card
                      defaultBattleCard(i);
                      error.play();
                    }
                  }
                  if (multiplayerSelect == 3) {
                    if (whoseTurn == 1) {
                      if (
                        player1Health < player1MaxHealth ||
                        cardInDeckObjects[i].cardScore > 4
                      ) {
                        optionCardBoard[jk].use(cardInDeckObjects[i].cardScore);
                        cardInDeckObjects[i] = -1;
                      } else {
                        //reject battle card
                        defaultBattleCard(i);
                        error.play();
                      }
                    }
                    if (whoseTurn == 2) {
                      if (
                        player2Health < player2MaxHealth ||
                        cardInDeckObjects[i].cardScore > 4
                      ) {
                        optionCardBoard[jk].use(cardInDeckObjects[i].cardScore);
                        cardInDeckObjects[i] = -1;
                      } else {
                        //reject battle card
                        defaultBattleCard(i);
                        error.play();
                      }
                    }
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 14) {
                //need odd to damage
                if (optionCardBoard[jk] != 0) {
                  //checks if value is odd
                  if (cardInDeckObjects[i].cardScore % 2 != 0) {
                    optionCardBoard[jk].use(cardInDeckObjects[i].cardScore);
                    //attack cards play the animation while sending jk to the oCardAttackAnimation function which tells which option card board slot the animation should play over
                    oCardAttackAnimation(jk);
                    cardInDeckObjects[i] = -1;
                    if (tutorial == 4) {
                      tutorialText = 9;
                    }
                  } else {
                    //reject battle card
                    defaultBattleCard(i);
                    error.play();
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 15) {
                //need even to damage
                if (optionCardBoard[jk] != 0) {
                  //checks if even
                  if (cardInDeckObjects[i].cardScore % 2 == 0) {
                    optionCardBoard[jk].use(cardInDeckObjects[i].cardScore);
                    //attack cards play the animation while sending jk to the oCardAttackAnimation function which tells which option card board slot the animation should play over
                    oCardAttackAnimation(jk);
                    cardInDeckObjects[i] = -1;
                  } else {
                    //reject battle card
                    defaultBattleCard(i);
                    error.play();
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 16) {
                //do double damage
                if (optionCardBoard[jk] != 0) {
                  if (cardInDeckObjects[i].cardScore <= 3) {
                    optionCardBoard[jk].use(cardInDeckObjects[i].cardScore);
                    //attack cards play the animation while sending jk to the oCardAttackAnimation function which tells which option card board slot the animation should play over
                    oCardAttackAnimation(jk);
                    cardInDeckObjects[i] = -1;
                  } else {
                    //reject battle card
                    defaultBattleCard(i);
                    error.play();
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 17) {
                //ace special
                if (cardInDeckObjects[i].cardScore == aceChosenValue) {
                  optionCardBoard[jk].use();
                  //attack cards play the animation while sending jk to the oCardAttackAnimation function which tells which option card board slot the animation should play over
                  oCardAttackAnimation(jk);
                  cardInDeckObjects[i] = -1;
                } else {
                  //reject battle card
                  defaultBattleCard(i);
                  error.play();
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 18) {
                //multiply card
                if (optionCardBoard[jk] != 0) {
                  if (cardInDeckObjects[i].cardScore <= 5) {
                    optionCardBoard[jk].use();
                    cardInDeckObjects[i].cardScore =
                      cardInDeckObjects[i].cardScore * 2;
                    if (cardInDeckObjects[i].cardScore == 10) {
                      characterBonus[1]++;
                    }
                  } else {
                    //reject battle card
                    error.play();
                  }
                  defaultBattleCard(i);
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 19) {
                //Power Charge card
                if (optionCardBoard[jk] != 0) {
                  if (
                    cardInDeckObjects[i].cardScore == 9 ||
                    (cardInDeckObjects[i].cardScore == 10 &&
                      ((!playerCharge && multiplayerSelect == 0) ||
                        (multiplayerSelect == 3 &&
                          whoseTurn == 1 &&
                          !playerCharge) ||
                        (whoseTurn == 2 && !player2Charge)))
                  ) {
                    optionCardBoard[jk].use();
                    cardInDeckObjects[i] = -1;
                  } else {
                    //reject battle card
                    error.play();
                    defaultBattleCard(i);
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 20) {
                //Weaken self card
                if (optionCardBoard[jk] != 0) {
                  optionCardBoard[jk].use(cardInDeckObjects[i].cardScore);
                  //attack cards play the animation while sending jk to the oCardAttackAnimation function which tells which option card board slot the animation should play over
                  oCardAttackAnimation(jk);
                  cardInDeckObjects[i] = -1;
                  if (tutorial == 3) {
                    tutorialText = 12;
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 21) {
                //Enemy Status Random card
                if (optionCardBoard[jk].uses == 1) {
                  //second use checks if score is equal to kalV
                  if (cardInDeckObjects[i].cardScore == kalV) {
                    optionCardBoard[jk].use();
                    cardInDeckObjects[i] = -1;
                    optionCardBoard[jk].uses++;
                  } else {
                    //reject battle card
                    error.play();
                    defaultBattleCard(i);
                    //reset uses
                    optionCardBoard[jk].uses = 0;
                  }
                }
                //first use of this card sets kalV to the card score
                if (optionCardBoard[jk].uses == 0) {
                  kalV = cardInDeckObjects[i].cardScore;
                  cardInDeckObjects[i] = -1;
                  optionCardBoard[jk].uses++;
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 22) {
                //Jack Special Attack card
                if (optionCardBoard[jk] != 0) {
                  if (!tutorialNoOCard) {
                    optionCardBoard[jk].use();
                    cardInDeckObjects[i] = -1;
                    //attack cards play the animation while sending jk to the oCardAttackAnimation function which tells which option card board slot the animation should play over
                    oCardAttackAnimation(jk);
                  } else {
                    //reject battle card
                    error.play();
                    defaultBattleCard(i);
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 23) {
                //Witch Special Attack book left
                if (!tutorialNoOCard) {
                  if (cardInDeckObjects[i].cardScore < 6) {
                    //to make sure a battle card isn't in place of an option card when a new option card is created with the book all cards are returned to default positions when using the spell book
                    for (let po = 0; po < cardInDeckObjects.length; po++) {
                      cardInDeckObjects[po].x = cardInDeckObjects[po].defaultX;
                      cardInDeckObjects[po].y = 500;
                    }
                    optionCardBoard[jk].use(cardInDeckObjects[i].cardScore, i);
                  } else {
                    //reject battle card
                    error.play();
                    defaultBattleCard(i);
                  }
                } else {
                  //reject battle card
                  error.play();
                  defaultBattleCard(i);
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 24) {
                //Witch Special Attack book right
                if (!tutorialNoOCard || cardInDeckObjects[i].cardScore == 6) {
                  if (tutorialNoOCard) {
                    tutorialText++;
                  }
                  if (cardInDeckObjects[i].cardScore > 5) {
                    for (let po = 0; po < cardInDeckObjects.length; po++) {
                      cardInDeckObjects[po].x = cardInDeckObjects[po].defaultX;
                      cardInDeckObjects[po].y = 500;
                    }
                    optionCardBoard[jk].use(cardInDeckObjects[i].cardScore, i);
                  } else {
                    //reject battle card
                    error.play();
                    defaultBattleCard(i);
                  }
                } else {
                  //reject battle card
                  error.play();
                  defaultBattleCard(i);
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 25) {
                //subtract card second use returns a new battle card with a different value
                if (optionCardBoard[jk].uses == 1) {
                  //Subtract card
                  optionCardBoard[jk].useAgain(cardInDeckObjects[i].cardScore);
                  cardInDeckObjects[i].cardScore = subtractCardScore[1];
                  defaultBattleCard(i);
                  if (overPlay || optionCardBoard[jk].wild) {
                    cardInDeckObjects[overPlaySubtract].cardScore =
                      subtractCardScore[1];
                    //because the battle card's defaultX was changed to be offscreen I do the following to replace the default x for overplay subtract card
                    if (overPlaySubtract <= 4) {
                      cardInDeckObjects[overPlaySubtract].defaultX =
                        700 + overPlaySubtract * 100;
                    } else if (overPlaySubtract > 4) {
                      cardInDeckObjects[overPlaySubtract].defaultX =
                        1100 - overPlaySubtract * 100;
                    }
                    defaultBattleCard(overPlaySubtract);
                  }
                  if (tutorial == 5) {
                    tutorialText = 11;
                  }
                  optionCardBoard[jk].uses++;
                }
                //first use of subtract card tracks the value of the battle card used on it
                if (optionCardBoard[jk].uses == 0) {
                  optionCardBoard[jk].use(cardInDeckObjects[i].cardScore);
                  removeBattleCard(i);
                  if (overPlay || optionCardBoard[jk].wild) {
                    overPlaySubtract = i;
                  }
                  if (tutorialText == 9) {
                    tutorialText = 10;
                  }
                  optionCardBoard[jk].uses++;
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 26) {
                if (optionCardBoard[jk] != 0) {
                  //block card
                  optionCardBoard[jk].use(cardInDeckObjects[i].cardScore);
                  cardInDeckObjects[i] = -1;
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 27) {
                if (optionCardBoard[jk] != 0) {
                  //Seven Damage card
                  //attack cards play the animation while sending jk to the oCardAttackAnimation function which tells which option card board slot the animation should play over
                  oCardAttackAnimation(jk);
                  optionCardBoard[jk].use(cardInDeckObjects[i].cardScore);
                  cardInDeckObjects[i] = -1;
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 28) {
                if (optionCardBoard[jk] != 0) {
                  if (cardInDeckObjects[i].cardScore >= 6) {
                    //ten Damage card
                    //attack cards play the animation while sending jk to the oCardAttackAnimation function which tells which option card board slot the animation should play over
                    oCardAttackAnimation(jk);
                    optionCardBoard[jk].use(cardInDeckObjects[i].cardScore);
                    cardInDeckObjects[i] = -1;
                  } else {
                    //reject card
                    defaultBattleCard(i);
                    error.play();
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 29) {
                if (optionCardBoard[jk] != 0) {
                  //Double Damage card
                  //attack cards play the animation while sending jk to the oCardAttackAnimation function which tells which option card board slot the animation should play over
                  oCardAttackAnimation(jk);
                  optionCardBoard[jk].use(cardInDeckObjects[i].cardScore);
                  cardInDeckObjects[i] = -1;
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 30) {
                //get Ace card
                if (cardInDeckObjects[i].cardScore == getAceValue[0]) {
                  optionCardBoard[jk].use();
                  cardInDeckObjects[i].cardScore = aceChosenValue;
                  //return card
                  defaultBattleCard(i);
                  //attack cards play the animation while sending jk to the oCardAttackAnimation function which tells which option card board slot the animation should play over
                  oCardAttackAnimation(jk);
                } else {
                  //reject battle card
                  defaultBattleCard(i);
                  error.play();
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 31) {
                if (optionCardBoard[jk] != 0) {
                  //Buff or Debuff card
                  //witch needs the a 10 card value jack does not
                  if (
                    (playerCharacter == 5 && whoseTurn == 1) ||
                    (player2Character == 5 && whoseTurn == 2)
                  ) {
                    if (
                      cardInDeckObjects[i].cardScore == 10 ||
                      optionCardBoard[jk].wild ||
                      overPlay
                    ) {
                      optionCardBoard[jk].use();
                      cardInDeckObjects[i] = -1;
                    } else {
                      //reject battle card
                      defaultBattleCard(i);
                      error.play();
                    }
                  } else {
                    if (
                      cardInDeckObjects[i].cardScore >= 8 ||
                      optionCardBoard[jk].wild ||
                      overPlay
                    ) {
                      optionCardBoard[jk].use();
                      cardInDeckObjects[i] = -1;
                    } else {
                      //reject battle card
                      defaultBattleCard(i);
                      error.play();
                    }
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 32) {
                // add Two card
                if (optionCardBoard[jk] != 0) {
                  //same with add one ace resets card values
                  if (
                    cardInDeckObjects[i].cardScore < 10 ||
                    (playerCharacter == 4 && whoseTurn == 1) ||
                    (player2Character == 4 && whoseTurn == 2)
                  ) {
                    optionCardBoard[jk].use(cardInDeckObjects[i].cardScore);
                    //return battle card
                    defaultBattleCard(i);
                    cardInDeckObjects[i].cardScore =
                      optionCardBoard[jk].newScore;
                  } else {
                    //reject battle card
                    defaultBattleCard(i);
                    error.play();
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 33) {
                // subtract two card
                if (optionCardBoard[jk] != 0) {
                  //same with subtract two ace resets values
                  if (
                    cardInDeckObjects[i].cardScore > 1 ||
                    (playerCharacter == 4 && whoseTurn == 1) ||
                    (player2Character == 4 && whoseTurn == 2)
                  ) {
                    optionCardBoard[jk].use(cardInDeckObjects[i].cardScore);
                    //return battle card
                    defaultBattleCard(i);
                    cardInDeckObjects[i].cardScore =
                      optionCardBoard[jk].newScore;
                  } else {
                    //reject battle card
                    defaultBattleCard(i);
                    error.play();
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 34) {
                // more ocard more damage card
                if (optionCardBoard[jk] != 0) {
                  if (cardInDeckObjects[i].cardScore >= 7) {
                    optionCardBoard[jk].use();
                    cardInDeckObjects[i] = -1;
                    //attack cards play the animation while sending jk to the oCardAttackAnimation function which tells which option card board slot the animation should play over
                    oCardAttackAnimation(jk);
                  } else {
                    //reject battle card
                    defaultBattleCard(i);
                    error.play();
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 35) {
                //Quadruplicate Card
                if (optionCardBoard[jk] != 0) {
                  if (
                    cardInDeckObjects[i].cardScore == 1 ||
                    overPlay ||
                    optionCardBoard[jk].wild
                  ) {
                    //return battle card
                    defaultBattleCard(i);
                    optionCardBoard[jk].use(cardInDeckObjects[i].cardScore, i);
                  } else {
                    //reject battle card
                    defaultBattleCard(i);
                    error.play();
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 36) {
                //Need suit Card
                if (optionCardBoard[jk] != 0) {
                  if (cardInDeckObjects[i].suit == optionCardBoard[jk].suit) {
                    cardInDeckObjects[i] = -1;
                    optionCardBoard[jk].use(cardInDeckObjects[i].cardScore);
                    //attack cards play the animation while sending jk to the oCardAttackAnimation function which tells which option card board slot the animation should play over
                    oCardAttackAnimation(jk);
                  } else {
                    //reject battle card
                    defaultBattleCard(i);
                    error.play();
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 37) {
                //Two Poison Card
                if (optionCardBoard[jk] != 0) {
                  if (
                    cardInDeckObjects[i].cardScore == 2 ||
                    overPlay ||
                    optionCardBoard[jk].wild
                  ) {
                    cardInDeckObjects[i] = -1;
                    optionCardBoard[jk].use();
                    //attack cards play the animation while sending jk to the oCardAttackAnimation function which tells which option card board slot the animation should play over
                    oCardAttackAnimation(jk);
                  } else {
                    //reject battle card
                    defaultBattleCard(i);
                    error.play();
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 38) {
                //Free Guess Card
                if (optionCardBoard[jk] != 0) {
                  //queen needs a pair ace for this card other characters need 9 or 10. wild this card doesn't require any value
                  if (overPlay || optionCardBoard[jk].wild) {
                    optionCardBoard[jk].use();
                    cardInDeckObjects[i] = -1;
                  } else if (
                    (playerCharacter == 2 && whoseTurn == 1) ||
                    (player2Character == 2 && whoseTurn == 2)
                  ) {
                    if (cardInDeckObjects[i].cardScore == 1) {
                      if (optionCardBoard[jk].uses == 1) {
                        optionCardBoard[jk].use();
                        cardInDeckObjects[i] = -1;
                        optionCardBoard[jk].uses++;
                      }
                      if (optionCardBoard[jk].uses == 0) {
                        sparkle.play();
                        cardInDeckObjects[i] = -1;
                        optionCardBoard[jk].uses++;
                      }
                    } else {
                      //reject battle card
                      defaultBattleCard(i);
                      error.play();
                    }
                  } else if (
                    cardInDeckObjects[i].cardScore == 9 ||
                    cardInDeckObjects[i].cardScore == 10
                  ) {
                    cardInDeckObjects[i] = -1;
                    optionCardBoard[jk].use();
                  } else {
                    //reject battle card
                    defaultBattleCard(i);
                    error.play();
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 39) {
                //Pickpocket Card
                if (optionCardBoard[jk] != 0) {
                  if (cardInDeckObjects[i].cardScore >= 6) {
                    cardInDeckObjects[i] = -1;
                    optionCardBoard[jk].use();
                    //attack cards play the animation while sending jk to the oCardAttackAnimation function which tells which option card board slot the animation should play over
                    oCardAttackAnimation(jk);
                  } else {
                    //reject battle card
                    defaultBattleCard(i);
                    error.play();
                  }
                }
              }
              //jk marks which option card it a battle card is on top off. So by knowing what optionCardAppearArray[jk] equals can tell us which option card needs to be used.
              if (optionCardAppearArray[jk] == 40) {
                //Cure Debuffs Card
                if (optionCardBoard[jk] != 0) {
                  if (cardInDeckObjects[i].cardScore >= 6 || cardInDeckObjects[i].wild || overPlay) {
                    cardInDeckObjects[i] = -1;
                    optionCardBoard[jk].use();
                  } else {
                    //reject battle card
                    defaultBattleCard(i);
                    error.play();
                  }
                }
              }
              //remove option card if it is used
              if (optionCardBoard[jk] != null){
              if (optionCardBoard[jk].used) {
                optionCardBoard[jk] = 0;
                //clear image graphics for new option card
                optionCardGraphics[jk].clear();
                //if a option card is used and you are the joker replace that card.
                if (
                  (playerCharacter == 6 && whoseTurn == 1) ||
                  (player2Character == 6 && whoseTurn == 2)
                ) {
                      //Make the used card the last card in optionCardAppearArray order
                      optionCardAppearArray[jk] =
                        optionCardAppearArray[optionCardAppearArray.length - 1];
                      //Remove that optionCardAppearArray number
                      optionCardAppearArray.splice(optionCardAppearArray.length - 1, 1);
                      //remake that card
                      optionCardSetup();
                }
              }
            }
              //boss defeat splash message
              if (enemyDifficulty[enemyID - 1] > 8 && enemyHealth <= 0) {
                splashThing = new SplashMessage(1);
              }
            }
          }
        }
      }
    }
  }
}

function keyReleased() {
  keyOverlap = false;
}

function keyPressed() {
  //pressing escape button to quit screen
  if (keyCode == 27 && endGame == 0) {
    if (screen == 3) {
      endGame = 3;
    } else {
      endGame = 4;
    }
  }
  if (screen == 21) {
    if (keyCode == 32) {
      //secret unlock everything cheat code for pressing space on option screen
      characterUnlock = 7;
      makeCharacterCards();
      wildInGame = true;
      characterCardUnlock = [0, true, true, true, true, true, true];
      player1MaxHealth = 60;
      player2MaxHealth = 60;
      playerMaxHealth = 45;
      levelUnlock = 6;
      screen = 23;
      //store newly unlocked variables in local storage
      storeUnlocks();
    }
  }
  //score screen timer shenanagins
  if (screen == 7) {
    if (keyIsPressed) {
      //pressing enter goes back to scoreboard
      if (keyCode == 13) {
        timer[6] = -1;
      }
      //pressing space exits battle or goes to the next one in endlessmode
      if (keyCode == 32) {
        if (millis() > timer[6] + 7500 && timer[6] != -1) {
          if (!endlessSelect) {
            celebrate = [];
            celebrate2 = [];
            makeLevelSelectScreen();
            screen = 4;
            menuReset();
            guessMode = false;
            music("menu");
          }
          if (endlessSelect) {
            mainScore[1] = mainScore[0];
            if (playerHealth >= 0 && playerHealth != 1445) {
              //resets round score
              mainScore[2] = 0;
              numOfOCard = 0;
              numOfOCardDetractor = 0;
              //increases round
              endlessCount[0]++;
              endlessCount[1]++;
              //removes benefits for wild special and powercharge
              endlessKeep[0] = false;
              endlessKeep[1] = false;
              playerCharge = false;
              //heal 20 for getting a correct guess
              playerHealth += 20;
              //reset endlesscount[0] if over 11. endlesscount[0] is for the endlessroad display, endlesscount[1] is the actual tracker
              if (endlessCount[0] >= 11) {
                endlessCount[0] = 0;
              }
              //endless help button button creaters
              if (endlessCount[0] == 5 || endlessCount[0] == 10) {
                for (let ugh = 0; ugh < 4; ugh++) {
                  endlessOptions[ugh] = new EndlessHelp(200 + ugh * 300, ugh);
                }
              }
              //creates endless road
              for (let z = 0; z < 8; z++) {
                endlessChr[z] = new EndlessRoad(100 + 250 * z, endlessCount[0] - 2 + z);
              }
              //difficulty adjuster for endless mode
              if (endlessCount[1] > 15) {
                for (let diff = 0; diff < 4; diff++) {
                  enemyDifficulty[diff] -= 2;
                  if (enemyDifficulty[diff] < 0) {
                    enemyDifficulty[diff] = 0;
                  }
                }
                //different difficulty levels for endlessmode based on round number
              } else if (endlessCount[1] > 10) {
                enemyDifficulty = [4, 5, 4, 5];
              } else if (endlessCount[1] > 5) {
                enemyDifficulty = [2, 4, 2, 4];
              } else {
                enemyDifficulty = [0, 3, 0, 3];
              }
              //remove extra cards if any
              if (cardInDeckObjects.length >= 5) {
                cardInDeckObjects.splice(5, 6);
              }
              //screen 6 is the actual next enemy screen for endless mode
              screen = 6;
              //timer[4] is to move endless road
              timer[4] = round(millis());
              guessMode = false;
              celebrate = [];
              celebrate2 = [];
              crashSafe();
            }
            //playerHealth == 1445 means you ended your endless run either through exiting or not guessing the word
            if (playerHealth == 1445) {
              //if you made a leaderboard bring you to leaderboard else back to main menu
              if (leaderBoard[55]) {
                screen = 13;
                guessMode = false;
              } else if (!leaderBoard[55]) {
                screen = 9;
                guessMode = false;
              }
            }
          }
          //this is to stop any detectors based on the enmyhealth variable (the reason it is so high is if there is a bug which keeps this health it will be obvious (and funny))
          enemyHealth = 300;
          enemyDisplayHealth = 300;
        } else {
          //if you pressed space before reaching the final score screen it brings you to the final score screen
          timer[6] = -11000;
        }
      }
    }
  }
  //tutorial text arrow keys
  if (tutorial != 0 && oCardDetailsScreen[0] == 0) {
    if (keyCode == RIGHT_ARROW) {
      //progress text forward
      if (!tutorialNoArrow[1]) {
        tutorialText = tutorialText + 1;
      }
    }
    if (keyCode == LEFT_ARROW && oCardDetailsScreen[0] == 0) {
      if (!tutorialNoArrow[0]) {
        //progress text backwards
        tutorialText = tutorialText - 1;
      }
    }
  }
  //pressing space to close out of optionCardDetailsScreen
  if (oCardDetailsScreen[0] != 0) {
    if (keyCode == 32) {
      oCardDetailsScreen[0] = 0;
      optionCardGraphics[7].clear();
      if (tutorial == 1) {
        //during a specific part of the basic tutorial closing the optionCardDetailsScreen progresses text
        if (tutorialText == 9) {
          tutorialText = 10;
        }
      }
    }
  }
}
//#profit