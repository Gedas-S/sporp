class StarMap {
    public Systems: StarSystem[] = [];
    private _activeSystem: StarSystem = null;

    constructor(private _game: Game){
        this.Systems.push(new StarSystem(this._game, this._game.gameGUI, "Systemo uno"));
        this.activateSystem(this.Systems[0]);
    }

    render(): void {
        if (this._activeSystem) {
            this._activeSystem.scene.render();
        }
    }

    get activeSystem(): StarSystem{
        return this._activeSystem;
    }

    activateSystem(system: StarSystem): void{
        if (this._activeSystem != null){
            this.deactivateSystem();
        }

        system.scene.activeCamera.attachControl(this._game.canvas, false);
        this._activeSystem = system;
    }

    deactivateSystem(): void{
        this._activeSystem.scene.activeCamera.detachControl(this._game.canvas);
        this._activeSystem = null;
    }
}
