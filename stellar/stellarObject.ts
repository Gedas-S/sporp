abstract class StellarObject {
    position: BABYLON.Vector3;
    public system: StarSystem;

    get _scene() : BABYLON.Scene {
        return this.system.scene;
    }
}
