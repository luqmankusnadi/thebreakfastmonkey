#pragma strict
//semua tile dianggap dapat ditrigger
public class Tile extends MonoBehaviour implements Triggerable{
	protected static var player: GameObject = null;
	protected var collideWithPlayer : boolean = false;
	
	//get the player character
	public static function Player() : GameObject {
		if (player == null){
			player = GameObject.Find("Player");
		}
		return player;
	}
	
	//cek apakah tile ini sedang diaktifkan oleh user
	public function IsTriggered(){
		return (InputHandler.GetGesture() == Gesture.Tap && this.collideWithPlayer);
	}
	
	protected function OnTriggerEnter(col: Collider){
		if (col.gameObject.name == "Player"){
			this.collideWithPlayer = true;
		}
	}
	
	protected function OnTriggerExit(col: Collider){
		if (col.gameObject.name == "Player"){
			this.collideWithPlayer = false;
		}
	}
	
	public var onDestroyEffect : GameObject;
	public var materials : Material[]; // Material yg dirandom
	protected var isQuitting : boolean = false; 

	protected function Start () {
		renderer.material = materials[Random.Range(0,materials.Length)]; // Randomize material
	}

	protected function OnApplicationQuit() 
	{ 
		isQuitting = true; 
	} 

	protected function OnDestroy()
	{
		if(!isQuitting)
		{
			if(GameController.instance != null)
			{
				if(GameController.instance.State == GameController.instance.Play)
				{ 
					var clone : GameObject = Instantiate(onDestroyEffect, transform.position, Quaternion.identity);
					Destroy(clone, 2);
				}
			}
		}
	}
}

