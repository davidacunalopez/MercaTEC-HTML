function cargarDatos() {
    var tbody = document.getElementById("tableBody");

    var idUsuario = localStorage.getItem('idUsuario');

    fetch(`http://localhost:3000/getTransaccionesProductosPorComprador?idComprador=${idUsuario}`)
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            var newRow = tbody.insertRow(tbody.length);
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            var cell3 = newRow.insertCell(2);
            var cell4 = newRow.insertCell(3);
            cell1.innerHTML = item.nombreProducto;
            cell2.innerHTML = item.precio;
            cell3.innerHTML = item.nombreVendedor;
            cell4.innerHTML = item.fechaCompra.substring(0, 10); // Asegúrate que este campo corresponde al nombre en la respuesta JSON
        });
    })
    .catch(error => console.error('Error:', error));

    fetch(`http://localhost:3000/getTransaccionesServiciosPorComprador?idComprador=${idUsuario}`)
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            var newRow = tbody.insertRow(tbody.length);
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            var cell3 = newRow.insertCell(2);
            var cell4 = newRow.insertCell(3);
            cell1.innerHTML = item.nombreProducto;
            cell2.innerHTML = item.precio;
            cell3.innerHTML = item.nombreVendedor;
            cell4.innerHTML = item.fechaCompra.substring(0, 10); // Asegúrate que este campo corresponde al nombre en la respuesta JSON
        });
    })
    .catch(error => console.error('Error:', error));
};

cargarDatos()

function carrito(){
    window.location.href = 'Carrito.html';
};

function usuarioPrincipal(){
    window.location.href = 'Principal.html';
};