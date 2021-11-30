var ball,balloonImage1,balloonImage2;
var database;
var position;

function preload(){
   bg =loadImage("Images/cityImage.png");
   ballImage1=loadAnimation("Images/HotAirBallon-01.png");
   ballImage2=loadAnimation("Images/HotAirBallon-01.png","Images/HotAirBallon-01.png",
   "Images/HotAirBallon-01.png","Images/HotAirBallon-02.png","Images/HotAirBallon-02.png",
   "Images/HotAirBallon-02.png","Images/HotAirBallon-03.png","Images/HotAirBallon-03.png","Images/HotAirBallon-03.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  ball=createSprite(250,650,150,150);
  ball.addAnimation("hotAirball",balloonImage1);
  ball.scale=0.5;

  var ballposition=database.ref('balloon/position');
  ball.on("value",readposition , showError);
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateposition (-10,0);
    ball.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateposition (10,0);
    ball.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    updateposition (0,-10);
    ball.addAnimation("hotAirBalloon",balloonImage2);
    ball.scale=ball.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateposition (0,+10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale+0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}


function updateposition (x,y){
  database.ref('ball/position ').set({
    'x': position .x + x ,
    'y': position .y + y
  })
}

function readposition (data){
  position  = data.val();
  console.log(position .x);
  ball.x = position.x;
  ball.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}

