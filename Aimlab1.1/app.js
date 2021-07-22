//---------------------------------------------------------------------Init grid---------------------------------------------------------------------
var c;

const RADIUS = 40;

var mode = 0;

var addX = [getRandom(-6,6)*100,getRandom(-6,6)*100,getRandom(-6,6)*100];
var addY = [getRandom(-4,4)*95,getRandom(-4,4)*95,getRandom(-4,4)*95];
initialOverlapAndLinked();
var point = 0;

var oldAddX;
var oldAddY;
//timer setup
var myVar;
//canvas
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var x = canvas.width/2;
var y = canvas.height/2;

var gridAnimationReq = true;

var background = new Image();
background.src = "images/bgf.png";



//---------------------------------------------------------------------Init motion---------------------------------------------------------------------
var health=2;

var speedX=getRandom(3,5);
var drX =getRandom(0,1);

var speedY=getRandom(1,2);
var drY =getRandom(0,1);

var motionAnimationReq = true;

var ballCenterX=x;
var ballCenterY=y;

var ballDisplacementX = 0;
var ballDisplacementY = 0;

var firstTime;

//---------------------------------------------------------------------FUNCTION---------------------------------------------------------------------
//get Random integer
function getRandom(min,max) {
  return Math.floor(min + (Math.random()*(max - min)));
}
//check hit the ball or not
function hitBox(idItem) {
  if ((x-((canvas.width/2)-addX[idItem]))*(x-((canvas.width/2)-addX[idItem])) + (y-((canvas.height/2)-addY[idItem]))*(y-((canvas.height/2)-addY[idItem])) <= RADIUS*RADIUS) {
    return 1;
  }
  return 0;
}

//Overlap check
function checkOverlap(item1,item2) {
  if(((addX[item1] - addX[item2] < 2*RADIUS) && (addX[item1] - addX[item2] > -2*RADIUS))
    &&((addY[item1] - addY[item2] < 2*RADIUS) && (addY[item1] - addY[item2] > -2*RADIUS))){
    return 1;
  }
  return 0;
}

//Initial overlap check
function initialOverlapAndLinked() {
  while(checkOverlap(0,1) || checkOverlap(0,2) || checkOverlap(1,2) || linkedObject(0,1) || linkedObject(0,2) || linkedObject(1,2)) {
    for (var i = addX.length - 1; i >= 0; i--) {
      addX[i] = getRandom(-6,6)*100;
      addY[i] = getRandom(-4,4)*95;
    }
  }
}

//Timer
function myTimer() { 
  if (c>0) {
    c--;
  }
  if(c==0){
    document.exitPointerLock();
    document.exitFullScreen();
    clearInterval(myVar);
    x = canvas.width/2;
    y = canvas.height/2;
    if (mode == 1) {
      canvas.removeEventListener("click",gridshotEngine);
    }else if (mode == 2) {} {
      canvas.removeEventListener("click",motionshotEngine);
    }
    motionAnimationReq = false;
    gridAnimationReq = false;
  }
}

//Make it grid
function linkedObject(item1,item2) {
  if (((addX[item1] - addX[item2] > 8*RADIUS) || (addX[item1] - addX[item2] < -8*RADIUS))
    ||((addY[item1] - addY[item2] > 8*RADIUS) || (addY[item1] - addY[item2] < -8*RADIUS))) {
    return 1;
  }
  return 0;
}
//convert deg to Rad
function degToRad(degrees) {
  var result = Math.PI / 180 * degrees;
  return result;
}





//---------------------------------------------------------------------------GRID---------------------------------------------------------------------------
function canvasGridshotDrawing() {
  //canvas

  ctx.drawImage(background,x-(canvas.width),y-(canvas.height),canvas.width*2,canvas.height*2);   


  //3 object 
  ctx.beginPath();
  ctx.fillStyle = "rgba(96,249,249,255)";
  ctx.strokeStyle = "black";
  ctx.arc(x + addX[0], y + addY[0],RADIUS,0,degToRad(360),true);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x + addX[1], y + addY[1],RADIUS,0,degToRad(360),true);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x + addX[2], y + addY[2],RADIUS,0,degToRad(360),true);
  ctx.fill();

  crosshairDesign();  
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.strokeText("Point : " + point,150,20);

  ctx.strokeText("Time : " + c,320,20);

  if (gridAnimationReq) {
    window.requestAnimationFrame(canvasGridshotDrawing);
  }
}
function gridshotEngine() {
  if (hitBox(0)) {
    point += 300;
    oldAddX = addX[0];
    oldAddY = addY[0];
    do{
      addX[0] = getRandom(-6,6)*100;
      addY[0] = getRandom(-4,4)*95;
    }while(checkOverlap(0,1) || checkOverlap(0,2) || linkedObject(0,1) || linkedObject(0,2) || (((addX[0] - oldAddX) == 0) && ((addY[0] - oldAddY) == 0)));
  }
  if (hitBox(1)) {
    point += 300;
    oldAddX = addX[1];
    oldAddY = addY[1];
    do{
      addX[1] = getRandom(-6,6)*100;
      addY[1] = getRandom(-4,4)*95;
    }while(checkOverlap(1,2) || checkOverlap(1,0) || linkedObject(2,1) || linkedObject(1,0) || (((addX[1] - oldAddX) == 0) && ((addY[1] - oldAddY) == 0)));
  }
  if (hitBox(2)) {
    point += 300;
    oldAddX = addX[2];
    oldAddY = addY[2];
    do{
      addX[2] = getRandom(-6,6)*100;
      addY[2] = getRandom(-4,4)*95;
    }while(checkOverlap(2,0) || checkOverlap(2,1) || linkedObject(2,1) || linkedObject(0,2) || (((addX[2] - oldAddX) == 0) && ((addY[2] - oldAddY) == 0)));
  }
  if (point>=100) {
    point-=100;
  }
}


