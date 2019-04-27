class PlanetMenu {
    private container: BABYLON.GUI.Container;
    private _shown: boolean = false;

    constructor(private ui: BABYLON.GUI.AdvancedDynamicTexture, private planet: TestSphere) {
        this.container = new BABYLON.GUI.Container("PlanetMenu");
        this.container.height = "40%";
        this.container.width = "20%";
        this.container.background = "#222222";
        this.container.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.container.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        let header = new BABYLON.GUI.TextBlock("PlanetHeader", "Das PLANETO");
        header.top = "10px";
        header.height = "50px";
        header.color = "white";
        header.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        header.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.container.addControl(header);

        let enlargeBtn = BABYLON.GUI.Button.CreateSimpleButton("Enlarge", "Enlarge");
        enlargeBtn.background = "#77DDCC";
        enlargeBtn.left = "15px";
        enlargeBtn.top = "70px";
        enlargeBtn.height = "50px";
        enlargeBtn.width = "200px";
        enlargeBtn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        enlargeBtn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        enlargeBtn.onPointerClickObservable.add(planet.enlarge.bind(planet))
        this.container.addControl(enlargeBtn);
    }

    show(): void {
        if (this._shown) {
            return;
        }
        this._shown = true;
        this.ui.addControl(this.container);
    }

    hide(): void {
        if (!this._shown) {
            return;
        }
        this._shown = false;
        this.ui.removeControl(this.container);
    }
}
