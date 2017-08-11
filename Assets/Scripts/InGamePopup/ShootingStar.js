#pragma strict

public class ShootingStar extends MonoBehaviour
{
	public var timeOffset : float;
	public var target : Transform;
	private var startPos : Vector3;
	private var startScale : Vector3;
	private var targetPos : Vector3;
	private var targetScale : Vector3;
	private var startTime : float;
	private var speed : float = 1.5f;
	function Start () {
		
	}

	function Update () {
		this.transform.position = Vector3.Lerp(startPos, targetPos, (Time.unscaledTime - startTime)*speed);
		this.transform.localScale = Vector3.Lerp(startScale, targetScale, (Time.unscaledTime - startTime)*speed);
	}
	
	function OnEnable()
	{
		startPos = this.transform.position;
		startScale = this.transform.localScale;
		targetPos = target.position;
		targetPos.z = startPos.z;
		targetScale = target.localScale;
		startTime = Time.unscaledTime + timeOffset;
	}
}