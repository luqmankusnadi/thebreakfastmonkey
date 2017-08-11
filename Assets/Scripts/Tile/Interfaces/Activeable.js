#pragma strict
public interface Activeable {
	/**
	 * Apa yang dilaukan jika tile diaktifan
	 */
	function Activate();
	/**
	 * Apa yang dilakukan jika tile di-non-aktifkan.
	 */
	function Deactivate();
}