let cart = TechShop.readCart();
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const subtotalPrice = document.getElementById("subtotal-price");
const shippingPrice = document.getElementById("shipping-price");
const checkout = document.getElementById("checkout");

function renderCart() {
  cart = TechShop.readCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 500 ? 0 : 15;
  const total = subtotal + shipping;

  if (!cart.length) {
    cartItems.innerHTML = `<div class="empty-cart"><i class="fa-solid fa-cart-shopping"></i><h2>Your cart is empty</h2><p>Add a few products to see them here.</p><a class="btn" href="products.html">Continue Shopping</a></div>`;
  } else {
    cartItems.innerHTML = cart.map(item => `
      <article class="cart-card">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-product-info"><span>${item.category}</span><h3>${item.name}</h3><strong>$${item.price}</strong></div>
        <div class="quantity-control"><button onclick="changeQuantity(${item.id}, -1)" aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button onclick="changeQuantity(${item.id}, 1)" aria-label="Increase quantity">+</button></div>
        <strong class="line-total">$${(item.price * item.quantity).toFixed(2)}</strong>
        <button class="remove-btn" onclick="removeItem(${item.id})"><i class="fa-solid fa-trash"></i></button>
      </article>`).join("");
  }

  subtotalPrice.textContent = `$${subtotal.toFixed(2)}`;
  shippingPrice.textContent = shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`;
  totalPrice.textContent = `$${total.toFixed(2)}`;
  document.getElementById("cart-items-count").textContent = `${totalItems} item${totalItems === 1 ? "" : "s"}`;
  TechShop.updateCartCount();
}

function changeQuantity(id, delta) {
  const next = cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item);
  TechShop.saveCart(next);
  renderCart();
}

function removeItem(id) {
  TechShop.saveCart(cart.filter(item => item.id !== id));
  renderCart();
  TechShop.showToast("Product removed from cart");
}

window.changeQuantity = changeQuantity;
window.removeItem = removeItem;

checkout.addEventListener("click", () => {
  if (!cart.length) return TechShop.showToast("Your cart is empty");
  document.getElementById("checkout-modal").classList.add("open");
});

document.getElementById("close-modal")?.addEventListener("click", () => document.getElementById("checkout-modal").classList.remove("open"));
document.getElementById("checkout-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const orderId = `TS-${Date.now().toString().slice(-6)}`;
  localStorage.setItem("techshop_last_order", JSON.stringify({ orderId, total: totalPrice.textContent, createdAt: new Date().toISOString() }));
  TechShop.saveCart([]);
  document.getElementById("checkout-modal").classList.remove("open");
  cart = [];
  renderCart();
  TechShop.showToast(`Order ${orderId} placed successfully`);
});

renderCart();
