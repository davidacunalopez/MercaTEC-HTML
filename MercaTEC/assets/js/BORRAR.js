function añadir(){
    let nuevoElemento = { id: "7", nombre: "Ana" };
    nuevoElemento.otro = "Otro dato";
    // Obtener la cadena de productos desde localStorage y convertirla a un arreglo
    var productos = localStorage.getItem('productos');
    if (productos) {
        productos = JSON.parse(productos);  // Convertir la cadena a un arreglo
        productos.push(nuevoElemento);      // Añadir el nuevo elemento al arreglo
        localStorage.setItem('productos', JSON.stringify(productos));  // Guardar el arreglo actualizado de nuevo como una cadena en localStorage
    } else {
        // Si no hay productos, inicializar con el nuevo elemento
        localStorage.setItem('productos', JSON.stringify([nuevoElemento]));
    }
};

function imprimir(){
    alert(localStorage.getItem('productos') );
};


function cargarDatos(){
    localStorage.setItem('productos', JSON.stringify([]));
};


cargarDatos();


function setPRODUCTOSCARRITO(nuevoElemento) {
    var PRODUCTOSCARRITO = localStorage.getItem('PRODUCTOSCARRITO');
    if (PRODUCTOSCARRITO) {
        PRODUCTOSCARRITO = JSON.parse(PRODUCTOSCARRITO);  // Convertir la cadena a un arreglo
        PRODUCTOSCARRITO.push(nuevoElemento);      // Añadir el nuevo elemento al arreglo
        localStorage.setItem('PRODUCTOSCARRITO', JSON.stringify(PRODUCTOSCARRITO));  // Guardar el arreglo actualizado de nuevo como una cadena en localStorage
    } else {
        // Si no hay productos, inicializar con el nuevo elemento
        localStorage.setItem('PRODUCTOSCARRITO', JSON.stringify([nuevoElemento]));
    }
};

function deletePRODUCTOSCARRITO(idProducto) {
    var PRODUCTOSCARRITO = localStorage.getItem('PRODUCTOSCARRITO');
    if (PRODUCTOSCARRITO) {
        PRODUCTOSCARRITO = JSON.parse(PRODUCTOSCARRITO);  // Convertir la cadena a un arreglo
        PRODUCTOSCARRITO = PRODUCTOSCARRITO.filter(PRODUCTOSCARRITO => PRODUCTOSCARRITO.id !== idProducto);  // Filtrar el producto por id
        localStorage.setItem('PRODUCTOSCARRITO', JSON.stringify(PRODUCTOSCARRITO));  // Guardar el arreglo actualizado
    } else {
        console.log("No hay productos para eliminar.");
    }
};

function setEmptyPRODUCTOSCARRITO() {
    localStorage.setItem('PRODUCTOSCARRITO', JSON.stringify([]));
};


function imprimirNombres() {
    var PRODUCTOSCARRITO = localStorage.getItem('PRODUCTOSCARRITO');
    if (productos) {
        PRODUCTOSCARRITO = JSON.parse(PRODUCTOSCARRITO);  // Convertir la cadena a un arreglo
        PRODUCTOSCARRITO.forEach(PRODUCTOSCARRITO => {
            console.log(PRODUCTOSCARRITO.nombre);  // Imprimir el nombre de cada producto
        });
    } else {
        console.log("No hay productos para mostrar.");
    }
}
