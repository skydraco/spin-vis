var bluewhitered = '\
vec3 colormap(vec3 direction) { \
    if (direction.z < 0.0) { \
        vec3 color_down = vec3(0.0, 0.0, 1.0); \
        vec3 color_up = vec3(1.0, 1.0, 1.0); \
        return mix(color_down, color_up, normalize(direction).z+1.0); \
    } else { \
        vec3 color_down = vec3(1.0, 1.0, 1.0); \
        vec3 color_up = vec3(1.0, 0.0, 0.0); \
        return mix(color_down, color_up, normalize(direction).z); \
    } \
}';
let webglspins;
let iteration = 0;
let n = 0;
let simulateObject = {
    spinPositions: [],
    spinDirections: [],
    spinNeighbor: [],
    simulateNew: (e) => {
        n = e;
        simulateObject.spinPositions = [];
        simulateObject.spinDirections = [];
        webglspins = simulateObject.createwebglspins();
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
        simulateObject.neighbors();
    },
    simulateByData: () => {
        n = simulateObject.spinPositions.length / 3;
        webglspins = simulateObject.createwebglspins();
        webglspins.updateSpins(simulateObject.spinPositions, simulateObject.spinDirections);
        simulateObject.neighbors();
    },

    downloadFile: () => {
        const dataPositions = [simulateObject.spinPositions];
        const dataDirections = [simulateObject.spinDirections];
        var bbp = new Blob(dataPositions, { type: 'text/plain' });
        var bbd = new Blob(dataDirections, { type: 'text/plain' });
        saveAs(bbp, "positions.txt");
        saveAs(bbd, "directions.txt");
    },

    createwebglspins: () => {
        return new WebGLSpins(document.getElementById('webgl-canvas'), {
            cameraLocation: [Math.sqrt(n) / 1.5, Math.sqrt(n) * 0.95, Math.sqrt(n) * 2.5],
            centerLocation: [Math.sqrt(n) / 1.5, Math.sqrt(n) * 0.95, 0],
            upVector: [0, 1, 0],
            levelOfDetail: 5,
            backgroundColor: [0.1, 0.11, 0.13],
            colormapImplementation: bluewhitered,
            renderers: [
                WebGLSpins.renderers.ARROWS, [WebGLSpins.renderers.SPHERE, [0.0, 0.0, 0.2, 0.2]],
                [WebGLSpins.renderers.COORDINATESYSTEM, [0.0, 0.2, 0.2, 0.2]]
            ]
        });
    },
    neighbors: () => {
        for (var row = 0; row < Math.sqrt(n); row++) {
            for (var column = 0; column < Math.sqrt(n); column++) {
                var number = 4 * (row * Math.sqrt(n) + column);

                simulateObject.spinNeighbor[number] = simulateObject.border_check(row + 1) * Math.sqrt(n) + column;        // RIGHT
                simulateObject.spinNeighbor[number + 1] = row * Math.sqrt(n) + simulateObject.border_check(column + 1);   // UP
                simulateObject.spinNeighbor[number + 2] = simulateObject.border_check(row - 1) * Math.sqrt(n) + column;  // LEFT
                simulateObject.spinNeighbor[number + 3] = row * Math.sqrt(n) + simulateObject.border_check(column - 1); // DOWN
            }
        }
    },
    magnetization(form) {

        var M_x = 0.;
        var M_y = 0.;
        var M_z = 0.;
        var M = 0.;

        for (var num = 0; num < n * 3; num += 3) {
            M_x += simulateObject.spinDirections[num];       // x
            M_y += simulateObject.spinDirections[num + 1];   // y
            M_z += simulateObject.spinDirections[num + 2];   // z
        }

        M = Math.sqrt(M_x * M_x + M_y * M_y + M_z * M_z) / (n);
        form.display.value =Math.abs(M)
    },
    ferromagnetic_create() {

        simulateObject.spinPositions = [];
        simulateObject.spinDirections = [];

        for (var row = 0; row < Math.sqrt(n); row++) {
            for (var column = 0; column < Math.sqrt(n); column++) {
                var spinPosition = [2 * column, 2 * row, 0];
                Array.prototype.push.apply(simulateObject.spinPositions, spinPosition);
                var spinDirection = [0, 0, 1];
                Array.prototype.push.apply(simulateObject.spinDirections, spinDirection);
            }
        }
        webglspins.updateSpins(simulateObject.spinPositions, simulateObject.spinDirections);
        simulateObject.neighbors();

    },
    border_check(neighbor) {
        return ((Math.sqrt(n) + neighbor) % Math.sqrt(n));
    },

    espin(number) {
        var E = 0.;

        var X = 3 * number;
        var Y = 3 * number + 1;
        var Z = 3 * number + 2;

        var R = 3 * simulateObject.spinNeighbor[4 * number]; // spinNeighbor вернет number соседа, поэтому его тоже домножаем на 3, а внутри на 4 т.к 4 соседа, ясно
        var U = 3 * simulateObject.spinNeighbor[4 * number + 1];
        var L = 3 * simulateObject.spinNeighbor[4 * number + 2];
        var D = 3 * simulateObject.spinNeighbor[4 * number + 3];

        E += simulateObject.spinDirections[X] * (simulateObject.spinDirections[R] + simulateObject.spinDirections[U] + simulateObject.spinDirections[L] + simulateObject.spinDirections[D]);
        E += simulateObject.spinDirections[Y] * (simulateObject.spinDirections[R + 1] + simulateObject.spinDirections[U + 1] + simulateObject.spinDirections[L + 1] + simulateObject.spinDirections[D + 1]);
        E += simulateObject.spinDirections[Z] * (simulateObject.spinDirections[R + 2] + simulateObject.spinDirections[U + 2] + simulateObject.spinDirections[L + 2] + simulateObject.spinDirections[D + 2]);
        return (-1.) * E;
    },

    energy(form) {
        var Esys = 0.;
        for (var num = 0; num < n; ++num) {
            Esys += simulateObject.espin(num)
        }
        Esys /= 2. * n
        form.display.value =Esys;
    },

    getRandomInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;//Максимум и минимум включаются
    },
    getRandomIzing() {
        return (Math.floor(Math.random() * 2) === 0) ? -1 : 1;
    },

    randomspinIzing_create() {

        iteration += 1;

        simulateObject.spinPositions = [];
        simulateObject.spinDirections = [];

        for (var row = 0; row < Math.sqrt(n); row++) {
            for (var column = 0; column < Math.sqrt(n); column++) {
                var posit=simulateObject.getRandomIzing();
                var spinPosition = [2 * column, 2 * row, 0];
                Array.prototype.push.apply(simulateObject.spinPositions, spinPosition);
                var spinDirection = [0, 0, posit];
                Array.prototype.push.apply(simulateObject.spinDirections, spinDirection);
            }
        }
        webglspins.updateSpins(simulateObject.spinPositions, simulateObject.spinDirections);
    },
    randomspin_create() {
        var h = 0.125 * Math.sqrt(n); // - размер ядра скирмиона

        simulateObject.spinPositions = [];
        simulateObject.spinDirections = [];

        for (var row = 0; row < Math.sqrt(n); row++) {
            for (var column = 0; column < Math.sqrt(n); column++) {
                var spinPosition = [2 * column, 2 * row, 0];
                Array.prototype.push.apply(simulateObject.spinPositions, spinPosition);
                var phi= simulateObject.getRandomInclusive(0, 360);
                var theta=simulateObject.getRandomInclusive(0, 180);

                var phi2= phi*Math.PI/180.;
                var theta2=theta*Math.PI/180.;

                var spinDirection = [
                    (Math.sin(theta2)*Math.cos(phi2)),
                    (Math.sin(theta2)*Math.sin(phi2)),
                    (Math.cos(theta2))];

                Array.prototype.push.apply(simulateObject.spinDirections, spinDirection);
            }
        }
        webglspins.updateSpins(simulateObject.spinPositions, simulateObject.spinDirections)
    },
    skyrmion_create() {

        var h = 0.125 * Math.sqrt(n); // - размер ядра скирмиона

        simulateObject.spinPositions = [];
        simulateObject.spinDirections = [];

        for (var row = 0; row < Math.sqrt(n); row++) {
            for (var column = 0; column < Math.sqrt(n); column++) {
                var spinPosition = [2 * column, 2 * row, 0];
                Array.prototype.push.apply(simulateObject.spinPositions, spinPosition);

                var x = (column - Math.sqrt(n) / 2);
                var y = (row - Math.sqrt(n) / 2);
                var d = (x * x + y * y + h * h);

                var spinDirection = [
                    -(h * x / d),
                    -(h * y / d),
                    (x * x + y * y - h * h) / d];

                Array.prototype.push.apply(simulateObject.spinDirections, spinDirection);
            }
        }
        webglspins.updateSpins(simulateObject.spinPositions, simulateObject.spinDirections)
    },
    default_camera() {
        webglspins.updateOptions({
        cameraLocation: [Math.sqrt(n) / 1.5, Math.sqrt(n) * 0.95, Math.sqrt(n) * 2.5],
        centerLocation: [Math.sqrt(n) / 1.5, Math.sqrt(n) * 0.95, 0],
        upVector: [0, 1, 0]
        });
    }

}

