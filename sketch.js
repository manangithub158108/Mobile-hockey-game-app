function preload(){
  boardImg = loadImage('board.png');
  playerJockeyImg = loadImage('playerJockey.png');
  opponentJockeyImg = loadImage('opponentJockey.png');
  jockeyBallImg = loadImage('jockeyBall.png');
  hitSound = loadSound('hitSound.mp3');
}

function setup(){
  createCanvas(330, 570);

  layout = createSprite(width/2, height/2, width, height);
  layout.addImage(boardImg);
  layout.scale = 0.39;

  opponentGoal = createSprite(width/2 - 5, 20, 100, 50);
  opponentGoal.visible = false;
  playerGoal = createSprite(width/2 - 5, 580, 100, 50);
  playerGoal.visible = false;

  playerJockey = createSprite(width/2, 490, 10, 10);
  playerJockey.addImage(playerJockeyImg);
  playerJockey.scale = 0.3;
  playerJockey.setCollider('circle', 0, 0, 100);

  jockeyBall = createSprite(width/2 - 7, height/2 - 2, 10, 10);
  jockeyBall.addImage(jockeyBallImg);
  jockeyBall.scale = 0.356;
  jockeyBall.setVelocity(random(10, 15), random(10, 15));
  jockeyBall.setCollider('circle', 0, 0, 50);

  opponentJockey = createSprite(width/2, 110, 10, 10);
  opponentJockey.addImage(opponentJockeyImg);
  opponentJockey.scale = 0.3;
  opponentJockey.setCollider('circle', 0, 0, 100);

  gameState = 1;

  playerScore = 0;
  opponentScore = 0;

}

function draw(){
  background(0);

  playerJockey.x = mouseX;
  playerJockey.y = mouseY;

  edges = createEdgeSprites();
  jockeyBall.bounceOff(edges[0]);
  jockeyBall.bounceOff(edges[1]);
  jockeyBall.bounceOff(edges[2]);
  jockeyBall.bounceOff(edges[3]);

  jockeyBall.bounceOff(playerJockey);
  jockeyBall.bounceOff(opponentJockey);

  opponentJockey.x = jockeyBall.x;

  if(jockeyBall.isTouching(playerJockey)){
    hitSound.play();
  }

  if(jockeyBall.isTouching(opponentJockey)){
    hitSound.play();
  }

  if(gameState === 1 && mousePressedOver(layout)){
    gameState = 2
  }

  drawSprites();

  if(gameState === 1){
    textSize(20);
    textFont('Georgia');
    fill('darkBlue');
    text('! Welcome to the Classic Hockey !', 12.5, height/2 - 100); 
  }

  if(gameState === 2){
    textSize(30);
    textFont('Ayuthaya');
    fill('darkBlue');
    text(playerScore, 35, height/2 - 10); 

    textSize(30);
    textFont('Ayuthaya');
    fill('darkBlue');
    text(opponentScore, 295, height/2 - 10); 

    if(jockeyBall.isTouching(playerGoal)){
      opponentScore = opponentScore + 1;
    }

    if(jockeyBall.isTouching(opponentGoal)){
      playerScore = playerScore + 1;
    }

    if(opponentScore === 25 || playerScore === 25){
      gameState = 3;
    }
  }

  if(gameState === 3){
    textSize(20);
    textFont('Georgia');
    fill('darkBlue');
    text('Thanks for playing !!', width/2 - 90, height/2 - 100); 

    playerJockey.destroy();
    jockeyBall.destroy();
    opponentJockey.destroy();
  }
  

}