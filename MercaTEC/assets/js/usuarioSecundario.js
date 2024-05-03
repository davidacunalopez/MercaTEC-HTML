function cargarDatos(){
    var lblNombre = document.getElementById('lblNombre');
    var lblBiografia = document.getElementById('lblBiografia');
    var imgPerfil = document.getElementById('imgPerfil');

    console.log(localStorage.getItem('nombre') + ' ' + localStorage.getItem('apellidos') + ' '+ localStorage.getItem('imgURL'));

    lblNombre.textContent = localStorage.getItem('nombre2') + ' ' + localStorage.getItem('apellidos2');
    lblBiografia.textContent = localStorage.getItem('biografia2');
    imgPerfil.src = localStorage.getItem('imgURL2');
    imgPerfil.alt = 'Foto de perfil de ' + localStorage.getItem('nombre2') + ' ' + localStorage.getItem('apellidos2');
};
cargarDatos();

document.addEventListener('DOMContentLoaded', function() {
    var btnUsuarioPrincipal = document.getElementById('btnUsuario');
    btnUsuarioPrincipal.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = './Usuario principal.html';
    });

});

