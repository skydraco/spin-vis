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

$('#file-positions').on('input keyup', function() {
    var label = $('[for="file-positions"]');
    fileInfo(label, 'позиций');
});

$('#file-directions').on('input keyup', function() {
    var label = $('[for="file-directions"]');
    fileInfo(label, 'направлений');
});

$('#refresh').on('click', function() {
    $('[for="file-positions"]').find('span').text('Импорт позиций');
    $('[for="file-directions"]').find('span').text('Импорт направлений');
});

$('.checked').on('click', function() {
    $('.checked.is-active').removeClass('is-active');
    $(this).addClass('is-active');
});

$('.check-refresh').on('click', function() {
    $('.checked.is-active').removeClass('is-active');
});

function fileInfo(label, text) {
    label.addClass('is-active');

    setTimeout(function() {
        label.removeClass('is-active');
        label.find('span').text('Импорт ' + text + ' завершен');
    },520);
}

