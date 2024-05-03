// Variable privada, no accesible directamente desde fuera de este módulo
let idUsuario = 0;
let nombre = "";
let apellidos = "";
let correo = "";
let numero = 0;
let biografia = "";
let imgURL = "";

// Funciones para obtener y establecer el valor de idUsuario
function setIdUsuario(valor) {
    idUsuario = valor;
}

function getIdUsuario() {
    return idUsuario;
}

// Funciones para obtener y establecer el valor de nombre
function setNombre(valor) {
    nombre = valor;
}

function getNombre() {
    return nombre;
}

// Funciones para obtener y establecer el valor de apellidos
function setApellidos(valor) {
    apellidos = valor;
}

function getApellidos() {
    return apellidos;
}

// Funciones para obtener y establecer el valor de correo
function setCorreo(valor) {
    correo = valor;
}

function getCorreo() {
    return correo;
}

// Funciones para obtener y establecer el valor de numero
function setNumero(valor) {
    numero = valor;
}

function getNumero() {
    return numero;
}

// Funciones para obtener y establecer el valor de biografia
function setBiografia(valor) {
    biografia = valor;
}

function getBiografia() {
    return biografia;
}

// Funciones para obtener y establecer el valor de biografia
function setImgURL(valor) {
    imgURL = valor;
}

function getImgURL() {
    return imgURL;
}

export{
    setIdUsuario,
    getIdUsuario,
    setNombre,
    getNombre,
    setApellidos,
    getApellidos,
    setCorreo,
    getCorreo,
    setNumero,
    getNumero,
    setBiografia,
    getBiografia,
    setImgURL,
    getImgURL
};