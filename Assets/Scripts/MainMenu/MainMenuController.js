#pragma strict

public var configState : int;
// 0 : idle , 1 : rotate CW, 2 : rotate CCW

public var titleDown : boolean;
public var monkeySwing : boolean;
public var bookShow : boolean;
public var popupSettings : boolean;
public var popupCredits : boolean;
public var popupSettingsUp : boolean;
public var popupCreditsUp : boolean;

private var bottomPosTitle : float;
private var topPosTitle : float;
private var bottomPos : float;

function Start () {
	//configState = 0;
	monkeySwing = false;
	bookShow = false;	
	titleDown = false;
	popupSettings = false;
	popupCredits = false;
	popupSettingsUp = false;
	popupCreditsUp = false;
	GameObject.Find('Quit').renderer.enabled = false;
	GameObject.Find('yes').renderer.enabled = false;
	GameObject.Find('no').renderer.enabled = false;
	bottomPosTitle = 0.8118682f;
	topPosTitle = 5.5f;
	bottomPos = 0.3481474f;
	AudioManager.PlayMusic(this.audio);
}

function Update () {
	if (Input.GetKeyDown(KeyCode.Escape))
	{
		if (GameObject.Find('Title').transform.position.y <= bottomPosTitle)
		{
			GameObject.Find('Quit').renderer.enabled = true;
			GameObject.Find('yes').renderer.enabled = true;
			GameObject.Find('no').renderer.enabled = true;
		}
		else if (GameObject.Find('PopUp_Settings').transform.position.y <= bottomPos)
		{
			if (GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupSettings)
			{
				GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupSettingsUp = true;	
				GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupSettings = false;
			} 
		}
		else if (GameObject.Find('PopUp_Credits').transform.position.y <= bottomPos)
		{
			if (GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupCredits)
			{
				GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupCreditsUp = true;
				GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupCredits = false;
				GameObject.Find('bg_atas').renderer.enabled = false;
			}
		}
	}
}