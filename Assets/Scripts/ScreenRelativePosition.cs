#region Using
using UnityEngine;
using System.Collections;
#endregion

public class ScreenRelativePosition : MonoBehaviour {
	#region Variables
	public enum ScreenEdge {TopOnly, TopCenter, TopLeft, TopRight, 
		BottomOnly, BottomCenter, BottomLeft, BottomRight, 
		LeftOnly, LeftCenter, RightOnly, RightCenter};
	public Camera camera;
	public ScreenEdge screenEdge;
	public float xOffset, yOffset;
	#endregion

	#region Start
	// Use this for initialization
	void Start () {
		if (camera == null) camera = Camera.main;
		UpdatePosition ();
	}
	#endregion

	#region Other Methods
	public void ChangeOffset (float newX, float newY) {
		xOffset = newX;
		yOffset = newY;
		UpdatePosition ();
	}

	public void UpdatePosition() {
		Vector3 newPosition = transform.position;
		float transformSizeX = transform.renderer.bounds.size.x;
		float transformSizeY = transform.renderer.bounds.size.y;
		
		switch (screenEdge) {
		case ScreenEdge.TopOnly:
			xOffset = 0;
			newPosition.y = camera.orthographicSize - (transformSizeY / 2) + yOffset;
			break;
		case ScreenEdge.TopCenter:
			newPosition.x = xOffset;
			newPosition.y = camera.orthographicSize - (transformSizeY / 2) + yOffset;
			break;
		case ScreenEdge.TopLeft:
			newPosition.x = -camera.aspect * camera.orthographicSize + (transformSizeX / 2) + xOffset;
			newPosition.y = camera.orthographicSize - (transformSizeY / 2) + yOffset;
			break;
		case ScreenEdge.TopRight:
			newPosition.x = camera.aspect * camera.orthographicSize - (transformSizeX / 2) + xOffset;
			newPosition.y = camera.orthographicSize - (transformSizeY / 2) + yOffset;
			break;
		case ScreenEdge.BottomOnly:
			xOffset = 0;
			newPosition.y = -camera.orthographicSize + (transformSizeY / 2) + yOffset;
			break;
		case ScreenEdge.BottomCenter:
			newPosition.x = xOffset;
			newPosition.y = -camera.orthographicSize + (transformSizeY / 2) + yOffset;
			break;
		case ScreenEdge.BottomLeft:
			newPosition.x = -camera.aspect * camera.orthographicSize + (transformSizeX / 2) + xOffset;
			newPosition.y = -camera.orthographicSize + (transformSizeY / 2) + yOffset;
			break;
		case ScreenEdge.BottomRight:
			newPosition.x = camera.aspect * camera.orthographicSize - (transformSizeX / 2) + xOffset;
			newPosition.y = -camera.orthographicSize + (transformSizeY / 2) + yOffset;
			break;
		case ScreenEdge.LeftOnly:
			newPosition.x = -camera.aspect * camera.orthographicSize + (transformSizeX / 2) + xOffset;
			yOffset = 0;
			break;
		case ScreenEdge.LeftCenter:
			newPosition.x = -camera.aspect * camera.orthographicSize + (transformSizeX / 2) + xOffset;
			newPosition.y = yOffset;
			break;
		case ScreenEdge.RightOnly:
			newPosition.x = camera.aspect * camera.orthographicSize - (transformSizeX / 2) + xOffset;
			yOffset = 0;
			break;
		case ScreenEdge.RightCenter:
			newPosition.x = camera.aspect * camera.orthographicSize - (transformSizeX / 2) + xOffset;
			newPosition.y = yOffset;
			break;
		}
		transform.localPosition = newPosition;
	}

	public Vector3 GetPosProjection (ScreenEdge sEdge, float newXOffset, float newYOffset) {
		Vector3 newPosition = transform.localPosition;
		float transformSizeX = transform.renderer.bounds.size.x;
		float transformSizeY = transform.renderer.bounds.size.y;
		
		switch (sEdge) {
		case ScreenEdge.TopOnly:
			newXOffset = 0;
			newPosition.y = camera.orthographicSize - (transformSizeY / 2) + newYOffset;
			break;
		case ScreenEdge.TopCenter:
			newPosition.x = newXOffset;
			newPosition.y = camera.orthographicSize - (transformSizeY / 2) + newYOffset;
			break;
		case ScreenEdge.TopLeft:
			newPosition.x = -camera.aspect * camera.orthographicSize + (transformSizeX / 2) + newXOffset;
			newPosition.y = camera.orthographicSize - (transformSizeY / 2) + newYOffset;
			break;
		case ScreenEdge.TopRight:
			newPosition.x = camera.aspect * camera.orthographicSize - (transformSizeX / 2) + newXOffset;
			newPosition.y = camera.orthographicSize - (transformSizeY / 2) + newYOffset;
			break;
		case ScreenEdge.BottomOnly:
			newXOffset = 0;
			newPosition.y = -camera.orthographicSize + (transformSizeY / 2) + newYOffset;
			break;
		case ScreenEdge.BottomCenter:
			newPosition.x = newXOffset;
			newPosition.y = -camera.orthographicSize + (transformSizeY / 2) + newYOffset;
			break;
		case ScreenEdge.BottomLeft:
			newPosition.x = -camera.aspect * camera.orthographicSize + (transformSizeX / 2) + newXOffset;
			newPosition.y = -camera.orthographicSize + (transformSizeY / 2) + newYOffset;
			break;
		case ScreenEdge.BottomRight:
			newPosition.x = camera.aspect * camera.orthographicSize - (transformSizeX / 2) + newXOffset;
			newPosition.y = -camera.orthographicSize + (transformSizeY / 2) + newYOffset;
			break;
		case ScreenEdge.LeftOnly:
			newPosition.x = -camera.aspect * camera.orthographicSize + (transformSizeX / 2) + newXOffset;
			newYOffset = 0;
			break;
		case ScreenEdge.LeftCenter:
			newPosition.x = -camera.aspect * camera.orthographicSize + (transformSizeX / 2) + newXOffset;
			newPosition.y = newYOffset;
			break;
		case ScreenEdge.RightOnly:
			newPosition.x = camera.aspect * camera.orthographicSize - (transformSizeX / 2) + newXOffset;
			newYOffset = 0;
			break;
		case ScreenEdge.RightCenter:
			newPosition.x = camera.aspect * camera.orthographicSize - (transformSizeX / 2) + newXOffset;
			newPosition.y = newYOffset;
			break;
		}
		return newPosition;
	}
	#endregion
}