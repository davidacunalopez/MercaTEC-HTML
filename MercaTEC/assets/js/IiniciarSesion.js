document.addEventListener('DOMContentLoaded', function() {
    var btnRegistrarse = document.getElementById('btnIniciarSesion');
    var edCorreo = document.getElementById('edCorreo');
    var edContrasenna = document.getElementById('edContrasenna');
    var lblAlerta = document.getElementById('lblAlerta');
  
    btnRegistrarse.addEventListener('click', function(event) {
      event.preventDefault(); // Evita que el formulario se envíe

      //Se valida si hay espacios vacios
      if (edCorreo.value.trim()==='') {
        alert('Hay espacios vacíos.');
        
      }else{
        fetch('http://localhost:3000/getUsuarios')
        .then(response => response.json())
        .then(data => {
            var encontrado = false;
            data.forEach(item => {
                if(item.correo === edCorreo.value && item.contrasenna === edContrasenna.value){
                    console.log(item.correo, " - ", item.contrasenna);
                    //alert('Inicio de sesión exitoso.');
                    window.location.href = './Principal.html';
                    encontrado = true;

                    //Se establecen los datos del usuario globalmente
                    localStorage.setItem( 'idUsuario', item.idUsuario);
                    localStorage.setItem( 'nombre', item.nombre);
                    localStorage.setItem( 'apellidos', item.apellidos);
                    localStorage.setItem( 'correo', item.correo);
                    localStorage.setItem( 'numero', item.numero);
                    localStorage.setItem( 'biografia', item.biografia);
                    localStorage.setItem( 'imgURL', item.imgURL);
                    localStorage.setItem( 'contrasenna', item.contrasenna);
                    console.log(item.imgURL);
                    return;
                }
            });
            if(!encontrado){
                lblAlerta.textContent = 'Correo o contrasenna incorrecta.';
                lblAlerta.className ='alert alert-danger'
            }
        })
        .catch(error => console.error('Error:', error));
      }
    });
  });