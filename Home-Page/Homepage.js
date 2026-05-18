// // =========================
// // NAVIGATION DATA (ARRAY)
// // =========================
// let card = [];
// const navItems = [
//   {
//     name: "profile",
//     selector: ".profile a",
//     protected: true,
//     loginPage: "../Profile-Page/login.html",
//     targetPage: "../Profile-Page/Profile.html"
//   },
//   {
//     name: "sidebar-profile",
//     selector: ".sidebar a",
//     protected: true,
//     loginPage: "../Profile-Page/login.html",
//     targetPage: "../Profile-Page/Profile.html"
//   }
// ];

// // =========================
// // AUTH CHECK
// // =========================
// function isLoggedIn() {
//   const user = JSON.parse(localStorage.getItem("userAccount"));
//   return localStorage.getItem("isLoggedIn") === "true" && user;
// }

// // =========================
// // NAVIGATION HANDLER
// // =========================
// function handleNavigation(item) {
//   if (item.protected && isLoggedIn()) {
//     window.location.href = item.targetPage;
//   } else {
//     window.location.href = item.loginPage;
//   }
// }

// // =========================
// // ATTACH EVENTS FROM ARRAY
// // =========================
// navItems.forEach((item) => {
//   const links = document.querySelectorAll(item.selector);

//   links.forEach((link) => {
//     link.addEventListener("click", (e) => {
//       e.preventDefault();
//       handleNavigation(item);
//     });
//   });
// });

// // =========================
// // SIDEBAR TOGGLE SYSTEM
// // =========================
// const hamburger = document.getElementById("hamburger-menu");
// const sidebar = document.getElementById("sidebar-nav");
// const overlay = document.getElementById("sidebar-overlay");
// const closeBtn = document.getElementById("sidebar-close");

// function openSidebar() {
//   sidebar.classList.add("open");
//   overlay.classList.add("show");
//   document.body.classList.add("no-scroll");
// }

// function closeSidebar() {
//   sidebar.classList.remove("open");
//   overlay.classList.remove("show");
//   document.body.classList.remove("no-scroll");
// }

// hamburger?.addEventListener("click", openSidebar);
// closeBtn?.addEventListener("click", closeSidebar);
// overlay?.addEventListener("click", closeSidebar);

/*************************
 * LOAD EXISTING CART
 *************************/
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/*************************
 * FOOD DATA (ALL IN ARRAY)
 *************************/
const combos = [
  {
    title: "Special Combo",
    name: "Spicy Soup (Mala)",
    price: 3.5,
    image: "https://i.pinimg.com/736x/10/c6/26/10c62626ff542aecd7b31d2597929662.jpg",
    url: "../Order_Page/Order_page.html"
  },
  {
    title: "2 Person Combo",
    name: "Tomato Soup",
    price: 3.5,
    image: "https://i.pinimg.com/1200x/b3/54/c7/b354c7d2acae92a36ebee4cef78f28b8.jpg",
    url: "../Order_Page/Order_page.html"
  },
  {
    title: "Special Combo",
    name: "Chicken Soup",
    price: 3.5,
    image: "https://i.pinimg.com/1200x/33/b8/7a/33b87a663e72ca136065dd179222edd2.jpg",
    url: "../Order_Page/Order_page.html"
  }
];

const dishes = [
  {
    id: 1,
    name: "Spicy Soup (Mala)",
    price: 3.5,
    image: "https://i.pinimg.com/736x/10/c6/26/10c62626ff542aecd7b31d2597929662.jpg",
    desc: "A fiery and aromatic broth infused with peppercorns and chilies.",
    url: "../Order_Page/Order_page.html"
  },
  {
    id: 2,
    name: "Mushroom Soup",
    price: 3.5,
    image: "https://i.pinimg.com/1200x/ec/ad/3d/ecad3d383e16010d849d3278ca7cdb07.jpg",
    desc: "A thick spicy broth with numbing flavor.",
    url: "../Order_Page/Order_page.html"
  }
];

const carouselImages = [
  "https://www.emborg.com/app/uploads/2024/12/Creamy-Mala-Hotpot_Cooking-_1200x1200.jpg",
  "https://i.pinimg.com/1200x/76/51/60/765160bc125eb5d03f3e14cd31a1e507.jpg",
  "https://i.pinimg.com/1200x/1a/09/18/1a09181bda96b66d1d534c423297c650.jpg",
  "https://i.pinimg.com/1200x/f5/2e/bf/f52ebf141e43a93669228c1c756b7af6.jpg"
];

