#pragma strict

import System.Xml;

public class Map extends MonoBehaviour
{
	public var tileList : GameObject[];
	public var borderList : GameObject[];
	public var foodList : GameObject[];
	public var monsterList : GameObject[];
	private var topLeftCorner : Vector2;
	private var mapSize : Vector2;
	
	private var tileDictionary : Hashtable;
	private var foodDictionary : Hashtable;
	private var monsterDictionary : Hashtable;
	
	function Start () {
		ThemeService.OpenLevel();
		LevelService.LoadLevel();
		mapSize.x = 5;
		mapSize.y = int.Parse(LevelService.xmlDoc.GetElementsByTagName("map")[0].SelectSingleNode("length").InnerText);
		topLeftCorner.x = -(mapSize.x/2 - 0.5);
		topLeftCorner.y = 0;
		SetDictionary();
		DrawTiles();
		DrawFoods();
		SpawnMonsters();
	}
	
	function SetDictionary()
	{
		tileDictionary = new Hashtable();
		tileDictionary["common"] = 0;
		tileDictionary["obstacle"] = 1;
		tileDictionary["finish"] = 2;
		tileDictionary["freeze"] = 3;
		tileDictionary["burn"] = 4;
		
		foodDictionary = new Hashtable();
		foodDictionary["broccoli"] = 0;
		foodDictionary["carrot"] = 1;
		foodDictionary["eggplant"] = 2;
		foodDictionary["strawberry"] = 3;
		foodDictionary["egg"] = 4;
		foodDictionary["milk"] = 5;
		
		
		monsterDictionary = new Hashtable();
		monsterDictionary["pizza"] = 0;
		monsterDictionary["burger"] = 1;
		monsterDictionary["fries"] = 2;
	}
	
	function DrawTiles()
	{
		var clone : GameObject;
		for(var tile: XmlNode in LevelService.activeTiles)
		{
			var x = int.Parse(tile.SelectSingleNode("x").InnerText);
			var y = int.Parse(tile.SelectSingleNode("y").InnerText);
			var type = tileDictionary[tile.SelectSingleNode("type").InnerText];
			clone = Instantiate(tileList[type], Vector3(topLeftCorner.x+x,-0.125,-y), Quaternion.identity);
			if(type!=2) Destroy(clone, 4*(y+1)+Random.Range(0f,0.5f));
		}
		for(var j = 0; j < mapSize.y; j++)
		{
			clone = Instantiate(borderList[2], Vector3(topLeftCorner.x-1,-0.125,-j), Quaternion.identity);
			Destroy(clone, 4*(j+1));
			clone = Instantiate(borderList[3], Vector3(topLeftCorner.x+5,-0.125,-j), Quaternion.identity);
			Destroy(clone, 4*(j+1));
		}
	}
	function DrawFoods()
	{
		var maxScore : int = 0;
		for(var food: XmlNode in LevelService.activeItems)
		{
			var x = float.Parse(food.SelectSingleNode("x").InnerText);
			var y = float.Parse(food.SelectSingleNode("y").InnerText);
			var type = foodDictionary[food.SelectSingleNode("type").InnerText];
			var clone : GameObject = Instantiate(foodList[type], Vector3(topLeftCorner.x+x,0.25,-y), Quaternion.Euler(30,0,0));
			maxScore += foodList[type].GetComponent(Food).score;
		}
		GameController.instance.maxScore = maxScore;
		print("Skor maksimal : " + maxScore);
	}
	function SpawnMonsters()
	{
		for(var monster: XmlNode in LevelService.activeMonsters)
		{
			var x = float.Parse(monster.SelectSingleNode("x").InnerText);
			var y = float.Parse(monster.SelectSingleNode("y").InnerText);
			var type = monsterDictionary[monster.SelectSingleNode("type").InnerText];
			var movement = monster.SelectSingleNode("movement").InnerText;
			var movArray : Array = [];
			for(var c:char in movement)
			{
				movArray.Push(c.ToString());
			}
			var clone : GameObject = Instantiate(monsterList[type], Vector3(topLeftCorner.x+x,0,-y), Quaternion.Euler(30,0,0));
			clone.GetComponent(Moveable).SetMovePattern(movArray); 
		}
	}
}