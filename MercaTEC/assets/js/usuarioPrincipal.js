import { setIdUsuario, getIdUsuario, setNombre, getNombre, setApellidos, getApellidos, setCorreo, getCorreo, setNumero, getNumero, setBiografia, getBiografia, setImgURL, getImgURL } from './_datosPerfil.js';

function cargarDatos(){
    var lblNombre = document.getElementById('lblNombre');
    var lblBiografia = document.getElementById('lblBiografia');
    var imgPerfil = document.getElementById('imgPerfil');

    console.log(localStorage.getItem('nombre') + ' ' + localStorage.getItem('apellidos') + ' '+ localStorage.getItem('imgURL'));

    lblNombre.textContent = localStorage.getItem('nombre') + ' ' + localStorage.getItem('apellidos');
    lblBiografia.textContent = localStorage.getItem('biografia');
    imgPerfil.src = localStorage.getItem('imgURL');
};
cargarDatos();