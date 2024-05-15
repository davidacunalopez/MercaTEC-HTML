function cargarDatos() {
    const imgPerfil = document.getElementById('imgPerfil'); 
    const lblNombreVendedor = document.getElementById('lblNombreVendedor');
    const lblNombrePS = document.getElementById('lblNombrePS');
    const lblPrecioPS = document.getElementById('lblPrecioPS');
    const lblDescripcionPS = document.getElementById('lblDescripcionPS');
    const imgPS = document.getElementById('imgPS');

    imgPerfil.src = localStorage.getItem('IMGVENDEDOR');
    imgPerfil.alt = 'Foto de perfil'
    lblNombreVendedor.textContent = localStorage.getItem('NOMBREVENDEDOR') + ' ' + localStorage.getItem('APELLIDOSVENDEDOR');
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

document.addEventListener('DOMContentLoaded', function () {
    const btnCancelar = document.getElementById('btnCancelar');
    const btnAnadirAlCarrito = document.getElementById('btnAnadirAlCarrito');
    btnCancelar.addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = 'Principal.html';
    });
    btnAnadirAlCarrito.addEventListener('click', function (event) {

        event.preventDefault();
        var productos = {};
        productos.IDPS = localStorage.getItem('IDPS');
        productos.IDCOMPRADOR = localStorage.getItem('idUsuario');
        productos.IDVENDEDOR = localStorage.getItem('IDVENDEDOR');
        productos.IMGVENDEDOR = localStorage.getItem('IMGVENDEDOR');
        productos.NOMBREVENDEDOR = localStorage.getItem('NOMBREVENDEDOR');
        productos.APELLIDOSVENDEDOR = localStorage.getItem('APELLIDOSVENDEDOR');
        productos.NOMBREPS = localStorage.getItem('NOMBREPS');
        productos.DESCRIPCIONPS = localStorage.getItem('DESCRIPCIONPS');
        productos.IMGPS = localStorage.getItem('IMGPS');
        productos.PRECIOPS = localStorage.getItem('PRECIOPS');
        setPRODUCTOSCARRITO(productos);

        window.location.href='Principal.html';
    });
});

function setPRODUCTOSCARRITO(nuevoElemento) {
    var PRODUCTOSCARRITO = localStorage.getItem('PRODUCTOSCARRITO');
    if (PRODUCTOSCARRITO) {
        PRODUCTOSCARRITO = JSON.parse(PRODUCTOSCARRITO);  // Convertir la cadena a un arreglo

        // Verificar si el ID del nuevo elemento ya existe en el arreglo
        if (PRODUCTOSCARRITO.some(producto => producto.IDPS+'' === nuevoElemento.IDPS+'')) {
            alert('No puedes añadir el mismo producto al carrito más de una vez.');
        } else {
            PRODUCTOSCARRITO.push(nuevoElemento);  // Añadir el nuevo elemento al arreglo
            localStorage.setItem('PRODUCTOSCARRITO', JSON.stringify(PRODUCTOSCARRITO));  // Guardar el arreglo actualizado de nuevo como una cadena en localStorage
            alert('Producto añadido al carrito');
        }
    } else {
        // Si no hay productos, inicializar con el nuevo elemento
        localStorage.setItem('PRODUCTOSCARRITO', JSON.stringify([nuevoElemento]));
        alert('Producto añadido al carrito');
    }
};

function usuarioPrincipal(){
    window.location.href = 'Usuario principal.html';
};