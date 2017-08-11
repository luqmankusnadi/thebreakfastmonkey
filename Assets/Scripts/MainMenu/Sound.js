#pragma strict

function OnAwake () {
	if (PlayerPrefs.GetInt("SoundsOn") == 0)
	{
		this.renderer.enabled = false;
	}
	else if (PlayerPrefs.GetInt("SoundsOn") == 1)
	{
		this.renderer.enabled = true;
	}
	AudioManager.UpdateSettings();
}

function Update () {
	
}

function OnMouseUpAsButton ()
{
	if (GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupSettings)
	{
		this.renderer.enabled = (!this.renderer.enabled);
		if (this.renderer.enabled)
			PlayerPrefs.SetInt("SoundsOn", 1);
		else
			PlayerPrefs.SetInt("SoundsOn", 0);
		AudioManager.UpdateSettings();
	}
}