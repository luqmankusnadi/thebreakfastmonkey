#pragma strict

public class DropObject extends MonoBehaviour
{
	function Start(){
		//InvokeRepeating("IsOnTile", 0, 0.2);
	}
	function Update()
	{
		IsOnTile();
	}
	function IsOnTile () {
		var origin : Vector3 = transform.position;
		origin.y += 2;
		var tileLayer = 1 << 8;
		if(!Physics.Raycast(origin, Vector3.down, 3, tileLayer))
		{
			Drop();
		}
	}
	function Drop()
	{
		var rigidbody : Rigidbody = this.GetComponent(Rigidbody);
		rigidbody.isKinematic = false;
		rigidbody.useGravity = true;
		//Destroy(this.gameObject, 3);
		CancelInvoke("IsOnTile");
		var moveable : MonoBehaviour = this.gameObject.GetComponent(Moveable);
		if(moveable!=null) moveable.enabled = false; 
		if(this.gameObject.name!="Player") Destroy(this.gameObject, 3);
		this.enabled = false;
	}
}