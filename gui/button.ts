class CameraButton{
    private _button: BABYLON.GUI.Button
    private _scene: BABYLON.Scene
    private _starSystem: StarSystem
    constructor(protected ui: GameGUI, scene: BABYLON.Scene, starSystem: StarSystem){
        this._button  = BABYLON.GUI.Button.CreateSimpleButton('butt', 'Reset Camera');
        this._button.height = 0.1;
        this._button.width = 0.1;
        this._button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this._button.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        ui.fullscreenUI.addControl(this._button);
        this._button.onPointerClickObservable.add(()=>{ui.setCameraScript(undefined)});
        this._scene = scene;
        this._button.onPointerEnterObservable.add(function(){ui.mouseOnGUI = true});
        this._button.onPointerOutObservable.add(function(){ui.mouseOnGUI = false});
        this._starSystem = starSystem;
    }
}
