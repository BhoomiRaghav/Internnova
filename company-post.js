document.getElementById("jobForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const job = {
    title: document.getElementById("title").value,
    company: document.getElementById("company").value,
    duration: document.getElementById("duration").value,
    stipend: document.getElementById("stipend").value,
    perks: document.getElementById("perks").value,
    description: document.getElementById("description").value,
    contact: document.getElementById("contact").value,
    applicants: 0
  };

  let jobs = JSON.parse(localStorage.getItem("companyJobs")) || [];

  jobs.push(job);

  localStorage.setItem("companyJobs", JSON.stringify(jobs));

  alert("Internship Posted Successfully 🚀");

  window.location.href = "/Html/company.html";
});