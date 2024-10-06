function insertarCajasProductos() {
    // Encuentra el contenedor donde se insertarán las tarjetas
    const contenedor = document.getElementById('columnder');
  
    // Crea un contenedor de fila
    let fila = document.createElement('div');
    fila.className = 'row';
    fila.style.marginBottom = '20px';
    var cont = 0;

    fetch('http://localhost:3000/getProductos')
        .then(response => response.json())
        .then(data => {
            
            data.forEach((item, index) => {
                cont++;
                // Crea la columna para la tarjeta
                const columna = document.createElement('div');
                columna.className = 'col-md-3'; // col-md-3 para que quepan 4 en una fila
            
                // Crea la tarjeta producto
                const card = document.createElement('div');
                card.className = 'card';
                card.style.height = '100%';
                card.id = item.idProducto + '-' + item.idUsuario + '-p'; //ASIGNA EL ID DE LA TARJETA -> (idProducto-idUsuario-p)
                card.innerHTML = `
                    <img src="${item.imgProducto}" alt="${item.descripcion}" class="card-img-top" style="height: 300px; margin:10px; width:auto; border-radius: 20px">
                    
                    <div class="d-lg-flex flex-column card-body">
                        <h1 class="card-title">${item.nombreProducto}</h1>
                        <h2 class="card-text">Descripción: ${item.descripcion}</h2>
                        <div class="d-lg-flex flex-row justify-content-lg-start align-items-lg-center">
                            <a href='Usuario secundario.html' onclick="clickEnFotoDePerfil(event, this)">
                                <img src="${item.imgUsuario}" alt="Foto de perfil del usuario" style="border-radius: 100px;width: 60px;height: 60px;margin: 8px;">
                            </a>
                            <h3>${item.nombreUsuario} ${item.apellidos}</h3>
                            
                        </div>
                        <div class="d-lg-flex flex-row justify-content-lg-start align-items-lg-center" style="margin-top: 10px">
                            <button class="btn btn-primary d-lg-flex" type="button" style="margin-right: 8px;" onclick="Comprar(this)">Comprar</button>
                            <div class="card-price"><span>₡${item.precio}</span></div>
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
            });
    })
    .then(() => insertarCajasServicios(contenedor, fila, cont))
    .catch(error => console.error('Error:', error));
}

function insertarCajasServicios(contenedor, fila, cont) {
    var cont2 = cont;
    fetch('http://localhost:3000/getServicios')
        .then(response => response.json())
        .then(data => {
            data.forEach((item, index) => {
                cont2++;
                // Crea la columna para la tarjeta
                const columna = document.createElement('div');
                columna.className = 'col-md-3'; // col-md-3 para que quepan 4 en una fila
            
                // Crea la tarjeta servicio
                const card = document.createElement('div');
                card.className = 'card';
                card.style.height = '100%';
                card.id = item.idServicio + '-' + item.idUsuario + '-s'; //ASIGNA EL ID DE LA TARJETA -> (idServicio-idUsuario)
                card.innerHTML = `
                    <img src="${item.imgServicio}" alt="${item.descripcion}" class="card-img-top" style="height: 300px; margin:10px; width:auto; border-radius: 20px">
                    
                    <div class="d-lg-flex flex-column card-body">
                        <h1 class="card-title">${item.nombreServicio}</h1>
                        <h2 class="card-text">Descripción: ${item.descripcion}</h2>
                        <div class="d-lg-flex flex-row justify-content-lg-start align-items-lg-center">
                            <a href='Usuario secundario.html' onclick="clickEnFotoDePerfil(event, this)">
                                <img src="${item.imgUsuario}" alt="Foto de perfil del usuario" style="border-radius: 100px;width: 60px;height: 60px;margin: 8px;">
                            </a>
                            <h3>${item.nombreUsuario} ${item.apellidos}</h3>
                            
                        </div>
                        <div class="d-lg-flex flex-row justify-content-lg-start align-items-lg-center" style="margin-top: 10px">
                            <button class="btn btn-primary d-lg-flex" type="button" style="margin-right: 8px;" onclick="VerInformacionServicio(this)">Ver información</button>
                            <div class="card-price"><span>₡${item.precio}</span></div>
                        </div>
                    </div>
                `;
        
                // Añade la tarjeta a la columna, y luego la columna a la fila
                columna.appendChild(card);
                fila.appendChild(columna);
            
                // Cada 3 productos, agrega la fila al contenedor y crea una nueva fila
                if (cont2 % 4 === 0) {
                    contenedor.appendChild(fila);
                    fila = document.createElement('div');
                    fila.className = 'row';
                    fila.style.marginBottom = '20px';
                }
            });
            
            // Añade la última fila si no está vacía con productos o servicios
            if (cont2 % 4 !== 0) {
                contenedor.appendChild(fila);
            }

            if(localStorage.getItem('ALTOCONTRASTE') === '1'){
                document.getElementById('altoContrasteCss').disabled = false;
            }
    })
    .catch(error => console.error('Error:', error));
    
}

insertarCajasProductos();




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

// Función para la foto de perfil cuando se hace click
function clickEnFotoDePerfil(event, elemento){
    event.preventDefault();
    var card = elemento.closest('.card');
    var cardId = card.id;
    var idProducto = cardId.split('-')[0];
    var idUsuario = cardId.split('-')[1];
    fetch('http://localhost:3000/getUsuarios')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                if(item.idUsuario+'' === idUsuario){
                    if(item.idUsuario+'' === ''+localStorage.getItem('idUsuario')){
                        window.location.href = './Usuario principal.html';
                        return;
                    }else{
                        localStorage.setItem( 'idUsuario2', item.idUsuario);
                        localStorage.setItem( 'nombre2', item.nombre);
                        localStorage.setItem( 'apellidos2', item.apellidos);
                        localStorage.setItem( 'correo2', item.correo);
                        localStorage.setItem( 'numero2', item.numero);
                        localStorage.setItem( 'biografia2', item.biografia);
                        localStorage.setItem( 'imgURL2', item.imgURL);
                        window.location.href = './Usuario secundario.html';
                        return; 
                    }
                }
            });
        })
        .catch(error => console.error('Error:', error));
}


//funcion para comprar un producto o servicio del BUTTON comprar
function Comprar(elemento){
    localStorage.setItem('IDPS', '0');
    var card = elemento.closest('.card');
    var cardId = card.id;
    if(localStorage.getItem('IDPS')==='0'){
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
        }else{ //Si es un servicio, se guarda en el localStorage los datos del servicio
            /*
            fetch('http://localhost:3000/getServicios')
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    if (item.idUsuario+'' !== localStorage.getItem('idUsuario')) {
                        if(item.idServicio+'' === cardId.split('-')[0]){
                            //Correcciones
                            var servicios = {};
                            servicios.IDPS = item.idServicio;
                            servicios.IDCOMPRADOR = localStorage.getItem('idUsuario');
                            servicios.IDVENDEDOR = item.idUsuario;
                            servicios.IMGVENDEDOR = item.imgUsuario;
                            servicios.NOMBREVENDEDOR = item.nombreUsuario;
                            servicios.APELLIDOSVENDEDOR = item.apellidos;
                            servicios.IMGPS = item.imgServicio;
                            servicios.PRECIOPS = item.precio;
                            setPRODUCTOSCARRITO(servicios);
                            return;
                        }
                    }
                });
            })*/
        }
    }else{
        //alert('Maximo un elemento en el carrito')
    }
};

function cerrarSesion(){
    localStorage.clear();
    window.location.href = 'index.html';
};

function usuarioPrincipal(){
    window.location.href = 'Usuario principal.html';
};

function abrirCarrito(){
    window.location.href = 'Carrito.html';
};


function setPRODUCTOSCARRITO(nuevoElemento) {
    var PRODUCTOSCARRITO = localStorage.getItem('PRODUCTOSCARRITO');
    if (PRODUCTOSCARRITO) {
        PRODUCTOSCARRITO = JSON.parse(PRODUCTOSCARRITO);  // Convertir la cadena a un arreglo
        PRODUCTOSCARRITO.push(nuevoElemento);      // Añadir el nuevo elemento al arreglo
        localStorage.setItem('PRODUCTOSCARRITO', JSON.stringify(PRODUCTOSCARRITO));  // Guardar el arreglo actualizado de nuevo como una cadena en localStorage
    } else {
        // Si no hay productos, inicializar con el nuevo elemento
        localStorage.setItem('PRODUCTOSCARRITO', JSON.stringify([nuevoElemento]));
    }
};

function showAlert(message) {
    document.getElementById('alertText').innerText = message;
    document.getElementById('customAlert').style.display = 'block';
    document.getElementById('customAlert').focus(); // Set focus to the alert
}

function closeAlert() {
    document.getElementById('customAlert').style.display = 'none';
    document.querySelector('button').focus(); // Focus back to a button or other element
}
