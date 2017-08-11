#pragma strict

function Start () {

}

function Update () {

}

function OnMouseUpAsButton()
{
	if (this.renderer.enabled)
	{
		AudioManager.PlaySfx(this.audio);
		GameObject.Find('Quit').renderer.enabled = false;
		GameObject.Find('yes').renderer.enabled = false;
		GameObject.Find('no').renderer.enabled = false;
	}
}