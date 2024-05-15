function vaciarCarrito(){
    localStorage.setItem('PRODUCTOSCARRITO', JSON.stringify([]));
    window.location.href = 'Carrito.html';
};


function regresar(){
    window.location.href = 'Principal.html';
};

function Comprar(){
    var PRODUCTOSCARRITO = localStorage.getItem('PRODUCTOSCARRITO');
    if (PRODUCTOSCARRITO!=='[]') {
        PRODUCTOSCARRITO = JSON.parse(PRODUCTOSCARRITO);  // Convertir la cadena a un arreglo
        PRODUCTOSCARRITO.forEach(PRODUCTOSCARRITO => {
            fetch('http://localhost:3000/insertarTransaccion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idComprador: Number(localStorage.getItem('idUsuario')), //ID del usuario que compra
                    idVendedor: Number(PRODUCTOSCARRITO.IDVENDEDOR),
                    idProducto: Number(PRODUCTOSCARRITO.IDPS)
                })
            })
            .then(response => response.json())
            .then(data => {
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al registrar la transacción.');
            });
        });
        localStorage.setItem('PRODUCTOSCARRITO', JSON.stringify([]));
        alert('Productos comprados exitosamente.');
        window.location.href = 'Principal.html';
    }else{
        alert('No hay productos en el carrito.');
    }
};


// Esta función clonará el div con id="p1" y lo insertará en el contenedor 3 veces
function duplicarElementos() {
        // Encuentra el contenedor donde se insertarán las tarjetas
        const contenedor = document.getElementById('containerProducts');
        contenedor.style.marginTop = '20px';
  
        // Crea un contenedor de fila
        let fila = document.createElement('div');
        fila.className = 'row';
        fila.style.marginBottom = '20px';
        var cont = 0;
        var PRODUCTOSCARRITO = localStorage.getItem('PRODUCTOSCARRITO');
        if (PRODUCTOSCARRITO) {
            PRODUCTOSCARRITO = JSON.parse(PRODUCTOSCARRITO);  // Convertir la cadena a un arreglo
            PRODUCTOSCARRITO.forEach(PRODUCTOSCARRITO => {
                cont++;
                // Crea la columna para la tarjeta
                const columna = document.createElement('div');
                columna.className = 'col-md-4'; // col-md-3 para que quepan 4 en una fila
            
                // Crea la tarjeta producto
                const card = document.createElement('div');
                card.className = 'card';
                card.style.height = '100%';
                card.style.width = '300px';
                card.id = PRODUCTOSCARRITO.IDPS + '-' + PRODUCTOSCARRITO.IDVENDEDOR + '-p'; //ASIGNA EL ID DE LA TARJETA -> (idProducto-idUsuario-p)
                card.innerHTML = `
                    <img src="${PRODUCTOSCARRITO.IMGPS}" alt="${PRODUCTOSCARRITO.DESCRIPCIONPS}" class="card-img-top" style="height: 300px; margin:10px; width:auto; border-radius: 20px">
                    
                    <div class="d-lg-flex flex-column card-body">
                        <h5 class="card-title">${PRODUCTOSCARRITO.NOMBREPS}</h5>
                        <p class="card-text">${PRODUCTOSCARRITO.DESCRIPCIONPS}</p>
                        <div class="d-lg-flex flex-row justify-content-lg-start align-items-lg-center">
                            <a href='Usuario secundario.html' onclick="clickEnFotoDePerfil(event, this)">
                                <img src="${PRODUCTOSCARRITO.IMGVENDEDOR}" alt="Foto de perfil del usuario" style="border-radius: 100px;width: 60px;height: 60px;margin: 8px;">
                            </a>
                            <p>${PRODUCTOSCARRITO.NOMBREVENDEDOR} ${PRODUCTOSCARRITO.APELLIDOSVENDEDOR}</p>
                            
                        </div>
                        <div class="d-lg-flex flex-row justify-content-lg-start align-items-lg-center" style="margin-top: 10px">
                            <button class="btn btn-primary d-lg-flex" type="button" style="margin-right: 8px;" onclick="Quitar(this)">Quitar</button>
                            <div class="card-price"><span>₡${PRODUCTOSCARRITO.PRECIOPS}</span></div>
                        </div>
                    </div>
                `;
        
                // Añade la tarjeta a la columna, y luego la columna a la fila
                columna.appendChild(card);
                fila.appendChild(columna);
            
                // Cada 3 productos, agrega la fila al contenedor y crea una nueva fila
                if (cont % 3 === 0) {
                    contenedor.appendChild(fila);
                    fila = document.createElement('div');
                    fila.className = 'row';
                    fila.style.marginBottom = '20px';
                };
                
            });
            // Agrega la última fila al contenedor
            if (cont % 3 !== 0)
            {
                contenedor.appendChild(fila);
            }

        } else {
            console.log("No hay productos para mostrar.");
        }
};

// Llamar a la función para ejecutar la clonación cuando el documento esté listo
document.addEventListener('DOMContentLoaded', duplicarElementos);


function Quitar(elemento){
    var card = elemento.closest('.card');
    var cardId = card.id;
    var idProducto = cardId.split('-')[0];
    deletePRODUCTOSCARRITO(idProducto);
    window.location.href = 'Carrito.html';
};

function deletePRODUCTOSCARRITO(idProducto) {
    var PRODUCTOSCARRITO = localStorage.getItem('PRODUCTOSCARRITO');
    if (PRODUCTOSCARRITO) {
        PRODUCTOSCARRITO = JSON.parse(PRODUCTOSCARRITO);  // Convertir la cadena a un arreglo
        PRODUCTOSCARRITO = PRODUCTOSCARRITO.filter(PRODUCTOSCARRITO => PRODUCTOSCARRITO.IDPS+'' !== idProducto+'');  // Filtrar el producto por id
        localStorage.setItem('PRODUCTOSCARRITO', JSON.stringify(PRODUCTOSCARRITO));  // Guardar el arreglo actualizado
    } else {
        console.log("No hay productos para eliminar.");
    }
};

function usuarioPrincipal(){
    window.location.href = 'Usuario principal.html';
}