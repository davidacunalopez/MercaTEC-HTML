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
});