class PlanetList {
    private panel: BABYLON.GUI.StackPanel;
    private _planets: Planet[];

    constructor(
        private _system: StarSystem,
    ) {
        this.panel = new BABYLON.GUI.StackPanel();
        this.panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.panel.left = "0%";
        this.panel.width = "10%";
        this.panel.top = "0%";
        this.panel.isVertical = true;

        this._system.uiControls.push(this.panel);
        this._system.scene.onBeforeRenderObservable.add(this.update.bind(this));
    }

    private update(): void {
        if (this._planets == this._system.planets) return;
        this._planets = this._system.planets;
        this.panel.clearControls();
        this.panel.height = (50 * this._system.planets.length).toString() + "px";
        for (let [index, planet] of this._system.planets.entries()) {
            this.addButton(index, planet);
        }
    }

    private addButton(index: number, planet: Planet): void {
        var button = BABYLON.GUI.Button.CreateSimpleButton("planetButton", index.toString());
        button.height = "50px";
        button.width = 1;
        button.background = BABYLON.Color3.Random().toHexString();

        this.panel.addControl(button);
        button.onPointerUpObservable.add(function() {
            planet.select();
        })
    }

}
