function cargarDatos() {
    const imgPerfil = document.getElementById('imgPerfil'); 
    const lblNombreVendedor = document.getElementById('lblNombreVendedor');
    const lblNombrePS = document.getElementById('lblNombrePS');
    const lblPrecioPS = document.getElementById('lblPrecioPS');
    const lblDescripcionPS = document.getElementById('lblDescripcionPS');
    const imgPS = document.getElementById('imgPS');

    imgPerfil.src = localStorage.getItem('IMGPERFIL');
    imgPerfil.alt = 'Foto de perfil'
    lblNombreVendedor.textContent = localStorage.getItem('NOMBREVENDEDOR');
    lblNombrePS.textContent = localStorage.getItem('NOMBREPS');
    lblPrecioPS.textContent = '₡' + localStorage.getItem('PRECIOPS');
    lblDescripcionPS.textContent = localStorage.getItem('DESCRIPCIONPS');
    imgPS.src = localStorage.getItem('IMGPS');
    imgPS.alt = 'Foto del producto'

    if (localStorage.getItem('ALTOCONTRASTE') == 1) {
        var stylesheet = document.getElementById('altoContrasteCss');
        stylesheet.disabled = false;
    }
};

cargarDatos();

function quitar(){
    localStorage.setItem( 'IDPS', '0');
    window.location.href = 'Principal.html';
};


function cancelar(){
    window.location.href = 'Principal.html';
};

function comprar(){

};