// Ejemplo de productos

const products = [
    { id: 1, name: "Jabon 1", price: 10.00 },
    { id: 2, name: "Jabon 2", price: 20.00 },
    { id: 3, name: "Jabon 3", price: 30.00 },
];

// Función para mostrar los productos

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'col-md-4 product-item';
        productDiv.innerHTML = `
            <h4>${product.name}</h4>
            <p>Precio: $${product.price.toFixed(2)}</p>
            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Agregar al Carrito</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Función para agregar al carrito

function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Función para actualizar la vista del carrito

function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';

    cart.forEach(item => {
        const itemDiv = document.createElement('li');
        itemDiv.className = 'list-group-item';
        itemDiv.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
        `;
        cartDiv.appendChild(itemDiv);
    });
}

// Función para vaciar el carrito

function clearCart() {
    localStorage.removeItem('cart');
    updateCartDisplay();
}

// Función de pago (simple muestra de mensaje)

function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        Swal.fire("El carrito esta vacio!");
        return;
    }

    Swal.fire({
        position: "center",
        icon: "success",
        title: "Compra realizada con exito!",
        showConfirmButton: false,
        timer: 1500
    });
    clearCart();
}

// Inicializar la aplicación

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartDisplay();

    document.getElementById('product-list').addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            addToCart(productId);
        }
    });

    document.getElementById('clear-cart').addEventListener('click', clearCart);
    document.getElementById('checkout').addEventListener('click', checkout);
});
