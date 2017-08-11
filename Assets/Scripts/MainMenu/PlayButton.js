#pragma strict

function Start () {
}

function Update () {
	
}

function OnMouseUpAsButton ()
{
	if (!GameObject.Find('Quit').renderer.enabled)
	{
		AudioManager.PlaySfx(this.audio);
		this.renderer.enabled = false;
		Application.LoadLevel("ThemeMenu");
	}
}