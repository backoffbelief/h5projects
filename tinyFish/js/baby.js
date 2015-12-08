var babyObj = function()
{
	this.x;
	this.y;
	
	//this.badyEye = new Image();
	//this.badyBody = new Image();
	//this.badyTail = new Image();
	this.angle ;
	this.badyTailTimer = 0;
	this.badyTailCount = 0;
	
	this.badyEyeTimer = 0;
	this.badyEyeCount = 0;
	this.badyEyeInterval = 1000;
	
	this.badyBodyTimer = 0;
	this.badyBodyCount = 0;
	
}
babyObj.prototype.init = function()
{
	this.x = canWidth/2 - 50;
	this.y = canHeight/2 + 50;
	
	//this.badyEye.src = "img/babyEye0.png";
	//this.badyBody.src = "img/babyFade0.png";
	//this.badyTail.src =  "img/babyTail0.png";
	this.angle = 0;
	
}
babyObj.prototype.draw = function()
{
	this.x = lerpDistance(mom.x, this.x, 0.98);
	this.y = lerpDistance(mom.y, this.y, 0.98);
	
	var beta = Math.atan2(mom.y - this.y, mom.x - this.x) + Math.PI;
	this.angle = lerpAngle(beta, this.angle, 0.6);

	this.badyBodyTimer += deltaTime;
	if(this.badyBodyTimer > 300)
	{
		this.badyBodyCount ++;
		if(this.badyBodyCount > 19){
			//this.badyBodyCount %= 20;
			this.badyBodyCount = 19;
			data.gameOver = true;
		}
		
		this.badyBodyTimer = this.badyBodyTimer % 300;
	}

    this.badyTailTimer += deltaTime;
    if(this.badyTailTimer > 50){
   	 	this.badyTailTimer %= 50;
    		this.badyTailCount = (this.badyTailCount + 1)% 8;
    }

	this.badyEyeTimer += deltaTime;
	if(this.badyEyeTimer > this.badyEyeInterval)
	{
		this.badyEyeCount  = (this.badyEyeCount + 1) % 2;
		this.badyEyeTimer %= this.badyEyeInterval;
		
		if(this.badyTailCount == 1){
			this.badyEyeInterval = 200;
		}else{
			this.badyEyeInterval = Math.random() * 1500 + 2000;
		}
	}
	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);
	
	ctx1.drawImage(badyTails[this.badyTailCount],-badyTails[this.badyTailCount].width/2 + 23, -badyTails[this.badyTailCount].height/2);
	ctx1.drawImage(badyBodys[this.badyBodyCount],-badyBodys[this.badyBodyCount].width/2, -badyBodys[this.badyBodyCount].height/2);
	ctx1.drawImage(badyEyes[this.badyEyeCount], - badyEyes[this.badyEyeCount].width/2, -badyEyes[this.badyEyeCount].height/2);
	
	
	ctx1.restore();
}
