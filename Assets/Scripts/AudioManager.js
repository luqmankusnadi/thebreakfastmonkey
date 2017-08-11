#pragma strict

public class AudioManager extends MonoBehaviour
{
	public static var musicSource : GameObject;
	public static var musicOn : boolean;
	public static var soundOn : boolean;
	
	static function UpdateSettings () {
		musicOn = PlayerPrefs.GetInt("MusicOn") == 1? true : false;
		soundOn = PlayerPrefs.GetInt("SoundsOn") == 1? true : false;
		if(musicSource != null) musicSource.GetComponent(AudioSource).mute = !musicOn;
	}
	
	static function PlayMusic(source : AudioSource)
	{
		if(musicSource != null && musicSource.GetComponent(AudioSource).clip == source.clip)
		{
		}
		else
		{
			if(musicSource != null) Destroy(musicSource);
			musicSource = new GameObject();
			DontDestroyOnLoad(musicSource);
			musicSource.AddComponent(AudioSource);
			musicSource.GetComponent(AudioSource).clip = source.clip;
			musicSource.GetComponent(AudioSource).Play();
			musicSource.GetComponent(AudioSource).loop = true;
		}
		UpdateSettings();
	}
	
	static function PlaySfx(source : AudioSource)
	{
		if(soundOn && source!=null)
		source.Play();
	}
}