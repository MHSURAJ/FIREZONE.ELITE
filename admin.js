if(localStorage.getItem("userType")!=="admin"){
    alert("Unauthorized! Please login as admin.");
    window.location.href="login.html";
}

document.addEventListener("DOMContentLoaded",()=>{

    const dashboardBtn = document.getElementById("dashboardBtn");
    const matchBtn = document.getElementById("matchBtn");
    const playerBtn = document.getElementById("playerBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const contentDiv = document.getElementById("content");

    function clearActive(){
        document.querySelectorAll("#sidebar button").forEach(btn=>btn.classList.remove("active"));
    }

    // ===== Dashboard =====
    dashboardBtn.addEventListener("click",()=>{
        clearActive();
        dashboardBtn.classList.add("active");
        contentDiv.innerHTML=`<h1>Welcome to Admin Dashboard</h1>
            <p>Select an option from the sidebar to manage matches or players.</p>`;
    });

    // ===== Match Management =====
    let matches = JSON.parse(localStorage.getItem("matches")) || [];
    matchBtn.addEventListener("click",()=>{
        clearActive(); matchBtn.classList.add("active");
        contentDiv.innerHTML=`
            <h2>Match Management</h2>
            <button class="add" id="addMatchBtn">Add Match</button>
            <table id="matchTable">
                <thead><tr><th>Name</th><th>Date</th><th>Time</th><th>Players</th><th>Action</th></tr></thead>
                <tbody></tbody>
            </table>
        `;
        const tbody = document.querySelector("#matchTable tbody");
        function renderTable(){
            tbody.innerHTML="";
            matches.forEach((m,i)=>{
                const tr = document.createElement("tr");
                tr.innerHTML=`
                    <td>${m.name}</td>
                    <td>${m.date}</td>
                    <td>${m.time}</td>
                    <td>${m.players}</td>
                    <td>
                        <button class="action edit">Edit</button>
                        <button class="action delete">Delete</button>
                    </td>
                `;
                tr.querySelector(".edit").addEventListener("click",()=>editMatch(i));
                tr.querySelector(".delete").addEventListener("click",()=>deleteMatch(i));
                tbody.appendChild(tr);
            });
        }
        document.getElementById("addMatchBtn").addEventListener("click",()=>{
            const name=prompt("Enter Match Name:"); if(!name) return;
            const date=prompt("Enter Match Date (YYYY-MM-DD):"); if(!date) return;
            const time=prompt("Enter Match Time (HH:MM):"); if(!time) return;
            const players=prompt("Enter Players (comma separated):"); if(!players) return;
            matches.push({name,date,time,players});
            localStorage.setItem("matches",JSON.stringify(matches));
            renderTable();
        });
        function editMatch(i){
            const m=matches[i];
            const name=prompt("Edit Match Name:",m.name); if(!name) return;
            const date=prompt("Edit Match Date (YYYY-MM-DD):",m.date); if(!date) return;
            const time=prompt("Edit Match Time (HH:MM):",m.time); if(!time) return;
            const players=prompt("Edit Players (comma separated):",m.players); if(!players) return;
            matches[i]={name,date,time,players};
            localStorage.setItem("matches",JSON.stringify(matches));
            renderTable();
        }
        function deleteMatch(i){
            if(confirm("Are you sure you want to delete this match?")){
                matches.splice(i,1);
                localStorage.setItem("matches",JSON.stringify(matches));
                renderTable();
            }
        }
        renderTable();
    });

    // ===== Player Approval =====
    playerBtn.addEventListener("click",()=>{
        clearActive(); playerBtn.classList.add("active");
        contentDiv.innerHTML=`
            <h2>Player Approval</h2>
            <table id="playerTable">
                <thead><tr><th>Email</th><th>Status</th><th>Action</th></tr></thead>
                <tbody></tbody>
            </table>
        `;
        const tbody = document.querySelector("#playerTable tbody");
        const approvals = JSON.parse(localStorage.getItem("approvals"))||{};
        tbody.innerHTML="";
        Object.keys(approvals).forEach(email=>{
            const status = approvals[email];
            const statusClass = status==="approved"?"status-approved": status==="rejected"?"status-rejected":"";
            const tr = document.createElement("tr");
            tr.innerHTML=`
                <td>${email}</td>
                <td class="${statusClass}">${status}</td>
                <td>
                    <button class="action approve" ${status==="approved"?"disabled":""}>Approve</button>
                    <button class="action reject" ${status==="rejected"?"disabled":""}>Reject</button>
                </td>
            `;
            tr.querySelector(".approve").addEventListener("click",()=>{
                approvals[email]="approved";
                localStorage.setItem("approvals",JSON.stringify(approvals));
                playerBtn.click();
            });
            tr.querySelector(".reject").addEventListener("click",()=>{
                approvals[email]="rejected";
                localStorage.setItem("approvals",JSON.stringify(approvals));
                playerBtn.click();
            });
            tbody.appendChild(tr);
        });
    });

    // ===== Logout =====
    logoutBtn.addEventListener("click",()=>{
        if(confirm("Logout?")){
            alert("Logged out");
            localStorage.removeItem("userType");
            localStorage.removeItem("userEmail");
            window.location.href="login.html";
        }
    });

});
