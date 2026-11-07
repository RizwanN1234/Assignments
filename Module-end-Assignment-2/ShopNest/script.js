// --- GLOBAL VARIABLES ---
let allProducts = []; // Holds data fetched from JSON
let cart = [];        // Holds cart items (objects with product info + quantity)
let currentCategory = 'All'; // Tracks current active filter

// --- DOM ELEMENTS ---
const productGrid = document.getElementById('product-grid');
const noResults = document.getElementById('no-results');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalEl = document.getElementById('cartTotal');
const cartCountEl = document.getElementById('cartCount');

// --- FETCH DATA (Async/Await) ---
async function fetchProducts() {
    try {
        const response = await fetch('products.json');
        if (!response.ok) throw new Error('Failed to fetch products');
        allProducts = await response.json();
        
        // After fetching, render everything
        renderProducts(allProducts);
        loadCartFromLocalStorage(); // Check local storage for saved cart
    } catch (error) {
        console.error("Error loading products:", error);
        productGrid.innerHTML = "<p>Error loading products. Please try again later.</p>";
    }
}

// --- RENDER PRODUCTS TO DOM ---
function renderProducts(productsToRender) {
    productGrid.innerHTML = ''; // Clear existing grid

    // Toggle "No Products Found" message
    if (productsToRender.length === 0) {
        noResults.classList.remove('hidden');
        productGrid.classList.add('hidden');
    } else {
        noResults.classList.add('hidden');
        productGrid.classList.remove('hidden');
    }

    // Loop through array and create DOM elements
    productsToRender.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        card.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <span class="category">${product.category}</span>
            <h3>${product.name}</h3>
            <p class="price">
                $${product.price.toFixed(2)} 
                <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
            </p>
            <p>⭐ ${product.rating}</p>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGrid.appendChild(card);
    });
}

// --- SEARCH & FILTER LOGIC ---
function filterAndRender() {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredProducts = allProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = currentCategory === 'All' || product.category === currentCategory;
        
        return matchesSearch && matchesCategory;
    });

    renderProducts(filteredProducts);
}

// Event Listeners for Search and Filters
searchInput.addEventListener('input', filterAndRender);

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Update active class
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update category and render
        currentCategory = e.target.dataset.category;
        filterAndRender();
    });
});

// --- CART LOGIC ---
function addToCart(productId) {
    // Find the product in our global array
    const product = allProducts.find(p => p.id === productId);
    
    // Check if item is already in the cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // Push a new object with quantity
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
}

function updateCartUI() {
    cartItemsContainer.innerHTML = ''; // Clear current cart DOM
    let total = 0;
    let totalItems = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        totalItems += item.quantity;

        const cartDiv = document.createElement('div');
        cartDiv.classList.add('cart-item');
        cartDiv.innerHTML = `
            <div class="cart-item-info">
                <strong>${item.name}</strong><br>
                $${item.price.toFixed(2)}
            </div>
            <div class="cart-controls">
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">X</button>
        `;
        cartItemsContainer.appendChild(cartDiv);
    });

    // Update totals and counts in header
    cartTotalEl.textContent = total.toFixed(2);
    cartCountEl.textContent = totalItems;

    // Save to LocalStorage
    saveCartToLocalStorage();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;

    // If quantity drops to 0, remove it
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartUI();
    }
}

function removeFromCart(productId) {
    // Use filter to create new array without the item
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// --- LOCAL STORAGE ---
function saveCartToLocalStorage() {
    // Convert object to string before storing
    localStorage.setItem('shopNestCart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('shopNestCart');
    if (savedCart) {
        // Convert string back to array of objects
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// --- INITIALIZE APP ---
fetchProducts();