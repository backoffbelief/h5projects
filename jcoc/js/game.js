document.body.onload = main;

var mapSize = 40;
var gridSize = 8;

var buildings;

var userDatas;
var gameUrl = "http://127.0.0.1:8000/login/";

function main()
{
}

function init()
{
//	c = document.getElementById('myCanvas');
//	cxt = c.getContext('2d');
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

 function httpReq(url, callback)
  {
  	$.ajax({
  		type:"get",
  		url:url,
  		async:true,
  		success:callback});
 }
 
 function showUser()
 {	
 	initAreaData();
 	httpReq(gameUrl+'getUserInfo/op0', function(data){
 		userDatas = data;
 		draw(userDatas);
 	});
 }
 
 function createNewBuilding()
 {
 	initAreaData();
 	httpReq(gameUrl+'createNewBuild/4/1002/0_3', function(data){
 		if(data.status != 2)
 		{
 			alert(getErrcodeMsg(data.errcode));
 		}
 	});
 }
function initAreaData()
{
	$.getJSON('scripts/coc_bulid.json', function(data){
		buildings = data;
	});
}

function getSize(xmlId)
{
	for (var i = 0; i < buildings.length; i++) {
		if(buildings[i].xmlId == xmlId)
		{
			return buildings[i].size;
		}
	}
}

function getErrcodeMsg(errcode)
{
	switch(errcode)
	{
		case 10005:return '建筑的位置重叠了，请重新摆放';
	}
	
	return 'System error!';
}

function draw(data)
{
	var	c = document.getElementById('myCanvas');
	var cxt = c.getContext('2d');
	//requestAnimationFrame(draw);
	cxt.strokeStyle ='blue';
	for (var i = 0; i <= mapSize; i++) {
		line0(cxt,i,0,i,mapSize);
	}
	for (var i = 0; i <= mapSize; i++) {
		line0(cxt,0,i,mapSize,i);
	}
	
	
	if(data != 'undefined')
	{
		var objs = data['barriers'];
		cxt.save();
		cxt.fillStyle='green';
		for (var i = 0; i < objs.length; i++) {
			var size = getSize(objs[i].xmlId);
			fill0(cxt,objs[i].posX,objs[i].posY,size);
		}
		cxt.restore();
		cxt.save();
		cxt.fillStyle='red';
		objs = data['buildings'];
		for (var i = 0; i < objs.length; i++) {
			var size = getSize(objs[i].xmlId);
			fill0(cxt,objs[i].posX,objs[i].posY,size);
		}
		cxt.restore();
		if(data.user.id){
			document.getElementById('id').innerHTML="id:"+data.user.id;
		}
		if(data.user.rank){
			document.getElementById('rank').innerHTML="rank:"+data.user.rank;
		}
		if(data.user.platformId){
			document.getElementById('platformId').innerHTML="platformId:"+data.user.platformId;
		}
		if(data.user.fame){
			document.getElementById('fame').innerHTML="fame:"+data.user.fame;
		}
		if(data.user.dimaond){
			document.getElementById('dimaond').innerHTML="dimaond:"+data.user.dimaond;
		}
	}
	//setInterval(1000);
}
function line0(cxt,x,y,dstX,dstY){
	cxt.moveTo((x+y)*gridSize, mapSize*gridSize- (x-y)*gridSize);
	cxt.lineTo((dstX+dstY) * gridSize, mapSize*gridSize-(dstX - dstY)*gridSize);
	cxt.stroke();
}


function fill0(cxt,x, y, size){
	move0(cxt,x,y);
	line1(cxt,x,y+size);
	line1(cxt,x+size,y+size);
	line1(cxt,x+size, y);
	cxt.closePath();
	cxt.fill();
}

function move0(cxt,x,y){
	cxt.moveTo((x+y)*gridSize, mapSize*gridSize - (x-y)*gridSize);
}

function line1(cxt,x,y)
{
	cxt.lineTo((x+y)*gridSize, mapSize*gridSize - (x-y)*gridSize);
}

function deleteBarrier()
{
	httpReq(gameUrl+'deleteBarrier/4/',function(data){
		
	});
}
