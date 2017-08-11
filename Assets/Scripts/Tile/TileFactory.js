#pragma strict
//belum jadi
public class TileFactory extends MonoBehaviour{
	public function getTile(tileName : String){
		if (tileName == 'tilefrozen'){
			return new TileFrozen();
		}
	}
}