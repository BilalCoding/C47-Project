var punchSprite;

function preload() {
  bckImg = loadImage("assets/bkg.png");
  player1Img = loadAnimation("assets/blue/stance1.png");
  player1Punch = loadAnimation("assets/blue/punch.png");
  player1Move = loadAnimation("assets/blue/stance1.png", "assets/blue/stance2.png");
  player1GetPunched = loadAnimation("assets/blue/getPunched.png");

  player2Img = loadAnimation("assets/red/stance1.png");
  player2Punch = loadAnimation("assets/red/punch.png");
  player2Move = loadAnimation("assets/red/stance1.png", "assets/red/stance2.png");
  player2GetPunched = loadAnimation("assets/red/getPunched.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  player1 = createSprite(width/4, height/1.5, 50, 100);
  player1.addAnimation("standing1", player1Img);
  player1.addAnimation("move1", player1Move);
  player1.addAnimation("punching1", player1Punch);
  player1.addAnimation("getPunched1", player1GetPunched);
  player1.changeAnimation("standing1");
  // player1.debug = true;
  player1.setCollider("rectangle", 30, 0, 120, 100);

  player2 = createSprite(width/1.5, height/1.5, 50, 100);
  player2.addAnimation("standing2", player2Img);
  player2.addAnimation("move2", player2Move);
  player2.addAnimation("punching2", player2Punch);
  player2.addAnimation("getPunched2" , player2GetPunched);
  // player2.debug = true;
  player2.setCollider("rectangle", -30, 0, 120, 100);

  // punchSprite = createSprite(player1.x+180, player1.y, 10, 100);
  
  isPunching1 = false;
  isPunching2 = false;
}

function draw() {
  background(bckImg);
  edges = createEdgeSprites();
  
  player1.collide(edges);
  player2.collide(edges);

  player1.scale = 2;
  player1.y = height/1.5;
  player1.velocityX = 0;

  player2.scale = 2;
  player2.y = height/1.5;
  player2.velocityX = 0;

  if(player1.isTouching(player2)){
    if(isPunching1 == true){
      player2.changeAnimation("getPunched2");
    }
  }
  else{
    player2.changeAnimation("standing2");
  }

  if(player2.isTouching(player1)){
    if(isPunching2 == true){
      player1.changeAnimation("getPunched1");
    }
  }
  else{
    player1.changeAnimation("standing1")
  }

  drawSprites();
}

function keyPressed(){
  // Player 1 controls
  if(keyCode == 65){
    player1.velocityX = -70;
    player1.changeAnimation("move1");
  }
  if(keyCode == 68){
    player1.velocityX = 70;
    player1.changeAnimation("move1");
    player1.scale = 1.5;
    player1.y -= 40;
  }
  if(keyCode == 83){
    player1.velocityX = 0;
    player1.changeAnimation("punching1");
    isPunching1 = true;
  }
  else{
    isPunching1 = false;
  }

  // Player 2 controls
  if(keyCode == LEFT_ARROW){
    player2.velocityX = -70;
    player2.changeAnimation("move2");
  }
  if(keyCode == RIGHT_ARROW){
    player2.velocityX = 70;
    player2.changeAnimation("move2");
    player2.scale = 1.5;
    player2.y -= 40;
  }
  if(keyCode == DOWN_ARROW){
    player2.velocityX = 0;
    player2.changeAnimation("punching2");
    isPunching2 = true;
  }
  else{
    isPunching2 = false;
  }
}

function keyReleased(){
  if(keyCode == 65 || keyCode == 68 || keyCode == 83){
    player1.changeAnimation("standing1")
  }
  if(keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW || keyCode == DOWN_ARROW){
    player2.changeAnimation("standing2");
  }
}