class StellarObjectMenu {
    protected container: BABYLON.GUI.Container;
    protected _shown: boolean = false;

    constructor(protected ui: BABYLON.GUI.AdvancedDynamicTexture, name: string) {
        this.container = new BABYLON.GUI.Container("StellarObjectMenu");
        this.container.height = "40%";
        this.container.width = "20%";
        this.container.background = "#222222";
        this.container.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.container.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        let header = new BABYLON.GUI.TextBlock("StellarObjectHeader", name);
        header.top = "10px";
        header.height = "50px";
        header.color = "white";
        header.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        header.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.container.addControl(header);

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
