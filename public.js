document.addEventListener("DOMContentLoaded", () => {
  // =====================
  //  USER LOGIN HANDLING
  // =====================
  let userEmail = localStorage.getItem("loggedInUser");
  if (!userEmail) {
    window.location.href = "index.html"; // not logged in
    return;
  }

  // =====================
  //  DOM ELEMENTS
  // =====================
  const allMatchesBtn = document.getElementById("allMatchesBtn");
  const myMatchesBtn = document.getElementById("myMatchesBtn");
  const contactUsBtn = document.getElementById("contactUsBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  const allMatchesSection = document.getElementById("allMatchesSection");
  const myMatchesSection = document.getElementById("myMatchesSection");
  const contactInfo = document.getElementById("contactInfo");

  const matchesList = document.getElementById("matchesList");
  const myMatchesList = document.getElementById("myMatchesList");

  // =====================
  //  SIDEBAR BUTTONS
  // =====================
  allMatchesBtn.addEventListener("click", () => {
    allMatchesSection.style.display = "block";
    myMatchesSection.style.display = "none";
    contactInfo.style.display = "none";
  });

  myMatchesBtn.addEventListener("click", () => {
    allMatchesSection.style.display = "none";
    myMatchesSection.style.display = "block";
    contactInfo.style.display = "none";
  });

  contactUsBtn.addEventListener("click", () => {
    allMatchesSection.style.display = "none";
    myMatchesSection.style.display = "none";
    contactInfo.style.display = "block";
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userType");
    window.location.href = "login.html";
  });

  // =====================
  //   LOAD MATCHES
  // =====================
  function loadMatches() {
    let matches = JSON.parse(localStorage.getItem("matches")) || [];
    let approvals = JSON.parse(localStorage.getItem("approvals")) || {};

    matchesList.innerHTML = "";
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

      // =====================
      //   ALL MATCHES CARD
      // =====================
      const card = document.createElement("div");
      card.className = "match-card";

      card.innerHTML = `
        <h3>${m.name}</h3>
        <p><b>ID:</b> ${m.matchId}</p>
        <p><b>Entry Fee:</b> ${m.entryFee}</p>
        <p><b>Prize:</b> ${m.prize}</p>
        <p><b>Date:</b> ${m.date}</p>
        <p><b>Time:</b> ${m.time}</p>

        <button class="regbtn" ${btnDisabled ? "disabled" : ""}>${btnText}</button>
      `;

      // Register button click
      const btn = card.querySelector(".regbtn");
      btn.addEventListener("click", () => registerMatch(i));

      matchesList.appendChild(card);

      // =====================
      //   MY MATCHES (APPROVED)
      // =====================
      if (approvals[userEmail] === "approved_" + m.matchId) {
        const myCard = document.createElement("div");
        myCard.className = "match-card";

        myCard.innerHTML = `
          <h3>${m.name}</h3>
          <p><b>Date:</b> ${m.date}</p>
          <p><b>Time:</b> ${m.time}</p>

          <h4 style="margin-top:10px;">Room Details</h4>
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
  //   INIT PAGE
  // =====================
  loadMatches();
});
