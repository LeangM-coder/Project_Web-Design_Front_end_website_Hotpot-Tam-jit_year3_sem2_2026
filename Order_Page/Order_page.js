

let selectedCategory = "Proteins";
let selectedSpice = "None";

let cart = [];

const items = {
  Proteins: [
    { name: "Slice Beef", price: 2.5, img: "https://external-preview.redd.it/bought-a-meat-slicer-to-cut-paper-thin-slices-what-cut-of-v0-4F5_fSPXvyon4cGS99wW1wLFzCkeqfCIUcPDOrbtpYI.jpg?auto=webp&s=f3e42b2030b95ab96f0490bec71b94001a6c9234" },
    { name: "Fresh Shrimp", price: 2.5, img: "https://img06.weeecdn.com/product/image/682/347/19C75F52C31659E8.png" },
    { name: "Lamb Slice", price: 2.5, img: "https://old.ploma.io/cdn/shop/products/mugifuji-premium-single-rib-thin-sliced-pork-belly-approx-1-2lb-meateggs-811_1024x1024.jpg?v=164439897" },
    { name: "Fish Fillet", price: 2.5, img: "https://www.kksbbq.com/wp-content/uploads/2020/06/sliced-black.png" },
  ],

  Vegetables: [
    { name: "Bok Choy", price: 2.5, img: "https://5.imimg.com/data5/SELLER/Default/2021/2/HU/VI/PW/3640922/bok-choy-500x500.jpeg" },
    { name: "Mix Mushroom", price: 2.5, img: "https://images.deliveryhero.io/image/fd-kh/Products/3677646.jpg?width=%s" },
    { name: "Sweet Corn", price: 2.5, img: "https://images.deliveryhero.io/image/fd-kh/Products/3545635.jpg?width=%sg" },
    { name: "Spinach", price: 2.5, img: "https://c.ndtvimg.com/2025-08/o5ms8a4g_sweet-corn-benefits_625x300_10_August_25.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=738" },
  ],

  Noodles: [
    { name: "Udon Noodles", price: 2.5, img: "https://lh5.googleusercontent.com/proxy/HyecXOrXDCIXhf56e8JNKWjV55okd4Rj3Yhpca6aFuj0FAUK8fS8xOnSuB4p39agTEF_2_1ZOB7Uen8xvZ-H4sEKEHELhVeXhu618dVDJkpdgA" },
    { name: "Rice Noodles", price: 2.5, img: "https://ecoapp.asia/image/catalog/Seller_532/60-20230912195519.%20%E1%9E%98%E1%9E%B8%E1%9E%9F%E1%9E%BD%E1%9E%9A.jpg" },
    { name: "Glass Noodles", price: 2.5, img: "https://img.freepik.com/premium-photo/top-view-flat-lay-udon-noodle-isolated-white-background_121658-169.jpg" },
  ],

  Drinks: [
    { name: "Cola", price: 2.5, img: "https://www.foodpanda.com.kh/en/shop/ynoy/chip-mong-supermarket-371/category/5ead3ec0-03a9-4398-9a50-f4bf00d33eff" },
    { name: "Pepsi", price: 2.5, img: "https://www.google.com/search?q=pepsi&sca_esv=687f1037b7fe1874&biw=1571&bih=874&udm=2&sxsrf=ANbL-n4zbvF1imxkIsIQJZxeS13S5iV2Iw%3A1777800658809&ei=0hX3admQMeTRwcsPn6P5qAs&oq=pe&gs_lp=Egtnd3Mtd2l6LWltZyICcGUqAggAMgcQIxjJAhgnMgcQIxjJAhgnMgoQABiABBiKBRhDMgoQABiABBiKBRhDMgoQABiABBiKBRhDMgsQABiABBixAxiDATINEAAYgAQYigUYQxixAzIEEAAYAzIIEAAYgAQYsQMyCxAAGIAEGLEDGIMBSI4XUPwFWP4HcAF4AJABAJgBRqABgAGqAQEyuAEByAEA-AEBmAIDoAKQAagCCsICChAjGMkCGOoCGCfCAg4QABiABBiKBRixAxiDAcICBRAAGIAEmAMDkgcBM6AHlQyyBwEyuAeNAcIHBTAuMS4yyAcMgAgB&sclient=gws-wiz-img#sv=CAMSVhoyKhBlLXp1M1Q2SlVGOEhsNWVNMg56dTNUNkpVRjhIbDVlTToOMzdMVXc3YVdjVjdOdU0gBCocCgZtb3NhaWMSEGUtenUzVDZKVUY4SGw1ZU0YADABGAcg7aXiyQ9KCBABGAEgASgB" },
    { name: "Sprite", price: 2.5, img: "https://www.google.com/search?q=sprite&sca_esv=687f1037b7fe1874&biw=1571&bih=874&udm=2&sxsrf=ANbL-n6yjeu9awjC4PKOghxZKPIIx2VbZA%3A1777800684084&ei=7BX3aaHnBIa6seMP1rzJ2QI&oq=sprite&gs_lp=Egtnd3Mtd2l6LWltZyIGc3ByaXRlKgIIADIHECMYyQIYJzIHECMYyQIYJzIKEAAYgAQYigUYQzIKEAAYgAQYigUYQzIKEAAYgAQYigUYQzIKEAAYgAQYigUYQzIKEAAYgAQYigUYQzIKEAAYgAQYigUYQzIKEAAYgAQYigUYQzIFEAAYgARIxR9QwgFY3w9wAXgAkAEAmAFsoAHYA6oBAzUuMbgBAcgBAPgBAZgCB6AC-wOoAgrCAgoQIxjJAhjqAhgnwgINEAAYgAQYigUYQxixA8ICEBAAGIAEGIoFGEMYsQMYgwHCAg8QABiABBgKGAsYsQMYgwGYAwaSBwM2LjGgB58lsgcDNS4xuAf0A8IHBTAuMi41yAcYgAgB&sclient=gws-wiz-img#sv=CAMSVhoyKhBlLU9JNnc3aXN4RGpxc2FNMg5PSTZ3N2lzeERqcXNhTToONUNJa3FxVE9wUmpBWE0gBCocCgZtb3NhaWMSEGUtT0k2dzdpc3hEanFzYU0YADABGAcgwfXC6AZKCBABGAEgASgB" },
    { name: "Water", price: 2.5, img: "https://www.google.com/search?q=provida&sca_esv=687f1037b7fe1874&biw=1571&bih=874&udm=2&sxsrf=ANbL-n4MXQyPz58FTj7N-eirCMXX1guz1w%3A1777800790298&ei=Vhb3afv0EayxwcsP8tqVmAM&ved=0ahUKEwj799iE6JyUAxWsWHADHXJtBTMQ4dUDCBI&uact=5&oq=provida&gs_lp=Egtnd3Mtd2l6LWltZyIHcHJvdmlkYTIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgARI-iVQ0AVYnCJwAngAkAEAmAFWoAHjBaoBAjExuAEDyAEA-AEBmAINoAKlBqgCCsICBxAjGMkCGCfCAgYQABgHGB7CAg0QABiABBiKBRhDGLEDwgIKEAAYgAQYigUYQ8ICChAjGMkCGOoCGCfCAhAQABiABBiKBRhDGLEDGIMBwgILEAAYgAQYsQMYgwHCAggQABiABBixA5gDBIgGAZIHAjEzoAeVQLIHAjExuAecBsIHBjAuMS4xMsgHMIAIAQ&sclient=gws-wiz-img#sv=CAMSVhoyKhBlLUxFT3RiN01IR21rcFFNMg5MRU90YjdNSEdta3BRTToOYjljczF1c1ZKZWVNOE0gBCocCgZtb3NhaWMSEGUtTEVPdGI3TUhHbWtwUU0YADABGAcgs4vtvg9KCBABGAEgASgB" },
  ]
};

function selectSpice(level, btn) {
  selectedSpice = level;
  document.getElementById("spiceSelected").innerText = level;
  document.getElementById("spiceDisplay").style.display = "block"; // 👈 add this

  document.querySelectorAll(".spice-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
}
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