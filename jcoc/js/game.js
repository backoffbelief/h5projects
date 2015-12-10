document.body.onload = main;

var c;
var cxt;
function main()
{
	init();
	
//	drawLines();
	
//	drawArcs();

	drawPics();
}

function init()
{
	c = document.getElementById('myCanvas');
	cxt = c.getContext('2d');
}


function drawLines()
{
	cxt.fillStyle = '#FF0000';
	for (var i = 0; i < 21; i++) {
		cxt.beginPath();
		cxt.moveTo(i*40,0);
		cxt.lineTo(i*40,c.height);
		cxt.stroke();
		cxt.closePath();
	}
	for (var i = 0; i < 21; i++) {
		cxt.beginPath();
		cxt.moveTo(0,i * 40);
		cxt.lineTo(c.width,i*40);
		cxt.stroke();
		cxt.closePath();
	}
}

function drawArcs(){
	cxt.fillStyle="red";
	for (var i = 1; i < 20; i++) {
		for (var j=1;j<20;j++) {
			cxt.beginPath();
			cxt.arc(i*40,j*40,15,0,Math.PI*2,true);
			cxt.closePath();
			cxt.fill();
		}
	}
}

function drawPics(){
    preLoadImage('img/eg_flower.png', function(){
    	   cxt.drawImage(this,0,0);
    });
}

function preLoadImage(url, callback)
{
	var img = new Image();
	img.src = url;
	if(img.complete)
	{
		callback.call(img);
		return ;
	}
	
	img.onload = function()
	{
		callback.call(img);
	}
}

 function getData()
  {
  	$.ajax({
  		type:"get",
  		url:"http://127.0.0.1/login/getUserInfo/op",
  		async:true,
  		success:function(data){
  			document.getElementById('content').innerHTML = JSON.stringify(data) ;
  		}
  	});
  }
