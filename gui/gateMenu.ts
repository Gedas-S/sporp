class GateMenu extends StellarObjectMenu{
    constructor(ui: GameGUI, gate: MoleHole) {
        super(ui, `Hole to ${gate.targetSystem.name}`);

        let goToTargetBtn = BABYLON.GUI.Button.CreateSimpleButton("Go to", `Go to ${gate.targetSystem.name}`);
        goToTargetBtn.background = "#77DDCC";
        goToTargetBtn.left = "15px";
        goToTargetBtn.top = "70px";
        goToTargetBtn.height = "50px";
        goToTargetBtn.width = "200px";
        goToTargetBtn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        goToTargetBtn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        goToTargetBtn.onPointerClickObservable.add(gate.targetSystem.goto.bind(gate.targetSystem));
        this.container.addControl(goToTargetBtn);
    }
}
