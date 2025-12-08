// =====================
//  USER LOGIN HANDLING
// =====================

let userEmail = localStorage.getItem("loggedInUser");

if (!userEmail) {
  window.location.href = "index.html"; // not logged in
}

// =====================
//   SECTION TOGGLE
// =====================

const allBtn = document.getElementById("allMatchesBtn");
const myBtn = document.getElementById("myMatchesBtn");
const contactBtn = document.getElementById("contactUsBtn");

const allSec = document.getElementById("allMatchesSection");
const mySec = document.getElementById("myMatchesSection");
const contactSec = document.getElementById("contactInfo");

allBtn.onclick = () => {
  allSec.style.display = "block";
  mySec.style.display = "none";
  contactSec.style.display = "none";
};

myBtn.onclick = () => {
  allSec.style.display = "none";
  mySec.style.display = "block";
  contactSec.style.display = "none";
};

contactBtn.onclick = () => {
  allSec.style.display = "none";
  mySec.style.display = "none";
  contactSec.style.display = "block";
};

// Logout
document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
};

// =====================
//   LOAD MATCHES
// =====================

function loadMatches() {
  let matches = JSON.parse(localStorage.getItem("matches")) || [];
  let approvals = JSON.parse(localStorage.getItem("approvals")) || {};

  let allMatches = document.getElementById("matchesList");
  let myMatchesList = document.getElementById("myMatchesList");

  allMatches.innerHTML = "";
  myMatchesList.innerHTML = "";

  matches.forEach((m, i) => {
    let btnText = "Register";
    let btnDisabled = false;

    if (approvals[userEmail] === "pending_" + m.matchId) {
      btnText = "Pending…";
      btnDisabled = true;
    }

    if (approvals[userEmail] === "approved_" + m.matchId) {
      btnText = "Approved";
      btnDisabled = true;
    }

    // ALL MATCHES CARD
    let card = document.createElement("div");
    card.className = "match-card";

    card.innerHTML = `
      <h3>${m.name}</h3>
      <p><b>ID:</b> ${m.matchId}</p>
      <p><b>Entry Fee:</b> ${m.entryFee}</p>
      <p><b>Prize:</b> ${m.prize}</p>
      <p><b>Date:</b> ${m.date}</p>
      <p><b>Time:</b> ${m.time}</p>

      <button 
        onclick="registerMatch(${i})"
        ${btnDisabled ? "disabled" : ""}
      >
        ${btnText}
      </button>
    `;

    allMatches.appendChild(card);

    // IF APPROVED → SHOW IN MY MATCHES
    if (approvals[userEmail] === "approved_" + m.matchId) {
      let myCard = document.createElement("div");
      myCard.className = "match-card";

      myCard.innerHTML = `
        <h3>${m.name}</h3>
        <p><b>Date:</b> ${m.date}</p>
        <p><b>Time:</b> ${m.time}</p>

        <h4>Room Details</h4>
        <p><b>Room ID:</b> ${m.roomId}</p>
        <p><b>Password:</b> ${m.password}</p>
      `;

      myMatchesList.appendChild(myCard);
    }
  });
}

// =====================
//   REGISTER MATCH
// =====================

function registerMatch(index) {
  let matches = JSON.parse(localStorage.getItem("matches")) || [];
  let approvals = JSON.parse(localStorage.getItem("approvals")) || {};

  let match = matches[index];

  approvals[userEmail] = "pending_" + match.matchId;
  localStorage.setItem("approvals", JSON.stringify(approvals));

  alert("Registration sent! Wait for admin approval.");
  loadMatches();
}

// =====================
//  INITIAL LOAD
// =====================

window.onload = () => {
  loadMatches();
  allSec.style.display = "block";
  mySec.style.display = "none";
  contactSec.style.display = "none";
};
