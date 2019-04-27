class PlanetMenu extends StellarObjectMenu{
    constructor(ui: BABYLON.GUI.AdvancedDynamicTexture, planet: TestSphere) {
        super(ui, "Das PLANETO");

        let enlargeBtn = BABYLON.GUI.Button.CreateSimpleButton("Enlarge", "Enlarge");
        enlargeBtn.background = "#77DDCC";
        enlargeBtn.left = "15px";
        enlargeBtn.top = "70px";
        enlargeBtn.height = "50px";
        enlargeBtn.width = "200px";
        enlargeBtn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        enlargeBtn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        enlargeBtn.onPointerClickObservable.add(planet.enlarge.bind(planet));
        this.container.addControl(enlargeBtn);
    }
}
