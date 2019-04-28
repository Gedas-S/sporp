class Planet implements StellarObject {
    private _phase: number = 0;
    private _sphere: BABYLON.Mesh;
    private _menu: PlanetMenu;
    private _material: BABYLON.StandardMaterial;
    private _color: BABYLON.Color3 = BABYLON.Color3.Random();
    private _selectedColor: BABYLON.Color3 = BABYLON.Color3.Red();
    private _camera: BABYLON.FreeCamera;
    public position: BABYLON.Vector3;

    constructor(
        private _scene: BABYLON.Scene,
        private _ui: BABYLON.GUI.AdvancedDynamicTexture,
        private _radius: number,
        private _speed: number,
        private _orbitRadius: number,
        private _parent: StellarObject,
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
        this.updatePosition();

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
        this._phase = (this._phase + this._speed) % 360;
    }

    moveCamera(camera: BABYLON.FreeCamera): void {
        this._camera = camera
    }

    /**
     * update mesh position
     */
    private updatePosition(): void {
        this.position = (new BABYLON.Vector3(
            Math.cos(this._phase / 180 * Math.PI) * this._orbitRadius,
            0,
            Math.sin(this._phase / 180 * Math.PI) * this._orbitRadius,
        )).add(this._parent.position);
        this._sphere.position = this.position;
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

    addGrass(): void {
        this._material.diffuseTexture = new BABYLON.GrassProceduralTexture("Grass", 256, this._scene);
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
