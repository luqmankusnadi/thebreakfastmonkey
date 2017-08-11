#pragma strict

public enum Gesture
{
	None = 0,
	Tap = 1, 
	SwipeR = 2,
	SwipeL = 3,
	SwipeU = 4,
	SwipeD = 5
}

public class InputHandler extends MonoBehaviour
{
	private static var instance : InputHandler;

	private var currentGesture : Gesture = Gesture.None;
	private var swipeDistance : float = 80f;
	private var firstMousePos : Vector2;
	private var deltaMousePos : Vector2;
	
	function Awake()
  	{
    	instance = this;
  	}

  	function OnDestroy()
  	{
    	instance = null;
 	}
 	
 	function Start()
 	{
 		swipeDistance = Screen.height/12;
 	}
	
	static function GetGesture () {
		if(instance!=null)
			return instance.currentGesture;
		else
			return Gesture.None;
	}
	function Update () {
		if(Input.GetMouseButtonDown(0))
		{
			firstMousePos = Input.mousePosition;
		}
		else if(Input.GetMouseButtonUp(0))
		{
			deltaMousePos = Input.mousePosition - firstMousePos;
			if(deltaMousePos.magnitude < 20)
			{
				currentGesture = Gesture.Tap;
			}
			else if((Mathf.Abs(deltaMousePos.x) > swipeDistance) || (Mathf.Abs(deltaMousePos.y) > swipeDistance))
			{
				if(Mathf.Abs(deltaMousePos.x) > Mathf.Abs(deltaMousePos.y))
				{
					if(deltaMousePos.x > 0) currentGesture = Gesture.SwipeR;
					else currentGesture = Gesture.SwipeL;
				}
				else
				{
					if(deltaMousePos.y > 0) currentGesture = Gesture.SwipeU;
					else currentGesture = Gesture.SwipeD;
				}
			}
			else
			{
				currentGesture = Gesture.None;
			}
		}
		else
		{
			currentGesture = Gesture.None;
		}
		if(Input.GetKeyUp(KeyCode.UpArrow) || Input.GetAxis("Vertical")>0) currentGesture = Gesture.SwipeU;
		else if(Input.GetKeyUp(KeyCode.DownArrow) || Input.GetAxis("Vertical")<0) currentGesture = Gesture.SwipeD;
		else if(Input.GetKeyUp(KeyCode.LeftArrow) || Input.GetAxis("Horizontal")<0) currentGesture = Gesture.SwipeL;
		else if(Input.GetKeyUp(KeyCode.RightArrow) || Input.GetAxis("Horizontal")>0) currentGesture = Gesture.SwipeR;
		else if(Input.GetKeyUp(KeyCode.Space) || Input.GetKeyUp(KeyCode.JoystickButton2)) currentGesture = Gesture.Tap;
		
	}
}