const carouselInner = document.getElementById("carouselInner");
const indicators = document.getElementById("carouselIndicators");

carouselImages.forEach((src, index) => {
  // Create carousel item
  const item = document.createElement("div");
  item.className = "carousel-item";
  if(index === 0) item.classList.add("active"); // first item active
  item.innerHTML = `<img src="${src}" alt="Slide ${index+1}">`;
  carouselInner.appendChild(item);

  // Create indicator
  const indicator = document.createElement("div");
  indicator.className = "indicator";
  if(index === 0) indicator.classList.add("active");
  indicator.dataset.index = index;
  indicators.appendChild(indicator);

  indicator.addEventListener("click", () => showSlide(index));
});

let currentIndex = 0;

// Auto-play every 4 seconds
let autoplayInterval = setInterval(() => {
  let newIndex = (currentIndex + 1) % carouselImages.length;
  showSlide(newIndex);
}, 2000); 

// Pause auto-play on mouse enter, resume on mouse leave
const carousel = document.getElementById("imageCarousel");

carousel.addEventListener("mouseenter", () => clearInterval(autoplayInterval));
carousel.addEventListener("mouseleave", () => {
  autoplayInterval = setInterval(() => {
    let newIndex = (currentIndex + 1) % carouselImages.length;
    showSlide(newIndex);
  }, 2000);
});


function showSlide(index) {
  const items = document.querySelectorAll(".carousel-item");
  const dots = document.querySelectorAll(".carousel-indicators .indicator");

  items.forEach(item => item.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));

  items[index].classList.add("active");
  dots[index].classList.add("active");

  currentIndex = index;
}

// Controls
document.getElementById("prevBtn").addEventListener("click", () => {
  let newIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
  showSlide(newIndex);
});

document.getElementById("nextBtn").addEventListener("click", () => {
  let newIndex = (currentIndex + 1) % carouselImages.length;
  showSlide(newIndex);
});

/*************************
 * RENDER COMBOS
 *************************/
function renderCombos() {
  const container = document.getElementById("comboContainer");

  container.innerHTML = combos.map(item => `
    <div class="combo-card">
      <h3>${item.title}</h3>
      <img src="${item.image}" />
      <h4>${item.name}</h4>

      <button class="btn-primary" onclick="goToOrder('${item.name}')">
        Order Now
      </button>
    </div>
  `).join("");
}

/*************************
 * RENDER DISHES
 *************************/
function renderDishes() {
  const container = document.getElementById("dishContainer");

  container.innerHTML = dishes.map(item => `
    <div class="dish-item">
      <img src="${item.image}" />

      <div class="dish-info">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
      </div>

      <div class="dish-action">
        <span class="price">$${item.price}</span>

        <div class="action-buttons">
          <button class="btn-primary" onclick="goToOrder('${item.name}')">
            Order Now
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

/*************************
 * ADD TO CART
 *************************/
function addToCart(id) {
  const item = dishes.find(d => d.id === id);

  if (!item) return;

  const existing = cart.find(c => c.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

/*************************
 * ORDER PAGE NAV (FIXED)
 *************************/
function goToOrder(itemName) {
  // Find the combo first
  const item =
    combos.find(c => c.name === itemName) || // first check combos
    dishes.find(d => d.name === itemName);   // then dishes

  if (!item) {
    console.error("Item not found:", itemName);
    return;
  }

  // Save combo to localStorage
  localStorage.setItem("selectedItem", JSON.stringify(item));

  // Navigate to Order page
  window.location.href = item.url;
}

/*************************
 * MOBILE MENU
 *************************/
function setupMobileMenu() {
  const hamburger = document.getElementById("hamburger-menu");
  const sidebar = document.getElementById("sidebar-nav");
  const overlay = document.getElementById("sidebar-overlay");
  const closeBtn = document.getElementById("sidebar-close");

  function openSidebar() {
    sidebar.classList.add("open");
    overlay.classList.add("show");
    document.body.classList.add("no-scroll");
  }

  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
    document.body.classList.remove("no-scroll");
  }

  if (hamburger) hamburger.addEventListener("click", openSidebar);
  if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
  if (overlay) overlay.addEventListener("click", closeSidebar);
}

/*************************
 * INIT PAGE
 *************************/
document.addEventListener("DOMContentLoaded", () => {
  renderCombos();
  renderDishes();
  setupMobileMenu();
});