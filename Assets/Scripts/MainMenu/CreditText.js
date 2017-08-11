#pragma strict
public var isMove : boolean;
private var topLimit : float;
private var botLimit : float;
private var initPos : float;

function Start () {
	botLimit = this.transform.position.y -5.3f;
	topLimit = botLimit + 5.3f;
	isMove = true;
	this.renderer.enabled = false;
	gameObject.GetComponent(TextMesh).text = "The Breakfast Monkey ver. 1.0.\nCopyright 2014 by MonkeyInAction\n\nA game developed and published by :\nMonkeyInAction\n\nCreator :\nLuqman F. Kusnadi (Programmer)\nTony (Programmer)\nM. Yafi (Programmer)\nRosi Lutfiana (Art & Design)\n\nSpecial Thanks to :\n Prisyafandiafif Chandra\n\n Sound & Music :\nsoundjay.com\nsoundbible.com\nfreestockmusic.com\nopengameart.org (syncopika)\nfreesfx.co.uk";
}

function Update () {
	if (GameObject.Find('MainMenuController').GetComponent(MainMenuController).popupCredits)
	{
		this.renderer.enabled = true;
		this.collider.enabled = true;
		if (isMove)
		{
			this.transform.position.y+=0.3f * Time.unscaledDeltaTime;
				
		}
	}
	else
	{
		this.collider.enabled = false;
		this.renderer.enabled = false;
	}
	if(this.transform.position.y > topLimit)
	{
		this.transform.position.y = topLimit;
	}
	else if (this.transform.position.y < botLimit)
	{
		this.transform.position.y = botLimit;
	}
}
function OnMouseUpAsButton()
{
	isMove = true;
}
function OnMouseDown()
{
	print("woiowioai");
	isMove = false;
	var pos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
	initPos = pos.y;
}
function OnMouseDrag()
{
	
	var pos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
	this.transform.position.y += pos.y - initPos;
	initPos = pos.y;
}