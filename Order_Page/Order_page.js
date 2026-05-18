
const config = {
  selectedCategory: "Proteins",
  selectedSpice: "None",
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  spices: ["None", "Mild", "Medium", "Hot", "Extra Hot"],
  items: {
    Proteins: [
    { name: "Beef Slices", price: 1, img: "https://external-preview.redd.it/bought-a-meat-slicer-to-cut-paper-thin-slices-what-cut-of-v0-4F5_fSPXvyon4cGS99wW1wLFzCkeqfCIUcPDOrbtpYI.jpg?auto=webp&s=f3e42b2030b95ab96f0490bec71b94001a6c9234" },
    { name: "Lamb Slices", price: 1, img: "https://img06.weeecdn.com/product/image/682/347/19C75F52C31659E8.png" },
    { name: "Pork Slices", price: 0.5, img: "https://old.ploma.io/cdn/shop/products/mugifuji-premium-single-rib-thin-sliced-pork-belly-approx-1-2lb-meateggs-811_1024x1024.jpg?v=164439897" },
    { name: "Black Chicken Slices", price: 1, img: "https://www.kksbbq.com/wp-content/uploads/2020/06/sliced-black.png" },
    { name: "Shrimp", price: 1, img: "https://static.vecteezy.com/system/resources/previews/008/066/908/large_2x/raw-shrimp-on-white-plate-with-mint-leaf-and-wooden-background-for-cooking-close-up-fresh-shrimps-or-prawns-seafood-shelfish-free-photo.JPG " },
    { name: "Beef Meatball", price: 0.5, img: "https://i.ytimg.com/vi/zzEaehrIXD4/sddefault.jpg" },
    { name: "Cheese Meatball", price: 0.5, img: "https://images.deliveryhero.io/image/fd-kh/Products/2523255.jpg?width=%s" },
    { name: "Dumpling", price: 0.25, img: "https://png.pngtree.com/png-vector/20240224/ourmid/pngtree-chinese-dumplings-in-plate-png-image_11872394.png"},
  ],
    Vegetables: [
    {  name: "Bok Choy", price: 0.5, img: "https://5.imimg.com/data5/SELLER/Default/2021/2/HU/VI/PW/3640922/bok-choy-500x500.jpeg" },
    {  name: "Chinese Cabbage", price: 0.5, img: "https://static.vecteezy.com/system/resources/previews/008/701/691/large_2x/fresh-chinese-cabbage-put-on-a-red-plate-which-was-served-in-shabu-or-sukiyaki-restaurant-photo.jpg" },
    {  name: "Water Spinach", price: 0.5, img: "https://images.deliveryhero.io/image/fd-kh/Products/3545635.jpg?width=%s" },
    {  name: "Corn", price: 0.5, img: "https://c.ndtvimg.com/2025-08/o5ms8a4g_sweet-corn-benefits_625x300_10_August_25.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=738" },
    {  name: "Enoki Mushroom (big)", price: 0.5, img: "https://images.deliveryhero.io/image/fd-kh/Products/3677646.jpg?width=%s" },
    {  name: "Enoki Mushroom", price: 0.5, img: "https://images.deliveryhero.io/image/fd-kh/Products/3677591.jpg?width=%s" },
  ],
    Noodles: [
    {  name: "Wheat Noodles", price: 0, img: "https://lh5.googleusercontent.com/proxy/HyecXOrXDCIXhf56e8JNKWjV55okd4Rj3Yhpca6aFuj0FAUK8fS8xOnSuB4p39agTEF_2_1ZOB7Uen8xvZ-H4sEKEHELhVeXhu618dVDJkpdgA" },
    {  name: "Glass Noodles", price: 0, img: "https://ecoapp.asia/image/catalog/Seller_532/60-20230912195519.%20%E1%9E%98%E1%9E%B8%E1%9E%9F%E1%9E%BD%E1%9E%9A.jpg" },
    {  name: "Udon", price: 0, img: "https://img.freepik.com/premium-photo/top-view-flat-lay-udon-noodle-isolated-white-background_121658-169.jpg" },
    {  name: "Instant Noodles", price: 2, img: "https://png.pngtree.com/png-clipart/20250104/original/pngtree-instant-noodles-close-up-png-image_19567365.png" },
  ],
    Drinks: [
      { name: "Coca-Cola", price: 1.0, img: "https://i.pinimg.com/736x/45/10/3c/45103c8153d3e3653bc285d73baf4805.jpg" },
      { name: "Sting", price: 1.0, img: "https://i.pinimg.com/736x/e5/e4/5e/e5e45e2a7d49c52851f504b5be9551dd.jpg" },
      { name: "Sprite", price: 1.0, img: "https://i.pinimg.com/736x/9f/34/ff/9f34ffd42b4d772a6bbf85134aa8a0af.jpg" },
      { name: "Water", price: 1.0, img: "https://i.pinimg.com/736x/bf/fc/f5/bffcf5f75e3562ae3a5710c8adfbe968.jpg" }
    ]
  }
};

// const combos = [
//   {
//     title: "Special Combo",
//     name: "Spicy Soup (Mala)",
//     price: 12,
//     image:
//       "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop",
//   },

//   {
//     title: "2 Person Combo",
//     name: "Tomato Soup",
//     price: 18,
//     image:
//       "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=800&auto=format&fit=crop",
//   },

//   {
//     title: "Special Combo",
//     name: "Chicken Soup",
//     price: 15,
//     image:
//       "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=800&auto=format&fit=crop",
//   },
// ];

// const comboGrid = document.getElementById("comboGrid");

// combos.forEach((combo) => {
//   comboGrid.innerHTML += `
//     <div class="combo-card">
//       <h3>${combo.title}</h3>

