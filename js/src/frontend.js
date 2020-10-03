$('.resizable').resizable();

$('.spin-grid__visible').bind('resize', function(){
    var globsize = this.parentElement.offsetWidth;
    var thissize = this.offsetWidth;
    var def = globsize - thissize;
    document.querySelector('.sidebar-grid__import').style.width = 'calc(' + def + 'px - 1em)';
    document.querySelector('.sidebar-grid__toolbar').style.width = 'calc(' + def + 'px - 1em)';
});

$('.sidebar-grid__import').bind('resize', function(){
    var globsize = this.parentElement.offsetHeight;
    var thissize = this.offsetHeight;
    var def = globsize - thissize;

    document.querySelector('.sidebar-grid__toolbar').style.height = 'calc(' + def + 'px - 1em)';
});