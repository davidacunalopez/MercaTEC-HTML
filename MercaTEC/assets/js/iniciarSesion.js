document.addEventListener('DOMContentLoaded', function() {
    var btnRegistrarse = document.getElementById('btnIniciarSesion');
    var edCorreo = document.getElementById('edCorreo');
    var edContrasenna = document.getElementById('edContrasenna');
    var lblAlerta = document.getElementById('lblAlerta');
  
    btnRegistrarse.addEventListener('click', function(event) {
      event.preventDefault(); // Evita que el formulario se envíe
        
      //Se valida si hay espacios vacios
      if (edCorreo.value.trim()==='') {
        //alert('Hay espacios vacíos.');
      }else if(edCorreo.value.substring(edCorreo.value.indexOf("@") + 1) !== 'estudiantec.cr'){
        //alert('Correo no valido.');
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
                    localStorage.setItem( 'IDPS', '0');
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

function setAltoContraste(){
    var stylesheet = document.getElementById('altoContrasteCss');
    stylesheet.disabled = !stylesheet.disabled;
    localStorage.setItem('ALTOCONTRASTE', stylesheet.disabled ? 0 : 1);

    var stylesheet = document.getElementById('altoContrasteIndexCss');
    stylesheet.disabled = !stylesheet.disabled;
    localStorage.setItem('ALTOCONTRASTE', stylesheet.disabled ? 0 : 1);
};

function cargarDatos() {
    if (localStorage.getItem('ALTOCONTRASTE') == 1) {
        var stylesheet = document.getElementById('altoContrasteCss');
        stylesheet.disabled = false;
    }
};

cargarDatos();

function registrarse(){
    window.location.href = "Registrarse.html";
};

function validarCredenciales() {
    var correo = document.getElementById("edCorreo").value;
    var contrasenna = document.getElementById("edContrasenna").value;
    var alerta = document.getElementById("lblAlerta");

    // Aquí puedes hacer la lógica para verificar las credenciales
    // Simulación de credenciales válidas para este ejemplo
    if (correo === "rodolfoide69@estudiantec.cr" && contrasenna === "12345") {
        // Redireccionar a la página principal o mostrar éxito (esto es solo un ejemplo)
        window.location.href = "Principal.html";
    } else {
        // Mostrar la alerta de error si las credenciales son incorrectas
        alerta.style.display = "block";
    }
};
