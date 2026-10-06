const CART_KEY = "techshop_cart";

function readCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) || localStorage.getItem("cart") || "[]");
    if (!Array.isArray(raw)) return [];
    const normalized = [];
    raw.forEach(item => {
      const product = PRODUCTS.find(p => p.id === Number(item.id));
      if (!product) return;
      const quantity = Math.max(1, Number(item.quantity) || 1);
      const existing = normalized.find(p => p.id === product.id);
      if (existing) existing.quantity += quantity;
      else normalized.push({ ...product, quantity });
    });
    return normalized;
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  localStorage.removeItem("cart");
  updateCartCount();
}

function cartCount() {
  return readCart().reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartCount() {
  document.querySelectorAll("#cart-count").forEach(el => el.textContent = cartCount());
}

function addToCartById(id, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === Number(id));
  if (!product) return false;
  const cart = readCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) existing.quantity += quantity;
  else cart.push({ ...product, quantity });
  saveCart(cart);
  showToast(`${product.name} added to cart`);
  return true;
}

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

window.TechShop = { PRODUCTS, readCart, saveCart, addToCartById, updateCartCount, showToast };
updateCartCount();
