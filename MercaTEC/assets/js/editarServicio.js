document.addEventListener('DOMContentLoaded', function () {
    var btnGuardar = document.getElementById('btnGuardar');
    var btnCancelar = document.getElementById('btnCancelar');
    const form = document.getElementById('formProdu');
    btnGuardar.addEventListener('click', function(event) {
        event.preventDefault();  // Detiene el envío predeterminado del formulario

        // Captura los valores de los campos del formulario
        const nombreServicio = document.getElementById('nombre').value;
        const idCategoria = parseInt(document.getElementById('categoria').value);
        const cantidad = document.getElementById('cantidad').value;
        const precio = document.getElementById('precio').value;
        const descrip = document.getElementById('descripcion').value;

        
        console.log('Nombre:', nombreServicio);
        console.log('Categoria:', idCategoria);
        console.log('Cantidad:', cantidad);
        console.log('Precio:', precio);
        console.log('Descripción:', descrip);

        alert(localStorage.getItem('s_idServicio'));
        fetch(`http://localhost:3000/updateServicio/${localStorage.getItem('s_idServicio')}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idCategoria: idCategoria,
                nombre: nombreServicio,
                cantidad: cantidad,
                precio: precio,
                descripcion: descrip,
            })
        })
        .then(response => response.text())
        .then(data => {
            alert('Servicio actualizado con éxito');
            console.log(data);
            window.location.href = './Usuario principal.html';  // O redirigir a otra página según necesario
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al actualizar el servicio.');
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
    document.getElementById('nombre').value = localStorage.getItem('nombreServicio');
    document.getElementById('precio').value = localStorage.getItem('precioServicio');
    document.getElementById('descripcion').value = localStorage.getItem('descripcionServicio');
    document.getElementById('cantidad').value = 1;
};

cargarDatos();