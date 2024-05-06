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
                        <h5 class="card-title">${item.nombreProducto}</h5>
                        <p class="card-text">${item.descripcion}</p>
                        <div class="d-lg-flex flex-row justify-content-lg-start align-items-lg-center">
                            <a href='Usuario secundario.html' onclick="clickEnFotoDePerfil(event, this)">
                                <img src="${item.imgUsuario}" alt="Foto de perfil del usuario" style="border-radius: 100px;width: 60px;height: 60px;margin: 8px;">
                            </a>
                            <p>${item.nombreUsuario} ${item.apellidos}</p>
                            
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
                        <h5 class="card-title">${item.nombreServicio}</h5>
                        <p class="card-text">${item.descripcion}</p>
                        <div class="d-lg-flex flex-row justify-content-lg-start align-items-lg-center">
                            <a href='Usuario secundario.html' onclick="clickEnFotoDePerfil(event, this)">
                                <img src="${item.imgUsuario}" alt="Foto de perfil del usuario" style="border-radius: 100px;width: 60px;height: 60px;margin: 8px;">
                            </a>
                            <p>${item.nombreUsuario} ${item.apellidos}</p>
                            
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
                    alert(item.idUsuario+'' + ' - ' + localStorage.getItem('idUsuario'));
                    if(item.idUsuario+'' === ''+localStorage.getItem('idUsuario')){
                        window.location.href = './Usuario principal.html';
                        return;
                    }else{
                        alert('Usuario secundario');
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
    var card = elemento.closest('.card');
    var cardId = card.id;
    if(cardId.split('-')[2] === 'p'){ //Si es un producto, se guarda en el localStorage los datos del producto
        //Buscar el producto seleccionado
        fetch('http://localhost:3000/getProductos')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                if(item.idProducto+'' === cardId.split('-')[0]){
                    localStorage.setItem( 'esPoS', 'p');
                    localStorage.setItem( 'IDUSUARIO', item.idUsuario);
                    localStorage.setItem( 'NOMBREVENDEDOR', item.nombreUsuario + ' ' + item.apellidos);
                    localStorage.setItem( 'IMGPERFIL', item.imgUsuario);
                    localStorage.setItem( 'IDPS', item.idProducto);
                    localStorage.setItem( 'NOMBREPS', item.nombreProducto);
                    localStorage.setItem( 'DESCRIPCIONPS', item.descripcion);
                    localStorage.setItem( 'PRECIOPS', item.precio);
                    localStorage.setItem( 'IMGPS', item.imgProducto);
                    window.location.href = 'InfoProducto.html';
                    return;
                }
            });
        })
    }else{ //Si es un servicio, se guarda en el localStorage los datos del servicio
        fetch('http://localhost:3000/getServicios')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                if(item.idServicio+'' === cardId.split('-')[0]){
                    localStorage.setItem( 'esPoS', 's');
                    localStorage.setItem( 'IDUSUARIO', item.idUsuario);
                    localStorage.setItem( 'NOMBREVENDEDOR', item.nombreUsuario + ' ' + item.apellidos);
                    localStorage.setItem( 'IMGPERFIL', item.imgUsuario);
                    localStorage.setItem( 'IDPS', item.idProducto);
                    localStorage.setItem( 'NOMBREPS', item.nombreProducto);
                    localStorage.setItem( 'DESCRIPCIONPS', item.descripcion);
                    localStorage.setItem( 'PRECIOPS', item.precio);
                    localStorage.setItem( 'IMGPS', item.imgProducto);
                    window.location.href = 'InfoProducto.html';
                    return;
                }
            });
        })
    }
}