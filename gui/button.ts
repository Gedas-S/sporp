class TestButton{
    constructor(name: string, text: string, ui: BABYLON.GUI){
        this.name = name;
        this.text = text;
        this._button  = BABYLON.GUI.Button.CreateSimpleButton(name, text);
    }
}

class CameraButton{
    constructor(ui: BABYLON.GUI){
        this._button  = BABYLON.GUI.Button.CreateSimpleButton('butt', 'Camera Button');
        this._button.height = 0.1
        this._button.width = 0.1
        ui.addControl(this._button);
    }
}