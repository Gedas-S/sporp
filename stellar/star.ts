class Star {
    private _sphere: BABYLON.Mesh;
    private _menu: StarMenu;
    private _material: BABYLON.StandardMaterial;
    private _glow: BABYLON.GlowLayer;

    constructor(
        private _scene: BABYLON.Scene,
        private _ui: BABYLON.GUI.AdvancedDynamicTexture,
        private _radius: number,
        public name: string,
        public color: BABYLON.Color3,
    ) {

        // Create a built-in "sphere" shape; with 16 segments.
        this._sphere = BABYLON.MeshBuilder.CreateSphere(
            'sphere',
            {segments: 16, diameter: this._radius},
            this._scene
        );

        this._material = new BABYLON.StandardMaterial("PlanetMaterial", this._scene);
        var texture = new BABYLON.FireProceduralTexture("texture", 1024, _scene);
        texture.speed = new BABYLON.Vector2(0.02, 0.02);
        this._material.diffuseTexture = texture;
        this._material.emissiveTexture = texture;
        this._material.emissiveColor = this.color;
        this._sphere.material = this._material;

        this._glow = new BABYLON.GlowLayer("SunGlow", this._scene);
        this._glow.addIncludedOnlyMesh(this._sphere);

        this._menu = new StarMenu(this._ui, this);

        // Bind click function (mask 32 is click).
        this._scene.onPointerObservable.add(this.click.bind(this), 32);
    }

    static Random(scene: BABYLON.Scene, ui: BABYLON.GUI.AdvancedDynamicTexture, name: string): Star {
        return new Star(
            scene,
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

    enlarge(): void {
        this._radius += 1;
        this._scene.removeMesh(this._sphere);
        this._glow.removeIncludedOnlyMesh(this._sphere);
        this._sphere = BABYLON.MeshBuilder.CreateSphere(
            'sphere',
            {segments: 16, diameter: this._radius},
            this._scene
        );
        this._sphere.material = this._material;
        this._glow.addIncludedOnlyMesh(this._sphere);
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
        this._glow.intensity = 1;
        this._menu.hide();
    }
}