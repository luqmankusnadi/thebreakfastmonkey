#pragma strict

private var startTime : float;

function Awake () {
	transform.localScale = Vector3.zero;
}

function Start () {
	startTime = Time.unscaledTime;
}

function Update () {
	transform.localScale = Vector3.Slerp(Vector3.zero, Vector3.one, (Time.unscaledTime-startTime)*3);
}
