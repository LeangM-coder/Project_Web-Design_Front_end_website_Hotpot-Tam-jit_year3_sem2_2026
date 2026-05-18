// Product Database
/* ===== PROTECT PAGE ===== */
const savedUser = JSON.parse(localStorage.getItem("userAccount"));
const loggedIn = localStorage.getItem("isLoggedIn");

if (
  loggedIn !== "true" ||
  !savedUser ||
  !savedUser.telephone ||
  !savedUser.password
) {
  localStorage.removeItem("isLoggedIn");
  localStorage.setItem(
    "needLoginMessage",
    "🔒 Please login or signup first to access this page."
  );

  window.location.replace("../Profile-Page/login.html");
  throw new Error("User not logged in");
}


const products = {
  soup: [
    { id: 1, name: "Spicy Soup (Mala)", price: 1, img: "https://scontent.fpnh5-3.fna.fbcdn.net/v/t39.30808-6/482005704_122157380612341154_4748074162503351107_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFvdn_pk48CHtdvbeJcJljoC-Svbv1YHIQL5K9u_VgchCrVvaAUZkZu3-SxMxludw7Hc-hOwospBlvYQWGH4ZTQ&_nc_ohc=SdnNkIq_tR8Q7kNvwGog254&_nc_oc=AdpfhHuq2rG09sBo-bViWF6vw-80RGU9mlOUz6rd_DVR8qJ7gO-U_M2PfPRpM4VRXmc&_nc_zt=23&_nc_ht=scontent.fpnh5-3.fna&_nc_gid=h27oup0hkH4urzmw3-sDOg&_nc_ss=7b2a8&oh=00_Af7tjfmo4X1GDUTtzCYnG9XIb_VuFnV37H-MvUO6bPZ9cg&oe=6A109AEE" },
    { id: 2, name: "Mushroom Soup", price: 0, img: "https://scontent.fpnh5-4.fna.fbcdn.net/v/t39.30808-6/481283095_122157380510341154_6859230267415973262_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFSDssCgE0rd-lLSj5Tstw_rvBXbh6cJFeu8FduHpwkV9xu00i642RD-Cfx8ache_P7q8kDl3Dzildfu8wAThBh&_nc_ohc=8IXyHzbHpeMQ7kNvwGZot48&_nc_oc=Adruv6LRSx0Q1I8TS-IkB53AVJq-xsdvG5eX4YDbx5LtS5Eq3NLiEOnEOaD3lyQ8dQw&_nc_zt=23&_nc_ht=scontent.fpnh5-4.fna&_nc_gid=JEzg2tEbIzdnmYvfNHQKmQ&_nc_ss=7b2a8&oh=00_Af798ui6nD3ynNbtdwOZPuNSDXLZBTYiVy1pUh4sO7G9Hw&oe=6A109B06" },
    { id: 3, name: "Tomato Soup", price: 0, img: "https://scontent.fpnh5-3.fna.fbcdn.net/v/t39.30808-6/481991053_122157380354341154_160429234310505275_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEwDqdjNuQ_lTiMyldQwJL3WulUvkjWc-Fa6VS-SNZz4Ucq-01Nir1oqZh9AU7cNuIQ5MS80xlpmP0deWhUmdBs&_nc_ohc=nlTQAEYYHCoQ7kNvwG8tFtz&_nc_oc=AdpDWu792I9Uji8hFkC_ESculP-N27BrJIyTd2xQnCdh2hIZ4_dH067cBpxRLtrCRt4&_nc_zt=23&_nc_ht=scontent.fpnh5-3.fna&_nc_gid=8rs6dYJWT59fm4gL_PSw5g&_nc_ss=7b2a8&oh=00_Af7on8UK2zPkZwB_tQwRLCdAhUfwArHFtuNea7Nk9nruGw&oe=6A10940B" },
    { id: 4, name: "Chicken Soup", price: 1, img: "https://scontent.fpnh5-4.fna.fbcdn.net/v/t39.30808-6/481945746_122157380570341154_3767922222067674424_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF5kNLQB4S7nlSQJQhvce9Opx4JZta8DAWnHglm1rwMBZ0HfDE6-FtjsOYVn3pcgey2IPhCRVCP2v8MmZ96vh_V&_nc_ohc=np3P448C-QgQ7kNvwHvWKNE&_nc_oc=AdqYe3AtWnPYYA1lppPssRzsDFC5mZHhgIU5OAKE7U3MogMAi-AEhvvoYWzBJxJrOO4&_nc_zt=23&_nc_ht=scontent.fpnh5-4.fna&_nc_gid=ge5XsqR5_SRPC1Va3T1YLA&_nc_ss=7b2a8&oh=00_Af5uFRTJRGIzwB1iKQSZ55CW5JgNTUUnjWLS7_-qPn-vXQ&oe=6A10CA93" },
    { id: 6, name: "Corn Soup", price: 0, img: "https://scontent.fpnh5-6.fna.fbcdn.net/v/t39.30808-6/481699136_122157380468341154_3768520505934257803_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF7C-trcluwu1B6PrPZ-VusDpXWsEdlvngOldawR2W-eDyUfZgRthtn9gA-TBKg0065f8ttwgdjtZctrl8e9C8L&_nc_ohc=BNO2hQA6vL0Q7kNvwGHKYdE&_nc_oc=AdrTAsoP55tISMfTIMYxlC-Ob8fzNwr0zqc9JIaB0_i5rIJAsRw2UesdKvxlT-6daVQ&_nc_zt=23&_nc_ht=scontent.fpnh5-6.fna&_nc_gid=O_ZnVCqO4_Xx2OB8rz9M-g&_nc_ss=7b2a8&oh=00_Af71BDK7OIUaQ0DIQONLqA6xN7QjVrbrPEniXV9iXLaq8g&oe=6A10C736" },
  ],
  meat: [
    { id: 7, name: "Beef Slices", price: 1, img: "https://external-preview.redd.it/bought-a-meat-slicer-to-cut-paper-thin-slices-what-cut-of-v0-4F5_fSPXvyon4cGS99wW1wLFzCkeqfCIUcPDOrbtpYI.jpg?auto=webp&s=f3e42b2030b95ab96f0490bec71b94001a6c9234" },
    { id: 8, name: "Lamb Slices", price: 1, img: "https://img06.weeecdn.com/product/image/682/347/19C75F52C31659E8.png" },
    { id: 9, name: "Pork Slices", price: 0.5, img: "https://old.ploma.io/cdn/shop/products/mugifuji-premium-single-rib-thin-sliced-pork-belly-approx-1-2lb-meateggs-811_1024x1024.jpg?v=164439897" },
    { id: 10, name: "Black Chicken Slices", price: 1, img: "https://www.kksbbq.com/wp-content/uploads/2020/06/sliced-black.png" },
    { id: 11, name: "Shrimp", price: 1, img: "https://static.vecteezy.com/system/resources/previews/008/066/908/large_2x/raw-shrimp-on-white-plate-with-mint-leaf-and-wooden-background-for-cooking-close-up-fresh-shrimps-or-prawns-seafood-shelfish-free-photo.JPG " },
    { id: 12, name: "Beef Meatball", price: 0.5, img: "https://i.ytimg.com/vi/zzEaehrIXD4/sddefault.jpg" },
    { id: 13, name: "Cheese Meatball", price: 0.5, img: "https://images.deliveryhero.io/image/fd-kh/Products/2523255.jpg?width=%s" },
    { id: 14, name: "Dumpling", price: 0.25, img: "https://png.pngtree.com/png-vector/20240224/ourmid/pngtree-chinese-dumplings-in-plate-png-image_11872394.png"},
  ],
  vegetables: [
    { id: 15, name: "Bok Choy", price: 0.5, img: "https://5.imimg.com/data5/SELLER/Default/2021/2/HU/VI/PW/3640922/bok-choy-500x500.jpeg" },
    { id: 16, name: "Chinese Cabbage", price: 0.5, img: "https://static.vecteezy.com/system/resources/previews/008/701/691/large_2x/fresh-chinese-cabbage-put-on-a-red-plate-which-was-served-in-shabu-or-sukiyaki-restaurant-photo.jpg" },
    { id: 17, name: "Water Spinach", price: 0.5, img: "https://images.deliveryhero.io/image/fd-kh/Products/3545635.jpg?width=%s" },
    { id: 18, name: "Corn", price: 0.5, img: "https://c.ndtvimg.com/2025-08/o5ms8a4g_sweet-corn-benefits_625x300_10_August_25.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=738" },
    { id: 19, name: "Enoki Mushroom (big)", price: 0.5, img: "https://images.deliveryhero.io/image/fd-kh/Products/3677646.jpg?width=%s" },
    { id: 20, name: "Enoki Mushroom", price: 0.5, img: "https://images.deliveryhero.io/image/fd-kh/Products/3677591.jpg?width=%s" },
  ],
  noodles: [
    { id: 22, name: "Wheat Noodles", price: 0, img: "https://lh5.googleusercontent.com/proxy/HyecXOrXDCIXhf56e8JNKWjV55okd4Rj3Yhpca6aFuj0FAUK8fS8xOnSuB4p39agTEF_2_1ZOB7Uen8xvZ-H4sEKEHELhVeXhu618dVDJkpdgA" },
    { id: 23, name: "Glass Noodles", price: 0, img: "https://ecoapp.asia/image/catalog/Seller_532/60-20230912195519.%20%E1%9E%98%E1%9E%B8%E1%9E%9F%E1%9E%BD%E1%9E%9A.jpg" },
    { id: 25, name: "Udon", price: 0, img: "https://img.freepik.com/premium-photo/top-view-flat-lay-udon-noodle-isolated-white-background_121658-169.jpg" },
    { id: 26, name: "Instant Noodles", price: 2, img: "https://png.pngtree.com/png-clipart/20250104/original/pngtree-instant-noodles-close-up-png-image_19567365.png" },
  ],
};

