#pragma strict

public var isDowned : boolean;
public var isDragged : boolean;

public var initMousePos : Vector3;
public var deltaMousePos : Vector3;
public var initGameObjectPos : Vector3;

public var sensitivity : float;

public var maxScrollUp : float;
public var maxScrollDown : float;

private var mousePosCurrentFrame : Vector3;
private var mousePosNextFrame : Vector3;

function Awake ()
{
	
}

function Start () 
{

}

function Update () 
{
	//simpan posisi di frame setelahnya
	mousePosNextFrame = Input.mousePosition;
	
	//cek di frame berikutnya si posisi mouse itu minus ato positif
	if (deltaMousePos.y > 0) //kalau lagi digeser ke atas
	{
		if (mousePosNextFrame.y - mousePosCurrentFrame.y < 0) //kalau negatif/minus
		{
			initMousePos = mousePosCurrentFrame;
			initGameObjectPos = this.gameObject.transform.position; 
		}
	}
	else
	if (deltaMousePos.y < 0) //kalau lagi digeser ke bawah
	{
		if (mousePosNextFrame.y - mousePosCurrentFrame.y > 0) //kalau positif
		{
			initMousePos = mousePosCurrentFrame;
			initGameObjectPos = this.gameObject.transform.position; 
		}
	}

	if (isDragged)
	{
		//jika sudah melebihi batas maksimal atas scroll
		if (this.gameObject.transform.position.y > maxScrollUp)
		{
			this.gameObject.transform.position.y = maxScrollUp; //gak bisa gerak lebih dari ini
		}
		
		//jika sudah melebihi batas maksimal bawah scroll
		if (this.gameObject.transform.position.y < maxScrollDown)
		{
			this.gameObject.transform.position.y = maxScrollDown; //gak bisa gerak kurang dari ini
		}
		
		//berhentikan teks credit
		GameObject.Find("Object").transform.position.y = GameObject.Find("Object").transform.position.y + 0;
	}
	else
	{
		//gerakkan teks credit
		GameObject.Find("Object").transform.position.y = GameObject.Find("Object").transform.position.y + (1 * Time.deltaTime);
	}
	
	//simpan posisi di frame ini
	mousePosCurrentFrame = Input.mousePosition;
}

function OnMouseDown () //ketika mouse ditekan
{
	isDowned = true;
	
	initMousePos = Input.mousePosition; //simpan posisi mouse saat tekan ke variabel
	initGameObjectPos = this.gameObject.transform.position; //simpan posisi gameobject saat ditekan ke variabel
	
	print("ke-down");
}

function OnMouseUp () 
{
	print("keangkat");
	
	//buat kosong lagi
	deltaMousePos = new Vector3(0,0,0);
	initMousePos = new Vector3(0,0,0);
	
	isDowned = false;
	isDragged = false;
}

function OnMouseDrag () //ketika mouse masih ditahan/dihold
{
	isDragged = true;
	
	print("kedrag");
	
	deltaMousePos = Input.mousePosition - initMousePos; //simpan selisih jarak mouse dengan titik awal
	
	//scroll secara vertikal
	this.gameObject.transform.position.y = initGameObjectPos.y + (deltaMousePos.y * sensitivity);
}

function OnMouseUpAsButton () 
{
	
}