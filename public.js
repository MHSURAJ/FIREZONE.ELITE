const matchesRef = firebase.database().ref('matches');

const matchesList = document.getElementById('matchesList');
const myMatchesList = document.getElementById('myMatchesList');
const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', ()=>{
  firebase.auth().signOut().then(()=>{
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('userType');
    alert("Logged out successfully!");
    window.location.href = "login.html";
  }).catch(err=>{
    console.error(err);
    alert("Logout failed: "+err.message);
  });
});

// Sidebar
function showSection(id){
  document.querySelectorAll('.section').forEach(sec=>sec.style.display='none');
  document.getElementById(id).style.display='block';
}

// Fetch matches realtime
matchesRef.on('value', snapshot=>{
  matchesList.innerHTML='';
  myMatchesList.innerHTML='';
  const data = snapshot.val();
  if(data){
    const userEmail = localStorage.getItem('loggedInUser');
    Object.values(data).forEach(m=>{
      const div = document.createElement('div');
      div.classList.add('match-card');
      div.innerHTML=`<h3>${m.name}</h3><p><b>ID:</b> ${m.matchId}</p>
      <p><b>Fee:</b> ${m.entryFee}</p><p><b>Prize:</b> ${m.prize}</p>
      <p><b>Date:</b> ${m.date}</p><p><b>Time:</b> ${m.time}</p>`;
      matchesList.appendChild(div);

      // My matches logic
      if(userEmail){
        const approvals = JSON.parse(localStorage.getItem('approvals'))||{};
        if(approvals[userEmail] && approvals[userEmail].split('_')[1]===m.matchId){
          const myDiv = div.cloneNode(true);
          myMatchesList.appendChild(myDiv);
        }
      }
    });
  } else matchesList.innerHTML="<p>No upcoming matches.</p>";
});
