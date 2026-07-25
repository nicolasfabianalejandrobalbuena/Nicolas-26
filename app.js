const apiBase = "http://127.0.0.1:8000/api";
const localCatalog = window.SANAGUSTIN_SEED || { categories: [], products: [] };

function querySelector(id) {
  return document.getElementById(id);
}

function safeImageSrc(src) {
  return encodeURI(src || "img/product-placeholder.svg");
}

function renderProductCard(product) {
  const image = product.images?.[0] || "img/product-placeholder.svg";
  return `
    <article class="product-card">
      <img src="${safeImageSrc(image)}" alt="${product.name}" loading="lazy" />
      <h3>${product.name}</h3>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <p>${product.shortDescription || product.description}</p>
      <div class="product-actions">
        <button class="action-button" onclick="addToCart('${product.id}')">Añadir al carrito</button>
        <a class="button-secondary" href="product.html?slug=${encodeURIComponent(product.slug)}">Ver</a>
      </div>
    </article>
  `;
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Fetch failed");
  }
  return response.json();
}

async function loadCatalogData() {
  return localCatalog;
}

async function getCategories() {
  try {
    return await fetchJson(`${apiBase}/categories`);
  } catch {
    const data = await loadCatalogData();
    return data.categories || [];
  }
}

async function getProducts() {
  try {
    return await fetchJson(`${apiBase}/products`);
  } catch {
    const data = await loadCatalogData();
    return data.products || [];
  }
}

async function getProductBySlug(slug) {
  try {
    return await fetchJson(`${apiBase}/product?slug=${encodeURIComponent(slug)}`);
  } catch {
    const data = await loadCatalogData();
    return (data.products || []).find(item => item.slug === slug) || null;
  }
}

async function searchProducts(query) {
  try {
    return await fetchJson(`${apiBase}/search?q=${encodeURIComponent(query)}`);
  } catch {
    const data = await loadCatalogData();
    const q = query.toLowerCase();
    return (data.products || []).filter(prod =>
      prod.name.toLowerCase().includes(q) ||
      prod.description.toLowerCase().includes(q) ||
      prod.slug.toLowerCase().includes(q) ||
      prod.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }
}

async function getRecommendations(productId) {
  try {
    return await fetchJson(`${apiBase}/recommendations?product_id=${encodeURIComponent(productId)}`);
  } catch {
    const data = await loadCatalogData();
    const source = (data.products || []).find(prod => prod.id === productId);
    if (!source) return [];
    return (data.products || [])
      .filter(prod => prod.id !== source.id)
      .sort((a, b) => {
        const scoreA = (a.tags.filter(tag => source.tags.includes(tag)).length) + (a.category_id === source.category_id ? 1 : 0);
        const scoreB = (b.tags.filter(tag => source.tags.includes(tag)).length) + (b.category_id === source.category_id ? 1 : 0);
        return scoreB - scoreA;
      })
      .slice(0, 4);
  }
}

function renderCategories(categories) {
  const container = querySelector("category-cards");
  if (!container) return;
  container.innerHTML = categories.map(cat => `
    <article class="category-card">
      <h3>${cat.name}</h3>
      <p>${cat.description}</p>
      <a class="button-secondary" href="category.html?slug=${encodeURIComponent(cat.slug)}">Ver categoría</a>
    </article>
  `).join("");
}

function renderProducts(products, containerId = "featured-products") {
  const container = querySelector(containerId);
  if (!container) return;
  container.innerHTML = products.length
    ? products.map(renderProductCard).join("")
    : `<p>No hay productos para mostrar.</p>`;
}

async function loadHome() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  renderCategories(categories);
  renderProducts(products.slice(0, 8));
}

async function loadSearchPage() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q") || "";
  const container = querySelector("search-results");
  if (!container) return;
  const results = await searchProducts(query);
  container.innerHTML = results.length
    ? results.map(renderProductCard).join("")
    : `<p>No se encontraron resultados para "${query}".</p>`;
}

