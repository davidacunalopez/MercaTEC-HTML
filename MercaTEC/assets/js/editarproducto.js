document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formProdu');
    btnGuardar.addEventListener('click', function(event) {
        event.preventDefault();  // Detiene el envío predeterminado del formulario

        // Captura los valores de los campos del formulario
        const nombreProducto = document.getElementById('nombreP').value;
        const cantidad = document.getElementById('cantidad').value;
        const precio = document.getElementById('precio').value;
        const descrip = document.getElementById('descripcion').value;

        
        console.log('NombreP:', nombreProducto);
        console.log('Cantidad:', cantidad);
        console.log('Precio:', precio);
        console.log('Descripción:', descrip);

        alert(localStorage.getItem('idProducto'));
        fetch(`http://localhost:3000/updateProducto/${localStorage.getItem('idProducto')}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombreProducto,
                cantidad: cantidad,
                precio: precio,
                descripcion: descrip,
            })
        })
        .then(response => response.text())
        .then(data => {
            if (data === 'Usuario actualizado correctamente.') {
                alert('Usuario actualizado con éxito');
                localStorage.setItem( 'nombre', nombreProducto);
                localStorage.setItem( 'cantidad', cantidad);
                localStorage.setItem( 'precio', precio);
                localStorage.setItem( 'descripcion', descrip);
                window.location.href = 'EditarInfoProdu.html';  // O redirigir a otra página según necesario
            } else {
                alert('No se pudo actualizar el producto.');
            }
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
    window.location.href = './Principal.html';
});


function cargarDatos(){
    document.getElementById('nombreP').value = localStorage.getItem('nombre');
    document.getElementById('cantidad').value = localStorage.getItem('cantidad');
    document.getElementById('descripcion').value = localStorage.getItem('descripcion');
    if (localStorage.getItem('ALTOCONTRASTE') == 1) {
        var stylesheet = document.getElementById('altoContrasteCss');
        stylesheet.disabled = false;
    }
};

cargarDatos();

function setAltoContraste(){
    var stylesheet = document.getElementById('altoContrasteCss');
    stylesheet.disabled = !stylesheet.disabled;
    localStorage.setItem('ALTOCONTRASTE', stylesheet.disabled ? 0 : 1);
  
    var stylesheet = document.getElementById('altoContrasteIndexCss');
    stylesheet.disabled = !stylesheet.disabled;
    localStorage.setItem('ALTOCONTRASTE', stylesheet.disabled ? 0 : 1);
  };