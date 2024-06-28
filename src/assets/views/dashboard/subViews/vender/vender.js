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

    function fileInputChangeHandler(e) {
        let file = e.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                img = event.target.result;
            };
            reader.readAsArrayBuffer(file);

            let readerURL = new FileReader();
            readerURL.onload = function (event) {
                document.getElementById('img').src = event.target.result;
            };
            readerURL.readAsDataURL(file);
        }
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
        fetch(`http://localhost:8080/deleteProducto/1/${encodeURIComponent(idProducto)}`)
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
            fetch('http://localhost:8080/createImagen/1', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/octet-stream'
                },
                body: img
            })
                .then(res => res.json())
                .then(res => {
                    fetch(`http://localhost:8080/createProducto/1/${encodeURIComponent(document.getElementById('nombre').value)}/${encodeURIComponent(document.getElementById('descrip').value)}/${encodeURIComponent(document.getElementById('stock').value)}/${encodeURIComponent(document.getElementById('precio').value)}/${encodeURIComponent(res.id)}`)
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
        fetch(`http://localhost:8080/readImagen/${encodeURIComponent(id)}`)
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
        fetch(`http://localhost:8080/getProducto/${encodeURIComponent(id)}`)
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
        fetch(`http://localhost:8080/readProducto/${encodeURIComponent(nombre)}`)
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
