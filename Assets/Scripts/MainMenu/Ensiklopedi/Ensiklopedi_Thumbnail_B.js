#pragma strict

function Start () {
	if (PlayerPrefs.GetInt("Ensiklopedi"+gameObject.name) == 1)
	{
		this.renderer.enabled = true;
	}
	else
	{
		this.renderer.enabled = false;
	}
	if (GameObject.Find('Main Camera').GetComponent(EnsiklopediController).badFoodPage)
	{
		if (PlayerPrefs.GetInt("EnsiklopediPizza") == 1)
		{
			GameObject.Find('Main Camera').GetComponent(EnsiklopediController).Display("Pizza");
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

function Update () 
{
	
}

function OnMouseUpAsButton()
{	
	if (GameObject.Find('Main Camera').GetComponent(EnsiklopediController).badFoodPage)
	{
		if (this.renderer.enabled)
		{
			GameObject.Find('Main Camera').GetComponent(EnsiklopediController).Display(gameObject.name);
		}
	}
}