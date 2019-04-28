class StarSystem {
    public stars: Star[] = [];
    public planets: TestSphere[] = [];

    constructor(private _scene: BABYLON.Scene, private _ui: BABYLON.GUI.AdvancedDynamicTexture){
        // Create a test star
        this.stars.push(Star.Random(this._scene, this._ui, "Test star in the middle"));
        // Create a couple of test planets
        this.planets.push(new TestSphere(this._scene, this._ui, 3, 1, 21));
        this.planets.push(new TestSphere(this._scene, this._ui, 1, 3, 16));
        this.planets.push(new TestSphere(this._scene, this._ui, 1.5, 0, 0));
        this.planets.push(new TestSphere(this._scene, this._ui, 2, 0.2, 3, this.planets[0]));
    }
}
