#pragma strict

var onTriggerEffect : GameObject;

public class TileFrozen extends Tile implements Activeable,Triggerable{
	public function TileFrozen(){
				
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
		var hitColliders = Physics.OverlapSphere(this.transform.position, 100);
		for (var i = 0; i < hitColliders.Length; i++) {
			var mb : MonoBehaviour = hitColliders[i].gameObject.GetComponent(Monster);
				if(mb instanceof Freezeable)
				{
					var freezeable : Freezeable = mb;
					freezeable.Freeze();
				}
		}
		this.enabled = false;
		for (var child : Transform in transform) {
    		child.gameObject.active = false;
		}
		Debug.Log("tile frozen diaktifkan");
	}
	
	public function Deactivate(){
		Debug.Log("tile frozen dinon-aktifkan");
	}
	
	
}
