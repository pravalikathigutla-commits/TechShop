let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");

const totalPrice = document.getElementById("total-price");

const cartCount = document.getElementById("cart-count");

function displayCart(){

    cartItems.innerHTML="";

    let total=0;

    if(cart.length===0){

        cartItems.innerHTML="<h2>Your cart is empty.</h2>";

        totalPrice.innerText="0";

        cartCount.innerText="0";

        return;

    }

    cart.forEach((product,index)=>{

        total+=product.price;

        cartItems.innerHTML+=`

        <div class="cart-card">

            <img src="${product.image}" alt="${product.name}">

            <div>

                <h3>${product.name}</h3>

                <p>$${product.price}</p>

            </div>

            <button onclick="removeItem(${index})">

                Remove

            </button>

        </div>

        `;

    });

    totalPrice.innerText=total;

    cartCount.innerText=cart.length;

}

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

}

document.getElementById("checkout").addEventListener("click",()=>{

    if(cart.length===0){

        alert("Your cart is empty!");

        return;

    }

    alert("Thank you for shopping with TechShop!");

    localStorage.removeItem("cart");

    cart=[];

    displayCart();

});

displayCart();