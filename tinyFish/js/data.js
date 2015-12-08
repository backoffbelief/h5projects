var dataObj = function()
{
	this.fruitNum = 0;
	this.blueFruit = false;
	this.score = 0;
	this.gameOver = false;
	this.alpha = 0;
}

dataObj.prototype.reset = function()
{
	this.fruitNum = 0;
	this.blueFruit = false;
}

dataObj.prototype.draw = function()
{
	ctx1.save();
	ctx1.fillStyle = "white";
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = "white";
	ctx1.fillText("score:"+this.score, canWidth/2, canHeight - 50);
	if(this.gameOver){
		this.alpha = Math.min(this.alpha+deltaTime * 0.0005, 1);
		ctx1.fillStyle = "rgba(255,255,255,"+this.alpha+")";
		ctx1.fillText("GAMEOVER", canWidth / 2 - 25, canHeight /2);
	}
	ctx1.restore();
}

dataObj.prototype.addScore = function()
{
	this.score += (this.fruitNum * 100 * (this.blueFruit ? 2 : 1) );
	
	this.reset();
}
