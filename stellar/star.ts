class Star extends StellarObject{
    private _sphere: BABYLON.Mesh;
    private _menu: StarMenu;
    private _material: BABYLON.StandardMaterial;
    private _glow: BABYLON.GlowLayer;
    private _light: BABYLON.PointLight;

    constructor(
        system: StarSystem,
        private _ui: GameGUI,
        private _radius: number,
        public name: string,
        public color: BABYLON.Color3,
    ) {
        super(system);

        // Create a built-in "sphere" shape; with 16 segments.
        this._sphere = BABYLON.MeshBuilder.CreateSphere(
            'sphere',
            {segments: 16, diameter: this._radius},
            system.scene
        );

        this._material = new BABYLON.StandardMaterial("PlanetMaterial", system.scene);
        var texture = new BABYLON.FireProceduralTexture("texture", 1024, system.scene);
        texture.speed = new BABYLON.Vector2(0.02, 0.02);
        this._material.diffuseTexture = texture;
        this._material.emissiveTexture = texture;
        this._material.emissiveColor = this.color;
        this._sphere.material = this._material;

        this._light = new BABYLON.PointLight("SunLight", BABYLON.Vector3.Zero(), system.scene);
        this._light.intensity = Math.log(_radius) / 4;

        this._glow = new BABYLON.GlowLayer("SunGlow", system.scene);

        this._menu = new StarMenu(this._ui, this);

        // Bind click function.
        system.onClickObservable.add(this.click.bind(this), 32);
    }

    static Random(system: StarSystem, ui: GameGUI, name: string): Star {
        return new Star(
            system,
            ui,
            Math.random() * 5 + Math.random() * 5 + 2,
            name,
            Star.RandomStarColor(),
        )
    }

    static RandomStarColor(): BABYLON.Color3 {
        let color = Math.random();
        return new BABYLON.Color3(color + 0.5, 1, color % 0.5 + 0.5)
    }

    click(eventData: BABYLON.PointerInfo): void {
        if (eventData.pickInfo.pickedMesh == this._sphere) {
            this.select();
        } else if (this._menu) {
            this.deselect();
        }
    }

    get position(): BABYLON.Vector3 {
        return BABYLON.Vector3.Zero();
    }

    enlarge(): void {
        this._radius += 1;
        this.system.scene.removeMesh(this._sphere);
        this._glow.removeIncludedOnlyMesh(this._sphere);
        this._sphere = BABYLON.MeshBuilder.CreateSphere(
            'sphere',
            {segments: 16, diameter: this._radius},
            this.system.scene
        );
        this._sphere.material = this._material;
        this._glow.addIncludedOnlyMesh(this._sphere);
        this._light.intensity = Math.log(this._radius) / 4;
    }

    colorize(): void {
        this.color = Star.RandomStarColor()
        this._material.emissiveColor = this.color;
    }

    select(): void {
        this._glow.intensity = 1.8;
        this._menu.show();
    }

    deselect(): void {
        if (this._ui.mouseOnGUI) {
            return;
        }
        this._glow.intensity = 1;
        this._menu.hide();
    }
}
