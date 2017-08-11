#pragma strict
//sesuatu yang dapat bergerak
public interface Moveable {
	//apa yang dilakukan jika bergerak (dipanggil tiap update, jika monster bergerak)
	function Move();
	//apa yang dilakukan jika berhenti (dipanggil tiap update, jika monster tidak bergerak
	function Idle();
	//bagaimana pola bergerak
	//LRUD : bergerak satu langkah
	//lrud : bergerak banyak langkah
	function SetMovePattern(s: Array);
	//mengatur kecepatan objek bergerak
	function SetSpeed(s : float);
}