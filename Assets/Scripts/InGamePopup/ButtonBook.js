#pragma strict

function Start () {

}

function Update () {

}

function OnMouseUpAsButton()
{
	AudioManager.PlaySfx(this.audio);
	Destroy(GameController.instance);
	Application.LoadLevel("Ensiklopedi");
}