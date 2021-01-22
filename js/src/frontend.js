$('.resizable').resizable();
$('#webgl-canvas').attr('width', $('.spin-grid__visible').width()+100);

var oldsize = 0;
$('.spin-grid__visible').bind('resize', function () {
    var globsize = this.parentElement.offsetWidth;
    var thissize = this.offsetWidth;
    var def = globsize - thissize;
    if (thissize != oldsize) {
        oldsize = thissize;
        document.querySelector('.sidebar-grid__import').style.width = 'calc(' + def + 'px - 1em)';
        document.querySelector('.sidebar-grid__toolbar').style.width = 'calc(' + def + 'px - 1em)';
    }
    document.querySelector('canvas').style.width = this.style.width;
});

$('.sidebar-grid__import').bind('resize', function () {
    var globsize = this.parentElement.offsetHeight;
    var thissize = this.offsetHeight;
    var def = globsize - thissize;

    document.querySelector('.sidebar-grid__toolbar').style.height = 'calc(' + def + 'px - 1em)';
});

$('#file-spins').on('input keyup upload-pos', function() {
    var label = $('[for="file-spins"]');
    fileInfo(label);
});

$('#refresh').on('click', function() {
    label = $('.is-ready');
    label.addClass('is-active');
    setTimeout(function() {
        label.removeClass('is-active');
        label.removeClass('is-ready');
    },520);
    $('.dragover').removeClass('dragover');
});

$('.checked').on('click', function() {
    $('.checked.is-active').removeClass('is-active');
    $(this).addClass('is-active');
});

$('.check-refresh').on('click', function() {
    $('.checked.is-active').removeClass('is-active');
});

function fileInfo(label) {
    label.addClass('is-active');
    label.addClass('is-ready');

    setTimeout(function() {
        label.removeClass('is-active');
    },520);
}

function changeValue(value) {
    document.getElementById('value').innerText=value;
}

function getNewValue(e) {
    form = e;
    value = document.getElementById('value').innerText;
    if (value == "E =") simulateObject.energy(form);
    if (value == "M =")  simulateObject.magnetization(form);
}

var html2canvasConfiguration = {
    useCORS: true,
    backgroundColor: null,
    logging: true,
    imageTimeout: 0
};

function DownloadImage() {
    html2canvas(document.querySelector('#webgl-canvas') ,html2canvasConfiguration).then(function(canvas) {
        var a = document.createElement('a');
        a.href = canvas.toDataURL();
        a.download = 'spin.png';
        a.click();
        a.remove();
    })
}

