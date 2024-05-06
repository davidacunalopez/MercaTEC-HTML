function setAltoContraste(){
    var stylesheet = document.getElementById('altoContrasteCss');
    stylesheet.disabled = !stylesheet.disabled;
    localStorage.setItem('ALTOCONTRASTE', stylesheet.disabled ? 0 : 1);

    var stylesheet = document.getElementById('altoContrasteIndexCss');
    stylesheet.disabled = !stylesheet.disabled;
    localStorage.setItem('ALTOCONTRASTE', stylesheet.disabled ? 0 : 1);
}

function cargarDatos() {
    if (localStorage.getItem('ALTOCONTRASTE') == 1) {
        var stylesheet = document.getElementById('altoContrasteCss');
        stylesheet.disabled = false;
    }
}

cargarDatos();