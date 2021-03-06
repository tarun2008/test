var PLAY = 1;
var END = 0;
var gameState = PLAY;

var shinchan, shinchan_running, shinchan_collided;
var ground, invisibleGround, groundImage;

var gameState="start";
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  shinchan_running =   loadAnimation("Running 1.png","Running 2.png","Running 3.png","Running 4.png");
  //shinchan_collided = loadAnimation("shinchan_collided.png");
  
  city_background = loadImage("city.png");
 forest_background = loadImage("Forest.jpg");  
 desert_background = loadImage("desert.jpg");

  city_obstacle1 = loadImage("City1.png");
  city_obstacle2 = loadImage("City2.png");
  city_obstacle3 = loadImage("City3.png");
  city_obstacle4 = loadImage("City4.png");
  desert_obstacle1 = loadImage("desert obstacle.png");
  desert_obstacle2 = loadImage("Desert obstacle 2.png");
  forest_obstacle1 = loadImage("Forest obstacle.png");
  forest_obstacle2 = loadImage("Forest obstacle 2.png");
  
  gameOverImg = loadImage("game over.png");
  restartImg = loadImage("Restart.png");
}

function setup() {
  createCanvas(1450, 680);
  
  bg=createSprite(725,280);
  bg.addImage(city_background);
  bg.scale=3.5
  bg.velocityX=-4;

  shinchan = createSprite(370,680,20,50);
  
  shinchan.addAnimation("running", shinchan_running);
 // shinchan.addAnimation("collided", shinchan_collided);
  
  
  shinchan.setCollider("circle",0,0,40);
  shinchan.debug = false
  
  story=createSprite(displayWidth/2,displayHeight/2,50,50);
  playButton=createSprite(displayWidth-250,displayHeight-250,50,20);
  
 
  
 // gameOver = createSprite(300,100);
 // gameOver.addImage(gameOverImg);
  
  /*restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  */
  invisibleGround = createSprite(200,720,400,10);
  invisibleGround.visible = false;
  
 

 // obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //shinchan.debug = true;
  background("black");
  drawSprites();

  if(gameState==="start"){
   shinchan.visible=false;
   bg.visible=false;
   

    if(mousePressedOver(playButton)){
      gameState="play";

    }
  }
   else if(gameState==="play"){
    
     shinchan.visible = true;
     bg.visible=true;
     story.visible=false;
     playButton.visible=false;
     if(bg.x<0){
       bg.x=700;
     }
     cityObstacles();
     if(keyDown("space")&&shinchan.y>670){
       shinchan.velocityY=-10;

     }
     shinchan.velocityY=shinchan.velocityY+0.3;
     shinchan.collide(invisibleGround)
   }
  
  
}



function cityObstacles() {
  if(frameCount % 160 === 0) {
    var obstacle = createSprite(1600,630,10,40);
        obstacle.velocityX = -6   
    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(city_obstacle1);
      obstacle.scale=0.5;
      obstacle.y=610;
              break;
      case 2: obstacle.addImage(city_obstacle2);
      obstacle.scale=0.7
              break;
      case 3: obstacle.addImage(city_obstacle3);
      obstacle.scale=0.8
              break;
      case 4: obstacle.addImage(city_obstacle4);
      obstacle.scale=0.7
              break;      
      default: break;
    }
     }
}
function forestObstacles() {
  if(frameCount % 160 === 0) {
    var obstacle = createSprite(1600,630,10,40);
        obstacle.velocityX = -6
      
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(forest_obstacle1);     
              break;
      case 2: obstacle.addImage(forest_obstacle2);      
              break;                  
      default: break;
    }
     }
}
function desertObstacles() {
  if(frameCount % 160 === 0) {
    var obstacle = createSprite(1600,630,10,40);
        obstacle.velocityX = -6
      
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(desert_obstacle1);     
              break;
      case 2: obstacle.addImage(desert_obstacle2);      
              break;                  
      default: break;
    }
     }
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  shinchan.changeAnimation("running",shinchan_running);
  
  
  score = 0;
  
}
