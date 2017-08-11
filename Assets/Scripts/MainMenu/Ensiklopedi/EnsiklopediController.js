#pragma strict

public var titleText : TextMesh;
public var descriptionText : TextMesh;
public var caloriesText : TextMesh;
public var fatText : TextMesh;
public var carbsText : TextMesh;
public var badFoodPage : boolean;

function Start () {
	AudioManager.PlayMusic(this.audio);
	badFoodPage = true;
	
	GameObject.Find('BookFrameGood').transform.position.y = -1000f;
  	GameObject.Find('BookFrameBad').transform.position.y = 0f;
}

function Update () {
	if (Input.GetKeyDown(KeyCode.Escape))
		Application.LoadLevel("MainMenu");
}

function Display(nowDisplay : String)
{
	titleText.text = nowDisplay;
	if (badFoodPage)
	{
		GameObject.Find("BubblegumDisplay").renderer.enabled=false;
		GameObject.Find("BurgerDisplay").renderer.enabled=false;
		GameObject.Find("FriesDisplay").renderer.enabled=false;
		GameObject.Find("PizzaDisplay").renderer.enabled=false;
	}
	else
	{
		GameObject.Find("BroccoliDisplay").renderer.enabled=false;
		GameObject.Find("CarrotDisplay").renderer.enabled=false;
		GameObject.Find("EggplantDisplay").renderer.enabled=false;
		GameObject.Find("StrawberryDisplay").renderer.enabled=false;
		GameObject.Find("EggDisplay").renderer.enabled=false;
		GameObject.Find("MilkDisplay").renderer.enabled=false;
	}
	
	if (nowDisplay != "- - -")
		GameObject.Find(nowDisplay+'Display').renderer.enabled=true;
	
	switch (nowDisplay)
	{
		case "Pizza" :
			descriptionText.text = "Pizza is an oven-baked flat bread usually\ntopped with tomato sauce, cheese and\nvarious toppings. The modern pizza was\ninvented in Naples, Italy, and the dish has\nsince become popular in many parts of\nthe world.";
			caloriesText.text = "266";
			fatText.text = "15%";
			carbsText.text = "11%";
			break;
		case "Burger" :
			descriptionText.text = "Hamburger is a sandwich consisting of\ncooked patties of ground meat, usually\nbeef, placed inside a sliced bun.";
			caloriesText.text = "295";
			fatText.text = "21%";
			carbsText.text = "8%";
			break;
		case "Fries":	
			descriptionText.text = "French fries are batons of deep-fried\npotato. The term fries refers to any\nelongated pieces of fried potatoes,\nlong and thinly cuts.";
			caloriesText.text = "312";
			fatText.text = "23%";
			carbsText.text = "13%";
			break;
		case "Bubblegum":
			descriptionText.text = "Bubble gum is a type of chewing gum,\ndesigned to be inflated out of the\nmouth as a bubble.";
			caloriesText.text  = "247";
			fatText.text = "0%";
			carbsText.text = "23%";
			break;
		case "Broccoli":
			descriptionText.text = "Broccoli is an edible green plant in the\ncabbage family, whose large flowering\nhead is used as a vegetable.\nBroccoli is often boiled or steamed\nbut may be eaten raw.";
			caloriesText.text = "34";
			fatText.text = "0%";
			carbsText.text = "2%";
			break;
		case "Carrot":
			descriptionText.text = "Carrot is a root vegetable, usually\norange in colour, though purple, red,\nwhite, and yellow varieties exist. It has a\ncrisp texture when fresh. The most\ncommonly eaten part of a carrot is a\ntaproot, although the greens are\nsometimes eaten as well.";
			caloriesText.text = "41";
			fatText.text = "0%";
			carbsText.text = "3%";
			break;
		case "Eggplant":
			descriptionText.text = "Eggplant is a species of nightshade\ncommonly known in British English as\naubergine and also known as melongene,\ngarden egg, or guinea squash. It is known \nin South Asia, Southeast Asia and South\nAfrica as brinjal.";
			caloriesText.text = "25";
			fatText.text = "0%";
			carbsText.text = "2%";
			break;
		case "Strawberry":
			descriptionText.text = "Strawbery is a widely grown hybrid\nspecies of the genus Fragaria. It is\ncultivated worldwide for its fruit. The\nfruits widely appreciated for its\ncharacteristic aroma, bright red color,\njuicy texture, and sweetness.";
			caloriesText.text = "33";
			fatText.text = "0%";
			carbsText.text = "2%";
			break;
		case "Egg":
			descriptionText.text = "Eggs are laid by female animals of many\ndifferent species, including birds,\nreptiles, amphibians, and fish, and have\nbeen eaten by humans for thousands of\nyears.";
			caloriesText.text = "155";
			fatText.text = "16%";
			carbsText.text = "0%";
			break;
		case "Milk":
			descriptionText.text = "Milk is a white liquid produced by the\nmammary glands of mammals. It is the\nprimary source of nutrition for young\nmammals before they are able to digest\nother types of food.";
			caloriesText.text = "42";
			fatText.text = "1%";
			carbsText.text = "1%";
			break;
		default :
			descriptionText.text = "-"; 
			break;
	}
}