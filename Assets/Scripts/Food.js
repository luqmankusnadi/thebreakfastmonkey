#pragma strict

public class Food extends MonoBehaviour
{
	public var score : int;
	public var onTriggerEffect : GameObject;
	public var color : Color;
	function Start () {

	}

	function Update () {

	}
	
	function OnTriggerEnter(collider : Collider)
	{
		if(collider.gameObject.GetComponent(Player)!=null)
		{
			var player : Player = collider.gameObject.GetComponent(Player);
			player.score += this.score;
			var effectPos : Vector3 = this.transform.position;
			effectPos.y += 0.25;
			onTriggerEffect.GetComponent(ParticleSystem).startColor = color;
			Destroy(Instantiate(onTriggerEffect, effectPos, Quaternion.identity),2);
			Destroy(this.gameObject);
		}
	}
}