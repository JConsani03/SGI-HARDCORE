var flag;
var img;
var idProducto;

window.fragmentNamespace = function () {
    function initialize() {
        flag = true;
        img = null;
        idProducto = null;
        document.getElementById('busqueda').addEventListener('input', busquedaInputHandler);
        document.getElementById('b_eliminar').addEventListener('click', eliminar);
        document.getElementById('b_nuevo').addEventListener('click', cambiarBoton);
        document.getElementById('modulo').innerHTML = 'MÓDULO - VENDER';
        llenarFichas(-1);
    }

    function cleanup() {
        document.getElementById('busqueda').removeEventListener('input', busquedaInputHandler);
        flag = null;
        img = null;
        idProducto = null;
    }

    function busquedaInputHandler(e) {
        if (e.target.value == '') {
            llenarFichas(-1);
        } else {
            llenarFichas(e.target.value);
        }
    }

    // Las demás funciones del fragmento van aquí
    function eliminar() {
        fetch(`${SV_URL}deleteProducto/1/${encodeURIComponent(idProducto)}`)
            .then(res => res.json())
            .then(res => alert(res.message));
        clearCampos();
        llenarFichas(-1);
    }

    function cambiarBoton() {
        if (flag) {
            flag = !flag;
            document.getElementById('fileInput').value = '';
            img = null;
            clearCampos();
            document.getElementById('b_nuevo').style.transform = 'scale(1.11)'
            document.getElementById('b_editar').disabled = true;
            document.getElementById('b_nuevo').innerHTML = 'AGREGAR';
            document.getElementById('b_eliminar').disabled = true;
        } else {
            flag = !flag;
            document.getElementById('b_nuevo').style.transform = 'scale(1)'
            document.getElementById('b_nuevo').innerHTML = 'NUEVO';
            document.getElementById('b_editar').disabled = false;
            document.getElementById('b_eliminar').disabled = false;
            document.getElementById('fileInput').value = '';
            fetch('${SV_URL}createImagen/1', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/octet-stream'
                },
                body: img
            })
                .then(res => res.json())
                .then(res => {
                    fetch(`${SV_URL}createProducto/1/${encodeURIComponent(document.getElementById('nombre').value)}/${encodeURIComponent(document.getElementById('descrip').value)}/${encodeURIComponent(document.getElementById('stock').value)}/${encodeURIComponent(document.getElementById('precio').value)}/${encodeURIComponent(res.id)}`)
                        .then(res => res.json())
                        .then(res => {
                            llenarFichas(-1);
                            clearCampos();
                        });
                })
                .catch(err => console.error('Error:', err));
        }
    }

    function clearCampos() {
        document.getElementById('fileInput').value = '';
        img = null;
        idProducto = null;
        document.getElementById('nombre').value = '';
        document.getElementById('stock').value = '';
        document.getElementById('precio').value = '';
        document.getElementById('descrip').value = '';
        document.getElementsByTagName('i')[0].innerHTML = 'ID';
        document.getElementById('img').src = '';
    }

    function obtenerImagen(id) {
        fetch(`${SV_URL}readImagen/${encodeURIComponent(id)}`)
            .then(res => res.blob())
            .then(res => {
                let reader = new FileReader();
                reader.onload = function (event) {
                    let img = new Image(100, 100);
                    img.src = event.target.result;
                    img.className = 'ficha';
                    document.getElementById('panel_productos').appendChild(img);
                };
                reader.readAsDataURL(res);
            });
    }

    function llenarCampos(id) {
        flag = true;
        document.getElementById('b_nuevo').style.transform = 'scale(1)'
        document.getElementById('b_nuevo').innerHTML = 'NUEVO';
        document.getElementById('b_editar').disabled = false;
        document.getElementById('b_eliminar').disabled = false;
        fetch(`${SV_URL}getProducto/${encodeURIComponent(id)}`)
            .then(res => res.json())
            .then(res => {
                obtenerImagen(res.idImage);
                document.getElementById('nombre').value = res.nombre;
                document.getElementById('stock').value = res.stock;
                document.getElementById('precio').value = res.priceU;
                document.getElementById('descrip').value = res.descrip;
                document.getElementsByTagName('i')[0].innerHTML = 'ID: ' + res.id;
            });
    }

    function llenarFichas(nombre) {
        document.getElementById('panel_productos').innerHTML = '';
        fetch(`${SV_URL}readProducto/${encodeURIComponent(nombre)}`)
            .then(res => res.json())
            .then(res => {
                res.forEach(function (fila) {
                    obtenerImagen(fila.idImage);
                });
            });
    }

    // Inicializar al cargar el script
    initialize();

    return {
        cleanup: cleanup
    };
}();
