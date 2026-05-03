const savedAccount = JSON.parse(localStorage.getItem("userAccount"));

if (localStorage.getItem("isLoggedIn") !== "true" || !savedAccount) {
  window.location.href = "login.html";
}

const user = {
  name: localStorage.getItem("profileName") || savedAccount.name,
  telephone: localStorage.getItem("profileTelephone") || savedAccount.telephone,
  points: Number(localStorage.getItem("userPoints")) || 100,
};

const favoritesWithDrink = [
  {
    id: 1,
    name: "Chicken Level 1 + Fanta",
    description: "A tasty chicken combo with a refreshing drink for a quick and flavorful meal.",
    foodImage: "https://i.pinimg.com/1200x/e1/90/c0/e190c08406cb54ec478bbad3223667b6.jpg",
    drinkImage: "https://i.pinimg.com/1200x/53/6e/55/536e559b6d784a681d90b2435c170211.jpg",
    price: 4,
  },
  {
    id: 2,
    name: "Pork Very Spicy + Sting",
    description: "A bold and spicy pork set with a drink for members who love strong flavors.",
    foodImage: "https://i.pinimg.com/736x/e0/cd/4a/e0cd4a1b7f9e0d6dff561835ae0db1b1.jpg",
    drinkImage: "https://i.pinimg.com/736x/1f/67/de/1f67de5198b37d2be98deaebaeb4bd93.jpg",
    price: 4,
  },
];

const favoritesCombo = [
  {
    id: 3,
    name: "Normal Spicy Combo",
    description: "Classic spicy combo with rich flavor and a balanced hotpot experience.",
    image: "https://i.pinimg.com/1200x/6d/9a/64/6d9a6472f9e89d6d5ac382a28e0a6c1a.jpg",
    price: 2.5,
  },
  {
    id: 4,
    name: "Tofu Spicy Combo",
    description: "A lighter and delicious tofu option with warm broth and soft texture.",
    image: "https://i.pinimg.com/1200x/b2/df/bc/b2dfbc145b1c302a6788730e5be875e3.jpg",
    price: 2.5,
  },
  {
    id: 5,
    name: "Beef Spicy Combo",
    description: "Tender beef in a spicy combo set for a hearty and satisfying order.",
    image: "https://i.pinimg.com/1200x/43/2d/e5/432de54ec5bc1dc2fee349bf2797e44e.jpg",
    price: 3.5,
  },
];

let orderHistory = [
  {
    date: "02/04/2026",
    items: [
      {
        name: "Chicken Level 1 + Fanta",
        description: "A tasty chicken combo with drink.",
        foodImage: "https://i.pinimg.com/736x/0d/d4/fa/0dd4fa0ff40b279ed4625ae1036d5c60.jpg",
        drinkImage: "https://i.pinimg.com/1200x/53/6e/55/536e559b6d784a681d90b2435c170211.jpg",
        price: 4,
      },
    ],
  },
  {
    date: "05/04/2026",
    items: [
      {
        name: "Beef Spicy Combo",
        description: "Tender beef combo with spicy taste.",
        image: "https://i.pinimg.com/736x/94/40/72/944072154a3647df2c922202c89c5946.jpg",
        price: 3.5,
      },
    ],
  },
];

document.getElementById("userPoints").textContent = user.points;
document.getElementById("displayUserName").textContent = user.name;

if (document.getElementById("displayUserTelephone")) {
  document.getElementById("displayUserTelephone").textContent = user.telephone;
}

renderFavorites();
renderHistory();
updateProgress();

