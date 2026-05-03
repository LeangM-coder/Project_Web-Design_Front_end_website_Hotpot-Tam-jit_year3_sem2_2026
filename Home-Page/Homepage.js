function isLoggedIn() {
  const user = JSON.parse(localStorage.getItem("userAccount"));
  return localStorage.getItem("isLoggedIn") === "true" && user;
}

function goProfilePage() {
  if (isLoggedIn()) {
    window.location.href = "../Profile-Page/Profile.html";
  } else {
    window.location.href = "../Profile-Page/login.html";
  }
}

document.querySelectorAll(".profile a, .sidebar a").forEach((link) => {
  const href = link.getAttribute("href");

  if (href && (href.includes("Profile.html") || href.includes("login.html"))) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      goProfilePage();
    });
  }
});

// Sidebar toggle for mobile
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