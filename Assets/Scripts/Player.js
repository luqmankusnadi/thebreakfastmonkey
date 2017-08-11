#pragma strict

public class Player extends MonoBehaviour implements Damageable, Burnable
{
	public var health : int = 3;
	public var score : int = 0;
	
	private enum state {alive = 0, dead = 1} 
	private var playerState : int = state.alive;

	private var startPoint : Vector3;
	private var startTime : float;
	private var endPoint : Vector3;
	public var speed : float = 3f;

	private var charMove : boolean;

	public var animator : Animator;
		
	function Start () {
		startPoint = transform.position;
		endPoint = startPoint;
		charMove = false;
		animator = GetComponent(Animator);
	}

	function Update () {
		switch(playerState)
		{
			case state.alive:
				Controller();
				if(GetComponent(DropObject).enabled==false) health = 0;
				if(health<=0) playerState = state.dead;
				break;
			case state.dead:
				PlayerDead();
				break;
		}
	}

	function Move(direction : Vector3)
	{
		startPoint = transform.position;
		endPoint = startPoint;
		
		endPoint += direction;
		
	    startTime = Time.time;
	   
		AudioManager.PlaySfx(this.audio);
	}

	function Controller()
	{
		if (!charMove)
		{
			charMove = true;
			
			if(InputHandler.GetGesture() == Gesture.SwipeR && IsTileExist(Vector3.right))
			{
				animator.SetInteger("moveDirection",3);
				Move(Vector3.right);
			}
			else if(InputHandler.GetGesture() == Gesture.SwipeL && IsTileExist(Vector3.left))
			{
				animator.SetInteger("moveDirection",2);
				Move(Vector3.left);
			}
			else if(InputHandler.GetGesture() == Gesture.SwipeU && IsTileExist(Vector3.forward))
			{
				animator.SetInteger("moveDirection",0);
				Move(Vector3.forward);
			}
			else if(InputHandler.GetGesture() == Gesture.SwipeD && IsTileExist(Vector3.back))
			{
				animator.SetInteger("moveDirection",1);
				Move(Vector3.back);
			}
		}
		else
		{	
			transform.position = Vector3.Lerp(startPoint, endPoint, (Time.time - startTime) * speed);
		}
		if (transform.position == endPoint)
		{
			charMove= false;
		}
		animator.SetBool("isMove",charMove);	
	}

	function IsTileExist(direction : Vector3) : boolean
	{
		var origin : Vector3 = transform.position;
		//origin.y += 2;
		var tileLayer = (1 << 8) + (1 << 9);
		//origin += direction;
		var hit : RaycastHit;
		if(Physics.Raycast(origin, direction, hit, 1,tileLayer))
		{
			if(hit.collider.gameObject.name == "Blocker") return false;
			else return true;
		}
		else return false;
	}

	function PlayerDead()
	{
		GameController.instance.State = GameController.instance.Lose;
		animator.SetBool("isAlive",false);
	}
	
	function ReceiveDamage(amount: int)
	{
		animator.SetTrigger("damaged");
		this.health -= amount;
	}
	function IsAlive(): boolean
	{
		return this.health > 0; 
	}
	
	function Burn()
	{
		this.transform.Find("SpeedEffect").active = true;
		this.speed = 6;
		this.CancelInvoke("Unburn");
		this.Invoke("Unburn", 5);
	}
	function Unburn()
	{
		this.transform.Find("SpeedEffect").active = false;
		this.speed = 3;
	}
}