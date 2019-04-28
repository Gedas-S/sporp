class MoleHole extends StellarObject {
    private _particleSystem: BABYLON.ParticleSystem;
    private _selectorMesh: BABYLON.Mesh;
    private _menu: GateMenu;

    constructor(
        system: StarSystem,
        public targetSystem: StarSystem,
        public ui: GameGUI,
        position: BABYLON.Vector3,
        color: BABYLON.Color3 = undefined,
    ){
        super(system)
        this._particleSystem = new BABYLON.ParticleSystem("MoleHole", 1000, this._scene);
        this._particleSystem.createPointEmitter(new BABYLON.Vector3(1, 1, 1), new BABYLON.Vector3(-1, -1, -1));
        this._particleSystem.particleTexture = new BABYLON.Texture("textures/circle.png", this._scene);
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

        this._selectorMesh = BABYLON.MeshBuilder.CreateSphere(
            "holeSelector",
            {segments: 3, diameter: 3},
            system.scene
        );
        this._selectorMesh.position = position;
        this._selectorMesh.material = new BABYLON.Material("transparent", this._scene)
        this._selectorMesh.material.alpha = 0;

        this._menu = new GateMenu(ui, this);

        this.system.holes.push(this);

        // Bind click function (mask 32 is click).
        this.system.scene.onPointerObservable.add(this.click.bind(this), 32);
    }

    set color(Color: BABYLON.Color3) {
        this._particleSystem.color1 = BABYLON.Color4.FromColor3(Color, 0.5);
        this._particleSystem.color2 = BABYLON.Color4.FromColor3(Color, 0.5);
        this._particleSystem.colorDead = BABYLON.Color4.FromColor3(Color, 0.1);

    }

    get position(): BABYLON.Vector3{
        return BABYLON.Vector3.Zero();
    }



    click(eventData: BABYLON.PointerInfo): void {
        if (eventData.pickInfo.pickedMesh == this._selectorMesh) {
            this.select();
        } else if (this._menu) {
            this.deselect();
        }
    }

    select(): void {
        this._menu.show();
    }

    deselect(): void {
        if (this.ui.mouseOnGUI) {
            return;
        }
        this._menu.hide();
    }

}
