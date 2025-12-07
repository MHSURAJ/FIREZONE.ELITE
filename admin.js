// ===== LocalStorage Key =====
let matches = JSON.parse(localStorage.getItem("matches")) || [];

// ===== Render Table =====
function renderTable() {
    const tbody = document.querySelector("#matchTable tbody");
    tbody.innerHTML = "";
    matches.forEach((match, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${match.name}</td>
            <td>${match.date}</td>
            <td>${match.time}</td>
            <td>${match.players}</td>
            <td>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </td>
        `;
        // Edit Event
        tr.querySelector(".edit").addEventListener("click", () => editMatch(index));
        // Delete Event
        tr.querySelector(".delete").addEventListener("click", () => deleteMatch(index));
        tbody.appendChild(tr);
    });
}

// ===== Add Match =====
document.getElementById("addMatchBtn").addEventListener("click", () => {
    const name = prompt("Enter Match Name:");
    if(!name) return;
    const date = prompt("Enter Match Date (YYYY-MM-DD):");
    if(!date) return;
    const time = prompt("Enter Match Time (HH:MM):");
    if(!time) return;
    const players = prompt("Enter Players (comma separated):");
    if(!players) return;

    matches.push({ name, date, time, players });
    localStorage.setItem("matches", JSON.stringify(matches));
    renderTable();
});

// ===== Edit Match =====
function editMatch(index) {
    const match = matches[index];
    const name = prompt("Edit Match Name:", match.name);
    if(!name) return;
    const date = prompt("Edit Match Date (YYYY-MM-DD):", match.date);
    if(!date) return;
    const time = prompt("Edit Match Time (HH:MM):", match.time);
    if(!time) return;
    const players = prompt("Edit Players (comma separated):", match.players);
    if(!players) return;

    matches[index] = { name, date, time, players };
    localStorage.setItem("matches", JSON.stringify(matches));
    renderTable();
}

// ===== Delete Match =====
function deleteMatch(index) {
    if(confirm("Are you sure you want to delete this match?")) {
        matches.splice(index, 1);
        localStorage.setItem("matches", JSON.stringify(matches));
        renderTable();
    }
}

// ===== Initial Render =====
renderTable();
