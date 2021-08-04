var ball,ball_running,balll;
var groundGroup,bGroundGroup,coinGroup;
var coin,coinImg;
var score;
var ground,groundImg,bGround,bGroundImg;
var iClimber,iClimberGroup;
var gameState="play";
var sound,sound1

function preload()
{
  
  balll=loadImage("Red-Ball-collided.png")
  ball_running=loadAnimation("Red-Ball.png","Red-Ball3.png","Red-Ball4.png","Red-Ball5.png")
  groundImg=loadImage("ground_grass.png")
  bGroundImg=loadImage("ground_grass_broken.png")
  coinImg=loadImage("coin.png") 
  sound=loadSound("coin.wav")
  sound1=loadSound("crash.wav")  
}

function setup() 
{
 createCanvas(windowWidth,windowHeight)
  
    ball=createSprite(width/4,20)
    ball.addAnimation("running",ball_running)
    ball.scale=0.015
  
     score=0
  
    iClimberGroup=new Group();
    groundGroup=new Group();
    bGroundGroup=new Group();
    coinGroup=new Group();
  
}

function draw() 
{
 background(20,180,255)
  
  if(gameState==="play")
{   
    
    if(keyDown("right_arrow"))
      {
            ball.x=ball.x+3
      }

    if(keyDown("left_arrow"))
      {
            ball.x=ball.x-3
      } 
  
    if(keyDown("up_arrow") && ball.y>=70)
      {
           ball.velocityY=-3
      }
           ball.velocityY=ball.velocityY+0.08

    if(coinGroup.isTouching(ball))
      {
          coinGroup.destroyEach();
          score=score+2;
        sound.play()
      }
  
    if(groundGroup.isTouching(ball))
      {
      ball.velocitY=0
      ball.collide(groundGroup)
      }
  
    if(bGroundGroup.isTouching(ball))
      {
      score=score-2;
      ball.collide(bGroundGroup)
      }
  
  spawnCoin();
  spawnBground();
  spawnGround();
    
    if(iClimberGroup.isTouching(ball) || ball.y>height+50 ||        ball.y<=-20 || score<=-100)
      {
        sound1.play()
        gameState="end"
        
      }
    
  drawSprites();
    
}
  
if(gameState==="end")
    {
      fill("white")
      textSize(70)
      text("GameOver",width/4,height/2)
    }
  
//score
  stroke("white")
  textSize(20)
  fill("white")
  text("score: "+score,width-100,30)
}

//create function 
function spawnGround()
{
  if(frameCount%150===0)
    {
      ground=createSprite(200,0,50,10)
      ground.addImage(groundImg)
      ground.scale=0.3
      ground.velocityY=2
      ground.x=Math.round(random(50,width))
      
       iClimber=createSprite(200,0,50,10)
       iClimber.velocityY=3
       iClimber.x=ground.x
      
      iClimber.visible=false
      
      groundGroup.add(ground)
      iClimberGroup.add(iClimber)
    }
  
}

function spawnBground()
{
  if(frameCount%200===0)
     {
       bGround=createSprite(200,50)
      bGround.addImage(bGroundImg)
      bGround.scale=0.3
      bGround.velocityY=3
      bGround.x=Math.round(random(100,600))
       
       iClimber=createSprite(200,60,70,10)
       iClimber.velocityY=3
       iClimber.x=bGround.x
       
       iClimber.visible=false
       
       iClimberGroup.add(iClimber)
       bGroundGroup.add(bGround)
     }
  
}

function spawnCoin()
{
  if(frameCount%100===0)
    {
      coin=createSprite(250,50)
      coin.addImage(coinImg)
      coin.scale=0.5
      coin.x=Math.round(random(50,width))
      coin.y=Math.round(random(20,height-50)) 
      
      coinGroup.add(coin)
    }
}