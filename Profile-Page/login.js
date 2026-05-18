const authForm = document.getElementById("authForm");
const messageBox = document.getElementById("loginMessage");

const switchMode = document.getElementById("switchMode");
const switchText = document.getElementById("switchText");

const formTitle = document.getElementById("formTitle");
const formSubtitle = document.getElementById("formSubtitle");
const submitBtn = document.getElementById("submitBtn");

const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const togglePassword = document.getElementById("togglePassword");


let isSignup = false;

window.addEventListener("load", function () {
  const needMsg = localStorage.getItem("needLoginMessage");

  if (needMsg) {
    showMessage(needMsg, "error");
    localStorage.removeItem("needLoginMessage");
  }

  authForm.reset();
  document.getElementById("name").value = "";
  document.getElementById("telephone").value = "";
  passwordInput.value = "";
  confirmPasswordInput.value = "";
});

function setMode(signup) {
  isSignup = signup;
  document.body.classList.toggle("signup-mode", isSignup);

  formTitle.textContent = isSignup ? "Create Account" : "Login";
  formSubtitle.textContent = isSignup
    ? "Create your account and start ordering hotpot."
    : "Welcome back! Login to continue your hotpot order.";

  submitBtn.innerHTML = isSignup
    ? `<i class="fa-solid fa-user-plus"></i> Signup`
    : `<i class="fa-solid fa-right-to-bracket"></i> Login`;

  switchText.textContent = isSignup
    ? "Already have an account?"
    : "Don’t have an account?";

  switchMode.textContent = isSignup ? "Login here" : "Create account";

  messageBox.textContent = "";
  messageBox.className = "login-message";
  authForm.reset();
}

switchMode.addEventListener("click", function (e) {
  e.preventDefault();
  setMode(!isSignup);
});

togglePassword.addEventListener("click", function () {
  const isPassword = passwordInput.type === "password";

  passwordInput.type = isPassword ? "text" : "password";
  confirmPasswordInput.type = isPassword ? "text" : "password";

  togglePassword.classList.toggle("fa-eye");
  togglePassword.classList.toggle("fa-eye-slash");
});

authForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const telephone = document.getElementById("telephone").value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  messageBox.className = "login-message";

  if (!name || !telephone || !password) {
    showMessage("Please fill in all fields.", "error");
    return;
  }

  if (!/^\d{8,15}$/.test(telephone)) {
    showMessage("Telephone must be 8-15 digits.", "error");
    return;
  }

  if (password.length < 4) {
    showMessage("Password must be at least 4 characters.", "error");
    return;
  }

  if (isSignup) {
    signupUser(name, telephone, password, confirmPassword);
  } else {
    loginUser(telephone, password);
  }
});

function signupUser(name, telephone, password, confirmPassword) {
  if (!confirmPassword) {
    showMessage("Please confirm your password.", "error");
    return;
  }

  if (password !== confirmPassword) {
    showMessage("Passwords do not match.", "error");
    return;
  }

  let accounts = JSON.parse(localStorage.getItem("userAccounts")) || [];
  if (accounts.some(acc => acc.telephone === telephone)) {
    showMessage("Telephone already registered.", "error");
    return;
  }
  const newUser = { name, telephone, password };
  accounts.push(newUser);
  localStorage.setItem("userAccounts", JSON.stringify(accounts));
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("currentUser", JSON.stringify(newUser));
  localStorage.setItem("profileName", name);
  localStorage.setItem("profileTelephone", telephone);
  showMessage("Signup successful! Redirecting...", "success");
  setTimeout(() => { goAfterLogin(); }, 800);
}

function loginUser(telephone, password) {
  let accounts = JSON.parse(localStorage.getItem("userAccounts")) || [];
  const found = accounts.find(acc => acc.telephone === telephone && acc.password === password);
  if (!found) {
    showMessage("Phone number or password is incorrect.", "error");
    return;
  }
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("currentUser", JSON.stringify(found));
  localStorage.setItem("profileName", found.name);
  localStorage.setItem("profileTelephone", found.telephone);
  showMessage("Login successful! Redirecting...", "success");
  setTimeout(() => { goAfterLogin(); }, 800);
}
function goAfterLogin() {
  const redirectPage = localStorage.getItem("redirectAfterLogin");

  if (redirectPage) {
    localStorage.removeItem("redirectAfterLogin");
    window.location.href = redirectPage;
  } else {
    window.location.href = "Profile.html";
  }
}
function showMessage(text, type) {
  messageBox.textContent = text;
  messageBox.className = `login-message ${type}`;
}