//---------------------------------------------------------------------------MOTION---------------------------------------------------------------------------
function canvasMotionshotDrawing() {
  //canvas
  // ctx.fillStyle = "black";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background,x-(canvas.width),y-(canvas.height),canvas.width*2,canvas.height*2); 
  if (ballDisplacementX >= canvas.width/2) {
    ballDisplacementX -= speedX;
    drX =0;
  }
  if (ballDisplacementX <= -canvas.width/2) {
    ballDisplacementX += speedX;
    drX =1;
  }
  if ((ballDisplacementX < canvas.width/2) && (ballDisplacementX > -canvas.width/2)) {
    if(drX == 1) {
      ballDisplacementX += speedX;
    }else {
      ballDisplacementX -= speedX;
    }
  }

  if (ballDisplacementY >= canvas.height/2) {
    ballDisplacementY -= speedY;
    drY =0;
  }
  if (ballDisplacementY <= -canvas.height/2) {
    ballDisplacementY += speedY;
    drY =1;
  }
  if ((ballDisplacementY < canvas.height/2) && (ballDisplacementY > -canvas.height/2)) {
    if(drY == 1) {
      ballDisplacementY += speedY;
    }else {
      ballDisplacementY -= speedY;
    }
  }

  ballCenterX = x + ballDisplacementX;
  ballCenterY = y + ballDisplacementY;
  

  ctx.beginPath();
  ctx.fillStyle = "rgba(65,125,247,255)";
  ctx.strokeStyle = "black";
  ctx.arc(ballCenterX, ballCenterY,RADIUS,0,degToRad(360),true);
  ctx.fill();
  
  //health bar

  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.lineWidth = " 5"
  ctx.moveTo(ballCenterX-40,ballCenterY-60);
  if (health == 2) {
    ctx.lineTo(ballCenterX+40,ballCenterY-60);
  }else {
    ctx.lineTo(ballCenterX+0,ballCenterY-60);
  }
  ctx.stroke();

  // ctx.beginPath();
  // ctx.arc(x , y ,RADIUS,0,degToRad(360),true);
  // ctx.fill();

  crosshairDesign();  
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.strokeText("Point : " + point,150,20);

  ctx.strokeText("Time : " + c,320,20);

  if (motionAnimationReq) {
    window.requestAnimationFrame(canvasMotionshotDrawing);
  }

}

function motionshotEngine() {
  if(((canvas.width/2)-ballCenterX) * ((canvas.width/2)-ballCenterX) + ((canvas.height/2)-ballCenterY) * ((canvas.height/2)-ballCenterY) <= RADIUS*RADIUS ) {
    health--;
    if(health == 0) {
      point += 900;
      health =2;
      speedX = getRandom(3,5);
      speedY = getRandom(1,2);
      ballDisplacementX = getRandom(-canvas.width/2,canvas.width/2);
      ballDisplacementY = getRandom(-canvas.height/2,canvas.height/2);
      drX = getRandom(0,1);
      drY = getRandom(0,1);
    }
  }else {
    if (point>=200) {
      point -= 200;
    }  
  }
}

// pointer lock object forking for cross browser


//-----------------------------------------------------------HELPER for pointerLock api and fullscreen api---------------------------------------------------------------
canvas.requestPointerLock = canvas.requestPointerLock ||
                            canvas.mozRequestPointerLock;

document.exitPointerLock = document.exitPointerLock ||
                           document.mozExitPointerLock;

document.exitFullScreen = document.webkitExitFullscreen ||
                        document.mozCancelFullScreen ||
                        document.msExitFullscreen;


function lockChangeAlert() {
  if (document.pointerLockElement === canvas ||
      document.mozPointerLockElement === canvas) {
    console.log('The pointer lock status is now locked');
    document.addEventListener("click", updatePosition, false);
    document.addEventListener("mousemove", updatePosition, false);

  } else {
    console.log('The pointer lock status is now unlocked');  
    document.removeEventListener("mousemove", updatePosition, false);
    document.removeEventListener("click",updatePosition,false);
  }
}


