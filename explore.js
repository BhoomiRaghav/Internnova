let chartInstance = null;

const container = document.getElementById("exploreContainer");
const searchInput = document.getElementById("searchInput");

// ================= DATA =================
let baseInternships = [
  { title: "Frontend Intern", company: "Google", applicants: 120 },
  { title: "Backend Intern", company: "Amazon", applicants: 80 },
  { title: "UI/UX Intern", company: "Adobe", applicants: 40 }
];

let companyJobs = JSON.parse(localStorage.getItem("companyJobs")) || [];

let internships = [...baseInternships, ...companyJobs];
let filteredData = [...internships];

// ================= DEMAND =================
function getDemand(applicants) {
  if (applicants > 100) return "high";
  if (applicants > 50) return "medium";
  return "low";
}

// ================= REDIRECT =================
function goToDetails(index) {
  localStorage.setItem("selectedJob", JSON.stringify(filteredData[index]));
  window.location.href = "/Html/internship-detail.html";
}

// ================= RENDER =================
function render(data) {
  container.innerHTML = "";

  data.forEach((job, index) => {
    const demand = getDemand(job.applicants || 0);

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${job.title}</h3>
      <p class="company">${job.company}</p>

      <p class="${demand}">Demand: ${demand.toUpperCase()}</p>
      <div class="bar ${demand}"></div>

      <button class="btn" onclick="goToDetails(${index})">
        View Details 🚀
      </button>
    `;

    container.appendChild(div);
  });

  updateChart(data);
}

// ================= FILTER =================
function filterData(type) {
  if (type === "all") {
    filteredData = internships;
  } else {
    filteredData = internships.filter(job => getDemand(job.applicants || 0) === type);
  }

  render(filteredData);
}

// ================= SEARCH =================
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const result = filteredData.filter(job =>
    job.title.toLowerCase().includes(value) ||
    job.company.toLowerCase().includes(value)
  );

  render(result);
});

// ================= CHART =================
function updateChart(data) {
  const ctx = document.getElementById("demandChart");

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.map(j => j.title),
      datasets: [{
        label: "Applicants",
        data: data.map(j => j.applicants || 0)
      }]
    }
  });
}

// INIT
render(internships);