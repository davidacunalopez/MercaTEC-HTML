document.addEventListener('DOMContentLoaded', function () {
    var btnGuardar = document.getElementById('btnGuardar');
    var btnCancelar = document.getElementById('btnCancelar');
    const form = document.getElementById('formProdu');
    btnGuardar.addEventListener('click', function(event) {
        event.preventDefault();  // Detiene el envío predeterminado del formulario

        // Captura los valores de los campos del formulario
        const nombreProducto = document.getElementById('nombre').value;
        const idCategoria = parseInt(document.getElementById('categoria').value);
        const cantidad = document.getElementById('cantidad').value;
        const precio = document.getElementById('precio').value;
        const descrip = document.getElementById('descripcion').value;

        
        console.log('Nombre:', nombreProducto);
        console.log('Categoria:', idCategoria);
        console.log('Cantidad:', cantidad);
        console.log('Precio:', precio);
        console.log('Descripción:', descrip);

        alert(localStorage.getItem('p_idProducto'));
        fetch(`http://localhost:3000/updateProducto/${localStorage.getItem('p_idProducto')}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idCategoria: idCategoria,
                nombre: nombreProducto,
                cantidad: cantidad,
                precio: precio,
                descripcion: descrip,
            })
        })
        .then(response => response.text())
        .then(data => {
            alert('Producto actualizado con éxito');
            console.log(data);
            window.location.href = './Usuario principal.html';  // O redirigir a otra página según necesario
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al actualizar el producto.');
        });
        

        // Aquí podrías hacer algo con estos datos, como enviarlos a un servidor
    });
});
btnCancelar.addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe
    window.location.href = './Usuario principal.html';
});

function setAltoContraste(){
    var stylesheet = document.getElementById('altoContrasteCss');
    stylesheet.disabled = !stylesheet.disabled;
    localStorage.setItem('ALTOCONTRASTE', stylesheet.disabled ? 0 : 1);
  
    var stylesheet = document.getElementById('altoContrasteIndexCss');
    stylesheet.disabled = !stylesheet.disabled;
    localStorage.setItem('ALTOCONTRASTE', stylesheet.disabled ? 0 : 1);
  };
  
function cargarDatos(){

    document.getElementById('nombre').value = localStorage.getItem('nombreProducto');
    document.getElementById('precio').value = localStorage.getItem('precioProducto');
    document.getElementById('descripcion').value = localStorage.getItem('descripcionProducto');
    document.getElementById('cantidad').value = 1;
    /*
    fetch(`http://localhost:3000/getProducto/${localStorage.getItem('p_idProducto')}`)
        .then(response => response.json())
        .then(data => {
            data.forEach((item) => { // Removed 'index' from the parameter list
                document.getElementById('cantidad').value = item.cantidad;
            });
        if (localStorage.getItem('ALTOCONTRASTE') == 1) {
            var stylesheet = document.getElementById('altoContrasteCss');
            stylesheet.disabled = false;
        }
    });
    */
   
}
cargarDatos();

