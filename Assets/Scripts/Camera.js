#pragma strict

public class Camera extends MonoBehaviour
{
	private var isMove : boolean;
	private var steps : int; 
	private var startPos : float;
	private var nextPos : float;

	function Start () {
		steps = int.Parse(LevelService.xmlDoc.GetElementsByTagName("map")[0].SelectSingleNode("length").InnerText) - 1;
		isMove = true;
		startPos = this.transform.position.z;
		for (var i : int = 0; i <= steps*2-10; i++) 
		{
			if (isMove)
			{
				print("isMove false");
			
				isMove = false;
				
				yield WaitForSeconds(3f); //waktu jeda utk diam
			}
			else
			{
				nextPos = Mathf.Round(this.transform.position.z - startPos - 1); 
				print("isMove True");
				
				isMove = true;
				
				yield WaitForSeconds(1f); //waktu jeda utk bergerak
			}
		}
	}

	function Update () {
		if (isMove)
		{
			if(this.transform.position.z - startPos > nextPos)
				this.transform.position.z -= Time.deltaTime;
			else
				this.transform.position.z = nextPos + startPos;
		}	
	}
}