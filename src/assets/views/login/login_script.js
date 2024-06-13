let $usuario = document.getElementById("in_usuario");
let $pass = document.getElementById("in_pass");
history.replaceState(null, '', "/login");

function ingresar(){
    let user = $usuario.value;
    let pass = $pass.value;
    fetch(`http://localhost:8080/login/${encodeURIComponent(user)}/${encodeURIComponent(pass)}`)
    .then(res => res.json())
    .then(res => {
        switch(res.res){
            case 'OK': {
                window.location.href = 'dashboard.html';
                break;
            }
            case 'ERROR': {
                alert("El usuario o contraseña son incorrectos.")
                break;
            }
            case 'NONE': {
                alert("Usuario o contraseñas inválidos.")
                break;
            }
            default:{

            }
        }
    }) 
}