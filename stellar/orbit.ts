class Orbit {
    public readonly GRAVITATIONAL_CONSTANT: number = 5;
    private readonly _intermediate: number = 4 * Math.PI * Math.PI / this.GRAVITATIONAL_CONSTANT;
    private readonly anomalyRadians: number;
    private readonly planeNormal = new BABYLON.Vector3(0, 1, 0);
    public readonly period: number;

    constructor(
        public readonly semimajor: number,
        public readonly sunMass: number,
        public readonly eccentricity: number = 0.1,
        public readonly inclination: number = 0,
        public readonly ascendingLongitude: number = 0,
        public readonly argument: number = 0,
        public readonly anomaly: number = 0,
    ){
        this.period = Math.sqrt(Math.pow(this.semimajor, 3) * this._intermediate / this.sunMass);
        this.anomalyRadians = anomaly / 180 * Math.PI;
    }

    getLocation(time: number): BABYLON.Vector3{
        let M = this.anomalyRadians + 2 * Math.PI * (time % this.period);
        // Numerical methods yay!
        let E = M;
        for (let i = 0; i < 10; i++) {
            E = this.eccentricity * Math.sin(E) + M;
        }
        let r = this.semimajor * (1 - this.eccentricity * Math.cos(E));
        // r = this.semimajor * (1 - this.eccentricity * this.eccentricity) / (1 + this.eccentricity * Math.cos(phi))
        let phi = Math.acos((this.semimajor / r * (1 - this.eccentricity * this.eccentricity) - 1) / this.eccentricity);
        // console.log(phi);
        let position = new BABYLON.Vector3(r);

        let matrix = new BABYLON.Matrix()
        BABYLON.Quaternion.RotationAxis(this.planeNormal, phi).toRotationMatrix(matrix);
        BABYLON.Vector3.TransformCoordinatesToRef(position, matrix, position);
        return position;

        position = position.rotateByQuaternionToRef(BABYLON.Quaternion.RotationAxis(this.planeNormal, phi), position);
        return position;
    }
}
