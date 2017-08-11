#pragma strict

public class GameController extends MonoBehaviour
{
	public static var instance : GameController;
	public static var gameTimeScale : float = 1.0f;

	var guiScore : GameObject;
	var guiScoreBar : GameObject;
	var guiHealth : GameObject[];
	var guiCountdown : GameObject;
	var guiPopup : GameObject;
	var guiPause : GameObject;
	
	var player : GameObject;	
	private var health : int;
	private var score : int;
	public var maxScore : int;
	private var startTime : float;
	
	private var isFF: boolean;
	function get IsFF() : boolean
	{
		var temp = isFF;
		isFF = false;
		return temp;
	}
	private var state : Function;
	function get State() : Function { return state; }
    function set State(value : Function) 
    {
    	isFF = true; 
    	state = value;
    }
	
	function Awake()
  	{
    	instance = this;
    	if(instance == null)
        	instance = GameObject.FindObjectOfType(GameController);
  	}

  	function OnDestroy()
  	{
    	instance = null;
 	}
	
	function Start()
	{
		AudioManager.PlayMusic(this.audio);
		Screen.autorotateToPortrait = false;
		Screen.autorotateToPortraitUpsideDown = false;
		Screen.autorotateToLandscapeLeft = true;
		Screen.autorotateToLandscapeRight = true;
		Screen.orientation = ScreenOrientation.AutoRotation;
		
		SetScoreBar();
		this.startTime = Time.unscaledTime;
		this.State = Intro;
		Time.timeScale = 0;
	}
	
	function Update()
	{
		
		State();
		UpdateScoreBar();
	}
	
	function SetScoreBar()
	{
		var barLength = 3.82f;
		guiScoreBar.transform.Find("Star1").localPosition.x = ScoreManager.starValue[0] * barLength;
		guiScoreBar.transform.Find("Star2").localPosition.x = ScoreManager.starValue[1] * barLength;
		guiScoreBar.transform.Find("Star3").localPosition.x = ScoreManager.starValue[2] * barLength;
		guiScoreBar.transform.Find("Bar").localScale.x = 0;
	}
	function UpdateScoreBar()
	{
		var scoreRatio = maxScore==0?0f:(score+0f)/maxScore;
		guiScoreBar.transform.Find("Bar").localScale.x = scoreRatio;
		if(scoreRatio>=ScoreManager.starValue[0])
		{
			guiScoreBar.transform.Find("Star1").GetChild(0).gameObject.SetActive(true);
			guiScoreBar.transform.Find("Bar").GetComponent(SpriteRenderer).color = Color(0.93f,0.81f,0);
		}
		if(scoreRatio>=ScoreManager.starValue[1])
		{
			guiScoreBar.transform.Find("Star2").GetChild(0).gameObject.SetActive(true);
			guiScoreBar.transform.Find("Bar").GetComponent(SpriteRenderer).color = Color(0,0.93f,0.18f);
		}
		if(scoreRatio>=ScoreManager.starValue[2])
		{
			guiScoreBar.transform.Find("Star3").GetChild(0).gameObject.SetActive(true);
		}
	}
	
