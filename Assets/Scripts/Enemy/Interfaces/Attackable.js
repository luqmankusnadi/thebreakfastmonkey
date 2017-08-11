#pragma strict
//sesuatu yang bisa menyerang
public interface Attackable {
	function Attack(object: Damageable);
	function SetAttackPoints(amount:int);
}
