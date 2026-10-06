function addHomeProduct(id) {
  TechShop.addToCartById(id);
}
window.addHomeProduct = addHomeProduct;

const newsletterBtn = document.querySelector(".newsletter-box button");
if (newsletterBtn) newsletterBtn.addEventListener("click", () => {
  const input = document.querySelector(".newsletter-box input");
  const email = input.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return TechShop.showToast("Enter a valid email address");
  TechShop.showToast("Thanks for subscribing!");
  input.value = "";
});

const homeSearchButton = document.querySelector(".search-box button");
const homeSearchInput = document.querySelector(".search-box input");
function goToSearch() {
  const query = homeSearchInput?.value.trim() || "";
  window.location.href = query ? `products.html?search=${encodeURIComponent(query)}` : "products.html";
}
homeSearchButton?.addEventListener("click", goToSearch);
homeSearchInput?.addEventListener("keydown", e => { if (e.key === "Enter") goToSearch(); });

document.querySelectorAll(".category-card[data-category]").forEach(card => {
  card.addEventListener("click", () => window.location.href = `products.html?category=${encodeURIComponent(card.dataset.category)}`);
});

TechShop.updateCartCount();
