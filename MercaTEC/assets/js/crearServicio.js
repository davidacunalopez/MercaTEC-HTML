document.addEventListener('DOMContentLoaded', function() {
    var btnGuardar = document.getElementById('btnGuardar');
    var btnCancelar = document.getElementById('btnCancelar');
    var idUsuario = localStorage.getItem('idUsuario');
    var categoria = document.getElementById('categoria');
    var valorCategoria = parseInt(categoria.value);
    var ednombreProducto = document.getElementById('nombre');
    var edCantidad = document.getElementById('cantidad');
    var edPrecio = document.getElementById('precio');
    var edDescripcion = document.getElementById('descripcion');
  
    btnGuardar.addEventListener('click', function(event) {
      event.preventDefault(); // Evita que el formulario se envíe
  
      //Se valida si hay espacios vacios
      if (ednombreProducto.value.trim() === '' || edCantidad.value.trim()==='' || edPrecio.value.trim()==='' ||
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
            idUsuario: idUsuario,
            idCategoria: valorCategoria,
            nombre: ednombreProducto.value,
            cantidad: edCantidad.value,
            precio: edPrecio.value,
            descripcion: edDescripcion.value
          })
        })
        .then(response => response.text())
        .then(data => {
          alert('Registro completado con éxito');
          console.log(data);
          window.location.href = './Usuario principal.html';
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
  if (localStorage.getItem('ALTOCONTRASTE') == 1) {
    var stylesheet = document.getElementById('altoContrasteCss');
    stylesheet.disabled = false;
  }
};

cargarDatos();