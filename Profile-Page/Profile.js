// ======== PROFILE PAGE SCRIPT (FULL FIXED VERSION) ========


// Load user info
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (localStorage.getItem("isLoggedIn") !== "true" || !currentUser) {
  window.location.href = "login.html";
}
// User info
const userTelephone = localStorage.getItem("profileTelephone") || currentUser.telephone;
const userPointsKey = `userPoints_${userTelephone}`;
let userPoints = localStorage.getItem(userPointsKey);
if (userPoints === null) {
  userPoints = 0;
  localStorage.setItem(userPointsKey, userPoints);
}
const user = {
  name: localStorage.getItem("profileName") || currentUser.name,
  telephone: userTelephone,
  points: Number(userPoints),
};

// Load favorites stored from Order page
let allFavorites = JSON.parse(localStorage.getItem("favorites")) || [];


let favoritesCombo = allFavorites.filter(f => !f.hasDrink);

// ======== HISTORY DATA ========
const userId = user.telephone;
let allOrders = JSON.parse(localStorage.getItem("allOrders")) || {};
let userOrders = allOrders[userId] || [];

// ======== DISPLAY USER INFO ========
document.getElementById("userPoints").textContent = user.points;
document.getElementById("displayUserName").textContent = user.name;
if (document.getElementById("displayUserTelephone")) {
  document.getElementById("displayUserTelephone").textContent = user.telephone;
}

function renderFavorites() {

  const favoriteComboList = document.getElementById("favoriteComboList");
  
  favoriteComboList.innerHTML = "";

  favoritesCombo.forEach(item => {
    const card = document.createElement("div");
    card.className = "dish-card";
    card.innerHTML = `
      <div class="dish-thumb"><img src="${item.image}" alt="${item.name}"></div>
      <div class="dish-info"><h4>${item.name}</h4><p>${item.description}</p></div>
      <div class="dish-actions"><span class="dish-price">$${item.price}</span>
      </div>
    `;
    favoriteComboList.appendChild(card);
  });
}

function orderFavorite(id, hasDrink) {
  let item = hasDrink
    ? favoritesWithDrink.find(f => f.id === id)
    : favoritesCombo.find(f => f.id === id);
  if (!item) return;

  addPointsFromPurchase(item.price);
  addItemToHistory(new Date().toLocaleDateString("en-GB"), { ...item });
  renderHistory();

  console.log("loyaltyMessage", `${item.name} ordered successfully. You earned ${item.price*10} points.`, "success");
}

// ======== LOYALTY POINTS ========
function addPointsFromPurchase(price) {
  const earned = Math.floor(price*10);
  user.points += earned;
  localStorage.setItem(userPointsKey, user.points);
  document.getElementById("userPoints").textContent = user.points;
  updateProgress();
}

const redeemedRewardsKey = `redeemedRewards_${userTelephone}`;
let redeemedRewards = JSON.parse(localStorage.getItem(redeemedRewardsKey)) || [];
if (localStorage.getItem(redeemedRewardsKey) === null) {
  localStorage.setItem(redeemedRewardsKey, JSON.stringify(redeemedRewards));
}

function redeemReward(pointsRequired, rewardName) {
  if (user.points >= pointsRequired) {
    user.points -= pointsRequired;
    localStorage.setItem(userPointsKey, user.points);

    // Track redeemed rewards
    redeemedRewards.push({ name: rewardName, date: new Date().toLocaleDateString("en-GB") });
    localStorage.setItem(redeemedRewardsKey, JSON.stringify(redeemedRewards));

    document.getElementById("userPoints").textContent = user.points;
    updateProgress();
    renderRedeemedRewards();
  }
}

function renderRedeemedRewards() {
  const box = document.getElementById("redeemedRewardsBox");
  const list = document.getElementById("redeemedRewardsList");

  if (!redeemedRewards.length) {
    box.style.display = "none";
    return;
  }

  box.style.display = "block";
  list.innerHTML = "";

  redeemedRewards.forEach(reward => {
    const li = document.createElement("li");
    li.textContent = `${reward.name} — Redeemed on ${reward.date}`;
    list.appendChild(li);
  });
}

// Call this on page load to persist rewards
renderRedeemedRewards();

function updateProgress() {
  const max = 600;
  const percent = Math.min((user.points/max)*100, 100);
  document.getElementById("progressBar").style.width = percent + "%";
}

function showMessage(id, text, type) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.className = `message ${type}`;
}


// ======== HISTORY FUNCTIONS ========
function addItemToHistory(date, item) {
  userOrders.unshift({ date, items: [item] });
  allOrders[userId] = userOrders;
  localStorage.setItem("allOrders", JSON.stringify(allOrders));
}

