class PlanetMenu extends StellarObjectMenu{
    constructor(ui: BABYLON.GUI.AdvancedDynamicTexture, planet: Planet) {
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

        let addGrassBtn = BABYLON.GUI.Button.CreateSimpleButton("MakeGreen", "GREEEEEN!");
        addGrassBtn.background = "#77DDCC";
        addGrassBtn.left = "15px";
        addGrassBtn.top = "130px";
        addGrassBtn.height = "50px";
        addGrassBtn.width = "200px";
        addGrassBtn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        addGrassBtn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        addGrassBtn.onPointerClickObservable.add(planet.addGrass.bind(planet));
        this.container.addControl(addGrassBtn);
    }
}