//       <img src="${combo.image}" alt="${combo.name}" />

//       <h4>${combo.name}</h4>

//       <p class="price">$${combo.price}</p>

//       <button 
//         class="combo-btn"
//         onclick="orderCombo('${combo.name}', ${combo.price})"
//       >
//         Order Now
//       </button>
//     </div>
//   `;
// });
// function orderCombo(name, price) {
//   alert(`Added: ${name} - $${price}`);
// }

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
  },
  {
    id: 2,
    title: "dishes",
    name: "Mushroom Soup",
    price: 3.5,
    image: "https://i.pinimg.com/1200x/ec/ad/3d/ecad3d383e16010d849d3278ca7cdb07.jpg",
    desc: "A thick spicy broth with numbing flavor.",
    url: "../Order_Page/Order_page.html"
  }
];

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const comboGrid = document.getElementById("comboGrid");


function orderCombo(name, price) {
  let item = config.cart.find(i => i.name === name);
  if (item) {
    item.qty++; 
  } else {
    config.cart.push({ name, price, qty: 1 }); 
  }
  saveCart();
  updateCart();
}

function toggleFavorite(comboName, button) {
  const combo = combos.find(c => c.name === comboName);
  if (!combo) return;

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const index = favorites.findIndex(f => f.name === combo.name);

  if (index === -1) {
    const mappedCombo = {
      id: combo.id || Date.now(),
      name: combo.name,
      description: combo.desc || "",
      image: combo.image,
      price: combo.price,
      hasDrink: false
    };
    favorites.push(mappedCombo);
    button.innerHTML = "❤️";
  } else {
    favorites.splice(index, 1);
    button.innerHTML = "🤍";
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

combos.forEach(combo => {
  const safeId = combo.name.replace(/[^a-zA-Z0-9]/g, "");
  const isFav = JSON.parse(localStorage.getItem("favorites") || "[]").find(f => f.name === combo.name);
  const heart = isFav ? "❤️" : "🤍";

  comboGrid.innerHTML += `
    <div class="combo-card">
      <button class="favorite-btn" onclick="toggleFavorite('${combo.name}', this)">${heart}</button>
      <h3>${combo.title}</h3>
      <img src="${combo.image}" alt="${combo.name}" />
      <h4>${combo.name}</h4>
      <p class="price">$${combo.price}</p>
      <button class="combo-btn" onclick="orderCombo('${combo.name}', ${combo.price})">Order Now</button>
    </div>
  `;
});

function showCategory(category, btn) {
  config.selectedCategory = category;
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderItems();
}

function selectSpice(level, btn) {
  selectedSpice = level;

  document.getElementById("spiceSelected").innerText = level;
  document.getElementById("spiceDisplay").style.display = "block";

  document.querySelectorAll(".spice-btn").forEach(b => {
    b.classList.remove("selected");
  });

  btn.classList.add("selected");
}


function renderItems() {
  const grid = document.getElementById("itemsGrid");
  grid.innerHTML = "";
  const list = config.items[config.selectedCategory];
  list.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="card-body">
        <div>
          <h3>${item.name}</h3>
          <p>${item.price.toFixed(2)} $</p>
        </div>
        <button class="add-btn" onclick="addToCart('${item.name}', ${item.price})">+</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function addToCart(name, price) {
  let item = config.cart.find(i => i.name === name);
  if (item) {
    item.qty++;
  } else {
    config.cart.push({ name, price, qty: 1 });
  }
  saveCart();
  updateCart();
}

function removeFromCart(index) {
  if (!config.cart[index]) {
    return;
  }

  config.cart.splice(index, 1);
  saveCart();
  updateCart();
}

function decreaseCartQty(index) {
  if (!config.cart[index]) {
    return;
  }

  if (config.cart[index].qty > 1) {
    config.cart[index].qty--;
  } else {
    config.cart.splice(index, 1);
  }
  saveCart();
  updateCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(config.cart));
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";
  
  config.cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name} x${item.qty}</span>
      <span>
        ${(item.price * item.qty).toFixed(2)} $
        <button onclick="decreaseCartQty(${index})">-</button>
        <button onclick="increaseQty(${index})">+</button>
        <button onclick="removeFromCart(${index})">x</button>
      </span>
    `;
    cartItems.appendChild(div);
  });

  const subtotal = config.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = subtotal * 0.00; 
  const total = subtotal + tax;

  document.getElementById("subtotal").innerText = "$" + subtotal.toFixed(2);
  document.getElementById("tax").innerText = "$" + tax.toFixed(2);
  document.getElementById("total").innerText = "$" + total.toFixed(2);
}

function increaseQty(index) {
  config.cart[index].qty++;
  saveCart();
  updateCart();
}

function loadSelectedItem() {
  const selected = localStorage.getItem("selectedItem");
  if (selected) {
    for (const category in config.items) {
      const item = config.items[category].find(i => i.name === selected);
      if (item) {
        addToCart(item.name, item.price);
        break;
      }
    }
    localStorage.removeItem("selectedItem");
  }
}

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

function goToCart() {
  // Convert cart items to customized order format
  const orderItems = {};
  config.cart.forEach((item, index) => {
    orderItems[index] = {
      name: item.name,
      price: item.price,
      quantity: item.qty
    };
  });

  // Save order data to localStorage
  const orderData = {
    items: orderItems,
    spiceLevel: config.selectedSpice
  };
  localStorage.setItem("customizedOrder", JSON.stringify(orderData));

  // Navigate to cart page
  window.location.href = "../Card-Page2/card_page.html";
}

document.addEventListener("DOMContentLoaded", () => {
  renderItems();
  loadSelectedItem();
  updateCart();
  setupMobileMenu();
});
