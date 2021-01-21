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

$('#file-positions').on('input keyup upload-pos', function() {
    var label = $('[for="file-positions"]');
    fileInfo(label);
});

$('#file-directions').on('input keyup upload-dir', function() {
    var label = $('[for="file-directions"]');
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

