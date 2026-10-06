const productList = document.getElementById("product-list");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const priceFilter = document.getElementById("priceFilter");
const resultCount = document.getElementById("result-count");

function displayProducts(list) {
  if (!productList) return;
  if (resultCount) resultCount.textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
  if (!list.length) {
    productList.innerHTML = `<div class="empty-state"><i class="fa-solid fa-magnifying-glass"></i><h3>No products found</h3><p>Try another search, category or price range.</p></div>`;
    return;
  }
  productList.innerHTML = list.map(product => `
    <article class="product-card">
      <a class="product-image-link" href="product.html?id=${product.id}" aria-label="View ${product.name}">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${product.oldPrice ? `<span class="discount-badge">${Math.round((1 - product.price / product.oldPrice) * 100)}% OFF</span>` : ""}
      </a>
      <div class="product-card-content">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <div class="rating-row"><span>★ ${product.rating}</span><small>(${product.reviews})</small></div>
        <div class="price-row"><strong>$${product.price}</strong>${product.oldPrice ? `<del>$${product.oldPrice}</del>` : ""}</div>
        <div class="product-actions">
          <a class="view-btn" href="product.html?id=${product.id}">Details</a>
          <button type="button" onclick="TechShop.addToCartById(${product.id})"><i class="fa-solid fa-cart-plus"></i> Add</button>
        </div>
      </div>
    </article>
  `).join("");
}

function applyFilters() {
  const keyword = (searchInput?.value || "").trim().toLowerCase();
  const category = categoryFilter?.value || "all";
  const price = priceFilter?.value || "all";
  let filtered = PRODUCTS.filter(product => {
    const matchesSearch = `${product.name} ${product.category}`.toLowerCase().includes(keyword);
    const matchesCategory = category === "all" || product.category === category;
    const matchesPrice = price === "all" || (price === "under200" && product.price < 200) || (price === "200to500" && product.price >= 200 && product.price <= 500) || (price === "over500" && product.price > 500);
    return matchesSearch && matchesCategory && matchesPrice;
  });

  switch (sortFilter?.value) {
    case "price-low": filtered.sort((a, b) => a.price - b.price); break;
    case "price-high": filtered.sort((a, b) => b.price - a.price); break;
    case "rating": filtered.sort((a, b) => b.rating - a.rating); break;
    case "name": filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
  }
  displayProducts(filtered);
}

[searchInput, categoryFilter, sortFilter, priceFilter].forEach(el => el?.addEventListener(el === searchInput ? "input" : "change", applyFilters));
const params = new URLSearchParams(window.location.search);
if (searchInput && params.get("search")) searchInput.value = params.get("search");
if (categoryFilter && params.get("category")) categoryFilter.value = params.get("category");
applyFilters();
TechShop.updateCartCount();
