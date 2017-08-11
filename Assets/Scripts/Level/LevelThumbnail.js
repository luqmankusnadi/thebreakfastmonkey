#pragma strict

import System.Xml;

public class LevelThumbnail extends MonoBehaviour
{

private var initPosition : Vector3;
private var finalPosition : Vector3;
private var initTime : float;
private var isFinished : boolean;
 
public var level : XmlNode;
public var levelId : int;
public var levelNumber : int;
public var theme : String;
public var isUnlocked : boolean;


function Start () {
	isFinished = false;
	SetThumbnail();
	initPosition = this.transform.position;
	finalPosition = initPosition;
	finalPosition.z = 0;
	initTime = Time.time + Random.Range(0f,0.3f);
}

function Update () {
	if(!isFinished)
	{
		var newPosition = Vector3.Lerp(initPosition, finalPosition, (Time.time - initTime)*1.5f);
		this.transform.position =  newPosition;
	}
	if(this.transform.position == finalPosition) isFinished = true;
}

function OnMouseUpAsButton()
{
	if(isUnlocked)
	{
		AudioManager.PlaySfx(this.audio);
		ThemeService.activeLevel = level;
		Application.LoadLevel(theme);
	}
}	

function SetThumbnail()
{
	this.transform.Find("Label").GetComponent(TextMesh).text = levelNumber.ToString();
	this.name = "LevelThumbnail[" + levelNumber + "]";
	if(isUnlocked)
	{
		this.transform.Find("Lock").gameObject.SetActive(false);
	}
	var star = PlayerPrefs.GetInt("Level." + levelId.ToString() + ".Star");
	if(star >= 1) this.transform.Find("Star1").gameObject.SetActive(true);
	if(star >= 2) this.transform.Find("Star2").gameObject.SetActive(true);
	if(star >= 3) this.transform.Find("Star3").gameObject.SetActive(true);
}

}