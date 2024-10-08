// ? https://hardcore.up.railway.app ó http://localhost:8080
const SV_URL = "https://hardcore.up.railway.app";
const $usuario = document.getElementById("in_usuario");
const $pass = document.getElementById("in_pass");
history.replaceState(null, '', "/login");

function ingresar() {
    let user = $usuario.value || 'e';
    let pass = $pass.value || 'e';
    fetch(`${SV_URL}/loginUser/${encodeURIComponent(user)}/${encodeURIComponent(pass)}`)
        .then((res) => {
            if (!res.ok) { return res.json().then(error => alert(error.message)); }
            res.json().then((res) => console.log(res));
            window.location.href = 'dashboard.html';
        });
}

function verificarUsuario() {
    fetch(`${SV_URL}/verify`)
        .then((res) => { 
            if (!res.ok) { return res.json().then(error => alert(error.message)); } 
            window.location.href = 'dashboard.html';
        });
}

verificarUsuario();