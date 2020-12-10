let iteration = 0;
let simulateObject = {
    spinPositions: [],
    spinDirections: [],
    simulateNew: () => {
        simulateObject.spinPositions = [];
        simulateObject.spinDirections = [];
        var n = 100;
        var webglspins = simulateObject.createwebglspins(n);
        iteration += 1;
        for (var row = 0; row < Math.sqrt(n); row++) {
            for (var column = 0; column < Math.sqrt(n); column++) {
                var spinPosition = [2 * column, 2 * row, 0];
                Array.prototype.push.apply(simulateObject.spinPositions, spinPosition);
                var spinDirection = [
                    Math.sin(column * 0.3) * Math.cos((row + iteration) * 0.05),
                    Math.cos(column * 0.3) * Math.cos((row + iteration) * 0.05),
                    Math.sin((row + iteration) * 0.05)
                ];
                Array.prototype.push.apply(simulateObject.spinDirections, spinDirection);
            }
        }
        webglspins.updateSpins(simulateObject.spinPositions, simulateObject.spinDirections);
    },
    simulateByData: () => {
        var n = simulateObject.spinPositions.length / 3;
        var webglspins = simulateObject.createwebglspins(n);
        webglspins.updateSpins(simulateObject.spinPositions, simulateObject.spinDirections);
    },

    downloadFile: () => {
        const dataPositions = [simulateObject.spinPositions];
        const dataDirections = [simulateObject.spinDirections];
        var bbp = new Blob(dataPositions, { type: 'text/plain' });
        var bbd = new Blob(dataDirections, { type: 'text/plain' });
        saveAs(bbp, "positions.txt");
        saveAs(bbd, "directions.txt");
    },

    createwebglspins: (n) => {
        return new WebGLSpins(document.getElementById('webgl-canvas'), {
            cameraLocation: [Math.sqrt(n) / 1.5, Math.sqrt(n) * 0.95, Math.sqrt(n) * 2.5],
            centerLocation: [Math.sqrt(n) / 1.5, Math.sqrt(n) * 0.95, 0],
            upVector: [0, 1, 0],
            levelOfDetail: 5,
            backgroundColor: [0.1, 0.11, 0.13],
            renderers: [
                WebGLSpins.renderers.ARROWS, [WebGLSpins.renderers.SPHERE, [0.0, 0.0, 0.2, 0.2]],
                [WebGLSpins.renderers.COORDINATESYSTEM, [0.0, 0.2, 0.2, 0.2]]
            ]
        });
    }
}