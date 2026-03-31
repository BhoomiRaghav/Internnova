let isLogin = true;

// ================= TOGGLE =================
function toggleMode() {
  isLogin = !isLogin;

  document.getElementById("title").innerText =
    isLogin ? "Student Login 👨‍🎓" : "Student Register 📝";

  document.getElementById("mainBtn").innerText =
    isLogin ? "Login" : "Register";

  document.getElementById("switchText").innerText =
    isLogin
      ? "Don't have an account? Register"
      : "Already have an account? Login";
}

// ================= MAIN =================
function handleAuth() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Fill all fields 😅");
    return;
  }

  let users = JSON.parse(localStorage.getItem("students")) || [];

  if (isLogin) {
    // LOGIN
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      alert("Invalid credentials ❌");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify({
      email,
      role: "student"
    }));

    window.location.href = "/Html/student.html";

  } else {
    // REGISTER
    const exists = users.find(u => u.email === email);

    if (exists) {
      alert("User already exists 😅");
      return;
    }

    users.push({ email, password });

    localStorage.setItem("students", JSON.stringify(users));

    alert("Account created 🚀");

    toggleMode();
  }
}