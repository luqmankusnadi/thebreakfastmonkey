#pragma strict

function Start () {

}

function OnMouseUpAsButton () {
	if (this.renderer.enabled)
	{
		AudioManager.PlaySfx(this.audio);
		Application.Quit();
	}
}