function renderHistory() {
  const container = document.getElementById("historyContainer");
  container.innerHTML = "";
  userOrders.forEach(order => {
    const wrapper = document.createElement("div");
    wrapper.className = "history-group";
    wrapper.style.background = "#fff";
    wrapper.style.borderRadius = "18px";
    wrapper.style.boxShadow = "0 4px 18px rgba(0,0,0,0.08)";
    wrapper.style.marginBottom = "24px";
    wrapper.style.padding = "24px";
    wrapper.style.border = "1.5px solid #f2f2f2";

    let itemsHTML = `<table class='history-table' style='width:100%;border-collapse:separate;border-spacing:0 8px;'>\n<tr style='background:#f7f7f7;'><th style='padding:12px 10px;border:none;text-align:left;font-weight:700;color:#e60d0d;font-size:16px;'>Name</th><th style='padding:12px 10px;border:none;text-align:center;font-weight:700;color:#e60d0d;font-size:16px;'>Quantity</th><th style='padding:12px 10px;border:none;text-align:right;font-weight:700;color:#e60d0d;font-size:16px;'>Price</th></tr>`;

    order.items.forEach(item => {
      itemsHTML += `
        <tr style="background:#fafbfc;border-radius:12px;box-shadow:0 1px 4px rgba(230,13,13,0.04);">
          <td style='padding:14px 10px;border:none;border-radius:12px 0 0 12px;font-size:15px;'>${item.name}</td>
          <td style='padding:14px 10px;text-align:center;border:none;font-size:15px;'>${item.quantity || item.qty || 1}</td>
          <td style='padding:14px 10px;text-align:right;border:none;font-size:15px;color:#e60d0d;font-weight:600;'>$${item.price}</td>
        </tr>
      `;
    });
    itemsHTML += "</table>";

    wrapper.innerHTML = `<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;"><span style='display:inline-block;width:8px;height:8px;background:#e60d0d;border-radius:50%;'></span><h3 class=\"history-date\" style=\"margin:0;font-size:18px;font-weight:700;color:#222;\">${order.date}</h3></div>${itemsHTML}`;
    container.appendChild(wrapper);
  });
}
// ======== PROFILE EDIT ========
const editProfileBtn = document.getElementById("editProfileBtn");
if(editProfileBtn) editProfileBtn.addEventListener("click", showProfileEditBox);
function showProfileEditBox() {
  const existingBox = document.getElementById("profileEditBox");
  if (existingBox) existingBox.remove();
  const overlay = document.createElement("div");
  overlay.id = "profileEditOverlay";
  overlay.style.position="fixed";
  overlay.style.left="0"; overlay.style.top="0";
  overlay.style.width="100vw"; overlay.style.height="100vh";
  overlay.style.background="rgba(0,0,0,0.35)";
  overlay.style.zIndex="9998";

  const box=document.createElement("div");
  box.id="profileEditBox"; box.style.position="fixed";
  box.style.left="50%"; box.style.top="50%";
  box.style.transform="translate(-50%,-50%)";
  box.style.width="90%"; box.style.maxWidth="420px";
  box.style.background="#fff"; box.style.borderRadius="18px";
  box.style.zIndex="9999"; box.style.padding="28px";
  box.style.boxShadow="0 8px 25px rgba(0,0,0,0.15)";
  box.style.border="2px solid #e60d0d";

  box.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;">
      <h2 style="color:#e60d0d;font-size:24px;">Edit Profile</h2>
      <button id="profileEditClose" style="background:none;border:none;font-size:28px;color:#e60d0d;cursor:pointer;">&times;</button>
    </div>
    <input id="profileEditInput" type="text" value="${user.name}" placeholder="Name"
      style="width:100%;padding:14px;margin-bottom:14px;border-radius:12px;border:2px solid #e0e0e0;outline:none;font-size:16px;" />
    <input id="profileEditTel" type="tel" value="${user.telephone}" placeholder="Telephone"
      style="width:100%;padding:14px;margin-bottom:14px;border-radius:12px;border:2px solid #e0e0e0;outline:none;font-size:16px;" />
    <div style="display:flex;gap:12px;">
      <button id="profileEditSave" style="flex:1;background:#e60d0d;color:#fff;border:none;padding:12px;border-radius:25px;font-weight:700;cursor:pointer;">Save</button>
      <button id="profileEditCancel" style="flex:1;background:#fff;color:#e60d0d;border:2px solid #e60d0d;padding:12px;border-radius:25px;font-weight:700;cursor:pointer;">Cancel</button>
    </div>
    <div id="profileEditError" style="color:#e60d0d;font-size:14px;margin-top:12px;text-align:center;"></div>
  `;
  document.body.appendChild(overlay); document.body.appendChild(box);

  document.getElementById("profileEditClose").onclick = closeEditBox;
  document.getElementById("profileEditCancel").onclick = closeEditBox;
  overlay.onclick = closeEditBox;

  document.getElementById("profileEditSave").onclick = function() {
    const newName = document.getElementById("profileEditInput").value.trim();
    const newTel = document.getElementById("profileEditTel").value.trim();
    const errorBox = document.getElementById("profileEditError");

    if(!newName){ errorBox.textContent="Name cannot be empty."; return; }
    if(!/^\d{8,15}$/.test(newTel)){ errorBox.textContent="Telephone must be 8-15 digits."; return; }

    user.name=newName; user.telephone=newTel;
    savedAccount.name=user.name; savedAccount.telephone=user.telephone;
    localStorage.setItem("userAccount",JSON.stringify(savedAccount));
    localStorage.setItem("profileName",user.name);
    localStorage.setItem("profileTelephone",user.telephone);

    document.getElementById("displayUserName").textContent=user.name;
    document.getElementById("displayUserTelephone").textContent=user.telephone;
    closeEditBox();
  };
  function closeEditBox(){ overlay.remove(); box.remove(); }
}

// ======== LOGOUT ========
const logoutBtn = document.getElementById("logoutBtn");
if(logoutBtn) logoutBtn.addEventListener("click",()=>{ localStorage.removeItem("isLoggedIn"); window.location.href="login.html"; });

// ======== INITIALIZE ========
renderFavorites();
renderHistory();
updateProgress();

// ======== TABS ========
document.querySelectorAll(".tab-btn").forEach(btn=>{
  btn.addEventListener("click",()=> {
    const target=btn.dataset.tab;
    document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c=>c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});