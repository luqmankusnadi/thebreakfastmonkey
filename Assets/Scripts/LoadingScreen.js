#pragma strict

public class LoadingScreen extends MonoBehaviour {

    function Update () {
        if(Application.isLoadingLevel)
        {
        	this.camera.enabled = true;
        }
        else
        {
            this.camera.enabled = false;
        }
    }
   
}