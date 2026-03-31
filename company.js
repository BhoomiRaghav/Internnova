const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user || user.role !== "company") {
  window.location.href = "/Html/auth.html";
}

const container = document.getElementById("jobsContainer");

let jobs = JSON.parse(localStorage.getItem("companyJobs")) || [];

// ================= STATS =================
function updateStats() {
  document.getElementById("totalJobs").innerText = jobs.length;

  let totalApplicants = jobs.reduce((sum, job) => {
    return sum + (job.applicants || 0);
  }, 0);

  document.getElementById("totalApplicants").innerText = totalApplicants;
}

// ================= NAV =================
function goToPost() {
  window.location.href = "/Html/company-post.html";
}

function goToExplore() {
  window.location.href = "/Html/explore.html";
}

// ================= VIEW APPLICANTS =================
function viewApplicants(index) {
  const applicants = jobs[index].applicantsList || [];

  alert(applicants.length === 0 ? "No applicants 😴" : applicants.join("\n"));
}

// ================= DELETE =================
function deleteJob(index) {
  if (!confirm("Delete this job?")) return;

  jobs.splice(index, 1);
  localStorage.setItem("companyJobs", JSON.stringify(jobs));
  render();
}

// ================= RENDER =================
function render() {
  container.innerHTML = "";

  jobs.forEach((job, index) => {
    const div = document.createElement("div");
    div.className = "job-card";

    div.innerHTML = `
      <h3>${job.title}</h3>
      <p>${job.company}</p>
      <p>Applicants: ${job.applicants || 0}</p>

      <button onclick="viewApplicants(${index})">View 👀</button>
      <button onclick="deleteJob(${index})" style="background:red;color:white;">Delete ❌</button>
    `;

    container.appendChild(div);
  });

  updateStats();
}

render();

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "/Html/auth.html";
}