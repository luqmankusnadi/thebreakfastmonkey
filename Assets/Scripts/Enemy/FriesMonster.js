#pragma strict
public class FriesMonster extends Monster implements Attackable,Moveable,Freezeable{
	protected var isMove: boolean;
	protected var isFrozen: boolean;
	protected var speed: float = 5f;
	protected var movePattern: Array = ['l','r'];
	protected var startTime: float;
	private var attackPoints: int = 1;
	
	private var animator : Animator;
	
	private var intersectWithPlayer: boolean = false;
	function Start(){
		this.health = 100;
		this.isMove = true;
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
			if (!Monster.IsTileExist(this.nextPos)){
				this.nextPos = this.currentPos;
			}
			this.onGoing = true;
			this.startTime = 0;
		}
		this.transform.position = Vector3.Lerp(currentPos,nextPos, (startTime) * speed);
		startTime += Time.deltaTime;
		if (this.transform.position == this.nextPos){
			this.onGoing = false;
			this.ToNextMove();
		}
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
		if (this.currentMove == 'l' || this.currentMove == 'r' || this.currentMove == 'd' || this.currentMove == 'u'){
			//jika membentur tembok, ganti
			//print("next move = " + this.currentMove);
			//print("move length = " + this.movePattern.length);
			//print("is tile exist in " + Monster.IsTileExist(this.getNextPos(this.currentMove)));
			if (!Monster.IsTileExist(this.getNextPos(this.currentMove))){
				this.isMove = false;
				Invoke("SetMove", 2);
				this.cmId = (this.cmId + 1) % this.movePattern.length; 
			}
		} else {
			
			this.cmId = (this.cmId + 1) % this.movePattern.length;
		}
	}
	
	private function SetMove()
	{
		if(!isFrozen)
			this.isMove = true;
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
		
		if (c == "L" || c == "l"){
			animator.SetBool("isFacingRight", false);
			ret.x -= 1.0;
		} else if (c == "R" || c == "r"){
			animator.SetBool("isFacingRight", true);
			ret.x += 1.0;
		} else if (c == "U" || c == "u"){
			ret.z += 1.0;
		} else if (c == "D" || c == "d"){
			ret.z -= 1.0;
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