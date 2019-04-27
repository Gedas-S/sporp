class TestSphere {
    private _phase: number = 0;
    private _sphere: BABYLON.Mesh;
    private _selected: boolean = false;
    private _material: BABYLON.StandardMaterial;
    private _color: BABYLON.Color3 = BABYLON.Color3.Black();
    private _selectedColor: BABYLON.Color3 = BABYLON.Color3.Red();

    constructor(private _scene: BABYLON.Scene, private _radius: number, private _speed: number, private _orbitRadius: number) {
        // Create a built-in "sphere" shape; with 16 segments.
        this._sphere = BABYLON.MeshBuilder.CreateSphere(
            'sphere',
            {segments: 16, diameter: this._radius},
            this._scene
        );

        this._material = new BABYLON.StandardMaterial("PlanetMaterial", this._scene);
        this._sphere.material = this._material;
        this._material.emissiveColor = this._color;

        // Bind fixedUpdate to be called every physics tick
        this._scene.onBeforeStepObservable.add(this.fixedUpdate.bind(this));
        // Bind update to be called every frame
        this._scene.onBeforeRenderObservable.add(this.update.bind(this));
        // Bind click function (mask 32 is click).
        this._scene.onPointerObservable.add(this.click.bind(this), 32);
    }

    fixedUpdate(): void {
        this._phase = (this._phase + this._speed) % 360;
    }

    update(): void {
        // Get delta time. We don't need it, only for reference. :P
        let deltaTime = this._scene.getEngine().getDeltaTime();
        // Update mesh position.
        this._sphere.position.x = Math.cos(this._phase / 180 * Math.PI) * this._orbitRadius;
        this._sphere.position.z = Math.sin(this._phase / 180 * Math.PI) * this._orbitRadius;
    }

    click(eventData: BABYLON.PointerInfo): void {
        if (eventData.pickInfo.pickedMesh == this._sphere) {
            this.select();
        } else if (this._selected) {
            this.deselect();
        }
    }

    select(): void {
        this._selected = true;
        this._material.emissiveColor = this._selectedColor;
    }

    deselect(): void {
        this._selected = false;
        this._material.emissiveColor = this._color;
    }
}
