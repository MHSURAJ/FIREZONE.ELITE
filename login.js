const adminEmail = "surushannu@gmail.com";

function googleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            let user = result.user;

            if (user.email === adminEmail) {
                window.location.href = "admin.html";
            } else {
                window.location.href = "public.html";
            }
        })
        .catch((error) => {
            alert("Login Error: " + error.message);
        });
}
