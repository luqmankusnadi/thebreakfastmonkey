#pragma strict
public class BurgerMonster extends Monster implements Attackable,Moveable,Freezeable{
	protected var isMove: boolean;
	protected var isFrozen: boolean;
	protected var speed: float = 0.5f;
	protected var movePattern: Array = ['L','r','r'];
	protected var startTime: float;
	private var attackPoints: int = 1;
	
	private var animator : Animator;
	
	private var intersectWithPlayer: boolean = false;
	function Start(){
		this.health = 100;
		this.isMove = true;
		this.isFrozen = false;
		this.startTime = Time.time;
		this.onGoing = false;
		this.currentPos = this.transform.position;
		this.nextPos = this.transform.position;
		//this.SetMovePattern(['l','r']);
		//this.SetMovePattern(['L','L','L','U','U','U','R','R','R','D','D','D']);
		this.cmId = 0;
		animator = GetComponent(Animator);
	}
	
	function Update(){
		if (this.isMove){
			this.Move();
		} else {
			this.Idle();
		}
	}

	function OnTriggerEnter(col: Collider){
		this.intersectWithPlayer = true;
		var mb : MonoBehaviour = col.gameObject.GetComponent(Player);
		if(mb!=null && mb instanceof Damageable)
		{
			var object : Damageable = mb; 
			if(object.IsAlive()) this.Attack(mb);
		}
	}
	
	function OnTriggerExit(col:Collider){
		if (col.gameObject.name == "Player"){
			this.intersectWithPlayer = false;
		}
	}
	
	private var cmId: int;
	private var onGoing: boolean;
	private var currentPos: Vector3;
	private var nextPos: Vector3;
	private var currentMove: String;
	
	function Move(){
		if (!this.onGoing){
			this.currentMove = this.movePattern[cmId];
			this.currentPos = this.transform.position;
			this.nextPos = this.getNextPos(this.currentMove);
			this.onGoing = true;
			this.startTime = 0;
			this.GetComponent(DropObject).enabled = false;
		}
		this.transform.position = Vector3.Lerp(currentPos,nextPos, (startTime) * speed);
		var yposition : float = (startTime*speed <= 1 ? startTime*speed : 1);
		yposition = yposition > 0.5 ? 1 - yposition : yposition;
		this.transform.position.y = (yposition-(yposition*yposition))*8;
		startTime += Time.deltaTime;
		if (this.transform.position.x == this.nextPos.x && this.transform.position.z == this.nextPos.z){
			this.GetComponent(DropObject).enabled = true;
			this.onGoing = false;
			this.ToNextMove();
		}
	}
	private function SetMove()
	{
		if(!isFrozen)
			this.isMove = true;
	}
	function SetMovePattern(s: Array){
		this.movePattern = [];
		for(var i in s){
			this.movePattern.push(i);
		}
	}
	function SetSpeed(s: float){
		this.speed = s;
	}
	
	function ToNextMove(){
		this.cmId = (this.cmId + 1) % this.movePattern.length;
		this.isMove = false;
		Invoke("SetMove", 1);
	}
	function Idle(){}
	
	function Freeze(){
		this.isFrozen = true;
		animator.SetBool("isFrozen", true);
		this.isMove = false;
		this.CancelInvoke("Unfreeze");
		this.Invoke("Unfreeze", 3);
	}
	
	function Unfreeze(){
		this.isFrozen = false;
		animator.SetBool("isFrozen", false);
		this.isMove = true;
	}
	
	function SetAttackPoints(amount:int){
		this.attackPoints = amount;
	}
	
	function Attack(object: Damageable){
		object.ReceiveDamage(this.attackPoints);
	}
	
	//jika sebelahnya tembok, return current position
	function getNextPos(c: String) : Vector3{
		var ret = this.transform.position;
		
		if (c == "l"){
			ret.x -= 1.0;
		} else if (c == "r"){
			ret.x += 1.0;
		} else if (c == "u"){
			ret.z += 1.0;
		} else if (c == "d"){
			ret.z -= 1.0;
		} else if (c == "L"){
			ret.x -= 2.0;
		} else if (c == "R"){
			ret.x += 2.0;
		} else if (c == "U"){
			ret.z += 2.0;
		} else if (c == "D"){
			ret.z -= 2.0;
		}
		//print("current pos" + this.transform.position+" next pos" + ret);
		//print("Is tile exist" + Monster.IsTileExist(ret));
		//if (!Monster.IsTileExist(ret)){
		//	return this.transform.position;
		//} else {
			return ret;
		//}
	}
	
	
}