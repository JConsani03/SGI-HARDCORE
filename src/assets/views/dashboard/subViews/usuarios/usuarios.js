var flag;
var idUsuario;
var selected;
window.fragmentNamespace = function () {
    function initialize() {
        flag = true;
        selected = false;
        idUsuario = null;
        document.getElementById('busqueda').addEventListener('input', busquedaInputHandler);
        document.getElementById('b_eliminar').addEventListener('click', eliminar);
        document.getElementById('b_nuevo').addEventListener('click', cambiarBoton);
        document.getElementById('modulo').innerHTML = 'MÓDULO - USUARIOS';
        llenarTabla(-1);
    }

    function cleanup() {
        document.getElementById('busqueda').removeEventListener('input', busquedaInputHandler);
        document.getElementById('b_eliminar').removeEventListener('click', eliminar);
        document.getElementById('b_nuevo').removeEventListener('click', cambiarBoton);
        flag = null;
        selected = false;
        idUsuario = null;
    }

    function busquedaInputHandler(e) {
        if (e.target.value == '') {
            llenarTabla(-1);
        } else {
            llenarTabla(e.target.value);
        }
    }

    // Las demás funciones del fragmento van aquí
    function eliminar() {
        if (selected) {
            fetch(`https://hardcore.up.railway.app/deleteUsuario/1/${encodeURIComponent(idUsuario)}`)
                .then(res => res.json())
                .then(res => {
                    alert(res.message);
                    clearCampos();
                    llenarTabla(-1);
                    selected = false;
                });

        }

    }

    function cambiarBoton() {
        if (flag) {
            flag = !flag;
            clearCampos();
            document.getElementById('b_editar').disabled = true;
            document.getElementById('b_nuevo').innerHTML = 'AGREGAR';
            document.getElementById('b_eliminar').disabled = true;
            document.getElementById('b_nuevo').style.transform = 'scale(1.11)'
        } else {
            flag = !flag;
            document.getElementById('b_nuevo').innerHTML = 'NUEVO';
            document.getElementById('b_nuevo').style.transform = 'scale(1)'
            document.getElementById('b_editar').disabled = false;
            document.getElementById('b_eliminar').disabled = false;
            selected = false;
            fetch(`https://hardcore.up.railway.app/createUsuario/1
                /${document.getElementById('usuario').value}
                /${document.getElementById('contrasenia').value}
                /1`)
                .then(res => res.json())
                .then(res => { llenarTabla(-1); alert(res.message) })
                .catch(err => console.error(err));
        }
    }

    function clearCampos() {
        idUsuario = null;
        document.getElementById('usuario').value = '';
        document.getElementById('contrasenia').value = '';
        document.getElementsByTagName('i')[0].innerHTML = 'ID:';
    }

    function llenarCampos(user) {
        flag = true;
        document.getElementById('b_nuevo').style.transform = 'scale(1)'
        document.getElementById('b_nuevo').innerHTML = 'NUEVO';
        document.getElementById('b_editar').disabled = false;
        document.getElementById('b_eliminar').disabled = false;
        fetch(`https://hardcore.up.railway.app/readUsuario/1/${encodeURIComponent(user)}`)
            .then(res => res.json())
            .then(res => {
                document.getElementById('usuario').value = res[0].usuario;
                document.getElementById('contrasenia').value = res[0].pass;
                document.getElementsByTagName('i')[0].innerHTML = 'ID: ' + res[0].id;
                idUsuario = res[0].id;
            });
    }

    function llenarTabla(nombre) {
        document.getElementById('table_content').innerHTML = '';
        fetch(`https://hardcore.up.railway.app/readUsuario/1/${encodeURIComponent(nombre)}`)
            .then(res => res.json())
            .then(res => {
                res.forEach(function (fila) {
                    document.getElementById('table_content').innerHTML +=
                        `
                    <tr>
                        <td style='width: 10%'>${fila.id}</td>
                        <td style='width: 40%'>${fila.usuario}</td>
                        <td style='width: 40%'>${fila.pass}</td>
                        <td style='width: 10%'>${fila.type}</td>
                    </tr>
                    `;
                });
                Array.from(document.getElementsByTagName('td')).forEach(function (e) {
                    e.addEventListener('click', function (e) {
                        Array.from(document.getElementsByTagName('td')).forEach(function (e) {
                            e.parentElement.style.backgroundColor = 'transparent';
                        });
                        e.target.parentElement.style.backgroundColor = '#a42121b8';
                        nombre = e.target.parentElement.children[1].innerHTML;
                        llenarCampos(nombre);
                        selected = true;
                    });
                });
            });
    }

    // Inicializar al cargar el script
    initialize();

    return {
        cleanup: cleanup
    };
}();
