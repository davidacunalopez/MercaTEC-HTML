document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formUserInfo');
    form.addEventListener('submit', function (event) {
        event.preventDefault();  // Detiene el envío predeterminado del formulario

        // Captura los valores de los campos del formulario
        const nombre = document.getElementById('name').value;
        const apellidos = document.getElementById('surname').value;
        const numero = document.getElementById('number').value;
        const biografia = document.getElementById('biography').value;
        const contrasenna = document.getElementById('password').value;
        const concontrasennna = document.getElementById('confirm-password').value;

        console.log('Nombre:', nombre);
        console.log('Apellidos:', apellidos);
        console.log('Número:', numero);
        console.log('Biografía:', biografia);
        console.log('con:', contrasenna);
        console.log('con2:', concontrasennna);

        if (contrasenna !== concontrasennna) {
            alert('Las contraseñas no coinciden');
        } else if(nombre.trim() === '' || apellidos.trim() === '' || numero.trim() === '' || biografia.trim() === '' || contrasenna.trim() === '' || concontrasennna.trim() === ''){
            alert('Por favor, llena todos los campos');
        } else{
            alert(localStorage.getItem('idUsuario'));
            fetch(`http://localhost:3000/updateUsuario/${localStorage.getItem('idUsuario')}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombre,
                    apellidos: apellidos,
                    numero: numero,
                    biografia: biografia,
                    contrasenna: contrasenna
                })
            })
            .then(response => response.text())
            .then(data => {
                if (data === 'Usuario actualizado correctamente.') {
                    alert('Usuario actualizado con éxito');
                    localStorage.setItem( 'nombre', nombre);
                    localStorage.setItem( 'apellidos', apellidos);
                    localStorage.setItem( 'numero', numero);
                    localStorage.setItem( 'biografia', biografia);
                    localStorage.setItem( 'contrasenna', contrasenna);
                    window.location.href = 'Usuario principal.html';  // O redirigir a otra página según necesario
                } else {
                    alert('No se pudo actualizar el usuario.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al actualizar el usuario.');
            });
        }

        // Aquí podrías hacer algo con estos datos, como enviarlos a un servidor
    });
});



function cargarDatos(){
    document.getElementById('name').value = localStorage.getItem('nombre');
    document.getElementById('surname').value = localStorage.getItem('apellidos');
    document.getElementById('number').value = localStorage.getItem('numero');
    document.getElementById('biography').value = localStorage.getItem('biografia');
    document.getElementById('password').value = localStorage.getItem('contrasenna');
    document.getElementById('confirm-password').value = localStorage.getItem('contrasenna');
    document.getElementById('imgPerfil').src = localStorage.getItem('imgURL');

    if (localStorage.getItem('ALTOCONTRASTE') == 1) {
        var stylesheet = document.getElementById('altoContrasteCss');
        stylesheet.disabled = false;
    }
}

cargarDatos();