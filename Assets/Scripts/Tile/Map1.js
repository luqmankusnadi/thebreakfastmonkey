#pragma strict

public class Map1 extends MonoBehaviour
{
	public var tileList : GameObject[];
	public var foodList : GameObject[];
	public var monsterList : GameObject[];
	private var topLeftCorner : Vector2;
	private var mapSize : Vector2;
	private var tilesMatrix;
	private var foodsMatrix;
	
	function Start () {
		SetTilesMatrix();
		DrawTiles();
		SetFoodsMatrix();
		DrawFoods();
		var mons = SpawnMonster(monsterList[0], Vector2(4,3));
		mons.GetComponent(Moveable).SetMovePattern(['u','l','d','r']);
		
		mons = SpawnMonster(monsterList[0], Vector2(2,3));
		mons.GetComponent(Moveable).SetMovePattern(['d','r','u','l']);
		
		mons = SpawnMonster(monsterList[0],Vector2(3,6));
		mons.GetComponent(Moveable).SetMovePattern(['l','r']);
		
		mons = SpawnMonster(monsterList[0],Vector2(3,8));
		mons.GetComponent(Moveable).SetMovePattern(['r','l']);
	
		SpawnMonster(monsterList[0], Vector2(1,10));
		SpawnMonster(monsterList[0], Vector2(2,11));
		SpawnMonster(monsterList[0], Vector2(3,12));
		SpawnMonster(monsterList[0], Vector2(5,13));
		SpawnMonster(monsterList[0], Vector2(4,14));
		
		mons = SpawnMonster(monsterList[0], Vector2(1,17));
		mons.GetComponent(Moveable).SetMovePattern(['d','U','U','U']);
		
		mons = SpawnMonster(monsterList[0], Vector2(2,19));
		mons.GetComponent(Moveable).SetMovePattern(['d','u']);
	
		mons = SpawnMonster(monsterList[0], Vector2(3,16));
		mons.GetComponent(Moveable).SetMovePattern(['d','u']);
		
		mons = SpawnMonster(monsterList[0], Vector2(4,18));
		mons.GetComponent(Moveable).SetMovePattern(['d','u']);
		
		mons = SpawnMonster(monsterList[0], Vector2(5,18));
		mons.GetComponent(Moveable).SetMovePattern(['u','D','D','D']);
		
		mons = SpawnMonster(monsterList[0], Vector2(2,22));
		mons = SpawnMonster(monsterList[0], Vector2(3,23));
		mons = SpawnMonster(monsterList[0], Vector2(3,24));
		mons = SpawnMonster(monsterList[0], Vector2(3,25));
		
		mons = SpawnMonster(monsterList[0],Vector2(3,26));
		mons.GetComponent(Moveable).SetMovePattern(['r','l']);
		
		mons = SpawnMonster(monsterList[0],Vector2(3,29));
		mons = SpawnMonster(monsterList[0],Vector2(5,29));
		mons.GetComponent(Moveable).SetMovePattern(['u','d']);
	}
	
	function SetTilesMatrix()
	{
		mapSize.x = 7;
		mapSize.y = 33;
		topLeftCorner.x = -(mapSize.x/2 - 0.5);
		topLeftCorner.y = 0;
		tilesMatrix = [
			[7,0,0,0,0,0,8], //0
			[7,1,1,3,1,1,8], 
			[7,1,0,0,0,1,8],
			[7,1,0,1,0,1,8],
			[7,1,0,0,0,1,8],
			[7,1,1,2,1,1,8],
			
			[7,0,0,0,0,0,8], //6
			[7,0,1,1,1,0,8],
			[7,0,0,0,0,0,8],
			[7,1,0,1,0,1,8],
			
			[7,0,0,0,0,0,8], //10
			[7,0,0,0,0,0,8],
			[7,0,0,0,0,0,8],
			[7,0,0,0,0,0,8],
			[7,0,0,0,0,0,8],
			
			[7,0,1,1,1,1,8], //15
			[7,0,0,0,0,0,8],
			[7,0,0,0,0,0,8],
			[7,0,0,0,0,0,8],
			[7,0,0,0,0,0,8],
			[7,1,1,1,1,0,8],
			
			[7,1,1,2,0,0,8], //21
			[7,0,0,0,1,1,8],
			[7,1,0,0,1,1,8],
			[7,1,1,3,0,1,8],
			[7,1,0,0,1,1,8],
			[7,0,0,0,0,1,8],
			
			[7,0,1,1,1,0,8], //27
			[7,2,0,1,0,0,8],
			[7,0,0,0,0,0,8],
			[7,1,1,0,1,0,8],
			[7,1,1,1,1,0,8],
			[7,4,0,0,0,0,8]
		];
	}
	
