class CameraButton{
    private _button: BABYLON.GUI.Button
    private _scene: BABYLON.Scene
    private _starSystem: StarSystem
    constructor(protected ui: BABYLON.GUI.AdvancedDynamicTexture, scene: BABYLON.Scene, starSystem: StarSystem){
        this._button  = BABYLON.GUI.Button.CreateSimpleButton('butt', 'Reset Camera');
        this._button.height = 0.1;
        this._button.width = 0.1;
        this._button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this._button.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        ui.addControl(this._button);
        this._button.onPointerClickObservable.add(this.change_view.bind(this));
        this._scene = scene;
        this._button.onPointerEnterObservable.add(function(){(<any>ui).onGUI = true});
        this._button.onPointerOutObservable.add(function(){(<any>ui).onGUI = false});
        this._starSystem = starSystem;
    }
    change_view(){
        // stop observing a planet
        this._scene.onBeforeRenderObservable.remove(this._starSystem.followControl)
        // adjust camera to the initial state
        let camera = this._scene.activeCamera as BABYLON.FreeCamera;
        camera.position = new BABYLON.Vector3(0, 15, -40);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.lockedTarget = null;
        this._scene.activeCamera = camera;
    }
}