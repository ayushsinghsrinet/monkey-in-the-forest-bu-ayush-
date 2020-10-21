var monkey,moimg, mostop;

 var banana,baimg;

 var back,backimg,  bacimg2;
 
var ground;

var rockimg;

var gamestate="serve";

var start,startimg;

var restart,restartimg;

var score;

var bascore;
var banimg
var bn;
var jump;
var die;
var check;
function preload(){
  moimg=loadAnimation("Monkey_01 (2).png","Monkey_03.png","Monkey_04.png",
"Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  baimg=loadAnimation("banana.png");
  backimg=loadImage("jungle.jpg");
 
  mostop=loadAnimation("Monkey_01 (2).png");
  
  rockimg=loadAnimation("stone.png");
  
  startimg=loadImage("download (32).png");
  restartimg=loadImage("download (33).png");
  
  banimg=loadAnimation("banana.png");
  jump=loadSound('jump (1).mp3');
  die=loadSound('die (1).mp3');
  check=loadSound('checkPoint.mp3');
}      
function setup() {
  createCanvas(900, 500);
  
  back =createSprite(200,200,2,2);
back.addImage("bk", backimg);
 
 ground=createSprite(400,450,800,3);
  
  monkey=createSprite(170,350,20,20);
  monkey.addAnimation("mo",moimg);
  monkey.scale=0.34;
  
    start=createSprite(700,460,20,2);
      start.addImage("st",startimg)
  start.scale=0.7;
  start.lifetime=1000;
  
  bn=createSprite(800,50,3,3);
   bn.addAnimation("b", banimg);
  bn.scale=0.07;
  
   restart=createSprite(700,400.30,30);
  restart.addImage("restartimg",restartimg);
  restart.scale=0.3;
  restart.visible=false;
  rockgroup= new Group();
  bagroup=new Group();
  ground.visible=false;
  monkey.setCollider("rectangle",0,0,180,530);
  score=0;
   bascore=0;
}
function draw() {
  background(220);
if(monkey.isTouching(rockgroup)){
  die.play();
}
  
  rock();
  ba();
  drawSprites();
   textSize(30)
  fill("black")
  text(bascore,850,60);
  
    if(bagroup.isTouching(monkey)){
     bagroup.destroyEach();
     bascore=bascore+1;
   }
  
   if(gamestate==="serve"){
     monkey.addAnimation("mo",mostop);
  back.velocityX=-0;
   bagroup.destroyEach();
  if(back.x<400){
  back.x=back.width/2;
 }
  
  if(keyDown("space")&&monkey.collide(ground)){
   monkey.addAnimation("mo",mostop);
    monkey.velocityY=0;
  }
    if(keyWentUp("space")){
      monkey.addAnimation("mo",moimg);
    monkey.velocityY=0;
  }
   monkey.velocityY=monkey.velocityY+0.5;
  monkey.collide(ground);
   
   if(mousePressedOver(start)){ 
       monkey.addAnimation("mo",moimg);
     gamestate="play"
   }
 }
  monkey.depth=rockgroup.depth;
  monkey.depth=monkey.depth+1;
  
 if(gamestate==="play"){
   textSize(28)
   fill("black")
  text("Score:-"+score,50,50);
  score= score+Math.round(getFrameRate()/60);
  bagroup.setVelocityXEach(-6);
  rockgroup.setVelocityXEach(-8+score/500);  
  back.velocityX=-(3+score/500);
   restart.x=1000;
  if(back.x<400){
  back.x=back.width/2;
 }
  if(keyDown("space")&&monkey.collide(ground)){
   monkey.addAnimation("mo",mostop);
jump.play();
    monkey.velocityY=-13;
  }
    if(keyWentUp("space")){
      monkey.addAnimation("mo",moimg);
    monkey.velocityY=0;
  }
   monkey.velocityY=monkey.velocityY+0.5;
  monkey.collide(ground);
   start.visible=false;
   if(score%100===0){
     check.play();
     
   }
   if(monkey.isTouching(rockgroup)){
     gamestate="end";
   }
 }
    if(gamestate==="end"){
    rockgroup.destroyEach();
   bagroup.destroyEach();
   rockgroup.setVelocityXEach(0); 
   restart.x=700;
  back.velocityX=-0;
      bascore=0;
   monkey.addAnimation("mo",mostop);
  if(back.x<400){
  back.x=back.width/2;
   
 }
  if(keyDown("space")&&monkey.collide(ground)){
   monkey.addAnimation("mo",mostop);
 monkey.velocityY=-0;
    
  }
    if(keyWentUp("space")){
      monkey.addAnimation("mo",moimg);
    monkey.velocityY=0;
  }
   monkey.velocityY=monkey.velocityY+0.5;
  monkey.collide(ground);
      textSize(74)
      fill("yellow");
   text("Game Over",300,300);
   start.visible=false;
    restart.visible=true;
      if(mousePressedOver(restart)){
     rockgroup.destroyEach();
    score=0;
     monkey.addAnimation("mo",moimg);
    restart.visible=false;
     gamestate="play"
  
      
      }
    
  }

}

function rock(){
  if(frameCount % 150===0){
    var rock=createSprite(900,410,2,2);
    rock.addAnimation("rock",rockimg);
    //rock.velocityX=-8;
    rock.scale=0.4;
    rock.setCollider("rectangle",0,0,150,220);
    rock.lifetime=155;
    rockgroup.add(rock);
    
  }
}

function ba(){
  if(frameCount%200===0){
   banana=createSprite(800,200,22,2);
  banana.addAnimation("baimg",baimg);
    
  banana.scale=0.09;
   bagroup.setlifetime=154;
    banana.y=random(100,300);
    bagroup.add(banana);
    
}
}