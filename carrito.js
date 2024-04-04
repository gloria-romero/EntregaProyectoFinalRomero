let carrito = [];
let totalCompra = 0;

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    inicializarBotonIrAlCarrito();
    inicializarBotonVolverTienda();
    inicializarBotonFinalizarCompra();
});

function cargarProductos() {
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            const productosContainer = document.querySelector('.products');
            productosContainer.innerHTML = '';
            data.productos.forEach(producto => {
                const productoElement = document.createElement('div');
                productoElement.classList.add('product');
                productoElement.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <h2>${producto.nombre}</h2>
                    <p>Precio: ${producto.precio}€</p>
                    <button class="add-to-cart" data-producto-nombre="${producto.nombre}" data-producto-precio="${producto.precio}" data-producto-imagen="${producto.imagen}">Añadir al carrito</button>
                `;
                productosContainer.appendChild(productoElement);
            });
            inicializarBotonesAgregarCarrito();
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}

function inicializarBotonesAgregarCarrito() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const nombreProducto = this.getAttribute('data-producto-nombre');
            const precioProducto = Number(this.getAttribute('data-producto-precio'));
            const imagenProducto = this.getAttribute('data-producto-imagen');
            
            const productoEnCarrito = carrito.find(producto => producto.nombre === nombreProducto);
            if (productoEnCarrito) {
                productoEnCarrito.cantidad++;
            } else {
                carrito.push({ nombre: nombreProducto, precio: precioProducto, cantidad: 1, imagen: imagenProducto });
            }

            totalCompra += precioProducto;
            actualizarCarritoDOM();

            // Notificación toastify
            Toastify({
                text: `${nombreProducto} ha sido añadido al carrito.`,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "left",
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                stopOnFocus: true,
            }).showToast();
        });
    });
}

function actualizarCarritoDOM() {
    const productosCarritoContainer = document.getElementById('productos-carrito');
    productosCarritoContainer.innerHTML = '';

    carrito.forEach((producto, index) => {
        const productoElement = document.createElement('div');
        productoElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; margin-right: 10px;">
            <span>${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: €${producto.precio * producto.cantidad}</span>
            <button class="eliminar-producto" data-index="${index}">Eliminar</button>
        `;
        productosCarritoContainer.appendChild(productoElement);
    });

    document.getElementById('total-carrito').innerText = `Total: €${totalCompra}`;
    document.getElementById('cart-count').innerText = carrito.reduce((total, producto) => total + producto.cantidad, 0);

    inicializarEventosEliminar();

    // Controlar la visibilidad del botón "Finalizar compra"
    const botonFinalizarCompra = document.getElementById('finalizar-compra');
    if (carrito.length > 0) {
        botonFinalizarCompra.style.display = 'block';
    } else {
        botonFinalizarCompra.style.display = 'none';
    }
}

function eliminarProductoDesdeCarrito(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
    } else {
        carrito.splice(index, 1);
    }

    totalCompra = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    actualizarCarritoDOM();
}

function inicializarBotonIrAlCarrito() {
    document.getElementById('go-to-cart-btn').addEventListener('click', () => {
        const carritoContainer = document.getElementById('carrito-container');
        const ecommerceContainer = document.getElementById('ecommerce-container');
        const isVisible = carritoContainer.style.display === 'block';
        
        carritoContainer.style.display = isVisible ? 'none' : 'block';
        ecommerceContainer.style.display = isVisible ? 'block' : 'none';
    });
}

function inicializarEventosEliminar() {
    document.querySelectorAll('.eliminar-producto').forEach((button, index) => {
        button.addEventListener('click', () => eliminarProductoDesdeCarrito(index));
    });
}

function inicializarBotonVolverTienda() {
    const volverBtn = document.getElementById('volver-tienda');
    if (volverBtn) {
        volverBtn.addEventListener('click', () => {
            document.getElementById('ecommerce-container').style.display = 'block';
            document.getElementById('carrito-container').style.display = 'none';
        });
    }
}

function inicializarBotonFinalizarCompra() {
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    finalizarCompraBtn.addEventListener('click', () => {
        document.getElementById('ecommerce-container').style.display = 'none';
        document.getElementById('carrito-container').style.display = 'none';
        document.getElementById('confirmacion-compra').style.display = 'block';
    });
}

document.getElementById('volver-inicio').addEventListener('click', () => {
    document.getElementById('confirmacion-compra').style.display = 'none';
    document.getElementById('ecommerce-container').style.display = 'block';
    // Limpiar el carrito
    carrito = [];
    totalCompra = 0;
    actualizarCarritoDOM();
});

