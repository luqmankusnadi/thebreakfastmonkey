#pragma strict

public var levelThumbnails;
private var selectedLevelIndex : int = 11;
private var selectedLevel : LevelThumbnail;
private var startTime : float;

function Awake()
{
	var obj = GameObject.Find("Joystick");
	if(obj != this.gameObject) Destroy(obj);
	DontDestroyOnLoad(this.gameObject);
}

function Start () {
}

function Update () {
	switch(Application.loadedLevel)
	{
		case 0:
			if(Input.GetKeyUp(KeyCode.JoystickButton2))
			{
				Application.LoadLevel("ThemeMenu"); 
			}
			break;
		case 1: break;
		case 2:
			if(Input.GetKeyUp(KeyCode.JoystickButton1))
			{
				Application.LoadLevel("MainMenu"); 
			} 
			break;
		case 3:
			if(Input.GetKeyUp(KeyCode.JoystickButton2) && selectedLevel != null)
			{
				 selectedLevel.OnMouseUpAsButton();
			}
			else if(Input.GetKeyUp(KeyCode.JoystickButton1))
			{
				Application.LoadLevel("ThemeMenu"); 
			}
			if(Time.unscaledTime - startTime > 0.3)
			{
				if(Input.GetAxis("Vertical")>0)
				{
				 	selectedLevelIndex+=4;
				 	startTime = Time.unscaledTime;
				}
				else if(Input.GetAxis("Vertical")<0)
				{
				 	selectedLevelIndex-=4;
				 	startTime = Time.unscaledTime;
				}
				else if(Input.GetAxis("Horizontal")<0)
				{
				 	selectedLevelIndex++;
				 	startTime = Time.unscaledTime;
				}
				else if(Input.GetAxis("Horizontal")>0)
				{
				 	selectedLevelIndex--;
				 	startTime = Time.unscaledTime;
				}
				selectedLevelIndex = (selectedLevelIndex+12) % 12;
			}
			//if(levelThumbnails == null)
			levelThumbnails = GameObject.FindObjectsOfType(typeof(LevelThumbnail));
			var i = 0;
			for(var levelThumbnail : LevelThumbnail in levelThumbnails)
			{
				if(i==selectedLevelIndex)
				{
					selectedLevel = levelThumbnail;
					levelThumbnail.transform.position.z = -1;
				}
				else levelThumbnail.transform.position.z = 0;
				i++;
			}
			break;
		case 4:
			if(GameController.instance != null)
			{
				if(GameController.instance.State == GameController.instance.Lose) 
				{
					if(Input.GetKeyUp(KeyCode.JoystickButton1))
					{
						Destroy(GameController.instance);
						Application.LoadLevel("LevelMenu");
					}
					else if(Input.GetKeyUp(KeyCode.JoystickButton2))
					{
						Destroy(GameController.instance);
						Application.LoadLevel(Application.loadedLevel);
					}
				}
				if(GameController.instance.State == GameController.instance.Win) 
				{
					if(Input.GetKeyUp(KeyCode.JoystickButton2))
					{
						Destroy(GameController.instance);
						Application.LoadLevel("LevelMenu");
					}
				}
			}
			break;
	}
}