class Game {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.FreeCamera;
    private _light: BABYLON.Light;
    private _physicsEngine: BABYLON.OimoJSPlugin;
    private ui: BABYLON.GUI.AdvancedDynamicTexture;

    constructor(canvasElement : string) {
        // Create canvas and engine.
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true, {
            deterministicLockstep: true,
            lockstepMaxSteps: 4,
        });
        this._engine.renderEvenInBackground = false;
        this._physicsEngine = new BABYLON.OimoJSPlugin();
        this._physicsEngine.setTimeStep(1/60);
    }

    createScene(): void {
        // Create a basic BJS Scene object.
        this._scene = new BABYLON.Scene(this._engine);

        // Attach the physics engine to the scene
        this._scene.enablePhysics(new BABYLON.Vector3(0, 0, 0), this._physicsEngine);
        // Create a FreeCamera, and set its position to (x:0, y:15, z:-40).
        this._camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 15, -40), this._scene);
        // Target the camera to scene origin.
        this._camera.setTarget(BABYLON.Vector3.Zero());
        // Attach the camera to the canvas.
        this._camera.attachControl(this._canvas, false);

        // Create a basic light, aiming 0,1,0 - meaning, to the sky.
        this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this._scene);

        // Create foreground UI canvas.
        this.ui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("mainUI");

        // Create a couple of test planets
        let planet1 = new TestSphere(this._scene, this.ui, 3, 1, 11);
        let planet2 = new TestSphere(this._scene, this.ui, 1, 3, 6);
    }

    doRender(): void {
        // Run the render loop.
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        // The canvas/window resize event handler.
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    // Create the game using the 'renderCanvas'.
    let game = new Game('renderCanvas');

    // Create the scene.
    game.createScene();

    // Start render loop.
    game.doRender();
});
