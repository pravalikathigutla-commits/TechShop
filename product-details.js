const id = Number(new URLSearchParams(window.location.search).get("id")) || 1;
const product = PRODUCTS.find(item => item.id === id) || PRODUCTS[0];

document.title = `${product.name} | TechShop`;
document.getElementById("product-image").src = product.image;
document.getElementById("product-image").alt = product.name;
document.getElementById("product-name").textContent = product.name;
document.getElementById("product-price").textContent = `$${product.price}`;
document.getElementById("product-description").textContent = product.description;
document.getElementById("product-category").textContent = product.category;
document.getElementById("product-rating").innerHTML = `★ ${product.rating} <span>(${product.reviews} reviews)</span>`;
document.getElementById("product-features").innerHTML = product.features.map(feature => `<li><i class="fa-solid fa-circle-check"></i>${feature}</li>`).join("");

document.getElementById("add-to-cart").addEventListener("click", () => {
  const quantity = Math.max(1, Number(document.getElementById("quantity").value) || 1);
  TechShop.addToCartById(product.id, quantity);
});

const quantityInput = document.getElementById("quantity");
document.querySelector(".qty-minus")?.addEventListener("click", () => quantityInput.value = Math.max(1, Number(quantityInput.value) - 1));
document.querySelector(".qty-plus")?.addEventListener("click", () => quantityInput.value = Number(quantityInput.value) + 1);
TechShop.updateCartCount();
