class TestSphere {
    private _time: number = 0;
    private _sphere: BABYLON.Mesh;
    private _menu: PlanetMenu;
    private _material: BABYLON.StandardMaterial;
    private _color: BABYLON.Color3 = BABYLON.Color3.Random();
    private _selectedColor: BABYLON.Color3 = BABYLON.Color3.Red();
    private _camera: BABYLON.FreeCamera;

    constructor(
        private _scene: BABYLON.Scene,
        private _ui: BABYLON.GUI.AdvancedDynamicTexture,
        private _radius: number,
        private _speed: number,
        private _orbit: Orbit,
        private _parent: TestSphere = null,
    ) {
        // Create a built-in "sphere" shape; with 16 segments.
        this._sphere = BABYLON.MeshBuilder.CreateSphere(
            'sphere',
            {segments: 16, diameter: this._radius},
            this._scene
        );

        this._material = new BABYLON.StandardMaterial("PlanetMaterial", this._scene);
        var texture = new BABYLON.CloudProceduralTexture("texture", 1024, _scene);
        texture.cloudColor = BABYLON.Color4.FromColor3(BABYLON.Color3.Random());
        texture.skyColor = BABYLON.Color4.FromColor3(BABYLON.Color3.Random());

        this._material.diffuseTexture = texture;

        this._sphere.material = this._material;
        this._material.emissiveColor = this._color;

        this._menu = new PlanetMenu(this._ui, this);

        // Bind fixedUpdate to be called every physics tick
        this._scene.onBeforeStepObservable.add(this.fixedUpdate.bind(this));
        // Bind update to be called every frame
        this._scene.onBeforeRenderObservable.add(this.update.bind(this));
        // Bind click function (mask 32 is click).
        this._scene.onPointerObservable.add(this.click.bind(this), 32);
    }

    fixedUpdate(): void {
        // Update phase.
        this._time += 1;
    }

    moveCamera(camera: BABYLON.FreeCamera): void {
        this._camera = camera
    }

    /**
     * update mesh position
     */
    private updatePosition(): void {
        let parentPosition = BABYLON.Vector3.Zero();
        if (this._parent) {
            parentPosition = this._parent._sphere.position;
        }
        this._sphere.position = this._orbit.getLocation(this._time).add(parentPosition);
    }

    private offset() { return this._radius*3; }
    private vec() { return new BABYLON.Vector3(0, this.offset(), -30) }

    update(): void {
        // Get delta time. We don't need it, only for reference. :P
        let deltaTime = this._scene.getEngine().getDeltaTime();

        let oldPos = this._sphere.position;

        this.updatePosition();

        let flightDirection = this._sphere.position.add(oldPos).normalize();

        if (this._camera != null)
         {
             this._camera.position =  oldPos.add(this.vec());
         }
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
        this._sphere = BABYLON.MeshBuilder.CreateSphere(
            'sphere',
            {segments: 16, diameter: this._radius},
            this._scene
        );
        this._sphere.material = this._material;
    }

    select(): void {
        this._material.emissiveColor = this._selectedColor;
        this._menu.show();
    }

    deselect(): void {
        if ((<any>this._ui).onGUI) {
            return;
        }
        this._material.emissiveColor = this._color;
        this._menu.hide();
    }
}