var animation;
function updatePosition(e) {
  x -= e.movementX;
  y -= e.movementY;
  if (x > canvas.width) {
    x = canvas.width;
  }
  if (y > canvas.height) {
    y = canvas.height;
  }  
  if (x < 0) {
    x = 0;
  }
  if (y < 0) {
    y = 0;
  }

  if (!animation) {
    animation = requestAnimationFrame(function() {
      animation = null;
      if (!mode) {
        canvasModeDrawing();
      }
      else if (mode == 1 && firstTime) {
        canvasGridshotDrawing();
        firstTime = false;
      }
      else if (mode == 2 && firstTime) {
         canvasMotionshotDrawing();
         firstTime = false;
      }
    });
  }
}


//-----------------------------------------------------------SELECT MODE DRAWING AND 2 OPTION-----------------------------------------------------------
function canvasModeDrawing() {
    //canvas
  // ctx.fillStyle = "black";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background,x-(canvas.width),y-(canvas.height),canvas.width*2,canvas.height*2); 
  //2 mode
  ctx.beginPath();
  ctx.lineWidth = "1";
  ctx.strokeStyle = "white";
  ctx.font = "15px Arial";
  ctx.textAlign = "center";
  ctx.strokeText("Selecting mode",320,20);

  ctx.beginPath();
  ctx.textAlign = "right";
  ctx.font = "25px Arial";
  ctx.lineWidth = "2";
  ctx.strokeStyle = "rgba(96,249,249,255)";
  ctx.strokeText("GRID SHOT ",x,y-30);
  
  ctx.strokeStyle = "rgba(65,125,247,255)";
  ctx.strokeText("MOTION SHOT",x,y+60);

  //GRIDSHOT 
  ctx.beginPath();
  ctx.fillStyle = "rgba(96,249,249,255)";
  ctx.strokeStyle = "black";
  ctx.arc(x+80, y-40, 25, 0,degToRad(360),false);
  ctx.fill();

  //MOTIONSHOT
  ctx.beginPath();
  ctx.fillStyle = "rgba(65,125,247,255)";
  ctx.strokeStyle = "black";
  ctx.arc(x+80, y+50, 25, 0,degToRad(360),false);
  ctx.fill();

  //crosshair
  crosshairDesign();
  
}
canvasModeDrawing();

//-----------------------------------------------------------Init with each mode-----------------------------------------------------------
function selectMode() {
  if ((x-((canvas.width/2)-80))*(x-((canvas.width/2)-80)) + (y-((canvas.height/2)+40))*(y-((canvas.height/2)+40)) <= RADIUS*RADIUS) {
    //Init gridshot setting
    gridAnimationReq = 1;
    mode = 1;
    canvas.removeEventListener('click',selectMode);
    canvas.addEventListener('click',gridshotEngine);
    point =0;
    c=30;
    myVar = setInterval(myTimer,1000);
  }
  else if ((x-((canvas.width/2)-80))*(x-((canvas.width/2)-80)) + (y-((canvas.height/2)-50))*(y-((canvas.height/2)-50)) <= RADIUS*RADIUS) {
    //Init motionshot setting
    motionAnimationReq =1;
    mode = 2;
    point =0;
    canvas.removeEventListener('click',selectMode);
    canvas.addEventListener('click',motionshotEngine)
    c=30;
    myVar = setInterval(myTimer,1000);
  }
}


//-----------------------------------------------------------START BUTTON-----------------------------------------------------------
document.getElementById('start').onclick = function() {
  firstTime = true;
  canvasModeDrawing();
  mode = 0;
  canvas.addEventListener('click',selectMode);
  
  
  canvas.requestPointerLock();
  if(canvas.webkitRequestFullScreen) {
      canvas.webkitRequestFullScreen();
  }else {
      canvas.mozRequestFullScreen();
  }
};

// pointer lock event listeners

// Hook pointer lock state change events for different browsers
document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

//-----------------------------------------------------------CROSSHAIR DESIGN-----------------------------------------------------------
function crosshairDesign() {
  ctx.beginPath();
  ctx.lineWidth = 1;
  //inner line
  ctx.moveTo((canvas.width/2),(canvas.height/2)+6);
  ctx.lineTo((canvas.width/2), (canvas.height/2)+2);

  ctx.moveTo((canvas.width/2), (canvas.height/2)-6);
  ctx.lineTo((canvas.width/2), (canvas.height/2)-2);

  ctx.moveTo((canvas.width/2)-6, (canvas.height/2));
  ctx.lineTo((canvas.width/2)-2, (canvas.height/2));

  ctx.moveTo((canvas.width/2)+6, (canvas.height/2));
  ctx.lineTo((canvas.width/2)+2, (canvas.height/2));

  ctx.strokeStyle = 'white';
  ctx.stroke();
  //center dot
  ctx.arc(canvas.width/2,(canvas.height/2),1,0,degToRad(360),true);
  ctx.fillStyle = 'white';
  ctx.fill();
}

