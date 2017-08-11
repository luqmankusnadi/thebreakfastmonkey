#pragma strict

function Start () {

}

function Update () {

}

function OnMouseUpAsButton()
{
	AudioManager.PlaySfx(this.audio);
	transform.parent.gameObject.SetActive(false);
	GameController.instance.State = GameController.instance.Play;
	Time.timeScale = GameController.gameTimeScale;
}