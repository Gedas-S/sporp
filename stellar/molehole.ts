class MoleHole implements StellarObject {
    private _particleSystem: BABYLON.ParticleSystem;

    constructor(
        public scene: BABYLON.Scene,
        public ui: BABYLON.GUI.AdvancedDynamicTexture,
        public system: StarSystem,
        public targetSystem: StarSystem,
        position: BABYLON.Vector3,
        color: BABYLON.Color3 = undefined,
    ){
        this._particleSystem = new BABYLON.ParticleSystem("MoleHole", 1000, scene);
        this._particleSystem.createPointEmitter(new BABYLON.Vector3(1, 1, 1), new BABYLON.Vector3(-1, -1, -1));
        this._particleSystem.particleTexture = new BABYLON.Texture("textures/circle.png", scene);
        this._particleSystem.emitter = position;
        this._particleSystem.minLifeTime = 0.5;
        this._particleSystem.maxLifeTime = 0.5;
        this._particleSystem.minEmitPower = 1;
        this._particleSystem.maxEmitPower = 1;
        this._particleSystem.emitRate = 150;
        this._particleSystem.updateSpeed = 0.005;
        this.color = color || new BABYLON.Color3(0.04, 0.4, 0.03);
        this._particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
        this._particleSystem.start();
    }

    set color(Color: BABYLON.Color3) {
        this._particleSystem.color1 = BABYLON.Color4.FromColor3(Color, 0.5);
        this._particleSystem.color2 = BABYLON.Color4.FromColor3(Color, 0.5);
        this._particleSystem.colorDead = BABYLON.Color4.FromColor3(Color, 0.1);

    }

    get position(): BABYLON.Vector3{
        return BABYLON.Vector3.Zero();
    }

}
