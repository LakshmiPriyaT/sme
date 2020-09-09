var player1, database;
var position,position2;
var player2;
var p1animation,p2animation;

function preload(){
    p1animation =loadAnimation("assests/player1a.png","assests/player1b.png","assests/player1a.png");
    p2animation =loadAnimation("assests/player2a.png","assests/player2b.png","assests/player2a.png");
}

function setup(){
  database = firebase.database();
  //console.log(database);
  createCanvas(600,600);

  player1 = createSprite(100,250,10,10);
  player1.shapeColor = "red";
  player1.addAnimation("walking",p1animation);
  p1animation.frameDelay = 200
  player1.scale = 0.5
  
  var player1Position = database.ref('player1/position');
  player1Position.on("value", readPosition, showError);

  player2 = createSprite(400,250,10,10);
  player2.shapeColor = "green";
  player2.addAnimation("walkin2",p2animation);
  p2animation.frameDelay = 200
  player2.scale = -0.5

  var player2Position = database.ref('player2/position');
  player2Position.on("value", readPosition2, showError);
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-5,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(5,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-5);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+5);
    }

    if(keyDown("a")){
      writePosition2(-5,0);
    }
    else if(keyDown("s")){
      writePosition2(5,0);
    }
    else if(keyDown("w")){
      writePosition2(0,-5);
    }
    else if(keyDown("d")){
      writePosition2(0,+5);
    }

    drawline();
    drawline1();
    drawline2();

    drawSprites();
  
}

function writePosition(x,y){
  database.ref('player1/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function writePosition2(x,y){
  database.ref('player2/position').set({
    'x': position2.x + x ,
    'y': position2.y + y
  })
}

function readPosition(data){
  position = data.val();
  //console.log(position.x);
  player1.x = position.x;
  player1.y = position.y;
}

function readPosition2(data){
  position2 = data.val();
  //console.log(position2.x);
  player2.x = position2.x;
  player2.y = position2.y;
}

function showError(){
  console.log("Error in writing to the database");
}

function drawline(){
  for(var i = 0; i<600; i=i+20){
    line (300,i,300,i+10)
  }
}

function drawline1(){
  for(var i = 0; i<600; i=i+20){
    stroke("green");
    strokeWeight(4)
    line (100,i,100,i+10)
  }
}

function drawline2(){
  for(var i = 0; i<600; i=i+20){
    stroke("red");
    strokeWeight(4);
    line (500,i,500,i+10)
  }
}
