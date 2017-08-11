#pragma strict
public class ScoreManager extends MonoBehaviour
{
	public static var starValue : float[] = [0.4f, 0.7f, 1f];
	public static function GetActiveScore() : int
	{
		var levelId = ThemeService.activeLevel.Attributes.ItemOf['id'].Value;
		return PlayerPrefs.GetInt("Level." + levelId + ".Score");
	}
	public static function SetActiveScore(score : int)
	{
		var levelId = ThemeService.activeLevel.Attributes.ItemOf['id'].Value;
		PlayerPrefs.SetInt("Level." + levelId + ".Score", score);
	}
	
	public static function GetStar(score : int, maxScore : int)
	{
		if(score >= maxScore*starValue[2]) return 3;
		else if(score >= maxScore*starValue[1]) return 2;
		else if(score >= maxScore*starValue[0]) return 1;
		else return 0;
	}
	
	public static function SetActiveStar(star : int)
	{
		var levelId = ThemeService.activeLevel.Attributes.ItemOf['id'].Value;
		PlayerPrefs.SetInt("Level." + levelId + ".Star", star);
	}
	
	public static function GetReward()
	{
		var isReward : boolean = false;
		var rewards = LevelService.xmlDoc.GetElementsByTagName("reward");
		for(var reward : XmlNode in rewards)
		{
			if(PlayerPrefs.GetInt("Ensiklopedi"+reward.InnerText)==0)
			{
				PlayerPrefs.SetInt("Ensiklopedi"+reward.InnerText, 1);
				isReward = true;
			}
		}
		return isReward;
	}
}