	function SetFoodsMatrix()
	{
		foodsMatrix = [
			[9,9,0,0,0,0,0,0,0,0,0,9,9], // 0
			[9,9,0,9,0,9,0,9,0,9,0,9,9],
			
			[9,9,0,0,0,0,0,0,0,0,0,9,9],
			[9,9,0,9,0,9,0,9,0,9,0,9,9],
			
			[9,9,0,0,2,1,0,1,1,0,0,9,9],
			[9,9,0,9,2,9,0,9,1,9,0,9,9],
			
			[9,9,0,0,2,0,0,0,1,0,0,9,9],
			[9,9,0,9,2,9,0,9,1,9,0,9,9],
			
			[9,9,0,0,2,2,2,2,1,0,0,9,9],
			[9,9,0,9,0,9,0,9,0,9,0,9,9],
			
			[9,9,0,0,0,0,0,0,0,0,0,9,9],
			[9,9,0,9,0,9,0,9,0,9,0,9,9],
			
			[9,9,1,2,2,0,0,0,2,2,1,9,9], //6
			[9,9,1,9,0,9,0,9,0,9,1,9,9],
			
			[9,9,2,0,0,0,0,0,0,0,2,9,9],
			[9,9,1,9,0,9,0,9,0,9,1,9,9],
			
			[9,9,1,2,2,0,0,0,2,2,1,9,9],
			[9,9,0,9,0,9,0,9,1,9,0,9,9],
			
			[9,9,0,0,0,0,0,0,2,0,0,9,9],
			[9,9,0,9,0,9,0,9,0,9,0,9,9],
			
			[9,9,0,0,0,0,0,0,0,0,1,9,9], //10
			[9,9,0,9,0,9,0,9,1,9,0,9,9],
			
			[9,9,0,0,0,0,1,2,0,0,0,9,9],
			[9,9,0,9,0,9,2,9,0,9,0,9,9],
			
			[9,9,0,0,0,0,1,0,2,0,0,9,9],
			[9,9,0,9,0,9,0,9,1,9,0,9,9],
			
			[9,9,0,0,1,2,0,0,1,0,0,9,9],
			[9,9,0,9,1,9,0,9,0,9,0,9,9],
			
			[9,9,2,1,2,0,0,0,0,0,0,9,9],
			[9,9,0,9,0,9,0,9,0,9,0,9,9],
			
			[9,9,0,0,0,0,0,0,0,0,0,9,9], //15
			[9,9,1,9,0,9,0,9,0,9,0,9,9],
			
			[9,9,2,0,0,0,0,0,0,0,0,9,9], 
			[9,9,0,9,0,9,0,9,0,9,0,9,9],
			
			[9,9,0,0,2,1,2,1,2,0,0,9,9],
			[9,9,1,9,0,9,0,9,0,9,0,9,9],
			
			[9,9,2,1,2,0,0,0,0,0,0,9,9],
			[9,9,0,9,0,9,0,9,1,9,0,9,9],
			
			[9,9,0,0,0,0,0,0,2,0,0,9,9],
			[9,9,0,9,0,9,0,9,0,9,0,9,9],
			
			[9,9,0,0,0,0,0,0,0,0,0,9,9],
			[9,9,0,9,0,9,0,9,0,9,1,9,9],
			
			[9,9,0,0,0,0,0,0,0,0,2,9,9], //21
			[9,9,0,9,0,9,0,9,0,9,0,9,9],
			
			[9,9,0,0,1,2,0,0,0,0,0,9,9],
			[9,9,0,9,0,9,1,9,0,9,0,9,9],
			
			[9,9,0,0,0,0,2,0,0,0,0,9,9],
			[9,9,0,9,0,9,0,9,0,9,0,9,9],
			
			[9,9,0,0,0,0,0,0,0,0,0,9,9],
			[9,9,0,9,0,9,1,9,0,9,0,9,9],
			
			[9,9,0,0,0,0,2,0,0,0,0,9,9],
			[9,9,0,9,0,9,1,9,0,9,0,9,9],
			
			[9,9,2,1,2,1,2,1,2,1,2,9,9],
			[9,9,1,9,0,9,0,9,0,9,0,9,9],
			
			[9,9,2,0,0,0,0,0,0,0,0,9,9], //27
			[9,9,0,9,0,9,0,9,0,9,0,9,9],
			
			[9,9,0,0,0,0,0,0,0,0,0,9,9],
			[9,9,0,9,0,9,0,9,0,9,0,9,9],
			
			[9,9,0,0,0,0,0,0,0,0,0,9,9],
			[9,9,0,9,0,9,0,9,0,9,0,9,9],
			
			[9,9,0,0,0,0,0,0,0,0,0,9,9],
			[9,9,0,9,0,9,0,9,0,9,0,9,9],
			
			[9,9,0,0,0,0,0,0,0,0,0,9,9],
			[9,9,0,9,0,9,0,9,0,9,0,9,9],
			
			[9,9,0,0,0,0,0,0,0,0,0,9,9]
		];
	}
	
	function DrawTiles()
	{
		var i : int = 0;
		var j : int = 0;
		for (var tiles in tilesMatrix)
		{
			i=0;
			for (var tile : int in tiles)
			{
				var clone : GameObject = Instantiate(tileList[tile], Vector3(topLeftCorner.x+i,-0.125,-j), Quaternion.identity);
				if(tile!=4) Destroy(clone, 4*(j+1)+Random.Range(0f,0.5f));
				i++;
			}
			j++;
		}
	}
	function DrawFoods()
	{
		var i : int = 0;
		var j : int = 0;
		for (var foods in foodsMatrix)
		{
			i=0;
			for (var food : int in foods)
			{
				if(food>0 && food!=9) var clone : GameObject = Instantiate(foodList[food-1], Vector3(topLeftCorner.x+i*0.5,0.25,-j*0.5), Quaternion.Euler(30,0,0));
				i++;
			}
			j++;
		}
	}
	function SpawnMonster(monster : GameObject, position : Vector2) : GameObject
	{
		var pos3D : Vector3;
		pos3D.x = topLeftCorner.x + position.x;
		pos3D.y = 0;
		pos3D.z = topLeftCorner.y - position.y;
		return Instantiate(monster, pos3D, Quaternion.identity);
	}
}