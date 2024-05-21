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
                            <h1 class="card-title">${item.nombreProducto}</h1>
                            <h2 class="card-text">Descripción: ${item.descripcion}</h2>
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
                            <h1 class="card-title">${item.nombreServicio}</h1>
                            <h2 class="card-text">Descripción: ${item.descripcion}</h2>
                            <div class="d-lg-flex flex-row justify-content-lg-start align-items-lg-center">
                                <div class="card-price"><span>₡${item.precio}</span></div>                   
                            </div>
                            <div class="d-lg-flex flex-row justify-content-lg-start align-items-lg-center">
                                <button class="btn btn-primary d-lg-flex justify-content-center" type="button" style="width: 100%; margin-right:5px" onclick="VerInformacionServicio(this)">
                                    <i class="fas fa-shopping-cart" style="font-size:17px; margin-right:5px"></i>
                                    Ver información
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
        if (localStorage.getItem('ALTOCONTRASTE') == 1) {
            var stylesheet = document.getElementById('altoContrasteCss');
            stylesheet.disabled = false;
        }
        
    }).catch(error => console.error('Error:', error));
}

cargarDatos();

function agregarAlCarrito(elemento){
    localStorage.setItem('IDPS', '0');
    var card = elemento.closest('.card');
    var cardId = card.id;
    if(cardId.split('-')[2] === 'p'){ //Si es un producto, se guarda en el localStorage los datos del producto
        //Buscar el producto seleccionado
        fetch('http://localhost:3000/getProductos')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                if (item.idUsuario+'' !== localStorage.getItem('idUsuario')) {
                    if(item.idProducto+'' === cardId.split('-')[0]){
                        localStorage.setItem( 'esPoS', 'p');
                        localStorage.setItem( 'IDVENDEDOR', item.idUsuario);
                        localStorage.setItem( 'NOMBREVENDEDOR', item.nombreUsuario);
                        localStorage.setItem( 'APELLIDOSVENDEDOR', item.apellidos);
                        localStorage.setItem( 'IMGVENDEDOR', item.imgUsuario);
                        localStorage.setItem( 'IDPS', item.idProducto);
                        localStorage.setItem( 'NOMBREPS', item.nombreProducto);
                        localStorage.setItem( 'DESCRIPCIONPS', item.descripcion);
                        localStorage.setItem( 'PRECIOPS', item.precio);
                        localStorage.setItem( 'IMGPS', item.imgProducto);
                        window.location.href = 'InfoProducto.html';
                        return;
                    }
                }
            });
        })
    }
};

document.addEventListener('DOMContentLoaded', function() {
    var btnUsuarioPrincipal = document.getElementById('btnUsuario');
    btnUsuarioPrincipal.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = './Usuario principal.html';
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

function VerInformacionServicio(elemento){
    localStorage.setItem('IDPS', '0');
    var card = elemento.closest('.card');
    var cardId = card.id;
    fetch('http://localhost:3000/getServicios')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                if (item.idUsuario+'' !== localStorage.getItem('idUsuario')) {
                    if(item.idServicio+'' === cardId.split('-')[0]){
                        //Correcciones
                        //alert('Servicio: ' + item.nombreServicio + '\n' + 'Descripción: ' + item.descripcion + '\n' + 'Precio: ' + item.precio);
                        showAlert('Servicio: ' + item.nombreServicio + '\n' + 'Descripción: ' + item.descripcion + '\n' + 'Precio: ' + item.precio);
                        return;
                    }
                }
            });
        }
    );
};

function showAlert(message) {
    document.getElementById('alertText').innerText = message;
    document.getElementById('customAlert').style.display = 'block';
    document.getElementById('customAlert').focus(); // Set focus to the alert
};

function closeAlert() {
    document.getElementById('customAlert').style.display = 'none';
    document.querySelector('button').focus(); // Focus back to a button or other element
};