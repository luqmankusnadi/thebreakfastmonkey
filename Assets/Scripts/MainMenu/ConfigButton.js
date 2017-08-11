#pragma strict

private var alpha : float;
private var gearSpeed : float;
private var fadeVal : float;
private var bottomTitlePos : float;
private var bottomPos : float;

function Start () {
	alpha = 0f;
	gearSpeed = 400f;
	fadeVal = 0.02f;
	bottomTitlePos = 0.8118682f;
	bottomPos = 0.3481474f;
	this.renderer.material.color = Color(1,1,1,alpha);
}

function Update () {
	if (alpha <= 1f)
	{
		alpha += fadeVal;
		if (alpha > 1f)
			AudioManager.PlaySfx(this.audio);
	}
	else
	{
		GameObject.Find('MainMenuController').GetComponent(MainMenuController).titleDown = true;
		if (GameObject.Find('MainMenuController').GetComponent(MainMenuController).configState == 1)
		{
			this.transform.eulerAngles.z -= gearSpeed * Time.unscaledDeltaTime;
		}
		else if (GameObject.Find('MainMenuController').GetComponent(MainMenuController).configState == 2)
		{
			this.transform.eulerAngles.z += gearSpeed * Time.unscaledDeltaTime;
		}
	}
	this.renderer.material.color = Color(1,1,1,alpha);
}

function OnMouseUpAsButton ()
{
	if (GameObject.Find('Book').renderer.material.color.a >= 1f && 
		GameObject.Find('Title').transform.position.y <= bottomTitlePos)
		
		GameObject.Find('MainMenuController').GetComponent(MainMenuController).configState = 2;
		AudioManager.PlaySfx(this.audio);
	
	if (GameObject.Find('PopUp_Settings').transform.position.y <= bottomPos || 
		GameObject.Find('PopUp_Credits').transform.position.y <= bottomPos)
	{
		if (GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupCredits)
		{
			GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupCreditsUp = true;
			GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupCredits = false;
			GameObject.Find('bg_atas').renderer.enabled = false;
			GameObject.Find('Credits_Text').GetComponent(CreditText).isMove = true;
			GameObject.Find('Credits_Text').transform.position.y = 0.2180343f;
		}
		else if (GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupSettings)
		{
			GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupSettingsUp = true;	
			GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupSettings = false;
		} 
		AudioManager.PlaySfx(this.audio);
	}
	
}