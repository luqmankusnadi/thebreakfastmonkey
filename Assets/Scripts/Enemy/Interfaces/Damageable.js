#pragma strict
//sesuatu yang bisa menerima damage
public interface Damageable {
	function ReceiveDamage(amount: int);
	function IsAlive(): boolean;
}