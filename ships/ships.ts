class BaseShip{
    private _body: BABYLON.Mesh;
    private _color: BABYLON.Color3 = BABYLON.Color3.Black();
    private _selectedColor: BABYLON.Color3 = BABYLON.Color3.White();
    private _acceleration: BABYLON.Vector3 = BABYLON.Vector3.Zero();
    private _material: BABYLON.StandardMaterial;
    private _selected: boolean = false;
    constructor(
        private _scene: BABYLON.Scene,
        private _ui: BABYLON.GUI.AdvancedDynamicTexture,
        private _size: number,
        private _velocity: BABYLON.Vector3,
        private _position: BABYLON.Vector3
    ){
        this._body = BABYLON.MeshBuilder.CreateBox('body', {size: _size}, this._scene);

        this._body.position = _position;

        this._material = new BABYLON.StandardMaterial("ShipMaterial", this._scene);
        this._body.material = this._material
        this._material.emissiveColor = this._color;

        // Bind fixedUpdate to be called every physics tick
        this._scene.onBeforeStepObservable.add(this.fixedUpdate.bind(this));
        // Bind update to be called every frame
        this._scene.onBeforeRenderObservable.add(this.update.bind(this));
        // Bind click function (mask 32 is click).
        this._scene.onPointerObservable.add(this.click.bind(this), 32);
    }
    fixedUpdate(): void {
        // Update phase.
        this._velocity.addInPlace(this._acceleration);
        let quart = BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 1, 0), Math.PI / 180)
        this._velocity.rotateByQuaternionToRef(quart, this._velocity)
    }
    private updatePosition(): void {
        this._body.position.addInPlace(this._velocity);
    }

    update(): void {
        this.updatePosition();
    }

    click(eventData: BABYLON.PointerInfo): void {
        if (eventData.pickInfo.pickedMesh == this._body) {
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