#pragma strict

private var topPos : float;
private var bottomPos : float;
private var bottomTitlePos : float;
private var moveSpeed : float;
private var gearSpeed : float;
private var accelerateVal : float;
private var nowPos : float;

function Start () {
	bottomTitlePos = 0.8118682f;
	topPos = 5.5f;
	bottomPos = 0.3481474f;
	moveSpeed = 18f;
	gearSpeed = 400f;
	accelerateVal = 0.01f;
	this.transform.position.y = topPos;
}

function Update () {
	if (GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupSettings)
	{
		if (this.transform.position.y > bottomPos)
		{
			accelerateVal += 0.01f;
			nowPos = this.transform.position.y - (moveSpeed+accelerateVal) * Time.unscaledDeltaTime;
			GameObject.Find('ButtonConfig').transform.eulerAngles.z -= (gearSpeed+accelerateVal) * Time.unscaledDeltaTime;
			if (nowPos < bottomPos)
			{
				this.transform.position.y = bottomPos;
			}
			else
			{
				this.transform.position.y = nowPos;
			}
		}
		else
		{
			accelerateVal = 0.01f;
		}
	}
	else
	{
		if (GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupSettingsUp)
		{
			if (this.transform.position.y < topPos)
			{
				accelerateVal += 0.01f;
				this.transform.position.y  += (moveSpeed+accelerateVal) * Time.unscaledDeltaTime;
				GameObject.Find('ButtonConfig').transform.eulerAngles.z += (gearSpeed+accelerateVal) * Time.unscaledDeltaTime;
				
			}
			else
			{
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
					GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupSettingsUp = false;
				}
			}
		}
	}
}