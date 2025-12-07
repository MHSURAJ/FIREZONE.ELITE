document.addEventListener("DOMContentLoaded", ()=>{

    // ===== Login Check =====
    const userEmail = localStorage.getItem("userEmail");
    if(localStorage.getItem("userType") !== "player" || !userEmail){
        alert("Unauthorized! Please login as player.");
        window.location.href = "login.html";
    }

    // ===== Logout =====
    document.getElementById("logoutBtn").addEventListener("click", ()=>{
        localStorage.removeItem("userType");
        localStorage.removeItem("userEmail");
        alert("Logged out");
        window.location.href = "login.html";
    });

    // ===== Sidebar buttons =====
    const allMatchesBtn = document.getElementById("allMatchesBtn");
    const myMatchesBtn = document.getElementById("myMatchesBtn");
    const contactUsBtn = document.getElementById("contactUsBtn");

    const allMatchesSection = document.getElementById("allMatchesSection");
    const myMatchesSection = document.getElementById("myMatchesSection");
    const contactInfo = document.getElementById("contactInfo");

    allMatchesBtn.addEventListener("click", ()=>{
        allMatchesSection.style.display = "block";
        myMatchesSection.style.display = "none";
        contactInfo.style.display = "none";
        renderMatches("all");
    });

    myMatchesBtn.addEventListener("click", ()=>{
        allMatchesSection.style.display = "none";
        myMatchesSection.style.display = "block";
        contactInfo.style.display = "none";
        renderMatches("my");
    });

    contactUsBtn.addEventListener("click", ()=>{
        allMatchesSection.style.display = "none";
        myMatchesSection.style.display = "none";
        contactInfo.style.display = "block";
    });

    // ===== Matches Data =====
    const matches = JSON.parse(localStorage.getItem("matches")) || [];

    function renderMatches(type){
        let container = (type === "all") ? document.getElementById("matchesList") : document.getElementById("myMatchesList");
        container.innerHTML = "";

        let filtered = matches;
        if(type === "my"){
            filtered = matches.filter(m => m.registeredPlayers?.includes(userEmail));
        }

        if(filtered.length === 0){
            container.innerHTML = "<p>No matches found</p>";
            return;
        }

        filtered.forEach(m=>{
            const card = document.createElement("div");
            card.className = "match-card";

            let cardHTML = `<h3>${m.name}</h3>
                            <p><strong>Date:</strong> ${m.date} | <strong>Time:</strong> ${m.time}</p>
                            <p><strong>Players:</strong> ${m.players}</p>`;

            // Show room info only for verified players
            if(m.verifiedPlayers?.includes(userEmail)){
                cardHTML += `<p><strong>Room ID:</strong> ${m.roomID || "-"}</p>
                             <p><strong>Password:</strong> ${m.roomPassword || "-"}</p>`;
            }

            // Register button always works
            cardHTML += `<button onclick="window.open('https://forms.gle/ucxE3a8moxr3QrXp6','_blank')">Register</button>`;

            card.innerHTML = cardHTML;
            container.appendChild(card);
        });
    }

    // Initial load
    renderMatches("all");

});
