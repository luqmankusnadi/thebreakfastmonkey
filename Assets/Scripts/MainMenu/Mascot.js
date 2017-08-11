#pragma strict

private var mPosition : float = 1.8F;
private var mRadius : float = 7.7F;
private var accelerator : float = 0.032f;
private var moveUp : boolean;
private var deltaPos : float;
private var newPos : Vector3;
private var initialPos : Vector3;
public var mascotSmoother : float;
	
function Start () {
	this.transform.position = new Vector3(2f+Mathf.Sin(mPosition)*mRadius, 7f+Mathf.Cos(mPosition)*mRadius, -5f);
	moveUp = true;
	deltaPos = 0.1f;
	initialPos = this.transform.position;
}


function Update () {
	if (GameObject.Find('MainMenuController').GetComponent(MainMenuController).monkeySwing)
	{
		
		if (mPosition < 3.6f)
		{
			if (mPosition == 1.8f)
				AudioManager.PlaySfx(this.audio);
			mPosition += .03F + accelerator;
    		this.transform.position = new Vector3(0.005f+Mathf.Sin(mPosition)*mRadius, 4.6f+Mathf.Cos(mPosition)*mRadius, -5f);
    		if (mPosition >= 3.6f)
				initialPos = this.transform.position;
    	}
    	else
    	{
    		accelerator = 0.032f;
    		GameObject.Find('MainMenuController').GetComponent(MainMenuController).bookShow = true;
    	}
	}
	if (GameObject.Find('MainMenuController').GetComponent(MainMenuController).bookShow)
	{
		if (moveUp)
		{
			newPos = new Vector3(this.transform.position.x,this.transform.position.y+deltaPos,this.transform.position.z);
			this.transform.position = Vector3.Slerp(this.transform.position,newPos,Time.unscaledDeltaTime*mascotSmoother);
			if (initialPos.y+deltaPos < this.transform.position.y)
			{
				moveUp = false;
			}
		}
		else
		{
			newPos = new Vector3(this.transform.position.x,this.transform.position.y-deltaPos,this.transform.position.z);
			this.transform.position = Vector3.Slerp(this.transform.position,newPos,Time.unscaledDeltaTime*mascotSmoother);
			if (initialPos.y > this.transform.position.y)
				moveUp = true;
		}
	}
}