(() => {
  const yl = document.getElementById("yourlocation");
  const s = document.getElementById("hide-switch");
  const c = document.getElementById("hide-continue");
  const progressEl = document.getElementById("myProgress");
  const timerEl = document.getElementById("timer");
  const messageEl = document.getElementById("delivery-progress-message");
  const afterPayEl = document.getElementById("after-pay");

  if (!yl || !s || !c || !progressEl || !timerEl || !messageEl || !afterPayEl) {
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

    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + DELIVERY_FEE;
    if (summaryValueEls.length >= 3) {
      summaryValueEls[0].textContent = money(subtotal);
      summaryValueEls[1].textContent = money(tax);
      summaryValueEls[2].textContent = money(DELIVERY_FEE);
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

  yl.onclick = () => {
    yl.style.display = "none";
    s.style.display = "block";
    c.style.display = "block";
    document.getElementById("cs-location").textContent =
      "12155 Russian Federation Blvd (110), Phnom Penh";
    document.getElementById("default").style.display = "none";
    document.getElementById("map2").style.display = "block";
  };

  s.onclick = () => {
    document.getElementById("cs-location").textContent =
      "កុយទាវ ១៩៨៦ កែង ១០០៣, HVFM+RG6, Mengdy Europe Gas Bus Stop, Street 1986, Phnom Penh";
    document.getElementById("default").style.display = "none";
    document.getElementById("map1").style.display = "block";
    document.getElementById("map2").style.display = "none";
  };

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

  c.onclick = () => {
    document.getElementById("after-pay").style.display = "block";
    c.style.display = "none";
    s.style.display = "none";
    startDeliveryCountdown();
  };
})();
