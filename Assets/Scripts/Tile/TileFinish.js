#pragma strict

public class TileFinish extends Tile implements Activeable,Triggerable{
	//public var onTriggerEffect : GameObject;

	public function TileBurn(){
				
	}
	
	public function Update(){
		if (this.IsTriggered()){
			this.Activate();
			this.Deactivate();
		}
	}
	
	public function Activate(){
		GameController.instance.State = GameController.instance.Win;
		Destroy(GameObject.Find("InputHandler"));
	}
	
	public function Deactivate(){
	}
	
	
}
