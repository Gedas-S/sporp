class StarSystem {
    public stars: Star[] = [];
    public planets: Planet[] = [];

    constructor(public scene: BABYLON.Scene, public ui: BABYLON.GUI.AdvancedDynamicTexture){
        // Create a test star
        this.stars.push(Star.Random(this.scene, this.ui, "Test star in the middle"));
        // Create a couple of test planets
        this.planets.push(new Planet(this.scene, this.ui, 3, 1, 21, this.stars[0]));
        this.planets.push(new Planet(this.scene, this.ui, 1, 3, 16, this.stars[0]));
        this.planets.push(new Planet(this.scene, this.ui, 1.5, 0, 0, this.stars[0]));
        this.planets.push(new Planet(this.scene, this.ui, 2, 0.2, 3, this.planets[0]));
    }
}
