var dropAreaPos = document.getElementById("drop-area-pos");
var dropAreaDir = document.getElementById("drop-area-dir");

dropAreaPos.addEventListener("drop", dropPos); // событие при перетаскивании объекта
dropAreaPos.addEventListener("dragover", dragover); // событие при наведении на объект
dropAreaPos.addEventListener("dragleave", dragleave);
dropAreaDir.addEventListener("drop", dropDir); 
dropAreaDir.addEventListener("dragover", dragover);
dropAreaDir.addEventListener("dragleave", dragleave);

function dropPos(e) {
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        let text = event.target.result;
        let result = text.split `,`.map(x => +x);
        simulateObject.spinPositions = result;
        simulateObject.simulateByData();
        $('#file-positions').trigger('upload-pos');
    });
    reader.readAsText(file);
}

function dropDir(e) {
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        let text = event.target.result;
        let result = text.split `,`.map(x => +x);
        simulateObject.spinDirections = result;
        simulateObject.simulateByData();
        $('#file-directions').trigger('upload-dir');
    });
    reader.readAsText(file);
}

// отмена события по умолчанию
function dragover(e){
    e.preventDefault();
    this.classList.add('dragover');
}

function dragleave(e){
    e.preventDefault();
    this.classList.remove('dragover');
}
