 var trex,image1,ground,ground1,invisibleground,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstacle,cloud,cloud1,cactusGroup,cloudsGroup,count,PLAY,END,gameState,gameover,restart,restart1,gameover1,trex1


function preload(){
image1=loadAnimation("trex1.png","trex3.png","trex4.png") 
ground1=loadImage("ground2.png")
obstacle1=loadImage("obstacle1.png")
obstacle2=loadImage("obstacle2.png")
obstacle3=loadImage("obstacle3.png")
obstacle4=loadImage("obstacle4.png")
obstacle5=loadImage("obstacle5.png")
obstacle6=loadImage("obstacle6.png")
cloud=loadImage("cloud.png")
restart1=loadImage("restart.png")
gameover1=loadImage("gameOver.png")
trex1=loadAnimation("trex_collided.png")
}

function setup() {
  createCanvas(600, 300);
  trex=createSprite(70,280,20,20);
 PLAY=1
  END=0;
  gameState=PLAY
  gameover=createSprite(300,150)
restart=createSprite(300,170)
restart.addImage(restart1)
gameover.addImage(gameover1)
gameover.scale=0.5
restart.scale=0.5;
gameover.visible=false;
restart.visible=false;
   
  cloudsGroup=new Group();
  cactusGroup=new Group();
  count=0
  trex.addAnimation("trexrunning",image1)
  trex.addAnimation("trexcollide",trex1)
  trex.scale=0.5;
  //creating a ground sprite
  ground=createSprite(300,290,600,20);
  ground.x = ground.width /2;
  ground.addImage("groundimage",ground1);
  //creating the invisible ground
  invisibleground=createSprite(300,295,600,10)
  invisibleground.visible=false;
}

function draw() {
  background(180);
 
  if(gameState === PLAY){
  if(keyDown("space") && trex.y>= 266){
  trex.velocityY=-12;
  }
  count=count+Math.round(getFrameRate()/60)
  
text("Score "+count,500,120)

trex.velocityY=trex.velocityY+0.8;
trex.collide(invisibleground);
ground.velocityX=-3;
if(ground.x<0){
ground.x=ground.width/2
}
 spawnCactus() ;
  spawnClouds();

 
  
 if(cactusGroup.isTouching(trex)){
  gameState=END;
   trex.changeAnimation("trexcollide",trex1)
   
  
  }
  }
else if(gameState===END){

ground.velocityX=0;
trex.velocityY=0;
  

  cactusGroup.setVelocityXEach(0)
cloudsGroup.setVelocityXEach(0)
cactusGroup.setLifetimeEach(-1);
 cloudsGroup.setLifetimeEach(-1);
  gameover.visible=true
restart.visible=true
  count=0
  

}
if(mousePressedOver(restart)){
reset();
  
}
 

 drawSprites();
}
  

function spawnClouds(){
if(frameCount % 120===0 ){
cloud1 = createSprite(600,190,20,30);
cloud1.velocityX=-2;
cloud1.addImage(cloud);
  cloud.scale=0.2;
cloud1.y=random(120,200); 
cloud1.depth=trex.depth
trex.depth=trex.depth+1
cloudsGroup.add(cloud1)
}
}
function spawnCactus(){
if(frameCount % 60 === 0) {
     obstacle = createSprite(600,270,10,40);
    obstacle.velocityX=-3;
   cactusGroup.add(obstacle);
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: 
      obstacle.addImage(obstacle1)
      break;
      
      case 2: 
      obstacle.addImage(obstacle2)
      break;
      
      case 3: 
      obstacle.addImage(obstacle3)
      break;
      
      case 4: 
      obstacle.addImage(obstacle4)
      break;
      
      case 5: 
      obstacle.addImage(obstacle5)
      break;
      
      case 6: 
      obstacle.addImage(obstacle6)
      break;
      default:
      break;
    }
        
    obstacle.scale = 0.5;
    obstacle.lifetime = 200   ;
  

  }

}

function reset(){
gameState=PLAY;
gameover.visible=false;
restart.visible=false;
cactusGroup.destroyEach()
cloudsGroup.destroyEach()
trex.changeAnimation("trexrunning",image1)


}
