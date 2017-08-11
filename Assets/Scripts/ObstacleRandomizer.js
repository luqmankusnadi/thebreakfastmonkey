#pragma strict

var sprites : Sprite[];

function Start () {
	this.GetComponent(SpriteRenderer).sprite = sprites[Random.Range(0,sprites.Length)];
}