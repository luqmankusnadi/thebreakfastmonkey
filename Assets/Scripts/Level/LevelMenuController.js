#pragma strict

import System.Xml;

public var thumbnail : GameObject[];
private var themeDictionary : Hashtable;
private var theme : String;
private var unlockedLevel : int;

function Start () {
	AudioManager.PlayMusic(this.audio);
	theme = ThemeService.activeTheme.Attributes.ItemOf['name'].Value;
	unlockedLevel = PlayerPrefs.GetInt("UnlockedLevel", 1);
	SetDictionary();	
	var dist : float = 1.5f;
	var levels = ThemeService.GetLevels();
	var row = 3;
	var col = 4;
	var i = 0;
	for(var level : XmlNode in levels)
	{
		var pos : Vector3;
		pos.x = ((i%col)-((col-1f)/2f))*dist;
		pos.y = -((i/col)-((row-1f)/2f))*dist;
		pos.z = -11;
		var obj = Instantiate(thumbnail[themeDictionary[theme]], pos, Quaternion.identity) as GameObject;
		obj.GetComponent(LevelThumbnail).level = level;
		obj.GetComponent(LevelThumbnail).levelNumber = i+1;
		obj.GetComponent(LevelThumbnail).theme = theme;
		var id = int.Parse(level.Attributes.ItemOf['id'].Value);
		obj.GetComponent(LevelThumbnail).levelId = id;
		obj.GetComponent(LevelThumbnail).isUnlocked = id <= unlockedLevel;
		i++;
	}
}

function SetDictionary()
{
	themeDictionary = new Hashtable();
	themeDictionary["Waffle"] = 0;
}

function Update()
{
	if(Input.GetKeyDown(KeyCode.Escape))
	{
		Application.LoadLevel("ThemeMenu");
	}
}