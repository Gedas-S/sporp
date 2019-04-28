class StarSystem {
    public stars: Star[] = [];
    public planets: Planet[] = [];
    public holes: MoleHole[] = [];
    private _planetList: PlanetList;
    public followControl: BABYLON.Observer<BABYLON.Scene>;

    constructor(public scene: BABYLON.Scene, public ui: BABYLON.GUI.AdvancedDynamicTexture){
        // Create a test star
        this.stars.push(Star.Random(this, this.ui, "Test star in the middle"));
        // Create a couple of test planets
        this.planets.push(new Planet(this, this.ui, 3, 1, 21, this.stars[0]));
        this.planets.push(new Planet(this, this.ui, 1, 3, 16, this.stars[0]));
        this.planets.push(new Planet(this, this.ui, 1.5, 0, 0, this.stars[0]));
        this.planets.push(new Planet(this, this.ui, 2, 0.2, 3, this.planets[0]));
        this.holes.push(new MoleHole(this.ui, this, this, new BABYLON.Vector3(25, 0, 12)));

        this._planetList = new PlanetList(this.ui, this.planets);
    }
}
