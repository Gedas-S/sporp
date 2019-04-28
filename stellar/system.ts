class StarSystem {
    public scene: BABYLON.Scene;

    public stars: Star[] = [];
    public planets: Planet[] = [];
    public holes: MoleHole[] = [];
    private _planetList: PlanetList;
    public followControl: BABYLON.Observer<BABYLON.Scene>;

    constructor(_game: Game, public starMap: StarMap, public ui: GameGUI, public name: string){
        this.scene = new BABYLON.Scene(_game.engine);
        let light = new BABYLON.HemisphericLight("backlight", new BABYLON.Vector3(0, 1, 0), this.scene)
        light.intensity = 0.15;
        new BABYLON.FreeCamera('mainCamera', new BABYLON.Vector3(0, 15, -40), this.scene);
        (this.scene.activeCamera as BABYLON.FreeCamera).setTarget(BABYLON.Vector3.Zero());
        this.scene.enablePhysics(new BABYLON.Vector3(0, 0, 0), _game.physicsEngine);

        this._planetList = new PlanetList(this.ui, this.planets);
    }

    goto(): void {
        this.starMap.activateSystem(this);
    }

    static TestSystem(_game: Game, starMap: StarMap, ui: GameGUI, name: string): StarSystem {
        let testSystem = new StarSystem(_game, starMap, ui, name);
        // Create a test star
        testSystem.stars.push(Star.Random(testSystem, ui, "Test star in the middle"));
        // Create a couple of test planets
        testSystem.planets.push(new Planet(testSystem, ui, 3, 1, 21, testSystem.stars[0]));
        testSystem.planets.push(new Planet(testSystem, ui, 1, 3, 16, testSystem.stars[0]));
        testSystem.planets.push(new Planet(testSystem, ui, 1.5, 0, 0, testSystem.stars[0]));
        testSystem.planets.push(new Planet(testSystem, ui, 2, 0.2, 3, testSystem.planets[0]));

        testSystem._planetList = new PlanetList(ui, testSystem.planets);

        let ship1 = new BaseShip(
            testSystem,
            2, new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(-10, -1, 1),
        )
        return testSystem;
    }
}
