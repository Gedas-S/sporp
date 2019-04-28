class Game {
    public canvas: HTMLCanvasElement;
    public engine: BABYLON.Engine;
    public gameGUI: GameGUI;
    public physicsEngine: BABYLON.OimoJSPlugin;
    public starMap: StarMap;

    constructor(canvasElement : string) {
        // Create canvas and engine.
        this.canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this.engine = new BABYLON.Engine(this.canvas, true, {
            deterministicLockstep: true,
            lockstepMaxSteps: 4,
        });
        this.engine.renderEvenInBackground = false;
        this.physicsEngine = new BABYLON.OimoJSPlugin();
        this.physicsEngine.setTimeStep(1/60);
    }

    gameStart(): void {
        this.gameGUI = new GameGUI(this.engine);
        this.starMap = new StarMap(this);
    }

    doRender(): void {
        // Run the render loop.
        this.engine.runRenderLoop(() => {
            this.starMap.render();
            this.gameGUI.render();
        });

        // The canvas/window resize event handler.
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    // Create the game using the 'renderCanvas'.
    let game = new Game('renderCanvas');

    // Create the scene.
    game.gameStart();

    // Start render loop.
    game.doRender();
});

window.addEventListener("keydown", (e: KeyboardEvent) => {
    switch(e.keyCode){
        case 87: 
            //TODO: select Vytenis ship
            break;
    }
    return true;
});