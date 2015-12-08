//碰撞检查
function momFruitCollision()
{
	if(!data.gameOver){
		for (var i = 0; i < fruit.num; i++) {
		if(fruit.alive[i])
		{
			var dis = calLength2(mom.x,mom.y, fruit.x[i], fruit.y[i]);
			if(dis < 900)
			{
				data.fruitNum ++;
				if(fruit.type[i]){
					data.blueFruit = true;
				}
				mom.momBodyCount = Math.min(mom.momBodyCount + 1, 7);
				wave.born(fruit.x[i], fruit.y[i]);
				fruit.beEated(i);
				
			}
		}
	}
	}
	
}

function momBodyCollision()
{
	if(!data.gameOver && data.fruitNum > 0 && calLength2(mom.x,mom.y, baby.x, baby.y) < 900){
		baby.badyBodyCount = 0;
		mom.momBodyCount = 0;
		data.addScore();
		halo.born(baby.x, baby.y);
	}
}
