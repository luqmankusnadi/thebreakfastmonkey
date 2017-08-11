#pragma strict

private var bottomPos : float;
private var topPos : float;
private var moveSpeed : float;
private var accelerateVal : float;
private var nowPos : float;

function Start () {
	topPos = 5.5f;
	this.transform.position.y = topPos;
	bottomPos = 0.8118682f;
	moveSpeed = 8f;
	accelerateVal = 0.03f;
	GameObject.Find('MainMenuController').GetComponent(MainMenuController).configState = 1;
}

function Update () {
	if (GameObject.Find('MainMenuController').GetComponent(MainMenuController).titleDown && 
		GameObject.Find('MainMenuController').GetComponent(MainMenuController).configState != 0)
	{
		if (GameObject.Find('MainMenuController').GetComponent(MainMenuController).configState == 1)
		{
			if (this.transform.position.y > bottomPos)
			{
				accelerateVal -= 0.001f;
				nowPos = this.transform.position.y - (moveSpeed+accelerateVal) * Time.unscaledDeltaTime;
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
				accelerateVal = 0.03f;
				GameObject.Find('MainMenuController').GetComponent(MainMenuController).configState = 0;
				GameObject.Find('MainMenuController').GetComponent(MainMenuController).monkeySwing = true;
			}
		}
		else if (GameObject.Find('MainMenuController').GetComponent(MainMenuController).configState == 2)
		{
			if (this.transform.position.y < topPos)
			{
				accelerateVal -= 0.001f;
				this.transform.position.y += (moveSpeed+accelerateVal) * Time.unscaledDeltaTime;
			}
			else
			{
				accelerateVal = 0.03f;
				GameObject.Find('MainMenuController').GetComponent(MainMenuController).configState = 0;
				GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupSettings = true;
			}
		}
	}
}