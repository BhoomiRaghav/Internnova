// ===== AUTH CHECK =====
const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user || user.role !== "student") {
  window.location.href = "/Html/auth.html";
}

// ===== DATA =====
let internships = JSON.parse(localStorage.getItem("companyJobs")) || [];
let appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];

const content = document.getElementById("content");
const title = document.getElementById("page-title");
const navItems = document.querySelectorAll(".nav-item");

// ===== SAVE =====
function saveData() {
  localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
}

// ===== TOAST =====
function showToast(msg) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = msg;

  document.getElementById("toast-container").appendChild(toast);

  setTimeout(() => toast.remove(), 2500);
}

// ===== NAVIGATION =====
navItems.forEach(item => {
  item.addEventListener("click", () => {
    navItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    const page = item.dataset.page;

    if (page === "dashboard") renderDashboard();
    if (page === "internships") renderInternships();
    if (page === "applications") renderApplications();
  });
});

// ===== EXPLORE =====
function goToExplore() {
  window.location.href = "/Html/explore.html";
}

// ===== DASHBOARD =====
function renderDashboard() {
  title.innerText = "Dashboard";

  content.innerHTML = `
    <div class="grid">

      <div class="card">
        <h3>📊 Applied Internships</h3>
        <p>${appliedJobs.length}</p>
      </div>

      <div class="card">
        <h3>💼 Total Internships</h3>
        <p>${internships.length}</p>
      </div>

      <div class="card">
        <h3>🚀 Quick Start</h3>
        <p>Explore internships and start applying now!</p>

        <div class="actions">
          <button class="explore-btn" onclick="goToExplore()">Explore</button>
        </div>
      </div>

    </div>
  `;
}

// ===== INTERNSHIPS =====
function renderInternships() {
  internships = JSON.parse(localStorage.getItem("companyJobs")) || [];

  title.innerText = "Internships";

  let html = `<div class="grid">`;

  if (internships.length === 0) {
    html += `<p>No internships available 😢</p>`;
  }

  internships.forEach((job, index) => {
    html += `
      <div class="card">
        <h3>${job.title}</h3>
        <p>${job.company}</p>
        <span class="tag">${job.location || "Remote"}</span>

        <div class="actions">
          <button class="explore-btn" onclick="goToExplore()">Explore</button>

          <button class="apply-btn" data-id="${index}">
            ${appliedJobs.includes(index) ? "Applied ✔" : "Apply"}
          </button>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  content.innerHTML = html;

  attachApplyEvents();
}

// ===== APPLY =====
function attachApplyEvents() {
  document.querySelectorAll(".apply-btn").forEach(btn => {
    btn.addEventListener("click", () => {

      const index = Number(btn.dataset.id);

      if (appliedJobs.includes(index)) {
        showToast("Already Applied 😅");
        return;
      }

      btn.innerText = "Applying...";

      setTimeout(() => {
        appliedJobs.push(index);
        saveData();

        let jobs = JSON.parse(localStorage.getItem("companyJobs")) || [];

        jobs[index].applicants = (jobs[index].applicants || 0) + 1;

        if (!jobs[index].applicantsList) {
          jobs[index].applicantsList = [];
        }

        jobs[index].applicantsList.push(user.name || "Student");

        localStorage.setItem("companyJobs", JSON.stringify(jobs));

        showToast("Application Submitted 🚀");

        renderInternships();
      }, 500);
    });
  });
}

// ===== APPLICATIONS =====
function renderApplications() {
  title.innerText = "Applications";

  let html = `<div class="grid">`;

  if (appliedJobs.length === 0) {
    html += `<p>No applications 😢</p>`;
  } else {
    appliedJobs.forEach(index => {
      const job = internships[index];

      html += `
        <div class="card">
          <h3>${job.title}</h3>
          <p>${job.company}</p>
          <span class="tag">Applied</span>
        </div>
      `;
    });
  }

  html += `</div>`;
  content.innerHTML = html;
}

// ===== INIT =====
renderDashboard();

// ===== LOGOUT =====
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "/Html/auth.html";
}