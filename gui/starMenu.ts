class StarMenu extends StellarObjectMenu{
    constructor(ui: BABYLON.GUI.AdvancedDynamicTexture, star: Star) {
        super(ui, "Das PLANETO");

        let enlargeBtn = BABYLON.GUI.Button.CreateSimpleButton("Enlarge", "Enlarge");
        enlargeBtn.background = "#77DDCC";
        enlargeBtn.left = "15px";
        enlargeBtn.top = "70px";
        enlargeBtn.height = "50px";
        enlargeBtn.width = "200px";
        enlargeBtn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        enlargeBtn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        enlargeBtn.onPointerClickObservable.add(star.enlarge.bind(star))
        this.container.addControl(enlargeBtn);

        let colorizeBtn = BABYLON.GUI.Button.CreateSimpleButton("Colorize", "Colorize");
        colorizeBtn.background = "#994411";
        colorizeBtn.left = "15px";
        colorizeBtn.top = "130px";
        colorizeBtn.height = "50px";
        colorizeBtn.width = "200px";
        colorizeBtn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        colorizeBtn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        colorizeBtn.onPointerClickObservable.add(star.colorize.bind(star))
        this.container.addControl(colorizeBtn);
    }
}
