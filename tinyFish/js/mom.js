var momObj = function()
{
	this.x;
	this.y;
	//this.momEye = new Image();
	//this.momBody = new Image();
	//this.momTail = new Image();
	this.angle;
	
	this.momBodyCount = 0;
//	this.momBodyTimer = 0;
	
	this.momTailTimer = 0;
	this.momTailCount = 0;
	
	this.momEyeTimer = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 1000;
}

momObj.prototype.init = function()
{
	this.x = canWidth/2;
	this.y = canHeight/2;
	//this.momEye.src="img/bigEye0.png";
	//this.momBody.src = "img/bigSwim0.png";
	//this.momTail.src = "img/babyTail0.png";
	this.angle = 0;
}

momObj.prototype.draw = function()
{

	this.x = lerpDistance(momX, this.x, 0.9);
	this.y = lerpDistance(momY, this.y ,0.9);
	
	var deltaX = momX - this.x;
	var deltaY = momY - this.y;
	
	var beta = Math.atan2(deltaY, deltaX) +Math.PI;
	this.angle = lerpAngle(beta, this.angle, 0.6);
	
	this.momEyeTimer += deltaTime;
	if(this.momEyeTimer > this.momEyeInterval){
		this.momEyeTimer %= this.momEyeInterval;
		this.momEyeCount = (this.momEyeCount + 1) % 2;
		if(this.momEyeCount == 0){
			this.momEyeInterval = Math.random() * 1500 + 2000;
		}else{
			this.momEyeInterval = 200;
		}
	}
	
	this.momTailTimer += deltaTime;
	if(this.momTailTimer > 50){
		this.momTailTimer %= 50;
		this.momTailCount = (++ this.momTailCount) % 8;
	}
	
	ctx1.save();
	ctx1.translate(this.x, this.y)
	ctx1.rotate(this.angle);
	ctx1.drawImage(momTails[this.momTailCount], -momTails[this.momTailCount].width/2 + 30, -momTails[this.momTailCount].height/2);
	
	var tmpMomBody = data.blueFruit ? momBlueBodys[this.momBodyCount] : momBodys[this.momBodyCount];
	
	ctx1.drawImage(tmpMomBody, - tmpMomBody.width/2 , -tmpMomBody.height/2);
	ctx1.drawImage(momEyes[this.momEyeCount], - momEyes[this.momEyeCount].width/2, -momEyes[this.momEyeCount].height/2);
	ctx1.restore();
	
	
}
