class BaseShip{
    private _body: BABYLON.Mesh;
    private _color: BABYLON.Color3 = BABYLON.Color3.Black();
    private _selectedColor: BABYLON.Color3 = BABYLON.Color3.White();
    private _material: BABYLON.StandardMaterial;
    private _selected: boolean = false;
    private _maxSpeed: number = 1;
    private _menu: ShipMenu;
    private _target: any = null;
    constructor(
        private _system: StarSystem,
        private _size: number,
        private _velocity: BABYLON.Vector3,
        private _position: BABYLON.Vector3,
    ){
        this._body = BABYLON.MeshBuilder.CreateBox('body', {size: _size}, this._system.scene);
        this._position = _position;
        this._body.position = this._body.position;

        this._material = new BABYLON.StandardMaterial("ShipMaterial", this._system.scene);
        this._body.material = this._material
        this._material.emissiveColor = this._color;

        // Bind fixedUpdate to be called every physics tick
        this._system.scene.onBeforeStepObservable.add(this.fixedUpdate.bind(this));
        // Bind update to be called every frame
        this._system.scene.onBeforeRenderObservable.add(this.update.bind(this));
        // Bind click function (mask 32 is click).
        this._system.scene.onPointerObservable.add(this.click.bind(this), 32);

        this._menu = new ShipMenu(this._system.ui, this);
        this._system.ui.onKeyDownObservable.add(this.select.bind(this));
    }
    fixedUpdate(): void {
        // Update phase.
        if (this._target) {
            this._velocity = this._target.position.subtract(this._body.position);
            if (this._velocity.length() > this._maxSpeed) {
                this._velocity = this._velocity.scale(this._maxSpeed / this._velocity.length());
        } else {this._velocity = BABYLON.Vector3.Zero()}
        this._position.addInPlace(this._velocity);
        // rotate function
        // let matrix = new BABYLON.Matrix();
        // BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 1, 0), Math.PI / 180).toRotationMatrix(matrix);
        // BABYLON.Vector3.TransformCoordinatesToRef(this._velocity, matrix, this._velocity);
        // BABYLON.Vector3.TransformCoordinatesToRef(this._acceleration, matrix, this._acceleration);
        }
    }
    private updatePosition(): void {
        this._body.position = this._position;
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
        this._menu.show();
        this._material.emissiveColor = this._selectedColor;
    }

    deselect(): void {
        if ((<any>this._system.ui).onGUI) {
            return;
        }
        this._selected = false;
        this._menu.hide()
        this._material.emissiveColor = this._color;
    }

    target_acquired(): void {
        this._target = this._system.planets[(Math.floor(Math.random() * this._system.planets.length))]
    }

    target_lost(): void {
        this._velocity = BABYLON.Vector3.Zero()
    }
}

class ShipMenu extends StellarObjectMenu {
    constructor(ui: GameGUI, ship: BaseShip) {
        super(ui, "Boaty Mc Boat Face");

        let setTargetBtn = BABYLON.GUI.Button.CreateSimpleButton("SetTarget", "Set Target");
        setTargetBtn.background = "#DD7777";
        setTargetBtn.left = "15px";
        setTargetBtn.top = "70px";
        setTargetBtn.height = "50px";
        setTargetBtn.width = "200px";
        setTargetBtn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        setTargetBtn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        setTargetBtn.onPointerClickObservable.add(ship.target_acquired.bind(ship));
        this.container.addControl(setTargetBtn);
    }

}
