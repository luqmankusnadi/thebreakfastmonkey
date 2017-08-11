#pragma strict
import System.Text;
import System.Xml;
import System.IO;

public class LevelService extends MonoBehaviour {
	static var xmlDoc : XmlDocument = new XmlDocument();
	//static var activeTheme : XmlNode;
	static var activeMonsters : XmlNodeList;
	static var activeItems : XmlNodeList;
	static var activeTiles : XmlNodeList;

	static var BASE_PATH : String; 
	
	public function Awake()
	{
		BASE_PATH = "Data/levels/";
	}
	
	public function Update(){
		//kalo pencet q bakal dapetin previous theme
	}

	public static function OpenXml(pathFile: String){
		try {
			//xmlDoc = new XmlDocument();
			var textAsset : TextAsset = Resources.Load(pathFile);	
			print(pathFile);
			xmlDoc.LoadXml(textAsset.text);
			print(xmlDoc == null);
			return true;
		} catch (e){
			print(e.Message);
			return false;
		}
	} 

	public static function GetChilds(node: XmlNode,tag: String){
		var childs = node.ChildNodes;
		var ret = new Array();
		for(var child: XmlNode in childs){
			if (child.Name == tag){
				ret.push(child);
			}
		}
		return ret;
	}


	public static function PrintTiles(){
		var i : int = 0;
		for(var tile: XmlNode in activeTiles){
			print(tile.OuterXml);
			i++;
			print("tile " + i);
			print("x = " + tile.SelectSingleNode("x").InnerText);
			print("y = " + tile.SelectSingleNode("y").InnerText);
		}
	}

	public static function LoadMonsters(){
		activeMonsters = xmlDoc.GetElementsByTagName("monster");
	}

	public static function LoadItems(){
		activeItems = xmlDoc.GetElementsByTagName("item");
	}

	public static function LoadTiles(){
		var map: XmlNodeList  = xmlDoc.GetElementsByTagName("map");
		for(var t: XmlNode in map){
			activeTiles = t.SelectNodes("tile");
			break;
		}
	}

	public static function LoadLevel(){
		LevelService.LoadMonsters();
		LevelService.LoadItems();
		LevelService.LoadTiles();
	}
	/*
	public static function GetLevels(theme : XmlNode){
		
	}
*/
	// public static function GetMap(level: XmlNode){
	// 	var childs = theme.ChildNodes;
	// 	var ret= [];
	// 	for(var child: XmlNode in childs){
	// 		if (child.Name == "level"){
	// 			ret.push(child);
	// 		}
	// 	}
	// 	return ret;
	// }
	
	// /**
	//  * @return array of xml nodes
	//  */
	// public static function GetItems(level: XmlNode){
	// 	var childs = theme.ChildNodes;
	// 	var ret = [];
	// 	for(var child: XmlNode in childs){
	// 		if (child.Name == "items"){
	// 			ret.push(child);
	// 		}
	// 	}
	// 	return ret;
	// }

	// /**
	//  * @return array of xml nodes
	//  */
	// public static function GetMonsters(level: XmlNode){
	// 	var childs = theme.ChildNodes;
	// 	var ret = [];
	// 	for(var child: XmlNode in childs){
	// 		if (child.Name == "monster"){
	// 			ret.push(child);
	// 		}
	// 	}
	// 	return ret;
	// }

	public static function GetThemes(){
		return xmlDoc.GetElementsByTagName("theme");
	}

	public static function TestListThemes(){
		var themes : XmlNodeList = LevelService.GetThemes();
		print("daftar tema : ");
		for (var theme: XmlNode in themes){
			print("hello");
			print(theme.Attributes.ItemOf['name'].Value);
		}

	}

	public static function TestListLevels(){
		var theme = xmlDoc.SelectSingleNode("theme");
		var levels = LevelService.GetChilds(theme,"level");

		print("daftar level cokelat: ");
		for (var level: XmlNode in levels){
			print("hello");
			print(level.Attributes.ItemOf['name']);
		}

	}
}