	function Intro()
	{
		Time.timeScale = 0;
		if(Time.unscaledTime - this.startTime <= 1)
		{
			guiCountdown.transform.localScale = Vector3.Slerp(Vector3(0.5,0.5,1), Vector2.one, Time.unscaledTime - startTime);
			guiCountdown.GetComponent(TextMesh).text = "3";
			guiCountdown.renderer.material.color = Color.green;
		}
		else if(Time.unscaledTime - this.startTime <= 2)
		{
			guiCountdown.transform.localScale = Vector3.Slerp(Vector3(0.5,0.5,1), Vector2.one, Time.unscaledTime - startTime - 1);
			guiCountdown.GetComponent(TextMesh).text = "2";
			guiCountdown.renderer.material.color = Color.yellow;
		}
		else if(Time.unscaledTime - this.startTime <= 3)
		{
			guiCountdown.transform.localScale = Vector3.Slerp(Vector3(0.5,0.5,1), Vector2.one, Time.unscaledTime - startTime - 2);
			guiCountdown.GetComponent(TextMesh).text = "1";
			guiCountdown.renderer.material.color = Color.red;
		}
		else if(Time.unscaledTime - this.startTime <= 4)
		{
			guiCountdown.transform.localScale = Vector3.Slerp(Vector3(0.5,0.5,1), Vector2.one, Time.unscaledTime - startTime - 3);
			guiCountdown.GetComponent(TextMesh).text = "Start";
			guiCountdown.renderer.material.color = Color.Lerp(Color.red, Color.green, Time.unscaledTime - startTime - 3);
		}
		else if(Time.unscaledTime - this.startTime <= 5)
		{
			guiCountdown.GetComponent(TextMesh).text = "";
			this.State = Play;
			Time.timeScale = gameTimeScale;
		}
	}
	function Play()
	{
		health = player.GetComponent(Player).health;
		score = player.GetComponent(Player).score;
		for(var i = 0; i<guiHealth.length; i++)
		{
			if(i<health) guiHealth[i].SetActive(true);
			else guiHealth[i].SetActive(false);
		}
		guiScore.GetComponent(TextMesh).text = score.ToString();
		if(Input.GetKeyDown(KeyCode.Escape))
		{
			guiPause.transform.Find("Bestscore").GetComponent(TextMesh).text = ScoreManager.GetActiveScore().ToString();
			this.State = Pause;
			guiPause.SetActive(true);
			Time.timeScale = 0;
		}
	}
	function Pause()
	{
		
	}
	function Win()
	{
		if(IsFF)
		{
			var monsters = GameObject.FindObjectsOfType(typeof(Monster));
			for(var monster : Monster in monsters)
			{
				monster.enabled = false;
			}
			Destroy(GameObject.Find("InputHandler"));
			if(ScoreManager.GetReward())
			{
				guiPopup.transform.FindChild("WeDidIt").Find("Book").gameObject.SetActive(true);
			}
			print("FramePertama");
			player.GetComponent(Player).animator.SetTrigger("cheer");
			
			Invoke("ActivatePopup", 1*Time.timeScale);
			Invoke("ShootStar", 1.5f*Time.timeScale);
			guiPopup.transform.FindChild("WeDidIt").gameObject.SetActive(true);
			guiPopup.transform.FindChild("WeDidIt").Find("Score").GetComponent(TextMesh).text = this.score.ToString();
			var levelId = int.Parse(ThemeService.activeLevel.Attributes.ItemOf['id'].Value)+1;
			if(levelId > PlayerPrefs.GetInt("UnlockedLevel"))
			{
				PlayerPrefs.SetInt("UnlockedLevel", levelId);
			}
			var star = ScoreManager.GetStar(this.score, this.maxScore);
			if(this.score > ScoreManager.GetActiveScore())
			{
				ScoreManager.SetActiveScore(this.score);
				ScoreManager.SetActiveStar(star);
			}
		}
		if(Input.GetKeyDown(KeyCode.Escape))
		{
			Application.LoadLevel("MainMenu"); 
		}
	}
	function Lose()
	{
		if(IsFF)
		{
			Invoke("ActivatePopup", 1*Time.timeScale);
			guiPopup.transform.FindChild("TryAgain").gameObject.SetActive(true);
		}
		if(Input.GetKeyDown(KeyCode.Escape))
		{
			Application.LoadLevel("MainMenu");
			Destroy(this);
		}
	}
	function ShootStar()
	{
		var star = ScoreManager.GetStar(this.score, this.maxScore);
		
		if(star>=1) guiScoreBar.transform.Find("Star1").GetComponent(ShootingStar).enabled = true;
		if(star>=2) guiScoreBar.transform.Find("Star2").GetComponent(ShootingStar).enabled = true;
		if(star>=3) guiScoreBar.transform.Find("Star3").GetComponent(ShootingStar).enabled = true;
	}
	
	function ActivatePopup()
	{
		guiPopup.SetActive(true);
	}
}