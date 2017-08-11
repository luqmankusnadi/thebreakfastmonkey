#pragma strict

private var bottomPos = 0.3481474f;
function Start () {
	
}

function Update () {
	
}

function OnMouseUpAsButton ()
{
	if ((GameObject.Find('PopUp_Settings').transform.position.y <=bottomPos || 
		GameObject.Find('PopUp_Credits').transform.position.y <= bottomPos))
	{
		if (GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupCredits)
		{
			GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupCreditsUp = true;
			GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupCredits = false;
			AudioManager.PlaySfx(this.audio);
			GameObject.Find('Credits_Text').GetComponent(CreditText).isMove = true;
			GameObject.Find('Credits_Text').transform.position.y = 0.2180343f;
			GameObject.Find('bg_atas').renderer.enabled = false;
		}
		else if (GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupSettings)
		{
			GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupSettingsUp = true;
			AudioManager.PlaySfx(this.audio);	
			GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupSettings = false;
		} 
	}
}