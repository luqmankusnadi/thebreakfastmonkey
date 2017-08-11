#pragma strict

public class Monster extends MonoBehaviour{
	protected var health: int; //semua monster punya nyawa
	
	protected static function IsTileExist(pos: Vector3): boolean {
		pos.y += 2;
		var tileLayer = 1 << 8;
		//return true;
		return Physics.Raycast(pos, Vector3.down, 3, tileLayer);
	}
}