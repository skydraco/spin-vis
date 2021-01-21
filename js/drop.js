var dropArea = document.getElementById("drop-area");
var result = document.getElementById("result");

dropArea.addEventListener("drop", drop); // событие при перетаскивании объекта
dropArea.addEventListener("dragover", dragover); // событие при наведении на объект
dropArea.addEventListener("dragleave", dragleave);

function drop(e) {
    e.preventDefault();
    
    // информация о перетаксиваемом файле
    var file = e.dataTransfer.files[0];
    
    // вывести информацию о файле
    result.innerHTML = file.name + " <span class='grey'>(" + file.type + " — " + file.size + " байт)</span>";
    this.style.borderColor = "grey"; 
    // !!!!!!!!!!!!!!!!!!!!!!!!
    //тут вставить что нужно сделать с файлом 


}

// отмена события по умолчанию
function dragover(e){
    this.style.borderColor = "orange";
    e.preventDefault();
}

function dragleave(e){
    this.style.borderColor = "grey";
    e.preventDefault();
}
