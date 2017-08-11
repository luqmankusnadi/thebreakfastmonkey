#pragma strict

function Start () {
	if (PlayerPrefs.GetInt("MusicOn") == 0)
	{
		this.renderer.enabled = false;
	}
	else if (PlayerPrefs.GetInt("MusicOn") == 1)
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
			PlayerPrefs.SetInt("MusicOn", 1);
		else
			PlayerPrefs.SetInt("MusicOn", 0);
		AudioManager.UpdateSettings();
	}
}