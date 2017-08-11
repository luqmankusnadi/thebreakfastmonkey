#pragma strict

private var alpha : float;
private var fadeValue : float;

function Start () {
	alpha = 0f;
	fadeValue = 0.02f;
	this.renderer.material.color = Color(1,1,1,alpha);
}

function Update () {
	if (GameObject.Find('MainMenuController').GetComponent(MainMenuController).bookShow)
	{
		if (alpha <= 1f)
		{
			alpha += fadeValue;
		}
		this.renderer.material.color = Color(1,1,1,alpha);
	}
}

function OnMouseUpAsButton ()
{
	if (GameObject.Find('MainMenuController').GetComponent(MainMenuController).configState == 0)
	{
		Application.LoadLevel("Ensiklopedi");	
	}
}