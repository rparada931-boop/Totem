const contenedor = document.getElementById('contenedor-productos');
const listaPedido = document.getElementById('lista-pedido');
const totalPago = document.getElementById('total-pago');
let pedido = [];
let total = 0;

// Cargar productos
fetch('assets/js/productos.json')
    .then(response => response.json())
    .then(productos => {
        productos.forEach(prod => {
            const div = document.createElement('div');
            div.classList.add('tarjeta-producto');
            div.innerHTML = `
                <img src="${prod.imagen}" alt="${prod.nombre}">
                <h3>${prod.nombre}</h3>
                <p>$${prod.precio}</p>
                <button onclick="agregarAlPedido(${prod.id}, ${prod.precio}, '${prod.nombre}')">Agregar</button>
            `;
            contenedor.appendChild(div);
        });
    });

function agregarAlPedido(id, precio, nombre) {
    pedido.push({id, nombre, precio});
    actualizarCarrito();
}

function actualizarCarrito() {
    listaPedido.innerHTML = '';
    total = 0;
    pedido.forEach(item => {
        const li = document.createElement('li');
        li.innerText = `${item.nombre} - $${item.precio}`;
        listaPedido.appendChild(li);
        total += item.precio;
    });
    totalPago.innerText = total;
    window.agregarAlPedido = agregarAlPedido;
}