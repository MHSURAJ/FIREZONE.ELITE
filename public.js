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
    });

    myMatchesBtn.addEventListener("click", ()=>{
        allMatchesSection.style.display = "none";
        myMatchesSection.style.display = "block";
        contactInfo.style.display = "none";
        loadMyMatches();
    });

    contactUsBtn.addEventListener("click", ()=>{
        allMatchesSection.style.display = "none";
        myMatchesSection.style.display = "none";
        contactInfo.style.display = "block";
    });

    // ===== Load All Matches =====
    const matchesList = document.getElementById("matchesList");
    const matches = JSON.parse(localStorage.getItem("matches")) || [];
    if(matches.length === 0){
        matchesList.innerHTML = "<li>No upcoming matches</li>";
    } else {
        matchesList.innerHTML = "";
        matches.forEach(m=>{
            const li = document.createElement("li");
            li.textContent = `${m.name} - ${m.date} ${m.time} | Players: ${m.players}`;
            matchesList.appendChild(li);
        });
    }

    // ===== Load My Matches =====
    function loadMyMatches(){
        const myMatchesList = document.getElementById("myMatchesList");
        const myMatches = matches.filter(m=> m.registeredPlayers?.includes(userEmail));
        myMatchesList.innerHTML = "";

        if(myMatches.length === 0){
            myMatchesList.innerHTML = "<li>You have not registered any matches</li>";
        } else {
            myMatches.forEach(m=>{
                const li = document.createElement("li");
                li.textContent = `${m.name} - ${m.date} ${m.time}`;
                myMatchesList.appendChild(li);
            });
        }
    }

});
