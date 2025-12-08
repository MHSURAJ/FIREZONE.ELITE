document.addEventListener("DOMContentLoaded", () => {

    const userEmail = localStorage.getItem("userEmail");
    const userType = localStorage.getItem("userType");

    if (!userEmail || userType !== "player") {
        window.location.href = "login.html";
        return;
    }

    // Sidebar buttons
    const allBtn = document.getElementById("allMatchesBtn");
    const myBtn = document.getElementById("myMatchesBtn");
    const contactBtn = document.getElementById("contactUsBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    const allSec = document.getElementById("allMatchesSection");
    const mySec = document.getElementById("myMatchesSection");
    const contactSec = document.getElementById("contactInfo");

    allBtn.addEventListener("click", () => {
        allSec.style.display = "block";
        mySec.style.display = "none";
        contactSec.style.display = "none";
    });

    myBtn.addEventListener("click", () => {
        allSec.style.display = "none";
        mySec.style.display = "block";
        contactSec.style.display = "none";
    });

    contactBtn.addEventListener("click", () => {
        allSec.style.display = "none";
        mySec.style.display = "none";
        contactSec.style.display = "block";
    });

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userType");
        alert("Logged out!");
        window.location.href = "login.html";
    });

    // Matches
    const matchesList = document.getElementById("matchesList");
    const myMatchesList = document.getElementById("myMatchesList");

    function renderMatches() {
        const matches = JSON.parse(localStorage.getItem("matches")) || [];
        const approvals = JSON.parse(localStorage.getItem("approvals")) || {};

        matchesList.innerHTML = "";
        myMatchesList.innerHTML = "";

        matches.forEach((m, i) => {

            // All matches
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

            const card = document.createElement("div");
            card.className = "match-card";
            card.innerHTML = `
                <h3>${m.name}</h3>
                <p><b>ID:</b> ${m.matchId}</p>
                <p><b>Entry Fee:</b> ${m.entryFee}</p>
                <p><b>Prize:</b> ${m.prize}</p>
                <p><b>Date:</b> ${m.date}</p>
                <p><b>Time:</b> ${m.time}</p>
                <button ${btnDisabled ? "disabled" : ""} id="regBtn${i}">${btnText}</button>
            `;
            matchesList.appendChild(card);

            card.querySelector(`#regBtn${i}`).addEventListener("click", () => {
                approvals[userEmail] = "pending_" + m.matchId;
                localStorage.setItem("approvals", JSON.stringify(approvals));
                alert("Registration sent! Wait for admin approval.");
                renderMatches();
            });

            // My matches
            if (approvals[userEmail] === "approved_" + m.matchId) {
                const myCard = document.createElement("div");
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

    renderMatches();
});
