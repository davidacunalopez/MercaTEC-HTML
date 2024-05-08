document.addEventListener('DOMContentLoaded', function() {
    var btnGuardar = document.getElementById('btnGuardar');
    var btnCancelar = document.getElementById('btnCancelar');
    var ednombreProducto = document.getElementById('ednombreProducto');
    var edPrecio = document.getElementById('edPrecio');
    var edDescripcion = document.getElementById('edDescripcion');
  
    btnGuardar.addEventListener('click', function(event) {
      event.preventDefault(); // Evita que el formulario se envíe
  
      //Se valida si hay espacios vacios
      if (ednombreProducto === '' || edCantidad.value.trim()==='' || edPrecio.value.trim()==='' ||
      edDescripcion.value.trim()==='') {
        // El campo está vacío, muestra un mensaje
        alert('Hay espacios vacíos.');
      }else{
        fetch('http://localhost:3000/setServicio', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre: ednombreProducto.value,
            precio: edPrecio.value,
            descripcion: edDescripcion.value
          })
        })
        .then(response => response.text())
        .then(data => {
          alert('Registro completado con éxito');
          console.log(data);
          window.location.href = './Principal.html';
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Error al registrar producto.');
        });

        
      }
    });
  });
  btnCancelar.addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe
    window.location.href = './Principal.html';
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
  if (localStorage.getItem('ALTOCONTRASTE') == 1) {
    var stylesheet = document.getElementById('altoContrasteCss');
    stylesheet.disabled = false;
  }
};

cargarDatos();