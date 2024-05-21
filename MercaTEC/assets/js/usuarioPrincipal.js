
function cargarDatos(){
    //Defino variables para los elementos del DOM que voy a modificar
    var lblNombre = document.getElementById('lblNombre');
    var lblBiografia = document.getElementById('lblBiografia');
    var imgPerfil = document.getElementById('imgPerfil');

    console.log(localStorage.getItem('nombre') + ' ' + localStorage.getItem('apellidos') + ' '+ localStorage.getItem('imgURL'));

    lblNombre.textContent = localStorage.getItem('nombre') + ' ' + localStorage.getItem('apellidos');
    lblBiografia.textContent = localStorage.getItem('biografia');
    imgPerfil.src = localStorage.getItem('imgURL');
    imgPerfil.alt = 'Foto de perfil de ' + localStorage.getItem('nombre') + ' ' + localStorage.getItem('apellidos');

    //Cargo los cards de los productos y servicios que ofrece el usuario principal

    // Encuentra el contenedor donde se insertarán las tarjetas
    const contenedor = document.getElementById('columnItems');

    // Crea un contenedor de fila
    let fila = document.createElement('div');
    fila.className = 'row';
    fila.style.width = 'auto';
    fila.style.marginBottom = '20px';
    var cont = 0;
    fetch('http://localhost:3000/getProductos')
        .then(response => response.json())
        .then(data => {
            
            data.forEach((item, index) => {
                
                //Si el producto pertenece al usuario principal, se muestra
                if (item.idUsuario+'' === localStorage.getItem('idUsuario')){
                    cont++;
                    // Crea la columna para la tarjeta
                    const columna = document.createElement('div');
                    columna.className = 'col-md-3'; // col-md-3 para que quepan 4 en una fila
                
                    // Crea la tarjeta producto
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.style.height = '100%';
                    card.style.width = '100%';
                    card.id = item.idProducto + '-' + item.idUsuario + '-p'; //ASIGNA EL ID DE LA TARJETA -> (idProducto-idUsuario)
                    card.innerHTML = `
                        <img src="${item.imgProducto}" alt="${item.descripcion}" class="card-img-top" style="height: 300px; margin:10px; width:auto; border-radius: 20px">
                        
                        <div class="d-lg-flex flex-column card-body">
                            <h1 class="card-title">${item.nombreProducto}</h1>
                            <h2 class="card-text">Descripción: ${item.descripcion}</h2>
                            <div class="d-lg-flex flex-row justify-content-lg-start align-items-lg-center">
                                <div class="card-price"><span>₡${item.precio}</span></div>                   
                            </div>
                            <div class="d-lg-flex flex-row justify-content-lg-start align-items-lg-center">
                                <button class="btn btn-primary d-lg-flex justify-content-center" type="button" style="width: 100%; margin-right:5px" onclick="funcionEditar(this)">
                                    <i class="fas fa-edit" style="font-size:17px; margin-right:5px"></i>
                                    Editar
                                </button>
                                <button class="btn btn-primary d-lg-flex justify-content-center" type="button" style="width: 100%;" onclick="funcionEliminar(this)">
                                    <i class="fas fa-trash-alt" style="font-size:17px; margin-right:5px"></i>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    `;
            
                    // Añade la tarjeta a la columna, y luego la columna a la fila
                    columna.appendChild(card);
                    fila.appendChild(columna);
                
                    // Cada 3 productos, agrega la fila al contenedor y crea una nueva fila
                    if (cont % 4 === 0) {
                        contenedor.appendChild(fila);
                        fila = document.createElement('div');
                        fila.className = 'row';
                        fila.style.marginBottom = '20px';
                    }
                }
            });
    }).then(() => insertarCajasServicios(contenedor, fila, cont))
    .catch(error => console.error('Error:', error));
};

