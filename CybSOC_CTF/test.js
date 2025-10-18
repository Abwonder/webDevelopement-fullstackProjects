// Data storage
let participants = JSON.parse(localStorage.getItem("ctfParticipants")) || [];
let results = JSON.parse(localStorage.getItem("ctfResults")) || [];

// DOM Elements
const messageEl = document.getElementById("message");
const registrationForm = document.getElementById("registrationForm");
const participantsTableBody = document.getElementById("participantsTableBody");
const resultsTableBody = document.getElementById("resultsTableBody");
const searchInput = document.getElementById("searchInput");
const resultsSearch = document.getElementById("resultsSearch");
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");
const navLinks = document.querySelectorAll(".nav-bar a");

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  loadParticipantsTable();
  loadResultsTable();
  setupEventListeners();
});

// Set up event listeners
function setupEventListeners() {
  // Form submission
  registrationForm.addEventListener("submit", handleRegistration);

  // Tab switching
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });

  // Navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
            // Only handle links that have data-tab attribute (tab links)
    if (link.dataset.tab) {
      e.preventDefault();
      switchTab(link.dataset.tab);

        // Update active nav link
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  });

  // Search functionality
  searchInput.addEventListener("input", filterParticipants);
  resultsSearch.addEventListener("input", filterResults);
}

// Switch between tabs
function switchTab(tabName) {
  // Hide all tab contents
  tabContents.forEach((content) => {
    content.classList.remove("active");
  });

  // Show selected tab content
  document.getElementById(tabName).classList.add("active");

  // Update active tab
  tabs.forEach((tab) => {
    tab.classList.remove("active");
    if (tab.dataset.tab === tabName) {
      tab.classList.add("active");
    }
  });
}

// Handle registration form submission
function handleRegistration(e) {
  e.preventDefault();

  const teamName = document.getElementById("teamName").value;
  const captainName = document.getElementById("captainName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const members = document
    .getElementById("members")
    .value.split(",")
    .map((m) => m.trim());

  // Check if team already exists
  if (participants.some((p) => p.teamName === teamName)) {
    showMessage("Team with this name already exists!", "error");
    return;
  }

  // Create new participant
  const newParticipant = {
    id: Date.now().toString(),
    teamName,
    captainName,
    email,
    phone,
    members,
    defenceScore: 0,
    attackScore: 0,
    uptime: "0%",
    totalScore: 0,
  };

  // Add to participants and results
  participants.push(newParticipant);
  results.push({ ...newParticipant });

  // Save to localStorage
  localStorage.setItem("ctfParticipants", JSON.stringify(participants));
  localStorage.setItem("ctfResults", JSON.stringify(results));

  // Update tables
  loadParticipantsTable();
  loadResultsTable();

  // Show success message
  showMessage(`Team "${teamName}" registered successfully!`, "success");

  // Reset form
  registrationForm.reset();

  // Switch to participants tab
  switchTab("participants");

  // Update active nav link
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.dataset.tab === "participants") {
      link.classList.add("active");
    }
  });
}

// Load participants table
function loadParticipantsTable() {
  participantsTableBody.innerHTML = "";

  if (participants.length === 0) {
    participantsTableBody.innerHTML =
      '<tr><td colspan="6" style="text-align: center;">No participants registered yet.</td></tr>';
    return;
  }

  participants.forEach((participant) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${participant.teamName}</td>
                    <td>${participant.captainName}</td>
                    <td>${participant.email}</td>
                    <td>${participant.phone}</td>
                    <td>${participant.members.join(", ")}</td>
                    <td class="actions">
                        <button class="btn btn-danger btn-sm" onclick="deleteParticipant('${
                          participant.id
                        }')">Delete</button>
                    </td>
                `;
    participantsTableBody.appendChild(row);
  });
}

// Load results table
function loadResultsTable() {
  resultsTableBody.innerHTML = "";

  if (results.length === 0) {
    resultsTableBody.innerHTML =
      '<tr><td colspan="6" style="text-align: center;">No results available yet.</td></tr>';
    return;
  }

  // Sort by total score (descending)
  const sortedResults = [...results].sort(
    (a, b) => b.totalScore - a.totalScore
  );

  sortedResults.forEach((result) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${result.teamName}</td>
                    <td>
                        <input type="number" value="${result.defenceScore}" 
                               onchange="updateScore('${result.id}', 'defenceScore', this.value)" 
                               style="width: 60px; padding: 5px;">
                    </td>
                    <td>
                        <input type="number" value="${result.attackScore}" 
                               onchange="updateScore('${result.id}', 'attackScore', this.value)" 
                               style="width: 60px; padding: 5px;">
                    </td>
                    <td>
                        <input type="text" value="${result.uptime}" 
                               onchange="updateScore('${result.id}', 'uptime', this.value)" 
                               style="width: 80px; padding: 5px;">
                    </td>
                    <td>${result.totalScore}</td>
                    <td class="actions">
                        <button class="btn btn-danger btn-sm" onclick="deleteResult('${result.id}')">Delete</button>
                    </td>
                `;
    resultsTableBody.appendChild(row);
  });
}

// Update score
function updateScore(id, field, value) {
  const resultIndex = results.findIndex((r) => r.id === id);
  if (resultIndex !== -1) {
    results[resultIndex][field] =
      field === "uptime" ? value : parseInt(value) || 0;

    // Recalculate total score
    if (field === "defenceScore" || field === "attackScore") {
      results[resultIndex].totalScore =
        results[resultIndex].defenceScore + results[resultIndex].attackScore;
    }

    localStorage.setItem("ctfResults", JSON.stringify(results));
    loadResultsTable();
    showMessage("Score updated successfully!", "success");
  }
}

// Delete participant
function deleteParticipant(id) {
  if (confirm("Are you sure you want to delete this participant?")) {
    participants = participants.filter((p) => p.id !== id);
    results = results.filter((r) => r.id !== id);

    localStorage.setItem("ctfParticipants", JSON.stringify(participants));
    localStorage.setItem("ctfResults", JSON.stringify(results));

    loadParticipantsTable();
    loadResultsTable();
    showMessage("Participant deleted successfully!", "success");
  }
}

// Delete result
function deleteResult(id) {
  if (confirm("Are you sure you want to delete this result?")) {
    results = results.filter((r) => r.id !== id);
    localStorage.setItem("ctfResults", JSON.stringify(results));
    loadResultsTable();
    showMessage("Result deleted successfully!", "success");
  }
}

// Filter participants
function filterParticipants() {
  const searchTerm = searchInput.value.toLowerCase();
  const rows = participantsTableBody.getElementsByTagName("tr");

  for (let row of rows) {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(searchTerm) ? "" : "none";
  }
}

// Filter results
function filterResults() {
  const searchTerm = resultsSearch.value.toLowerCase();
  const rows = resultsTableBody.getElementsByTagName("tr");

  for (let row of rows) {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(searchTerm) ? "" : "none";
  }
}

// Show message
function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
  messageEl.style.display = "block";

  setTimeout(() => {
    messageEl.style.display = "none";
  }, 5000);
}
