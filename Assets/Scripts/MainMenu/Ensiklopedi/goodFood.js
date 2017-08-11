#pragma strict

function Start () {
	
}

function Update () {

}

function OnMouseUpAsButton()
{
	if (GameObject.Find('Main Camera').GetComponent(EnsiklopediController).badFoodPage)
	{
		GameObject.Find('BookFrameBad').transform.position.y = -1000f;
		GameObject.Find('BookFrameGood').transform.position.y = 0f;
  		
		this.renderer.sortingOrder = 1;
		GameObject.Find('badfood_bookmark').renderer.sortingOrder = 0;
		GameObject.Find('Main Camera').GetComponent(EnsiklopediController).badFoodPage = false;
		
		if (PlayerPrefs.GetInt("EnsiklopediBroccoli") == 1)
		{
			GameObject.Find('Main Camera').GetComponent(EnsiklopediController).Display("Broccoli");
		}
		else
		{
			GameObject.Find('Main Camera').GetComponent(EnsiklopediController).Display("- - -");
			GameObject.Find('Main Camera').GetComponent(EnsiklopediController).caloriesText.text = "-";
			GameObject.Find('Main Camera').GetComponent(EnsiklopediController).fatText.text = "-";
			GameObject.Find('Main Camera').GetComponent(EnsiklopediController).carbsText.text = "-";
		}
	}
}