function insertarCajasServicios(contenedor, fila, cont) {
    fetch('http://localhost:3000/getServicios')
        .then(response => response.json())
        .then(data => {
            data.forEach((item, index) => {
                
                //Si el producto pertenece al usuario principal, se muestra
                if (item.idUsuario+'' === localStorage.getItem('idUsuario')){
                    cont++;
                    // Crea la columna para la tarjeta
                    const columna = document.createElement('div');
                    columna.className = 'col-md-3'; // col-md-3 para que quepan 4 en una fila
                
                    // Crea la tarjeta Servicio
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.style.height = '100%';
                    card.style.width = 'auto';
                    card.id = item.idServicio + '-' + item.idUsuario + '-s'; //ASIGNA EL ID DE LA TARJETA -> (idServicio-idUsuario)
                    card.innerHTML = `
                        <img src="${item.imgServicio}" alt="${item.descripcion}" class="card-img-top" style="height: 300px; margin:10px; width:auto; border-radius: 20px">
                        
                        <div class="d-lg-flex flex-column card-body">
                            <h1 class="card-title">${item.nombreServicio}</h1>
                            <h2 class="card-text">Descripción: ${item.descripcion}</h2>
                            <div class="d-lg-flex flex-row justify-content-lg-start align-items-lg-center">
                                <div class="card-price"><span>₡${item.precio}</span></div>                   
                            </div>
                            <div class="d-lg-flex flex-row justify-content-lg-start align-items-lg-center">
                                <button class="btn btn-primary d-lg-flex justify-content-center" type="button" style="width: 100%; margin-right:5px" onclick="funcionEditar(this)">
                                    <i class="fas fa-edit" style="font-size:17px; margin-right:5px"></i>
                                    Editar
                                </button>
                                <button class="btn btn-primary d-lg-flex justify-content-center" type="button" style="width: 100%;" onclick="funcionEliminar(this)">
                                    <i class="fas fa-trash-alt" style="font-size:17px; margin-right:5px"></i>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    `;
            
                    // Añade la tarjeta a la columna, y luego la columna a la fila
                    columna.appendChild(card);
                    fila.appendChild(columna);
                
                    // Cada 3 Servicios, agrega la fila al contenedor y crea una nueva fila
                    if (cont % 4 === 0) {
                        contenedor.appendChild(fila);
                        fila = document.createElement('div');
                        fila.className = 'row';
                        fila.style.marginBottom = '20px';
                    }
                    
                    if (localStorage.getItem('ALTOCONTRASTE') == 1) {
                        var stylesheet = document.getElementById('altoContrasteCss');
                        stylesheet.disabled = false;
                    }
                }
        });

        // Añade la última fila si no está vacía
        if (cont % 4 !== 0) {
            contenedor.appendChild(fila);
        }
        
    }).catch(error => console.error('Error:', error));
};

cargarDatos();

function funcionEditar(elemento){
    alert('Editar')
    var card = elemento.closest('.card')
    var idCard = card.id;
    if(idCard.split('-')[2] === 'p'){
        localStorage.setItem('p_idProducto', idCard.split('-')[0]);
        localStorage.setItem('nombreProducto', card.querySelector('.card-title').textContent);
        localStorage.setItem('descripcionProducto', card.querySelector('.card-text').textContent);
        localStorage.setItem('precioProducto', parseInt(card.querySelector('.card-price span').textContent.split('₡')[1]));
        window.location.href = 'EditarInfoProdu.html';
    }else{
        localStorage.setItem('s_idServicio', idCard.split('-')[0]);
        localStorage.setItem('nombreServicio', card.querySelector('.card-title').textContent);
        localStorage.setItem('descripcionServicio', card.querySelector('.card-text').textContent);
        localStorage.setItem('precioServicio', parseInt(card.querySelector('.card-price span').textContent.split('₡')[1]));
        window.location.href = 'EditarInfoServicio.html';
    }
};

function funcionEliminar(elemento){
    var card = elemento.closest('.card')
    var idCard = card.id;
    if(idCard.split('-')[2] === 'p'){
        if (confirm('¿Está seguro de eliminar este producto?')) {
            fetch(`http://localhost:3000/deleteProducto/${idCard.split('-')[0]}`, {
                method: 'DELETE'
            })
            .then(response => response.text())
            .then(data => {
                if (data === 'Producto eliminado correctamente.') {
                    alert('Producto eliminado con éxito');
                    window.location.href = '';
                } else {
                    alert('No se pudo eliminar el producto.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al eliminar producto.');
            });
        }
    }else{
        if (confirm('¿Está seguro de eliminar este servicio?')) {
            fetch(`http://localhost:3000/deleteServicio/${idCard.split('-')[0]}`, {
                method: 'DELETE'
            })
            .then(response => response.text())
            .then(data => {
                if (data === 'Servicio eliminado correctamente.') {
                    alert('Servicio eliminado con éxito');
                    window.location.href = '';
                } else {
                    alert('No se pudo eliminar el servicio.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al eliminar servicio.');
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const btnEditarInfo = document.getElementById('btnEditarInformacion');
    const btnSalirSesion = document.getElementById('btnSalirSesion');
    btnEditarInfo.addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = 'Editar usuario principal.html';
    });
    btnSalirSesion.addEventListener('click', function (event) {
        event.preventDefault();
        localStorage.clear();
        window.location.href='index.html';
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

function historialCompras(event){
    event.preventDefault();
    window.location.href = 'HistorialCompra.html';
};

function historialVentas(event){
    event.preventDefault();
    window.location.href = 'HistorialVenta.html';
};

function verCarrito(){
    window.location.href = 'Carrito.html';
};