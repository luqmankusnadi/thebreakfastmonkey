#pragma strict
import System.Text;
import System.Xml;
import System.IO;

public class ThemeService extends MonoBehaviour {
	static var xmlDoc : XmlDocument = new XmlDocument();
	static var activeTheme : XmlNode;
	static var activeLevel : XmlNode;

	public function Awake(){
		ThemeService.OpenXml("Data/theme");
		ThemeService.FirstTheme();

	}

	public function Update(){
		//kalo pencet q bakal dapetin previous theme
		if (Input.GetKeyDown(KeyCode.Q)){
			ThemeService.PreviousTheme();
			print("previous theme: " + activeTheme.Attributes.ItemOf['name'].Value);

		} else if (Input.GetKeyDown(KeyCode.E)){
			ThemeService.NextTheme();
			print("next theme: " +activeTheme.Attributes.ItemOf['name'].Value);

		//kalo klik tengah, dapet tiles
		} else if (Input.GetKeyDown(KeyCode.A)){
			ThemeService.PreviousLevel();
			print("previous level: " + activeLevel.Attributes.ItemOf['name'].Value);
		} else if (Input.GetKeyDown(KeyCode.D)){
			ThemeService.NextLevel();
			print("next level: " + activeLevel.Attributes.ItemOf['name'].Value);
		} else if (Input.GetKeyDown(KeyCode.S)){
			ThemeService.OpenLevel();
			LevelService.LoadLevel();
			print("get tiles = ");
			LevelService.PrintTiles();
		}
	}

	public static function OpenXml(pathFile: String){
		try {
			var textAsset : TextAsset = Resources.Load(pathFile, TextAsset);
			
			xmlDoc.LoadXml(textAsset.text);
			
			return true;
		} catch (e){
			print(e.Message);
			return false;
		}
	} 

	public static function FirstTheme(){
		var themes = ThemeService.GetThemes();
		for(var theme: XmlNode in themes){
			activeTheme = theme;
			break;
		}

		ThemeService.FirstLevel(); 
	}

	public static function NextTheme(){
		if (activeTheme.NextSibling != null){
			activeTheme = activeTheme.NextSibling;
			ThemeService.FirstLevel();
		}
	}

	public static function PreviousTheme(){
		if (activeTheme.PreviousSibling != null){
			activeTheme = activeTheme.PreviousSibling;
			ThemeService.FirstLevel();
		}
	}

	public static function PrintActiveTheme(){
		print(activeTheme.OuterXml);
	}

	public static function GetThemes(){
		return xmlDoc.GetElementsByTagName("theme");
	}

	public static function GetLevels(){
		return activeTheme.ChildNodes;
	}
	
	/*

	public static function TestListThemes(){
		var themes : XmlNodeList = LevelService.GetThemes();
		print("daftar tema : ");
		for (var theme: XmlNode in themes){
			print("hello");
			print(theme.Attributes.ItemOf['name'].Value);
		}
	}*/

	public static function OpenLevel(){
		LevelService.OpenXml(LevelService.BASE_PATH + activeLevel.SelectSingleNode("path").InnerText);
	}

	public static function FirstLevel(){
		activeLevel = activeTheme.SelectSingleNode("level");
	}

	public static function NextLevel(){
		if (activeLevel.NextSibling != null){
			activeLevel = activeLevel.NextSibling;
		}
	}

	public static function PreviousLevel(){
		if (activeLevel.PreviousSibling != null){
			activeLevel = activeLevel.PreviousSibling;
		}
	}

}