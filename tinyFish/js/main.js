document.body.onload = game;

var can1;
var can2;

var ctx1;
var ctx2;

var lastTime;
var deltaTime;

var backPic = new Image(); 

var canWidth;
var canHeight;

var ane;

var fruit;

var mom;

var momX;
var momY;

var baby;

var badyTails = [];

var badyEyes = [];

var badyBodys = [];

var momTails = [];

var momBodys = [];

var momBlueBodys = [];

var momEyes = [];

var data;

var wave;

var halo;

var dust;

var dustPic = [];
function game(){
	// console.log("load");
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}


function init(){
	
	 can1 = document.getElementById("canvas1");
	 can2 = document.getElementById("canvas2");
	
	 ctx1 = can1.getContext("2d");
	 ctx2 = can2.getContext("2d");
	 
	 can1.addEventListener('mousemove', onMouseMove,false)
	 
	 canWidth = can2.width;
	 canHeight = can2.height;
	 
	 backPic.src = "img/background.jpg";
	 
	 ane = new aneObj();
	 ane.init();
	 
	 fruit = new fruitObj();
	 fruit.init();
	 
	 mom = new momObj();
	 mom.init();
	 
	 momX = canWidth/2;
	 momY = canHeight/2;
	 
	 baby = new babyObj();
	 baby.init();
	 
	 for (var i =0 ; i < 8; i++) {
	 	badyTails[i] = new Image();
	 	badyTails[i].src = "img/babyTail"+i+".png"
	 }
	 
	 for (var i =0; i < 2; i++) {
	 	badyEyes[i] = new Image();
	 	badyEyes[i].src = "img/babyEye"+i+".png"
	 }
	 
	 for (var i =0; i < 20 ;i ++) {
	 	badyBodys[i] = new Image();
	 	badyBodys[i].src ="img/babyFade"+i+".png";
	 }
	 for (var i = 0; i < 8; i++) {
	 	momTails[i] = new Image();
	 	momTails[i].src = "img/bigTail"+i+".png";
	 }
	 
	 for (var i = 0; i< 8; i++) {
	 	momBodys[i] = new Image();
	 	momBodys[i].src = "img/bigSwim"+i+".png"
	 }
	 
	 for (var i = 0; i< 8; i++) {
	 	momBlueBodys[i] = new Image();
	 	momBlueBodys[i].src = "img/bigSwimBlue"+i+".png"
	 }
	 
	 for (var i = 0; i< 2; i++) {
	 	momEyes[i] = new Image();
	 	momEyes[i].src = "img/bigEye"+i+".png"
	 }
	 
	 data = new dataObj();
	 
	 ctx1.font = "20px Verdana";
	 ctx1.algin = "center";
	 
	 wave = new waveObj();
	 wave.init();
	 
	 halo = new haloObj();
	 halo.init();
	 
	 dust = new dustObj();
	 dust.init();
	 
	 for (var i = 0; i < 7; i++) {
	 	dustPic[i] = new Image();
	 	dustPic[i].src = "img/dust"+i+".png";
	 }
	 
}

function gameloop(){
	window.requestAnimFrame(gameloop);
	
	drawBackground();
	ane.draw();
	fruit.draw();
	fruitMonitor();
	
	ctx1.clearRect(0, 0, canWidth, canHeight);
	mom.draw();
	
	baby.draw();
	
	momFruitCollision();
	momBodyCollision();
	var now = Date.now();
	deltaTime = now - lastTime;
	//console.log(deltaTime);
	lastTime = now;
	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
//	console.log(Math.random() * 30);
}
function onMouseMove(e){
	if(!data.gameOver){
		if(e.offsetX || e.layerX){
			momX = e.offsetX == undefined ? e.layerX : e.offsetX;
			momY = e.offsetY == undefined ? e.layery : e.offsetY;
		}	
	}
	
}
