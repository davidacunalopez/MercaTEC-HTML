function insertarCajasProductos() {
    // Encuentra el contenedor donde se insertarán las tarjetas
    const contenedor = document.getElementById('columnder');
  
    // Crea un contenedor de fila
    let fila = document.createElement('div');
    fila.className = 'row';
    fila.style.marginBottom = '20px';


    fetch('http://localhost:3000/getProductos')
        .then(response => response.json())
        .then(data => {
            var cont = 0;
            data.forEach((item, index) => {
                cont++;
                // Crea la columna para la tarjeta
                const columna = document.createElement('div');
                columna.className = 'col-md-3'; // col-md-4 para que quepan 3 en una fila
            
                // Crea la tarjeta producto
                const card = document.createElement('div');
                card.className = 'card';
                card.id = item.idProducto + '-' + item.idUsuario; //ASIGNA EL ID DE LA TARJETA -> (idProducto-idUsuario)
                card.innerHTML = `
                    <img src="${item.imgProducto}" alt="${item.descripcion}" class="card-img-top" style="height: 300px; margin:10px">
                    
                    <div class="d-lg-flex flex-column card-body">
                        <h5 class="card-title">${item.nombreProducto}</h5>
                        <p class="card-text">${item.descripcion}</p>
                        <div class="d-lg-flex flex-row justify-content-lg-start align-items-lg-center">
                            <a href=''>
                                <img src="${item.imgUsuario}" style="border-radius: 100px;width: 60px;height: 60px;margin: 8px;">
                            </a>
                            <p>${item.nombreUsuario} ${item.apellidos}</p>
                            
                        </div>
                        <div class="d-lg-flex flex-row justify-content-lg-start align-items-lg-center">
                            <button class="btn btn-primary d-lg-flex" type="button" style="margin-right: 8px;">Comprar</button>
                            <div class="card-price"><span>₡${item.precio}</span></div>
                        </div>
                    </div>
                `;
        
                // Añade la tarjeta a la columna, y luego la columna a la fila
                columna.appendChild(card);
                fila.appendChild(columna);
            
                // Cada 3 productos, agrega la fila al contenedor y crea una nueva fila
                if ((index + 1) % 4 === 0) {
                    contenedor.appendChild(fila);
                    fila = document.createElement('div');
                    fila.className = 'row';
                    fila.style.marginBottom = '20px';
                }
            });

            // Añade la última fila si no está vacía y si el número de productos no es múltiplo de 3
            if (cont % 4 !== 0) {
                contenedor.appendChild(fila);
            }
    })
    .catch(error => console.error('Error:', error));
  

  
    
  }
  
  // Suponiendo que tienes un array de productos
    /*
const productos = [
    { id: 1, nombre: 'Jabón artesanal gluten-free', precio: '3000', imageUrl: 'assets/img/pexels-vikeph-19684657.jpg' },
    { id: 2, nombre: 'Producto 2', precio: '4000', imageUrl: 'assets/img/pexels-vikeph-19684657.jpg' },
    { id: 3, nombre: 'Producto 3', precio: '5000', imageUrl: 'assets/img/pexels-vikeph-19684657.jpg' },
    { id: 4, nombre: 'Producto 4', precio: '6000', imageUrl: 'assets/img/pexels-vikeph-19684657.jpg' },
    { id: 5, nombre: 'Producto 5', precio: '7000', imageUrl: 'assets/img/pexels-vikeph-19684657.jpg' },
    { id: 6, nombre: 'Producto 6', precio: '8000', imageUrl: 'assets/img/pexels-vikeph-19684657.jpg' },
    { id: 7, nombre: 'Producto 7', precio: '9000', imageUrl: 'assets/img/pexels-vikeph-19684657.jpg' },
    { id: 8, nombre: 'Producto 8', precio: '10000', imageUrl: 'assets/img/pexels-vikeph-19684657.jpg' },
    { id: 9, nombre: 'Producto 9', precio: '11000', imageUrl: 'assets/img/pexels-vikeph-19684657.jpg' },
    { id: 10, nombre: 'Producto 10', precio: '12000', imageUrl: 'assets/img/pexels-vikeph-19684657.jpg' },
    { id: 11, nombre: 'Producto 11', precio: '13000', imageUrl: 'assets/img/pexels-vikeph-19684657.jpg' }
];*/
  
  // Ahora puedes llamar a insertarCajaProducto para cada producto
  insertarCajasProductos();

function showAlert(idCard) {
    var card = idCard.closest('.card');
    alert(card.id);
}