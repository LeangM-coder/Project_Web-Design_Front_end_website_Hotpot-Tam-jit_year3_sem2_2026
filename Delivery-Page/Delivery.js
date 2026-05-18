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
    "Please login or signup first"
  );

  window.location.replace("../Profile-Page/login.html");
  throw new Error("User not logged in");
}

(() => {
  const progressEl = document.getElementById("myProgress");
  const timerEl = document.getElementById("timer");
  const messageEl = document.getElementById("delivery-progress-message");
  const afterPayEl = document.getElementById("after-pay");

  if (!progressEl || !timerEl || !messageEl || !afterPayEl) {
    return;
  }
  const ordersEl = document.getElementById("orders");
  const summaryValueEls = document.querySelectorAll(".summary .summary-value");
  const totalAmountEl = document.querySelector(".grand-total .amount");
  const TAX_RATE = 0.08;
  const DELIVERY_FEE = 2.5;

  function toNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
  }

  function money(value) {
    return `$${toNumber(value).toFixed(2)}`;
  }

  function normalizeItem(rawItem) {
    if (!rawItem || typeof rawItem !== "object") return null;

    const name = String(rawItem.name ?? rawItem.itemName ?? rawItem.title ?? "").trim();
    if (!name) return null;

    const quantity = Math.max(1, Math.round(toNumber(rawItem.quantity ?? rawItem.qty ?? 1)));
    const unitPrice = toNumber(rawItem.price ?? rawItem.unitPrice ?? rawItem.amount);
    return { name, quantity, unitPrice };
  }

  function normalizeOrder(rawOrder, index) {
    const itemsSource = Array.isArray(rawOrder?.items)
      ? rawOrder.items
      : Array.isArray(rawOrder)
      ? rawOrder
      : null;
    if (!itemsSource || !itemsSource.length) return null;

    const items = itemsSource.map(normalizeItem).filter(Boolean);
    if (!items.length) return null;

    const orderName = String(
      rawOrder?.name ?? rawOrder?.title ?? rawOrder?.orderName ?? `Order #${index + 1}`
    );
    return { orderName, items };
  }

  function normalizeFromObjectMap(rawData) {
    const entries = Object.values(rawData);
    const items = entries.map(normalizeItem).filter(Boolean);
    return items.length ? [{ orderName: "Order #1", items }] : [];
  }

  function parseReceiptData() {
    // First, try to load from orderDetails (from cart page)
    try {
      const orderDetailsRaw = localStorage.getItem("orderDetails");
      if (orderDetailsRaw) {
        const orderDetails = JSON.parse(orderDetailsRaw);
        if (orderDetails.items && Array.isArray(orderDetails.items) && orderDetails.items.length > 0) {
          return [{
            orderName: "Order #1",
            items: orderDetails.items.map(item => ({
              name: item.name || "",
              quantity: item.quantity || 1,
              unitPrice: item.price || 0
            }))
          }];
        }
      }
    } catch (_error) {
      // Ignore and continue
    }

    const storageKeys = [
      "deliveryReceipt",
      "checkoutReceipt",
      "orderData",
      "hotpotOrder",
      "cartItems",
      "orderItems",
      "receiptItems",
      "selectedOrder",
    ];

    for (const key of storageKeys) {
      const raw = localStorage.getItem(key) ?? sessionStorage.getItem(key);
      if (!raw) continue;

      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const maybeOrders = parsed
            .map((entry, index) => normalizeOrder(entry, index))
            .filter(Boolean);
          if (maybeOrders.length) return maybeOrders;

          const items = parsed.map(normalizeItem).filter(Boolean);
          if (items.length) return [{ orderName: "Order #1", items }];
        } else if (parsed && typeof parsed === "object") {
          const normalizedOrders = normalizeOrder(parsed, 0);
          if (normalizedOrders) return [normalizedOrders];

          const ordersFromMap = normalizeFromObjectMap(parsed);
          if (ordersFromMap.length) return ordersFromMap;
        }
      } catch (_error) {
        // Ignore invalid JSON and continue with next storage key.
      }
    }

    return [];
  }

  function readExistingReceiptFromDom() {
    if (!ordersEl) return [];

    const orderNodes = Array.from(ordersEl.querySelectorAll(".order"));
    return orderNodes
      .map((orderNode, index) => {
        const orderTitleNode = orderNode.querySelector(".order-title");
        const itemNodes = Array.from(orderNode.querySelectorAll("li"));
        const items = itemNodes
          .map((itemNode) => {
            const name = itemNode.querySelector(".item-name")?.textContent?.trim() ?? "";
            const priceRaw = itemNode.querySelector(".price")?.textContent?.replace("$", "") ?? "0";
            const unitPrice = toNumber(priceRaw);
            if (!name) return null;
            return { name, quantity: 1, unitPrice };
          })
          .filter(Boolean);

        if (!items.length) return null;
        return {
          orderName: orderTitleNode?.textContent?.trim() || `Order #${index + 1}`,
          items,
        };
      })
      .filter(Boolean);
  }

  function renderReceipt(orders) {
    if (!ordersEl) return;
    ordersEl.innerHTML = "";

    let subtotal = 0;

    orders.forEach((order) => {
      const orderTotal = order.items.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0
      );
      subtotal += orderTotal;

      const orderCard = document.createElement("div");
      orderCard.className = "order";

      const heading = document.createElement("h3");
      const titleSpan = document.createElement("span");
      titleSpan.className = "order-title";
      titleSpan.textContent = order.orderName;

      const totalSpan = document.createElement("span");
      totalSpan.className = "order-total-price";
      totalSpan.textContent = money(orderTotal);

      heading.appendChild(titleSpan);
      heading.appendChild(totalSpan);
      orderCard.appendChild(heading);

      const ul = document.createElement("ul");
      order.items.forEach((item) => {
        const li = document.createElement("li");

        const nameSpan = document.createElement("span");
        nameSpan.className = "item-name";
        nameSpan.textContent =
          item.quantity > 1 ? `${item.name} x${item.quantity}` : item.name;

        const priceSpan = document.createElement("span");
        priceSpan.className = "price";
        priceSpan.textContent = money(item.unitPrice * item.quantity);

        li.appendChild(nameSpan);
        li.appendChild(priceSpan);
        ul.appendChild(li);
      });

      orderCard.appendChild(ul);
      ordersEl.appendChild(orderCard);
    });

    // Use orderDetails for accurate totals if available
    const orderDetails = JSON.parse(localStorage.getItem("orderDetails") || "{}");
    let deliveryFee = DELIVERY_FEE;
    let total = subtotal + DELIVERY_FEE;

    if (orderDetails.deliveryFee !== undefined) {
      deliveryFee = orderDetails.deliveryFee;
    }
    if (orderDetails.total !== undefined) {
      total = orderDetails.total;
    } else if (orderDetails.subtotal !== undefined) {
      total = orderDetails.subtotal + deliveryFee;
    }

    if (summaryValueEls.length >= 2) {
      summaryValueEls[0].textContent = money(subtotal);
      summaryValueEls[1].textContent = money(deliveryFee);
    }
    if (totalAmountEl) totalAmountEl.textContent = money(total);
  }

  const TOTAL_SECONDS = 300;
  let remaining = TOTAL_SECONDS;
  let countdownId = null;

  progressEl.max = TOTAL_SECONDS;
  progressEl.value = 0;

  const receiptOrders = parseReceiptData();
  renderReceipt(receiptOrders.length ? receiptOrders : readExistingReceiptFromDom());

  // Load and display delivery location from cart page
  const orderDetails = JSON.parse(localStorage.getItem("orderDetails") || "{}");
  if (orderDetails.deliveryLocation) {
    let deliveryLocationText = `${orderDetails.deliveryLocation.city} → ${orderDetails.deliveryLocation.district}`;
    if (orderDetails.deliveryLocation.address) {
      deliveryLocationText += `, ${orderDetails.deliveryLocation.address}`;
    }
    const csLocationEl = document.getElementById("cs-location");
    if (csLocationEl) {
      csLocationEl.textContent = deliveryLocationText;
    }
  }



  function tickCountdown() {
    if (remaining <= 0) {
      timerEl.textContent = "0:00";
      progressEl.value = TOTAL_SECONDS;
      messageEl.textContent =
        "Delivery complete — your hot pot has arrived. Enjoy!";
      messageEl.classList.add("delivery-progress-message--done");
      afterPayEl.classList.add("after-pay--complete");
      if (countdownId !== null) {
        clearInterval(countdownId);
        countdownId = null;
      }
      return;
    }

    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    timerEl.textContent = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    progressEl.value = TOTAL_SECONDS - remaining;

    remaining--;
  }

  function startDeliveryCountdown() {
    if (countdownId !== null) {
      clearInterval(countdownId);
      countdownId = null;
    }
    messageEl.classList.remove("delivery-progress-message--done");
    afterPayEl.classList.remove("after-pay--complete");
    messageEl.textContent =
      "Your order is being prepared and is on the way to you.";
    remaining = TOTAL_SECONDS;
    progressEl.value = 0;
    progressEl.max = TOTAL_SECONDS;
    tickCountdown();
    countdownId = window.setInterval(tickCountdown, 1000);
  }

  // Auto-start delivery countdown on page load
  startDeliveryCountdown();
})();

// Mobile Menu Setup
function setupMobileMenu() {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const sidebarNav = document.getElementById("sidebar-nav");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const sidebarClose = document.getElementById("sidebar-close");

  if (!hamburgerMenu || !sidebarNav || !sidebarOverlay || !sidebarClose) {
    return;
  }

  // Open sidebar
  hamburgerMenu.addEventListener("click", () => {
    sidebarNav.classList.add("open");
    sidebarOverlay.classList.add("show");
    document.body.classList.add("no-scroll");
  });

  // Close sidebar
  const closeSidebar = () => {
    sidebarNav.classList.remove("open");
    sidebarOverlay.classList.remove("show");
    document.body.classList.remove("no-scroll");
  };

  sidebarClose.addEventListener("click", closeSidebar);
  sidebarOverlay.addEventListener("click", closeSidebar);

  // Close sidebar when a link is clicked
  const sidebarLinks = sidebarNav.querySelectorAll("a");
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", closeSidebar);
  });
}

document.addEventListener("DOMContentLoaded", setupMobileMenu);
