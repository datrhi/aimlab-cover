//	JSAimLab.js
window.onload	=	init;
//	Constants	to	define	the	box	dimensions
const	MIN_X	=	20;
const	MIN_Y	=	200;
const	WIDTH	=	1800;
const	HEIGHT	=	700;
const	MAX_X	=	MIN_X	+	WIDTH	-	1;
const	MAX_Y	=	MIN_Y	+	HEIGHT	-	1;
//	The	ball
var	ballRadius	=	60;
var	ballSize	=	ballRadius*2;
var ballCenterX = [1,2,3];
var ballCenterY = [1,2,3];
//Intial Top score 
var topScore = 0;
//Intial object Kill
var objectKill = 0;
//Initial click times
var clickTimes = 0;
//Initial timer
var c = 60;
var myVar;

function	init()	{	
	var	balls	=	document.getElementsByClassName("ball");
	var	box	=	document.getElementById("box");


	//	Position	the	box	absolutely	via	CSS	style
	box.style.left	=	(MIN_X	-	5)	+	"px";		//	unit	in	px	(pixels)
	box.style.top	=	(MIN_Y	-	5)	+	"px";
	box.style.width	=	WIDTH	+	"px";
	box.style.height	=	HEIGHT	+	"px";
	box.style.maxWidth = "96%";
	//Random initial ball position and prevent overlapping
	for (var i = ballCenterX.length - 1; i >= 0; i--) {
		ballCenterX[i] = (WIDTH	-	2*ballRadius)*Math.random()	+	(MIN_X	+	ballRadius);
	}
	for (var i = ballCenterY.length - 1; i >= 0; i--) {
		ballCenterY[i] = (HEIGHT -	2*ballRadius)*Math.random()	+	(MIN_Y	+	ballRadius);
	}
	initialOverlap();
	//	The	ball	image	absolutely	via	CSS	style
	for (var i = balls.length - 1; i >= 0; i--) {
		balls[i].style.left	=	(ballCenterX[i]	-	ballRadius)	+	"px";
		balls[i].style.top		=	(ballCenterY[i]	-	ballRadius)	+	"px";
		balls[i].style.width	=	ballSize	+	"px";
		balls[i].style.height	=	ballSize	+	"px";
	}
	
	// //Display ball
	// for (var i = balls.length - 1; i >= 0; i--) {
	// 	balls[i].style.display = "block";
	// }
}
//create new circle after clicking
function newItem(idItem) {
	var	x	=	(WIDTH	-	2*ballSize)*Math.random()	+	(MIN_X	+	ballSize);
	var	y	=	(HEIGHT	-	2*ballSize)*Math.random()	+	(MIN_Y	+	ballSize);
	var balls = document.getElementsByClassName("ball");
	balls[idItem].style.left = (x - ballRadius) + "px";
	balls[idItem].style.top = (y - ballRadius) + "px";
	ballCenterX[idItem] = x;
	ballCenterY[idItem] = y;
}
//Check overlap 2 circles
function overlappingCheck(item1,item2) {
	if(((ballCenterX[item1] - ballCenterX[item2] < ballSize) && (ballCenterX[item1] - ballCenterX[item2] > -ballSize))
		&&((ballCenterY[item1] - ballCenterY[item2] < ballSize) && (ballCenterY[item1] - ballCenterY[item2] > -ballSize))){
		return 1;
	}
	return 0;
}
//processing overlap at the start
function initialOverlap() {
	while(overlappingCheck(0,1) || overlappingCheck(0,2) || overlappingCheck(1,2)){
		for (var i = ballCenterX.length - 1; i >= 0; i--) {
				ballCenterX[i] = (WIDTH	-	2*ballRadius)*Math.random()	+	(MIN_X	+	ballRadius);
				ballCenterY[i] = (HEIGHT-	2*ballRadius)*Math.random()	+	(MIN_Y	+	ballRadius);
		}
	}

}
//Timer
function myTimer() {
	var preScore = parseInt((document.getElementById("point").innerHTML),10);
	var balls = document.getElementsByClassName("ball");
	var box = document.getElementById("box");
	if (c>0) {
		var t = document.getElementById("timer");
		c--;
		t.innerHTML = c;
	}
	if(c==0){
		var _accuracy = parseFloat((objectKill/clickTimes)*100).toFixed(2);
		var _timeToKill = parseFloat((60/objectKill)*1000).toFixed(2);
		alert("Your score: " + preScore + "\nAccuracy: " + _accuracy + " %\nTime to kill: " + _timeToKill + " ms" );
		//Enable btnNewGame
		var btnNewGame = document.getElementById("newGame");
		btnNewGame.style.cursor = "default";
		btnNewGame.style.opacity = "1";
		btnNewGame.disabled = false;
		//refresh cursor
		box.style.cursor = "default";
		for (var i = balls.length - 1; i >= 0; i--) {
			balls[i].style.display = "none";
		}
		setNewGame();
		clearInterval(myVar);
	}
}
//In-game
function play() {
	var	balls	=	document.getElementsByClassName("ball");
	var	box	=	document.getElementById("box");
	var pointJ = document.getElementById("point");
	alert("Are you ready?\nYou got 60s to get the highest score");
	//cursor
	box.style.cursor = "crosshair";
	//Set btn
	var btnNewGame = document.getElementById("newGame");
	btnNewGame.style.cursor = "not-allowed";
	btnNewGame.style.opacity = "0.1";
	btnNewGame.disabled = true;
	//  Set timer = 60s
	myVar = setInterval(myTimer,1000);
	//update Item
	balls[0].onclick = function() {
		pointJ.innerHTML = parseInt(pointJ.innerHTML,10) + 200;
		clickTimes++;
		objectKill++;
		do{
			newItem(0);
		}while(overlappingCheck(0,1) || overlappingCheck(0,2));
	}
	balls[1].onclick = function () {
		pointJ.innerHTML = parseInt(pointJ.innerHTML,10) + 200;
		clickTimes++;			objectKill++;
		do{
			newItem(1);
		}while(overlappingCheck(1,0) || overlappingCheck(1,2));
	}
	balls[2].onclick = function () {
		pointJ.innerHTML = parseInt(pointJ.innerHTML,10) + 200;
		clickTimes++;
		objectKill++;
		do{
			newItem(2);
		}while(overlappingCheck(2,0) || overlappingCheck(2,1));
	}
	box.onclick = function() {
		clickTimes++;
		if (parseInt(pointJ.innerHTML,10)<100) {pointJ.innerHTML = 0;}
		else {
			pointJ.innerHTML = parseInt(pointJ.innerHTML,10) - 100;
		}
	}
	//Display ball
	for (var i = balls.length - 1; i >= 0; i--) {
		balls[i].style.display = "block";
	}
}
//Set-up
function setNewGame() {
	var pointJ = document.getElementById("point");
	//Save the highest score
	if (parseInt(pointJ.innerHTML,10) > topScore) {
		topScore = parseInt(pointJ.innerHTML,10);
	}
	document.getElementById("topScore").innerHTML = topScore;


	//Reset click times and object kill
	clickTimes = 0;
	objectKill = 0;
	//Reset score
	pointJ.innerHTML = 0;
	//Reset timer
	c = 60;
}



