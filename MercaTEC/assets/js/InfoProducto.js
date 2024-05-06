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
}

cargarDatos();

document.addEventListener('DOMContentLoaded', function () {
    const btnCancelar = document.getElementById('btnCancelar');
    const btnAnadirAlCarrito = document.getElementById('btnAnadirAlCarrito');
    btnCancelar.addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = 'Principal.html';
    });
    btnAnadirAlCarrito.addEventListener('click', function (event) {
        event.preventDefault();
        alert('Producto añadido al carrito');
        window.location.href='';
    });
});