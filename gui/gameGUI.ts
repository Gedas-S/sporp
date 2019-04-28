class GameGUI {
    private _uiScene: BABYLON.Scene;
    private _camera: BABYLON.FreeCamera;
    private _cameraScript: Function;
    private _cameraScriptClear: Function;
    public mouseOnGUI: boolean = false;
    public fullscreenUI: BABYLON.GUI.AdvancedDynamicTexture;
    public onKeyDownObservable: BABYLON.Observable<any>;

    constructor(private _engine: BABYLON.Engine){
        // Create foreground UI canvas and a scene for it.
        // If we do not put the UI on a different scene, procedural textures mess up the UI.
        this._uiScene = new BABYLON.Scene(this._engine);
        this._uiScene.autoClear = false;
        this._camera = new BABYLON.FreeCamera('uiCamera', BABYLON.Vector3.Zero(), this._uiScene);
        this._camera.setTarget(BABYLON.Vector3.Zero());
        this.fullscreenUI = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("mainUI", true, this._uiScene);

        new CameraButton(this);

        this.onKeyDownObservable = new BABYLON.Observable();

        window.addEventListener("keydown", (e: KeyboardEvent) => {
            this.onKeyDownObservable.notifyObservers(e.keyCode);
        });

        this._uiScene.onBeforeRenderObservable.add(()=>{
            if (this._cameraScript){
                this._cameraScript();
            }
        })
    }

    render():void {
        this._uiScene.render();
    }

    setCameraScript(script: Function, clearScript?: Function) {
        if (this._cameraScript && this._cameraScriptClear){
            this._cameraScriptClear();
        }
        this._cameraScript = script;
        this._cameraScriptClear = clearScript;
    }
}
