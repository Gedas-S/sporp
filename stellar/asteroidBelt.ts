class AsteroidBelt extends StellarObject {
    private _system: StarSystem;
    
    constructor(
        public system: StarSystem,
        private _parent: StellarObject
    ) {
        super();
        
        this._system = system;

    }

}

class Asteroid {
    constructor(private _scene: BABYLON.Scene) {


        let asteroidTxr = new BABYLON.MarbleProceduralTexture("rough", 128, this._scene)
    }
}