const soupProductIds = new Set([1, 2, 3, 4, 6]);

// Order data
let orderItems = {};
let selectedSpiceLevel = "hot";

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  loadProducts("soup");
  setupMenuButtons();
  setupSpiceButtons();
  // Show spice level section by default since soup is loaded
  document.getElementById("spice-level-section").style.display = "block";
});

// Load products for selected category
function loadProducts(category) {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  const categoryProducts = products[category] || [];

  categoryProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    
    let imgHTML = "";
    if (product.img) {
      imgHTML = `<img src="${product.img}" alt="${product.name}" class="product-image">`;
    }
    
    card.innerHTML = `
      ${imgHTML}
      <h4 class="product-name">${product.name}</h4>
      <p class="product-price">$${product.price}</p>
      <button class="add-btn" onclick="addToOrder(${product.id}, '${product.name}', ${product.price})">
        <i class="fas fa-plus"></i>
      </button>
    `;
    container.appendChild(card);
  });
}

// Setup menu button click handlers
function setupMenuButtons() {
  const menuButtons = document.querySelectorAll(".menu-btn");
  const spiceLevelSection = document.getElementById("spice-level-section");

  menuButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all buttons
      menuButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      // Add active class to clicked button
      this.classList.add("active");

      // Load products for selected category
      const category = this.getAttribute("data-category");
      loadProducts(category);
      
      // Show spice level section only for soup category
      if (category === "soup") {
        spiceLevelSection.style.display = "block";
      } else {
        spiceLevelSection.style.display = "none";
      }
    });
  });
}