async function loadCategoryPage() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const categories = await getCategories();
  const category = categories.find(cat => cat.slug === slug);
  const products = await getProducts();
  const filtered = slug ? products.filter(prod => prod.category_id === category?.id) : products;
  const heading = querySelector("category-products");
  if (heading && category) {
    heading.insertAdjacentHTML("beforebegin", `<h2>${category.name}</h2><p>${category.description}</p>`);
  }
  renderProducts(filtered, "category-products");
}

async function loadProductPage() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const product = await getProductBySlug(slug);
  if (!product) return;
  querySelector("product-name").textContent = product.name;
  querySelector("product-price").textContent = `$${product.price.toFixed(2)}`;
  querySelector("product-description").textContent = product.description;
  querySelector("product-sku").textContent = `SKU: ${product.sku}`;
  querySelector("stock-availability").textContent = product.available ? `En stock: ${product.stock}` : "Agotado";
  const gallery = document.querySelector(".product-gallery img");
  if (gallery) {
    gallery.src = safeImageSrc(product.images?.[0] || "img/product-placeholder.svg");
    gallery.alt = product.name;
  }
  const addButton = querySelector("add-cart-button");
  if (addButton) {
    addButton.onclick = () => addToCart(product.id);
  }
}

async function loadCartPage() {
  const cart = JSON.parse(localStorage.getItem("sanagustin_cart") || "[]");
  const products = await getProducts();
  const container = querySelector("cart-items");
  if (!container) return;
  if (!cart.length) {
    container.innerHTML = `<p>Tu carrito está vacío.</p>`;
    querySelector("cart-total").textContent = "Total: $0.00";
    return;
  }
  const summary = querySelector("cart-summary");
  if (summary) {
    summary.innerHTML = `<h2>Resumen</h2><p>Productos seleccionados: ${cart.length}</p><p>Total estimado: $${cart.reduce((sum, item) => sum + item.quantity, 0).toFixed(2)}</p>`;
  }
  let total = 0;
  container.innerHTML = cart.map(item => {
    const product = products.find(prod => prod.id === item.id);
    if (!product) return "";
    const subtotal = product.price * item.quantity;
    total += subtotal;
    return `
      <article class="product-card">
        <div class="cart-row">
          <img src="${safeImageSrc(product.images?.[0] || "img/product-placeholder.svg")}" alt="${product.name}" loading="lazy" style="width: 100px; height: auto; border-radius: 18px;" />
          <div>
            <h3>${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)} c/u</p>
            <div class="quantity-control">
              <button onclick="updateCartQuantity('${product.id}', -1)">-</button>
              <input type="text" value="${item.quantity}" readonly />
              <button onclick="updateCartQuantity('${product.id}', 1)">+</button>
            </div>
          </div>
          <div>
            <p class="product-price">$${subtotal.toFixed(2)}</p>
            <button class="button-danger" onclick="removeCartItem('${product.id}')">Eliminar</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
  querySelector("cart-total").textContent = `Total: $${total.toFixed(2)}`;
}

function updateCartQuantity(productId, delta) {
  const cart = JSON.parse(localStorage.getItem("sanagustin_cart") || "[]");
  const index = cart.findIndex(item => item.id === productId);
  if (index < 0) return;
  cart[index].quantity += delta;
  if (cart[index].quantity < 1) {
    cart.splice(index, 1);
  }
  localStorage.setItem("sanagustin_cart", JSON.stringify(cart));
  const path = window.location.pathname;
  if (path.endsWith("cart.html")) {
    loadCartPage();
  }
}

function removeCartItem(productId) {
  const cart = JSON.parse(localStorage.getItem("sanagustin_cart") || "[]");
  const newCart = cart.filter(item => item.id !== productId);
  localStorage.setItem("sanagustin_cart", JSON.stringify(newCart));
  const path = window.location.pathname;
  if (path.endsWith("cart.html")) {
    loadCartPage();
  }
  showToast("Artículo eliminado del carrito");
}

function clearCart() {
  localStorage.setItem("sanagustin_cart", JSON.stringify([]));
  if (window.location.pathname.endsWith("cart.html")) {
    loadCartPage();
  }
  showToast("Carrito vaciado");
}

function addToCart(productId) {
  const cart = JSON.parse(localStorage.getItem("sanagustin_cart") || "[]");
  const index = cart.findIndex(item => item.id === productId);
  if (index >= 0) {
    cart[index].quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  localStorage.setItem("sanagustin_cart", JSON.stringify(cart));
  showToast("Producto agregado al carrito");
}

function showToast(message) {
  let toast = document.querySelector(".toast-message");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast-message";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("visible");
  setTimeout(() => toast.classList.remove("visible"), 2200);
}

function openWhatsApp(message) {
  const url = `https://wa.me/543644369163?text=${encodeURIComponent(message)}`;
  if (window.open(url, "_blank", "noopener,noreferrer")) {
    return;
  }
  window.location.href = url;
}

function handleCheckoutSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const paymentMethod = data.get("paymentMethod") === "cash" ? "Pago en efectivo" : "Tarjeta / Transferencia";
  const name = data.get("fullName") || "Cliente";
  const email = data.get("email") || "sin correo";
  const address = data.get("address") || "sin dirección";
  const city = data.get("city") || "sin ciudad";
  const phone = data.get("phone") || "sin teléfono";
  const notes = data.get("orderNotes") || "sin observaciones";
  const cardNumber = data.get("cardNumber") || "sin número de tarjeta";
  const cardExpiry = data.get("cardExpiry") || "sin vencimiento";
  const cardCvv = data.get("cardCvv") || "sin código";
  const transferDetails = data.get("transferDetails") || "sin CBU";
  const paymentNote = data.get("paymentNote") || "sin observación";
  const message = `Hola San Agustín, quiero confirmar mi pedido.\n\nNombre: ${name}\nEmail: ${email}\nDirección: ${address}\nCiudad: ${city}\nTeléfono: ${phone}\nPedido: ${notes}\nMétodo de pago: ${paymentMethod}\nNúmero de tarjeta: ${cardNumber}\nVencimiento: ${cardExpiry}\nCódigo de seguridad: ${cardCvv}\nCBU para transferir: ${transferDetails}\nObservación del pago: ${paymentNote}`;
  openWhatsApp(message);
  showToast("Se abrirá WhatsApp con tu pedido");
}

function handleSearch(event) {
  event.preventDefault();
  const query = querySelector("search-input")?.value.trim();
  if (!query) return;
  window.location.href = `search.html?q=${encodeURIComponent(query)}`;
}

function initCarousel() {
  const slides = Array.from(document.querySelectorAll(".carousel-slide"));
  const dotsContainer = document.querySelector(".carousel-dots");
  const controls = document.querySelectorAll(".carousel-control");
  if (!slides.length) return;

  let activeIndex = 0;
  const updateCarousel = () => {
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === activeIndex);
    });
    if (dotsContainer) {
      const dots = Array.from(dotsContainer.children);
      dots.forEach((dot, index) => dot.classList.toggle("active", index === activeIndex));
    }
  };

  if (dotsContainer) {
    dotsContainer.innerHTML = slides.map((_, index) => `<button class="carousel-dot${index === 0 ? " active" : ""}" type="button" aria-label="Ir al slide ${index + 1}"></button>`).join("");
    dotsContainer.querySelectorAll(".carousel-dot").forEach((dot, index) => {
      dot.addEventListener("click", () => {
        activeIndex = index;
        updateCarousel();
      });
    });
  }

  controls.forEach(control => {
    control.addEventListener("click", () => {
      const action = control.dataset.action;
      activeIndex = action === "next"
        ? (activeIndex + 1) % slides.length
        : (activeIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });
  });

  setInterval(() => {
    activeIndex = (activeIndex + 1) % slides.length;
    updateCarousel();
  }, 6000);

  updateCarousel();
}

function init() {
  initCarousel();
  const checkoutForm = querySelector("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", handleCheckoutSubmit);
  }
  const searchForm = querySelector("search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", handleSearch);
  }
  const path = window.location.pathname;
  if (path.endsWith("search.html")) {
    loadSearchPage();
    return;
  }
  if (path.endsWith("category.html")) {
    loadCategoryPage();
    return;
  }
  if (path.endsWith("product.html")) {
    loadProductPage();
    return;
  }
  if (path.endsWith("cart.html")) {
    loadCartPage();
    return;
  }
  loadHome();
}

window.addEventListener("DOMContentLoaded", init);
