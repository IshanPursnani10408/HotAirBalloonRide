var balloon;
var BackgroundImg;
var balloon,balloonImg1,balloonImg2,balloonImg3;
var database;
var position;

function preload(){
  BackgroundImg = loadImage("cityImage.png");
  balloonImg= loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png");
}

function setup() {
  createCanvas(1000,500);

  database= firebase.database();
  console.log(database);

 balloon= createSprite(250, 300, 50, 50);
 balloon.addAnimation("hotairballoon1.png",balloonImg); 
 balloon.scale=0.5;

 var balloonPosition = database.ref('balloon/position');
 balloonPosition.on("value",readPosition,showError)
}


function draw() {
  background(BackgroundImg);


 if(keyDown(LEFT_ARROW)){
    if(balloon.x>100){
      updatePosition(-10,0)
      balloon.x=balloon.x-10
    }
  }

  if(keyDown(RIGHT_ARROW)){
    if(balloon.x<900){
      updatePosition(+10,0)
      balloon.x=balloon.x+10
    }
  }
 
  if(keyDown(UP_ARROW)){
    if(balloon.y>150){
      updatePosition(0,-10)
      balloon.y=balloon.y-10
      balloon.scale=balloon.scale-0.05
    }
  }  
  if(keyDown(DOWN_ARROW)){
    if(balloon.y<350){
      updatePosition(0,+10)
      balloon.y=balloon.y+10
      balloon.scale=balloon.scale+0.05
    }
  }

  drawSprites();
  strokeWeight(2);
  stroke("lightgreen");
  fill("blue");
  textSize(20);
  text("Use the arrow keys to move the Hot Air Balloon", 30, 30);

}

function updatePosition(x,y){
database.ref('balloon/position').set({
  'x': balloon.x + x,
  'y': balloon.y + y
})

}

function readPosition(data){
  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;
}

function showError(){
console.log("Error in writing to the database");
}
