var dropAreaPos = document.getElementById("drop-area-pos");

dropAreaPos.addEventListener("drop", dropPos);
dropAreaPos.addEventListener("dragover", dragover);
dropAreaPos.addEventListener("dragleave", dragleave);

function dropPos(e) {
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        let text = event.target.result;
        parseToArrays(text, simulateObject);
        simulateObject.simulateByData();
        $('#file-spins').trigger('upload-pos');
    });
    reader.readAsText(file);
}

function dragover(e){
    e.preventDefault();
    this.classList.add('dragover');
}

function dragleave(e){
    e.preventDefault();
    this.classList.remove('dragover');
}
