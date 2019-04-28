class PlanetList {
    constructor(
        private _ui: GameGUI,
        private _planets: Planet[]
    ) {
        let height = 50 * _planets.length;

        let panel = new BABYLON.GUI.StackPanel();
        panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        panel.left = "0%";
        panel.width = "10%";
        panel.top = "0%";
        panel.height = height.toString() + "px";
        panel.isVertical = true;

        var addButton = function(_index: number) {
            var button = BABYLON.GUI.Button.CreateSimpleButton("planetButton", _index.toString());
            button.height = "50px";
            button.width = 1;
            button.background = BABYLON.Color3.Random().toHexString();

            panel.addControl(button);
            button.onPointerUpObservable.add(function() {
                _planets[_index].select();
            })
        }

        for (let index = 0; index < _planets.length; index++) {
            addButton(index);
        }

        this._ui.fullscreenUI.addControl(panel);

    }

}
