let selectedCategory = "Proteins";
let selectedSpice = "None";

let cart = [];

const items = {
  Proteins: [
    { name: "Slice Beef", price: 2.5, img: "images/proteins/slice-beef.jpg" },
    { name: "Fresh Shrimp", price: 2.5, img: "images/proteins/fresh-shrimp.jpg" },
    { name: "Lamb Slice", price: 2.5, img: "images/proteins/lamb-slice.jpg" },
    { name: "Fish Fillet", price: 2.5, img: "images/proteins/fish-fillet.jpg" },
  ],

  Vegetables: [
    { name: "Bok Choy", price: 2.5, img: "images/vegetables/bok_choy.jpg" },
    { name: "Mix Mushroom", price: 2.5, img: "images/vegetables/mix_mushrooms.jpg" },
    { name: "Sweet Corn", price: 2.5, img: "images/vegetables/sweet_corn.jpg" },
    { name: "Spinach", price: 2.5, img: "images/vegetables/spinach.jpg" },
  ],

  Noodles: [
    { name: "Udon Noodles", price: 2.5, img: "images/noodles/udon-noodles.jpg" },
    { name: "Rice Noodles", price: 2.5, img: "images/noodles/rice-noodles.jpg" },
    { name: "Glass Noodles", price: 2.5, img: "images/noodles/glass-noodles.jpg" },
  ],

  Drinks: [
    { name: "Cola", price: 2.5, img: "images/drinks/cola.webp" },
    { name: "Pepsi", price: 2.5, img: "images/drinks/pepsi.jpg" },
    { name: "Sprite", price: 2.5, img: "images/drinks/sprite.png" },
    { name: "Water", price: 2.5, img: "images/drinks/water.jpeg" },
  ]
};

function showCategory(category, btn) {
  selectedCategory = category;

  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  renderItems();
}

function renderItems() {
  const grid = document.getElementById("itemsGrid");
  grid.innerHTML = "";

  items[selectedCategory].forEach((item) => {
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

/* ADD TO CART */
function addToCart(name, price) {
  let found = cart.find(item => item.name === name);

  if (found) {
    found.qty += 1;
  } else {
    cart.push({ name: name, price: price, qty: 1 });
  }

  updateCart();
}

/* REMOVE FROM CART */
function removeFromCart(index) {
  if (cart[index].qty > 1) {
    cart[index].qty -= 1;
  } else {
    cart.splice(index, 1);
  }

  updateCart();
}

/* UPDATE CART DISPLAY */
function updateCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <span>${item.name} (❌${item.qty})</span>
      <span>
        ${(item.price * item.qty).toFixed(2)} $
        <button onclick="removeFromCart(${index})">x</button>
      </span>
    `;

    cartItems.appendChild(div);
  });

  let subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let tax = subtotal * 0.08;
  let total = subtotal + tax;

  document.getElementById("subtotal").innerText = "$" + subtotal.toFixed(2);
  document.getElementById("tax").innerText = "$" + tax.toFixed(2);
  document.getElementById("total").innerText = "$" + total.toFixed(2);
}

/* SELECT SPICE */
function selectSpice(level, btn) {
  selectedSpice = level;
  document.getElementById("spiceSelected").innerText = level;

  document.querySelectorAll(".spice-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
}

/* DEFAULT LOAD */
renderItems();
updateCart();