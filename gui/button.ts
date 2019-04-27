class CameraButton{
    private _button: BABYLON.GUI.Button
    constructor(ui: BABYLON.GUI.AdvancedDynamicTexture){
        this._button  = BABYLON.GUI.Button.CreateSimpleButton('butt', 'Camera Button');
        this._button.height = 0.1
        this._button.width = 0.1
        ui.addControl(this._button);
        this._button.onPointerClickObservable.add(this.change_view.bind(this));
    }
    change_view(){}
}