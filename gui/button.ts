class CameraButton extends GUIContainer{
    private _button: BABYLON.GUI.Button
    constructor(protected ui: GameGUI){
        super(ui);
        this.container.height = 0.1;
        this.container.width = 0.1;
        this.container.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.container.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        this._button = BABYLON.GUI.Button.CreateSimpleButton('butt', 'Reset Camera');
        this._button.onPointerClickObservable.add(()=>{ui.setCameraScript(undefined)});
        this.container.addControl(this._button);

        ui.fullscreenUI.addControl(this.container);
    }
}
