#pragma strict

function Start () {

}

function Update () {
	
}

function OnMouseUpAsButton ()
{
	if (GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupSettings)
	{
		AudioManager.PlaySfx(this.audio);
		GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupCredits = true;
		GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupSettings = false;
	}
}