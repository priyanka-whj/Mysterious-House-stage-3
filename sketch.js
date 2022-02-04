var canvasTop, canvasRight, canvasBottom, canvasLeft;
var pathWay, closePathDoor;;

var room1WallLeft,  room1WallTop, room1WallRight1, room1WallRight2 ;
var room2WallTop, room2WallRight;

var door1, closeDoor1;
var door2, closeDorr2;

var spy, spyImage;

var monsterForRoom1;
var monster1ForRoom2,monster2ForRoom2;
var monsterImg;

var playerLife = 3;
var playerScore = 0;

function preload()
{
  spyImage = loadImage("images/spy1.jpg");
  monsterImg = loadImage("images/monster1.jpg");
}

function setup()
{
  createCanvas(1500,700);

  canvasTop = createSprite(750,5,1500,10);
  canvasTop.shapeColor = "red";

  canvasRight = createSprite(1495,350,10,700);
  canvasRight.shapeColor = "red";

  canvasBottom = createSprite(750,695,1500,10);
  canvasBottom.shapeColor = "red";

  canvasLeft = createSprite(5,350,10,700);
  canvasLeft.shapeColor = "red";

  spy = createSprite(50, 650, 30, 70);
  spy.addImage(spyImage);
  spy.scale = 0.02;

  pathWay = createSprite(80,600,140,5);
  pathWay.shapeColor = "green";

  room1WallLeft = createSprite(150,450,5,300);
  room1WallLeft.shapeColor = "green";

  room1WallTop = createSprite(300,300,300,5);
  room1WallTop.shapeColor = "green";
  
  room1WallRight1 = createSprite(450,360,5,120);
  room1WallRight1.shapeColor = "green";

  room1WallRight2 = createSprite(450,605,5,170);
  room1WallRight2.shapeColor = "green";
  
  door1 = createSprite(450,470,10,100);
  door1.shapeColor = "yellow";

  monsterForRoom1 = createSprite(190, 330, 20, 20);
  monsterForRoom1.addImage(monsterImg);
  monsterForRoom1.scale = 0.2;
  monsterForRoom1.velocityX = 2;
  monsterForRoom1.velocityY = 2;

  room2WallTop = createSprite(600,300,300,5);
  room2WallTop.shapeColor = "green";

  room2WallRight = createSprite(750,445,5,290);
  room2WallRight.shapeColor = "green";

  door2 = createSprite(750,640,10,100);
  door2.shapeColor = "yellow";

  monster1ForRoom2 = createSprite(500, 400, 20, 20);
  monster1ForRoom2.addImage(monsterImg);
  monster1ForRoom2.scale = 0.2;
  monster1ForRoom2.velocityX = 3;
  monster1ForRoom2.velocityY = -2;

  monster2ForRoom2 = createSprite(600, 550, 20, 20);
  monster2ForRoom2.addImage(monsterImg);
  monster2ForRoom2.scale = 0.2;
  monster2ForRoom2.velocityX = -2;
  monster2ForRoom2.velocityY = 2;
}

function draw()
{
  background("white");

  textSize(25);
  fill("red");
  text("Player Life: " + playerLife, 100, 70);
  text("Score: " + playerScore, 100, 100);

  if(playerLife !== 0)
  {
    if(keyDown("up"))
    {
      spy.y = spy.y - 3;
    }
  
    if(keyDown("down"))
    {
      spy.y = spy.y + 3;
    }
    if(keyDown("left"))
    {
      spy.x = spy.x - 3;
    }
  
    if(keyDown("right"))
    {
      spy.x = spy.x + 3;
    }
  }

  spy.bounceOff(canvasTop);
  spy.bounceOff(canvasRight);
  spy.bounceOff(canvasBottom);
  spy.bounceOff(canvasLeft);

  spy.bounceOff(pathWay);
  spy.bounceOff(room1WallLeft);
  spy.bounceOff(room1WallTop);
  spy.bounceOff(room1WallRight1);
  spy.bounceOff(room1WallRight2);
  spy.bounceOff(room2WallTop);
  spy.bounceOff(room2WallRight);

  monsterForRoom1.bounceOff(room1WallLeft);
  monsterForRoom1.bounceOff(room1WallTop);
  monsterForRoom1.bounceOff(room1WallRight1);
  monsterForRoom1.bounceOff(room1WallRight2);
  monsterForRoom1.bounceOff(canvasBottom);
  monsterForRoom1.bounceOff(door1);

  monster1ForRoom2.bounceOff(room2WallTop);
  monster1ForRoom2.bounceOff(room2WallRight);
  monster1ForRoom2.bounceOff(room1WallRight1);
  monster1ForRoom2.bounceOff(room1WallRight2);
  monster1ForRoom2.bounceOff(canvasBottom);
  monster1ForRoom2.bounceOff(door1);
  monster1ForRoom2.bounceOff(door2);

  monster2ForRoom2.bounceOff(room2WallTop);
  monster2ForRoom2.bounceOff(room2WallRight);
  monster2ForRoom2.bounceOff(room1WallRight1);
  monster2ForRoom2.bounceOff(room1WallRight2);
  monster2ForRoom2.bounceOff(canvasBottom);
  monster2ForRoom2.bounceOff(door1);
  monster2ForRoom2.bounceOff(door2);

  if(spy.x > 150) //Spy is inside room1 now
  {
    closePathDoor = createSprite(150, 645, 5, 95);
    closePathDoor.shapeColor = "brown";
    spy.bounceOff(closePathDoor);
    monsterForRoom1.bounceOff(closePathDoor);

    if(spy.isTouching(monsterForRoom1))
    {
      playerLife = playerLife - 1;
      spy.x = 200;
      spy.y = 350;
    }
  }

  if(spy.isTouching(door1))
  {
    door1.destroy();
    playerScore = playerScore + 50;
  }

  if(spy.x > 450) //Spy is inside Room2 now
  {
    closeDoor1 = createSprite(450,470,10,100);
    closeDoor1.shapeColor = "yellow";
    spy.bounceOff(closeDoor1);
    monsterForRoom1.bounceOff(closeDoor1);
    monster1ForRoom2.bounceOff(closeDoor1);
    monster2ForRoom2.bounceOff(closeDoor1);

    if(spy.isTouching(monster1ForRoom2) || spy.isTouching(monster2ForRoom2))
    {
      playerLife = playerLife - 1;
      spy.x = 500;
      spy.y = 350;
    }
  }

  if(spy.isTouching(door2))
  {
    door2.destroy();
    playerScore = playerScore + 100;
  }

  if(spy.x > 750)
  {
    closeDoor2 = createSprite(750,640,10,100);
    closeDoor2.shapeColor = "yellow";
    spy.bounceOff(closeDoor2);
    monster1ForRoom2.bounceOff(closeDoor2);
    monster2ForRoom2.bounceOff(closeDoor2);
  }

  if(playerLife === 0)
  {
    textSize(80);
    fill("black");
    text("GAME OVER", 550, 200);
    monsterForRoom1.destroy();
    monster1ForRoom2.destroy();
    monster2ForRoom2.destroy();
  }

  if(spy.x > 750)
  {
    textSize(70);
    fill("black");
    text("Well Done!!!", 550, 180);
    text("You Escaped", 530, 250);
    monsterForRoom1.destroy();
    monster1ForRoom2.destroy();
    monster2ForRoom2.destroy();
  }

  drawSprites();

}