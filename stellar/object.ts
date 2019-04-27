class TestSphere {
    private _phase: number = 0;
    private _sphere: BABYLON.Mesh;
    private _selected: boolean = false;
    private _material: BABYLON.StandardMaterial;
    private _color: BABYLON.Color3 = BABYLON.Color3.Black();
    private _selectedColor: BABYLON.Color3 = BABYLON.Color3.Red();
    private _camera: BABYLON.FreeCamera;

    constructor(private _scene: BABYLON.Scene, private _radius: number, private _speed: number, private _orbitRadius: number) {
        this._phase = 0;

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
        this._scene.onBeforeStepObservable.add(() => this.fixedUpdate());
        // Bind update to be called every frame
        this._scene.onBeforeRenderObservable.add(() => this.update());
        // Bind click function (mask 32 is click).
        this._scene.onPointerObservable.add(({pickInfo}) => this.click(pickInfo.pickedMesh), 32);
    }

    fixedUpdate(): void {
        // Update phase.
        this._phase = (this._phase + this._speed) % 360;
    }

    moveCamera(camera: BABYLON.FreeCamera): void {
        this._camera = camera
    }

    private updatePosition(): void {
        // Update mesh position.
        this._sphere.position.x = Math.cos(this._phase / 180 * Math.PI) * this._orbitRadius;
        this._sphere.position.z = Math.sin(this._phase / 180 * Math.PI) * this._orbitRadius;
    }



    update(): void {
        // Get delta time. We don't need it, only for reference. :P
        let deltaTime = this._scene.getEngine().getDeltaTime();

        this.updatePosition();

        if (this._camera != null)
         {
             this._camera.position =  BABYLON.Vector3.Zero().subtract( this._sphere.position);
             this._camera.setTarget(this._sphere.position)
         }
    }

    click(pickedMesh: BABYLON.AbstractMesh): void {
        if (pickedMesh == this._sphere) {
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
