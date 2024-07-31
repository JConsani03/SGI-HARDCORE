let $usuario = document.getElementById("in_usuario");
let $pass = document.getElementById("in_pass");
history.replaceState(null, '', "/login");

function ingresar() {
    let user = $usuario.value || 'e';
    let pass = $pass.value || 'e';
    fetch(`https://hardcore.up.railway.app/loginUser/${encodeURIComponent(user)}/${encodeURIComponent(pass)}`)
        .then((res) => {
            if (!res.ok) {
                return res.json().then(error => alert(error.message));
            }
            res.json().then((res) => console.log(res))
            window.location.href = 'dashboard.html'
        })
}