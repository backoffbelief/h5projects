var fruitObj = function ()
{
	this.alive = [];
	this.orangle = new Image();
	this.blue = new Image();
	this.x = [];
	this.y = [];
	this.l = [];
	this.spd = [];
	this.type = [];
	
	this.aneIds = [];
}

fruitObj.prototype.num = 30;
fruitObj.prototype.init = function ()
{
	this.orangle.src = "img/fruit.png";
	this.blue.src = "img/blue.png";
	for (var i = 0 ; i < this.num ; i ++) {
		this.born(i);
	}
}

fruitObj.prototype.draw = function()
{
	for (var i = 0  ; i < this.num ; i++) {
		if(this.alive[i]){
			if(this.l[i] < 20){
				this.x[i] = ane.headX[this.aneIds[i]];
				this.y[i] = ane.headY[this.aneIds[i]];
				this.l[i] += this.spd[i] * deltaTime;
			}else{
				this.y[i] -= this.spd[i] * 7 * deltaTime;
			}
			
			ctx2.drawImage(this.type[i] ? this.blue : this.orangle, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i]*0.5, this.l[i], this.l[i]);
		    if(this.y[i] < 10){
		   	 	this.alive[i] = false;
		    }
		}
	}
}

fruitObj.prototype.born = function(i)
{
	this.aneIds[i] = Math.floor(Math.random() * ane.num);
	this.l[i] = 0;
	this.spd[i] =  Math.random() *0.01 +0.005;
	this.alive[i] = true;
	this.type[i] = (Math.random() < 0.3);
}

fruitObj.prototype.beEated = function(i)
{
	this.alive[i] = false;
}
function fruitMonitor(){
	
	var num  = 0;
	
	for (var i = 0; i < fruit.num; i++) {
		if(!fruit.alive[i]){
			num ++;
		}
	}
	
	if(num < 15){
		
		sendFruit();
	}
}


function sendFruit(){
	for (var i = 0; i < fruit.num; i++) {
		if(!fruit.alive[i]){
			fruit.born(i);
		}
	}
}
