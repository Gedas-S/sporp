class GUIContainer {
    public container: BABYLON.GUI.Container;

    constructor(protected ui: GameGUI){
        this.container = new BABYLON.GUI.Container("GUIContainer");

        this.container.onPointerEnterObservable.add(function(){ui.mouseOnGUI = true});
        this.container.onPointerOutObservable.add(function(){ui.mouseOnGUI = false});
    }
}

class StellarObjectMenu extends GUIContainer{
    constructor(ui: GameGUI, name: string) {
        super(ui);
        this.container.isVisible = false;
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
        this.container.isVisible = true;
    }

    hide(): void {
        this.container.isVisible = false;
    }
}
