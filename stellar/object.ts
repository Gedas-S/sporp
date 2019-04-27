class TestSphere {
    private _phase: number;
    private _sphere: BABYLON.Mesh;

    constructor(private _scene: BABYLON.Scene, private _radius: number, private _speed: number, private _orbitRadius: number) {
        this._phase = 0;

        // Create a built-in "sphere" shape; with 16 segments.
        this._sphere = BABYLON.MeshBuilder.CreateSphere(
            'sphere',
            {segments: 16, diameter: this._radius},
            this._scene
        );

        // Bind fixedUpdate to be called every physics tick
        this._scene.onBeforeStepObservable.add(() => this.fixedUpdate());
        // Bind update to be called every frame
        this._scene.onBeforeRenderObservable.add(() => this.update());
    }

    fixedUpdate(): void {
        // Update phase.
        this._phase = (this._phase + this._speed) % 360;
    }

    update(): void {
        // Get delta time. We don't need it, only for reference. :P
        let deltaTime = this._scene.getEngine().getDeltaTime();
        // Update mesh position.
        this._sphere.position.x = Math.cos(this._phase / 180 * Math.PI) * this._orbitRadius;
        this._sphere.position.z = Math.sin(this._phase / 180 * Math.PI) * this._orbitRadius;
    }
}
