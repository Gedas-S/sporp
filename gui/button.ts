class CameraButton{
    private _button: BABYLON.GUI.Button
    private _scene: BABYLON.Scene
    constructor(protected ui: BABYLON.GUI.AdvancedDynamicTexture, scene: BABYLON.Scene){
        this._button  = BABYLON.GUI.Button.CreateSimpleButton('butt', 'Reset Camera');
        this._button.height = 0.1;
        this._button.width = 0.1;
        this._button.left = 550;
        this._button.top = -250;
        ui.addControl(this._button);
        this._button.onPointerClickObservable.add(this.change_view.bind(this));
        this._scene = scene;
        this._button.onPointerEnterObservable.add(function(){(<any>ui).onGUI = true});
        this._button.onPointerOutObservable.add(function(){(<any>ui).onGUI = false});
    }
    change_view(){
        let camera = this._scene.activeCamera as BABYLON.FreeCamera;
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.position = new BABYLON.Vector3(0, 15, -40);
    }
}