// Add item to order
function addToOrder(productId, productName, price) {
  if (soupProductIds.has(productId)) {
    Object.keys(orderItems).forEach((existingId) => {
      if (soupProductIds.has(Number(existingId))) {
        delete orderItems[existingId];
      }
    });

    orderItems[productId] = {
      name: productName,
      price: price,
      quantity: 1,
    };

    updateOrderSummary();
    return;
  }

  if (orderItems[productId]) {
    orderItems[productId].quantity++;
  } else {
    orderItems[productId] = {
      name: productName,
      price: price,
      quantity: 1,
    };
  }

  updateOrderSummary();
}

// Decrease item quantity from order
function removeFromOrder(productId) {
  if (!orderItems[productId]) {
    return;
  }

  if (orderItems[productId].quantity > 1) {
    orderItems[productId].quantity--;
  } else {
    delete orderItems[productId];
  }

  updateOrderSummary();
}

// Update order summary display
function updateOrderSummary() {
  const summaryItemsContainer = document.getElementById("summary-items");
  const totalPriceElement = document.getElementById("total-price");

  summaryItemsContainer.innerHTML = "";
  let total = 0;

  Object.entries(orderItems).forEach(([productId, item]) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const summaryItem = document.createElement("div");
    summaryItem.className = "summary-item";
    summaryItem.innerHTML = `
      <span class="item-name">${item.name}</span>
      <span class="item-qty">x${item.quantity}</span>
      <span class="item-price">$${itemTotal.toFixed(2)}</span>
      <button class="remove-item" onclick="removeFromOrder(${productId})"> − </button>
    `;
    summaryItemsContainer.appendChild(summaryItem);
  });

  totalPriceElement.textContent = "$" + total.toFixed(2);
}

