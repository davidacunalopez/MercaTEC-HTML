function setAltoContraste(){
    var stylesheet = document.getElementById('altoContrasteCss');
    stylesheet.disabled = !stylesheet.disabled;
    localStorage.setItem('ALTOCONTRASTE', stylesheet.disabled ? 0 : 1);

    var stylesheet = document.getElementById('altoContrasteIndexCss');
    stylesheet.disabled = !stylesheet.disabled;
    localStorage.setItem('ALTOCONTRASTE', stylesheet.disabled ? 0 : 1);
}

function cargarDatos() {
    if (localStorage.getItem('ALTOCONTRASTE') == null) {
        localStorage.setItem('ALTOCONTRASTE', 0);
    } else {
        if (localStorage.getItem('ALTOCONTRASTE') == 1) {
            var stylesheet = document.getElementById('altoContrasteCss');
            stylesheet.disabled = false;

            var stylesheet = document.getElementById('altoContrasteIndexCss');
            stylesheet.disabled = false;
        }
    }
    
}

cargarDatos();

function iniciarSesion(){
    window.location.href = "Iniciar sesion.html";
};

function registrarse(){
    window.location.href = "Registrarse.html";
};