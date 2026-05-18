// ======= CART PAGE LOGIC (FINAL UPDATE) =======

const config = {
  items: [],
  deliveryFee: 1.5,
  location: { city: "", district: "", address: "", phone: "", country: "Cambodia" },
  districtData: {
    "Phnom Penh": ["Chamkar Mon", "Tuol Kouk", "Doun Penh", "Sen Sok", "Prampi Makara", "Mean Chey"],
    "Siem Reap": ["Siem Reap City", "Angkor Chum", "Sotr Nikum", "Kralanh", "Prasat Bakong"],
    "Battambang": ["Battambang City", "Moung Ruessei", "Sangkae", "Samlout", "Thma Puok"],
    "Kampot": ["Kampot City", "Tuek Chhou", "Chum Kiri", "Doun Kaev", "Chhuk"]
  }
};

let spiceLevel = "hot";

// Load customized order from previous page
function loadCustomizedOrder() {
  const customizedData = localStorage.getItem("customizedOrder");
  if (customizedData) {
    const orderData = JSON.parse(customizedData);
    spiceLevel = orderData.spiceLevel || "hot";
    config.items = Object.entries(orderData.items).map(([id, item]) => ({
      id,
      name: item.name,
      price: item.price,
      qty: item.quantity
    }));
  }
}

// Render cart items
function renderCart() {
  const box = document.getElementById("cartBox");
  if (!box) return;
  box.innerHTML = "";

  if (config.items.length === 0) {
    box.innerHTML = '<p style="text-align:center;color:#999;">Your cart is empty</p>';
    return;
  }

  config.items.forEach(item => {
    const itemTotal = item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item-card";

    div.innerHTML = `
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <small>$${item.price.toFixed(2)} each</small>
      </div>
      <div class="cart-item-quantity">
        <button onclick="decrease(${item.id})">−</button>
        <span>${item.qty}</span>
        <button onclick="increase(${item.id})">+</button>
      </div>
      <div class="cart-item-total">
        $${itemTotal.toFixed(2)}
      </div>
      <button class="cart-item-remove" onclick="removeItem(${item.id})">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;

    box.appendChild(div);
  });
}

// Quantity controls
function increase(id) {
  const item = config.items.find(i => i.id == id);
  if (item) { item.qty++; renderCart(); updateTotal(); }
}
function decrease(id) {
  const item = config.items.find(i => i.id == id);
  if (item && item.qty > 1) { item.qty--; renderCart(); updateTotal(); }
}
function removeItem(id) {
  config.items = config.items.filter(i => i.id != id);
  renderCart(); updateTotal();
}

// Update totals
function updateTotal() {
  const subtotal = config.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const total = subtotal + config.deliveryFee;
  document.getElementById("subtotal").innerText = subtotal.toFixed(2);
  document.getElementById("delivery").innerText = config.deliveryFee.toFixed(2);
  document.getElementById("total").innerText = total.toFixed(2);
}

// City/District selection
function onCityChange() {
  const city = document.getElementById("citySelect").value;
  config.location.city = city; config.location.district = ""; config.location.address = "";
  const districtSelect = document.getElementById("districtSelect");
  districtSelect.innerHTML = '<option value="">Select a District</option>';
  if (city && config.districtData[city]) {
    config.districtData[city].forEach(d => { const opt = document.createElement("option"); opt.value=d; opt.textContent=d; districtSelect.appendChild(opt); });
    districtSelect.disabled = false;
  } else { districtSelect.disabled = true; }
  updateLocationDisplay();
}
function onDistrictChange() {
  const district = document.getElementById("districtSelect").value;
  config.location.district = district;
  updateLocationDisplay();
}
function updateLocationDisplay() {
  const city = config.location.city;
  const district = config.location.district;
  const address = document.getElementById("addressInput")?.value || "";
  config.location.address = address;
  const display = document.getElementById("locationDisplay");
  if (city && district) {
    display.style.display = "block";
    document.getElementById("selectedLocationText").innerHTML = `<strong>${city}</strong> → ${district}${address ? "<br/>"+address : ""}`;
    document.getElementById("selectedLocationDetails").textContent = "Country: "+config.location.country;
  } else display.style.display="none";
}

// Place order (updated to save history and loyalty)
function placeOrder() {
  if (!config.items.length) { alert("Cart is empty!"); return; }
  if (!config.location.city) { alert("Please select city"); return; }
  if (!config.location.district) { alert("Please select district"); return; }
  const phone = document.getElementById("phoneInput")?.value || "";
  if (!phone.trim()) { alert("Enter phone number"); return; }
  config.location.phone = phone;

  const subtotal = config.items.reduce((sum,i)=>sum+i.price*i.qty,0);
  const total = subtotal + config.deliveryFee;

  // Prepare order object
  const orderData = {
    date: new Date().toLocaleDateString("en-GB"),
    items: config.items.map(i=>({name:i.name, quantity:i.qty, price:i.price})),
    subtotal, total,
    deliveryLocation: {...config.location},
    spiceLevel
  };

  // Save to Delivery page
  localStorage.setItem("orderDetails", JSON.stringify(orderData));

  // ======== Save to allOrders for Profile history (all items in one order, modern style) ========
  const userId = localStorage.getItem("profileTelephone");
  let allOrders = JSON.parse(localStorage.getItem("allOrders")) || {};
  allOrders[userId] = allOrders[userId] || [];
  allOrders[userId].unshift({
    date: new Date().toLocaleDateString("en-GB"),
    items: config.items.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.qty,
      description: ""
    }))
  });
  localStorage.setItem("allOrders", JSON.stringify(allOrders));

  // ======== Update loyalty points ========
 const userTelephone = localStorage.getItem("profileTelephone");
const userPointsKey = `userPoints_${userTelephone}`;
let points = Number(localStorage.getItem(userPointsKey)) || 0;
points += Math.floor(subtotal*10); // 10 points per dollar
localStorage.setItem(userPointsKey, points);
  // Clear cart
  localStorage.removeItem("customizedOrder"); config.items=[];
  document.getElementById("citySelect").value=""; 
  document.getElementById("districtSelect").innerHTML='<option value="">Select a District</option>';
  document.getElementById("addressInput").value="";
  document.getElementById("phoneInput").value="";
  renderCart(); updateTotal(); updateLocationDisplay();

  console.log(`Order placed! You earned ${Math.floor(subtotal*10)} points.`);
  window.location.href="../Delivery-Page/Delivery.html";
}

function continueShopping() { window.location.href="../Customize-Page/Customized.html"; }

// INITIALIZE
document.addEventListener("DOMContentLoaded",()=>{ loadCustomizedOrder(); renderCart(); updateTotal(); setupErrorListeners(); setupMobileMenu(); });
function setupMobileMenu(){ const hamburger=document.getElementById("hamburger-menu"); const sidebar=document.getElementById("sidebar-nav"); const overlay=document.getElementById("sidebar-overlay"); const closeBtn=document.getElementById("sidebar-close"); function openSidebar(){sidebar.classList.add("open"); overlay.classList.add("show"); document.body.classList.add("no-scroll");} function closeSidebar(){sidebar.classList.remove("open"); overlay.classList.remove("show"); document.body.classList.remove("no-scroll");} if(hamburger)hamburger.addEventListener("click",openSidebar); if(closeBtn)closeBtn.addEventListener("click",closeSidebar); if(overlay)overlay.addEventListener("click",closeSidebar);}

// Hamburger Menu
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