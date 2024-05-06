document.addEventListener('DOMContentLoaded', function() {
  var btnRegistrarse = document.getElementById('btnRegistrarse');
  var edCorreo = document.getElementById('edCorreo');
  var edNombre = document.getElementById('edNombre');
  var edApellidos = document.getElementById('edApellidos');
  var edNumero = document.getElementById('edNumero');
  var edContrasenna = document.getElementById('edContrasenna');
  var edConContrasenna = document.getElementById('edConContrasenna');

  btnRegistrarse.addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe
    var correo = edCorreo.value.trim(); // Obtiene el valor del campo y elimina espacios blancos

    //Se valida si hay espacios vacios
    if (correo === '' || edNombre.value.trim()==='' || edApellidos.value.trim()==='' ||
        edNumero.value.trim()==='' || edContrasenna.value.trim()==='' || edConContrasenna.value.trim()==='') {
      // El campo está vacío, muestra un mensaje
      alert('Hay espacios vacíos.');

      //Se pregunta si el dominio es correcto
    } else if(correo.substring(correo.indexOf("@") + 1) !== 'estudiantec.cr'){
        console.log('Correo no valido');
        alert('Correo no valido.');
    } else if(edContrasenna.value !== edConContrasenna.value){
        alert('Las contraseñas no coinciden.');
    }else{
      fetch('http://localhost:3000/getUsuarios')
      .then(response => response.json())
      .then(data => {
        var encontrado = false;
        data.forEach(item => {
          if(item.correo === edCorreo.value){
            console.log(item.correo);
            alert('Correo ya registrado.');
            encontrado = true;
            return;
          }
        });
        if(!encontrado){
          fetch('http://localhost:3000/setUsuario', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              nombre: edNombre.value,
              apellidos: edApellidos.value,
              correo: edCorreo.value,
              numero: edNumero.value,
              contrasenna: edContrasenna.value
            })
          })
          .then(response => response.text())
          .then(data => {
            alert('Registro completado con éxito');
            console.log(data);
            window.location.href = './Iniciar sesion.html';
          })
          .catch(error => {
            console.error('Error:', error);
            alert('Error al registrar usuario.');
          });
        }
      });
    }
  });
});

function setAltoContraste(){
  var stylesheet = document.getElementById('altoContrasteCss');
  stylesheet.disabled = !stylesheet.disabled;
  localStorage.setItem('ALTOCONTRASTE', stylesheet.disabled ? 0 : 1);

  var stylesheet = document.getElementById('altoContrasteIndexCss');
  stylesheet.disabled = !stylesheet.disabled;
  localStorage.setItem('ALTOCONTRASTE', stylesheet.disabled ? 0 : 1);
}

function cargarDatos() {
  if (localStorage.getItem('ALTOCONTRASTE') == 1) {
      var stylesheet = document.getElementById('altoContrasteCss');
      stylesheet.disabled = false;
  }
}

cargarDatos();

function iniciarSesion(){
  window.location.href = 'Iniciar sesion.html';
}