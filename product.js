// ===============================
// Product Data
// ===============================

const products = [

{
    id:1,
    name:"Gaming Laptop",
    category:"Laptop",
    price:999,
    image:"images/laptop.jpg"
},

{
    id:2,
    name:"Smart Phone",
    category:"Mobile",
    price:699,
    image:"images/mobile.jpg"
},

{
    id:3,
    name:"Smart Watch",
    category:"Watch",
    price:249,
    image:"images/watch.jpg"
},

{
    id:4,
    name:"Wireless Headphones",
    category:"Headphones",
    price:129,
    image:"images/headphones.jpg"
},

{
    id:5,
    name:"Business Laptop",
    category:"Laptop",
    price:899,
    image:"images/laptop.jpg"
},

{
    id:6,
    name:"Flagship Mobile",
    category:"Mobile",
    price:799,
    image:"images/mobile.jpg"
},

{
    id:7,
    name:"Fitness Watch",
    category:"Watch",
    price:199,
    image:"images/watch.jpg"
},

{
    id:8,
    name:"Bluetooth Headphones",
    category:"Headphones",
    price:149,
    image:"images/headphones.jpg"
}

];

// ===============================
// HTML Elements
// ===============================

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

// ===============================
// Display Products
// ===============================

function displayProducts(productArray){

    productList.innerHTML="";

    productArray.forEach(product=>{

        productList.innerHTML += `

        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>$${product.price}</p>

            <button onclick="addToCart(${product.id})">

                Add to Cart

            </button>

        </div>

        `;

    });

}

displayProducts(products);

// ===============================
// Search Products
// ===============================

searchInput.addEventListener("keyup",function(){

    const keyword=this.value.toLowerCase();

    const filtered=products.filter(product=>

        product.name.toLowerCase().includes(keyword)

    );

    displayProducts(filtered);

});

// ===============================
// Category Filter
// ===============================

categoryFilter.addEventListener("change",function(){

    const category=this.value;

    if(category==="all"){

        displayProducts(products);

    }

    else{

        const filtered=products.filter(product=>

            product.category===category

        );

        displayProducts(filtered);

    }

});

// ===============================
// Cart
// ===============================

function addToCart(id){

    let cart=JSON.parse(localStorage.getItem("cart")) || [];

    const product=products.find(item=>item.id===id);

    cart.push(product);

    localStorage.setItem("cart",JSON.stringify(cart));

    alert(product.name + " added to cart!");

    updateCartCount();

}

// ===============================
// Cart Count
// ===============================

function updateCartCount(){

    const cart=JSON.parse(localStorage.getItem("cart")) || [];

    document.getElementById("cart-count").innerText=cart.length;

}

updateCartCount();