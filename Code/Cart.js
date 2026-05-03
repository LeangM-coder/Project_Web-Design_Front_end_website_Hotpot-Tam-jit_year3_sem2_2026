/* ===== Shared Cart Logic (localStorage) ===== */

function getCart() {
  try {
    return JSON.parse(localStorage.getItem('hotpot-cart') || '[]');
  } catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem('hotpot-cart', JSON.stringify(cart));
}

function addToCart(id, name, price) {
  const cart = getCart();
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
  saveCart(cart);
  updateBadge();
}

function updateBadge() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.quantity, 0);
  const badge = document.getElementById('cart-badge');
  if (badge) {
    if (total > 0) {
      badge.style.display = 'flex';
      badge.textContent = total;
    } else {
      badge.style.display = 'none';
    }
  }
}

// Init badge on every page load
document.addEventListener('DOMContentLoaded', updateBadge);