/* Tabs */
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((tab) => tab.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

/* Edit profile */
const editProfileBtn = document.getElementById("editProfileBtn");

if (editProfileBtn) {
  editProfileBtn.addEventListener("click", showProfileEditBox);
}

function showProfileEditBox() {
  const existingBox = document.getElementById("profileEditBox");
  if (existingBox) existingBox.remove();

  const overlay = document.createElement("div");
  overlay.id = "profileEditOverlay";
  overlay.style.position = "fixed";
  overlay.style.left = "0";
  overlay.style.top = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.background = "rgba(0, 0, 0, 0.35)";
  overlay.style.zIndex = "9998";

  const box = document.createElement("div");
  box.id = "profileEditBox";
  box.style.position = "fixed";
  box.style.left = "50%";
  box.style.top = "50%";
  box.style.transform = "translate(-50%, -50%)";
  box.style.width = "90%";
  box.style.maxWidth = "420px";
  box.style.background = "#ffffff";
  box.style.borderRadius = "18px";
  box.style.zIndex = "9999";
  box.style.padding = "28px";
  box.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
  box.style.border = "2px solid #e60d0d";

  box.innerHTML = `
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

  document.body.appendChild(overlay);
  document.body.appendChild(box);

  document.getElementById("profileEditClose").onclick = closeEditBox;
  document.getElementById("profileEditCancel").onclick = closeEditBox;
  overlay.onclick = closeEditBox;

  document.getElementById("profileEditSave").onclick = function () {
    const newName = document.getElementById("profileEditInput").value.trim();
    const newTel = document.getElementById("profileEditTel").value.trim();
    const errorBox = document.getElementById("profileEditError");

    if (!newName) {
      errorBox.textContent = "Name cannot be empty.";
      return;
    }

    if (!/^\d{8,15}$/.test(newTel)) {
      errorBox.textContent = "Telephone must be 8-15 digits.";
      return;
    }

    user.name = newName;
    user.telephone = newTel;

    savedAccount.name = user.name;
    savedAccount.telephone = user.telephone;

    localStorage.setItem("userAccount", JSON.stringify(savedAccount));
    localStorage.setItem("profileName", user.name);
    localStorage.setItem("profileTelephone", user.telephone);

    document.getElementById("displayUserName").textContent = user.name;
    document.getElementById("displayUserTelephone").textContent = user.telephone;

    closeEditBox();
  };

  function closeEditBox() {
    overlay.remove();
    box.remove();
  }
}

/* Logout */
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
  });
}

/* Loyalty */
const demoAddPointsBtn = document.getElementById("demoAddPoints");

if (demoAddPointsBtn) {
  demoAddPointsBtn.addEventListener("click", function () {
    const samplePrice = 5;
    const today = getTodayDate();

    const demoItem = {
      name: "Demo Hotpot Purchase",
      description: "Demo purchase added for testing loyalty points.",
      image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500&q=80",
      price: samplePrice,
    };

    addPointsFromPurchase(samplePrice);
    addItemToHistory(today, demoItem);
    renderHistory();

    showMessage(
      "loyaltyMessage",
      `Demo purchase added. You earned ${samplePrice * 10} points.`,
      "success"
    );
  });
}

function addPointsFromPurchase(price) {
  const earnedPoints = Math.floor(price * 10);
  user.points += earnedPoints;

  localStorage.setItem("userPoints", user.points);
  document.getElementById("userPoints").textContent = user.points;

  updateProgress();
}

function redeemReward(requiredPoints, rewardName) {
  if (user.points >= requiredPoints) {
    user.points -= requiredPoints;

    localStorage.setItem("userPoints", user.points);
    document.getElementById("userPoints").textContent = user.points;

    updateProgress();

    showMessage(
      "loyaltyMessage",
      `You successfully redeemed: ${rewardName}`,
      "success"
    );
  } else {
    showMessage(
      "loyaltyMessage",
      `You do not have enough points for ${rewardName}.`,
      "error"
    );
  }
}

function updateProgress() {
  const maxTarget = 600;
  const percent = Math.min((user.points / maxTarget) * 100, 100);
  document.getElementById("progressBar").style.width = `${percent}%`;
}

function showMessage(elementId, text, type) {
  const box = document.getElementById(elementId);
  box.textContent = text;
  box.className = `message ${type}`;
}

/* Favorites */
function renderFavorites() {
  const favoriteDrinkList = document.getElementById("favoriteDrinkList");
  const favoriteComboList = document.getElementById("favoriteComboList");

  favoriteDrinkList.innerHTML = "";
  favoriteComboList.innerHTML = "";

  favoritesWithDrink.forEach((item) => {
    const card = document.createElement("div");
    card.className = "dish-card with-drink";

    card.innerHTML = `
      <div class="dish-thumb">
        <img src="${item.foodImage}" alt="${item.name}">
      </div>
      <div class="dish-thumb">
        <img src="${item.drinkImage}" alt="${item.name}">
      </div>
      <div class="dish-info">
        <h4>${item.name}</h4>
        <p>${item.description}</p>
      </div>
      <div class="dish-actions">
        <span class="dish-price">$${item.price}</span>
        <button class="btn btn-primary" onclick="orderFavorite(${item.id}, true)">Order now</button>
      </div>
    `;

    favoriteDrinkList.appendChild(card);
  });

  favoritesCombo.forEach((item) => {
    const card = document.createElement("div");
    card.className = "dish-card";

    card.innerHTML = `
      <div class="dish-thumb">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="dish-info">
        <h4>${item.name}</h4>
        <p>${item.description}</p>
      </div>
      <div class="dish-actions">
        <span class="dish-price">$${item.price}</span>
        <button class="btn btn-primary" onclick="orderFavorite(${item.id}, false)">Order now</button>
      </div>
    `;

    favoriteComboList.appendChild(card);
  });
}

function orderFavorite(id, hasDrink) {
  let item = null;

  if (hasDrink) {
    item = favoritesWithDrink.find((entry) => entry.id === id);
  } else {
    item = favoritesCombo.find((entry) => entry.id === id);
  }

  if (!item) return;

  addPointsFromPurchase(item.price);
  addItemToHistory(getTodayDate(), { ...item });
  renderHistory();

  alert(`${item.name} ordered successfully. You earned ${item.price * 10} points.`);
}

/* History */
function addItemToHistory(date, item) {
  const existingGroup = orderHistory.find((group) => group.date === date);

  if (existingGroup) {
    existingGroup.items.unshift(item);
  } else {
    orderHistory.unshift({
      date,
      items: [item],
    });
  }
}

function renderHistory() {
  const historyContainer = document.getElementById("historyContainer");
  historyContainer.innerHTML = "";

  orderHistory.forEach((group) => {
    const wrapper = document.createElement("div");
    wrapper.className = "history-group";

    let itemsHTML = "";

    group.items.forEach((item) => {
      if (item.foodImage && item.drinkImage) {
        itemsHTML += `
          <div class="dish-card with-drink">
            <div class="dish-thumb">
              <img src="${item.foodImage}" alt="${item.name}">
            </div>
            <div class="dish-thumb">
              <img src="${item.drinkImage}" alt="${item.name}">
            </div>
            <div class="dish-info">
              <h4>${item.name}</h4>
              <p>${item.description}</p>
            </div>
            <div class="dish-actions">
              <span class="dish-price">$${item.price}</span>
            </div>
          </div>
        `;
      } else {
        const imageSrc = item.image || item.foodImage || "";

        itemsHTML += `
          <div class="dish-card">
            <div class="dish-thumb">
              <img src="${imageSrc}" alt="${item.name}">
            </div>
            <div class="dish-info">
              <h4>${item.name}</h4>
              <p>${item.description}</p>
            </div>
            <div class="dish-actions">
              <span class="dish-price">$${item.price}</span>
            </div>
          </div>
        `;
      }
    });

    wrapper.innerHTML = `
      <h3 class="history-date">Date: ${group.date}</h3>
      <div class="dish-list">${itemsHTML}</div>
    `;

    historyContainer.appendChild(wrapper);
  });
}

function getTodayDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
}