// Setup spice level buttons
function setupSpiceButtons() {
  const spiceButtons = document.querySelectorAll(".spice-btn");

  spiceButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      spiceButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      // Add active class to clicked button
      this.classList.add("active");

      // Update selected spice level
      selectedSpiceLevel = this.getAttribute("data-level");
      
      // Update the spice level display in order summary
      const spiceLevelLabel = this.querySelector(".label").textContent;
      document.getElementById("selected-spice").textContent = spiceLevelLabel;
      
      console.log("Selected spice level:", selectedSpiceLevel);
    });
  });
}

// Navbar active state handling (existing code)
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    // Remove active class from all nav links
    navLinks.forEach((navLink) => {
      navLink.classList.remove("active");
    });

    // Add active class to clicked nav link
    this.classList.add("active");

    // Navigate to the href after a short delay
    setTimeout(() => {
      window.location.href = this.href;
    }, 100);
  });
});

// Example function after user clicks "Add to Cart" or "Confirm" in Customize page
function saveCustomizeOrder() {
  const userId = localStorage.getItem("profileTelephone");
  let allOrders = JSON.parse(localStorage.getItem("allOrders")) || {};
  allOrders[userId] = allOrders[userId] || [];

  // Build order object
  const customizeOrder = {
    date: new Date().toLocaleDateString("en-GB"),
    items: Object.values(orderItems).map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      foodImage: item.img || "",   // use product img if available
      drinkImage: "",
      description: ""
    })),
    subtotal: Object.values(orderItems).reduce((sum,i)=>sum+i.price*i.quantity,0),
    total: Object.values(orderItems).reduce((sum,i)=>sum+i.price*i.quantity,0),
    spiceLevel: selectedSpiceLevel
  };

  allOrders[userId].push(customizeOrder);
  localStorage.setItem("allOrders", JSON.stringify(allOrders));

  // Update loyalty points immediately
  let points = Number(localStorage.getItem("userPoints")) || 0;
  points += Math.floor(customizeOrder.subtotal * 10);
  localStorage.setItem("userPoints", points);

  alert(`Order added! You earned ${Math.floor(customizeOrder.subtotal*10)} points.`);
}