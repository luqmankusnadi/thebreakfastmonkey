#pragma strict

private var targetPos : Vector3;
private var currentPos : Vector3;
private var startTime : float;
private var isMove : boolean = false;
private var maxTheme : int = 3;
private var theme : int = 1;
private var distance : float;
private var unlockedTheme : int;

function Start () {
	AudioManager.PlayMusic(this.audio);
	unlockedTheme = ((PlayerPrefs.GetInt("UnlockedLevel",1)-1)/12)+1;
	if(unlockedTheme > 1) unlockedTheme = 1;
	distance = 8.5f;
}

function Update () {
	Move();
	if(Input.GetKeyDown(KeyCode.Escape))
	{
		Application.LoadLevel("MainMenu");
	}
}

function Move()
{
	if(!isMove)
	{
		currentPos = this.transform.position;
		targetPos = this.transform.position;
		if(InputHandler.GetGesture() == Gesture.SwipeL)
		{
			if(theme < maxTheme)
			{
				theme++;
				targetPos.x -= distance;
				isMove = true;
				startTime = Time.unscaledTime;
			}
		}
		else if(InputHandler.GetGesture() == Gesture.SwipeR)
		{
			if(theme > 1)
			{
				theme--;
				targetPos.x += distance;
				isMove = true;
				startTime = Time.unscaledTime;
			}
		}
		else if(InputHandler.GetGesture() == Gesture.Tap && theme<=unlockedTheme)
		{
			Application.LoadLevel("LevelMenu");
		}
	}
	else
	{
		if(targetPos == this.transform.position) isMove = false;
		this.transform.position = Vector3.Slerp(currentPos, targetPos, (Time.unscaledTime - startTime)*2);
	}
}