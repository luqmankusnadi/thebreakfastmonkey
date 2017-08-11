#pragma strict

private var startFadeIn : boolean;
private var alpha : float;

function Start () 
{
	startFadeIn = false;
	alpha = 0f;
	this.renderer.material.color = Color(1,1,1,alpha);
}

function Update () 
{
	if (!startFadeIn)
	{
		startFadeIn = (GameObject.Find('Mascot').transform.position.x <= -2.9f);
	}
	else
	{
		if (alpha <= 1f)
			alpha += 0.05f;
		this.renderer.material.color = Color(1,1,1,alpha);
	}
}