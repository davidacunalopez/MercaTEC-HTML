function cargarDatos(){
    var lblNombre = document.getElementById('lblNombre');
    var lblBiografia = document.getElementById('lblBiografia');
    var imgPerfil = document.getElementById('imgPerfil');

    lblNombre.textContent = localStorage.getItem('nombre2') + ' ' + localStorage.getItem('apellidos2');
    lblBiografia.textContent = localStorage.getItem('biografia2');
    imgPerfil.src = localStorage.getItem('imgURL2');
    imgPerfil.alt = 'Foto de perfil de ' + localStorage.getItem('nombre2') + ' ' + localStorage.getItem('apellidos2');

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
                if (item.idUsuario+'' === localStorage.getItem('idUsuario2')){
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
                            <h5 class="card-title">${item.nombreProducto}</h5>
                            <p class="card-text">${item.descripcion}</p>
                            <div class="d-lg-flex flex-row justify-content-lg-start align-items-lg-center">
                                <div class="card-price"><span>₡${item.precio}</span></div>                   
                            </div>
                            <div class="d-lg-flex flex-row justify-content-lg-start align-items-lg-center">
                                <button class="btn btn-primary d-lg-flex justify-content-center" type="button" style="width: 100%;" onclick="agregarAlCarrito(this)">
                                    <i class="fas fa-shopping-cart" style="font-size:17px; margin-right:5px"></i>
                                    Agregar al carrito
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
                if (item.idUsuario+'' === localStorage.getItem('idUsuario2')){
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
                            <h5 class="card-title">${item.nombreServicio}</h5>
                            <p class="card-text">${item.descripcion}</p>
                            <div class="d-lg-flex flex-row justify-content-lg-start align-items-lg-center">
                                <div class="card-price"><span>₡${item.precio}</span></div>                   
                            </div>
                            <div class="d-lg-flex flex-row justify-content-lg-start align-items-lg-center">
                                <button class="btn btn-primary d-lg-flex justify-content-center" type="button" style="width: 100%; margin-right:5px" onclick="agregarAlCarrito(this)">
                                    <i class="fas fa-shopping-cart" style="font-size:17px; margin-right:5px"></i>
                                    Agregar al carrito
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
                }
        });

        // Añade la última fila si no está vacía
        if (cont % 4 !== 0) {
            contenedor.appendChild(fila);
        }
        
    }).catch(error => console.error('Error:', error));
}

cargarDatos();

function agregarAlCarrito(elemento){
    
}

document.addEventListener('DOMContentLoaded', function() {
    var btnUsuarioPrincipal = document.getElementById('btnUsuario');
    btnUsuarioPrincipal.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = './Usuario principal.html';
    });

});

