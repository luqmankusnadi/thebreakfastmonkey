#pragma strict

function Start () {

}

function Update () {

}

function OnMouseUpAsButton()
{
	AudioManager.PlaySfx(this.audio);
	Time.timeScale = GameController.gameTimeScale;
	Application.LoadLevel("MainMenu");
}