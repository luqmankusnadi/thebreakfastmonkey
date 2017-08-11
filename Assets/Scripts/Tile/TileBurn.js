#pragma strict

public class TileBurn extends Tile implements Activeable,Triggerable{
	public var onTriggerEffect : GameObject;

	public function TileBurn(){
				
	}
	
	public function Update(){
		if (this.IsTriggered()){
			this.Activate();
			this.Deactivate();
		}
	}
	
	public function Activate(){
		var effectPos : Vector3 = transform.position;
		effectPos.y += 0.25;
		Destroy(Instantiate(onTriggerEffect, effectPos, Quaternion.AngleAxis(90, Vector3.left)),2);
		var target :  Burnable = Player().GetComponent(MonoBehaviour);
		target.Burn();
		this.enabled = false;
		for (var child : Transform in transform) {
    		child.gameObject.active = false;
		}
		Debug.Log("tile burn diaktifkan");
	}
	
	public function Deactivate(){
		Debug.Log("tile burn dinon-aktifkan");
	}
	
	
}
