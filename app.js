// ==============================
// CART COUNT
// ==============================

function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {

        cartCount.innerText = cart.length;

    }

}

updateCartCount();

// ==============================
// NEWSLETTER SUBSCRIPTION
// ==============================

const newsletterBtn = document.querySelector(".newsletter-box button");

if (newsletterBtn) {

    newsletterBtn.addEventListener("click", function () {

        const email = document.querySelector(".newsletter-box input").value.trim();

        if (email === "") {

            alert("Please enter your email.");

            return;

        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

            return;

        }

        alert("Thank you for subscribing!");

        document.querySelector(".newsletter-box input").value = "";

    });

}

// ==============================
// ACTIVE NAVIGATION LINK
// ==============================

const currentPage = window.location.pathname.split("/").pop();

const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage) {

        link.classList.add("active");

    }

});