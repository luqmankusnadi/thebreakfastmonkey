#pragma strict

private var topPos : float;
private var bottomPos : float;
private var bottomTitlePos : float;
private var moveSpeed : float;
private var gearSpeed : float;
private var accelerateVal : float;
private var nowPos : float;
private var scalingSpeed : float;

private var curMousePos : Vector2;

function Start () {
	topPos = 5.5f;
	bottomPos = 0.3481474f;
	bottomTitlePos = 0.8118682f;
	moveSpeed = 18f;
	gearSpeed = 400f;
	accelerateVal = 0.01f;
	scalingSpeed = 0.1f;
	this.transform.position.y = topPos;
}

function Update () {
	if (GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupCredits) // Credits Button Clicked
	{
		this.transform.position.y = bottomPos;
		GameObject.Find('PopUp_Settings').transform.position.y = topPos;
	}
	else
	{
		if (GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupCreditsUp)
		{
			if (this.transform.position.y < topPos)
			{
				accelerateVal += 0.01f;
				nowPos = this.transform.position.y + (moveSpeed+accelerateVal) * Time.unscaledDeltaTime;
				GameObject.Find('ButtonConfig').transform.eulerAngles.z += (gearSpeed+accelerateVal) * Time.unscaledDeltaTime;
				
				if (nowPos > topPos)
				{
					this.transform.position.y = topPos;
					AudioManager.PlaySfx(this.audio);
				}
				else
				{
					this.transform.position.y = nowPos;
					AudioManager.PlaySfx(this.audio);
				}
			}
			else
			{
				GameObject.Find('bg_atas').renderer.enabled = true;
		
				if (GameObject.Find('Title').transform.position.y > bottomTitlePos)
				{
					accelerateVal += 0.01f;
					moveSpeed = 8f;
					nowPos = GameObject.Find('Title').transform.position.y - (moveSpeed+accelerateVal) * Time.unscaledDeltaTime;
					if (nowPos < bottomTitlePos)
					{
						GameObject.Find('Title').transform.position.y = bottomTitlePos;
					}
					else
					{
						GameObject.Find('Title').transform.position.y = nowPos;
					}
					GameObject.Find('ButtonConfig').transform.eulerAngles.z -= (gearSpeed+accelerateVal) * Time.unscaledDeltaTime;
					
				}
				else
				{
					GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupCreditsUp = false;
				}
			}
		}
	}
}

function OnMouseUpAsButton()
{
	if (GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupCredits)
	{
		GameObject.Find('Credits_Text').GetComponent(CreditText).isMove = false;
	}
}

function OnMouseDrag()
{
	if (GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupCredits)
	{
		
	}
}