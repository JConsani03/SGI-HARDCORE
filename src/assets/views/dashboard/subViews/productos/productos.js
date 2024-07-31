var flag;
var img;
var idProducto;
var idImage;
var selected;

window.fragmentNamespace = function () {
    function initialize() {
        idImage = null;
        flag = true;
        selected = false;
        img = null;
        idProducto = null;
        document.getElementById('fileInput').addEventListener('change', fileInputChangeHandler);
        document.getElementById('busqueda').addEventListener('input', busquedaInputHandler);
        document.getElementById('b_eliminar').addEventListener('click', eliminar);
        document.getElementById('b_nuevo').addEventListener('click', cambiarBoton);
        document.getElementById('modulo').innerHTML = 'MÓDULO - PRODUCTOS';
        llenarTabla(-1);
    }

    function cleanup() {
        document.getElementById('busqueda').removeEventListener('input', busquedaInputHandler);
        document.getElementById('fileInput').removeEventListener('change', fileInputChangeHandler);
        flag = null;
        img = null;
        selected = false;
        idImage = null;
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
            llenarTabla(-1);
        } else {
            llenarTabla(e.target.value);
        }
    }

    // Las demás funciones del fragmento van aquí
    function eliminar() {
        if (selected) {
            fetch(`https://hardcore.up.railway.app/deleteProducto/1/${encodeURIComponent(idProducto)}`)
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
            document.getElementById('fileInput').value = '';
            img = null;
            clearCampos();
            document.getElementById('b_nuevo').style.transform = 'scale(1.11)'
            document.getElementById('b_editar').disabled = true;
            document.getElementById('b_nuevo').innerHTML = 'AGREGAR';
            document.getElementById('b_eliminar').disabled = true;
        } else {
            selected = false
            flag = !flag;
            document.getElementById('b_nuevo').style.transform = 'scale(1)'
            document.getElementById('b_nuevo').innerHTML = 'NUEVO';
            document.getElementById('b_editar').disabled = false;
            document.getElementById('b_eliminar').disabled = false;
            document.getElementById('fileInput').value = '';
            console.log(img);
            fetch('https://hardcore.up.railway.app/createImagen/1', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/octet-stream'
                },
                body: img
            })
                .then(res => res.json())
                .then(res => {
                    idImage = res.id;
                    fetch(`https://hardcore.up.railway.app/createProducto/1/${encodeURIComponent(document.getElementById('nombre').value)}/${encodeURIComponent(document.getElementById('descrip').value)}/${encodeURIComponent(document.getElementById('stock').value)}/${encodeURIComponent(document.getElementById('precio').value)}/${encodeURIComponent(idImage)}`)
                        .then(res => res.json())
                        .then(res => {
                            fetch(`https://hardcore.up.railway.app/updateImagen/1/${encodeURIComponent(res.id)}/${encodeURIComponent(idImage)}`)
                            llenarTabla(-1);
                            clearCampos();
                        });
                })
                .catch(err => console.error('Error:', err));
        }
    }

    function clearCampos() {
        document.getElementById('fileInput').value = '';
        img = null;
        idImage = null;
        idProducto = null;
        document.getElementById('nombre').value = '';
        document.getElementById('stock').value = '';
        document.getElementById('precio').value = '';
        document.getElementById('descrip').value = '';
        document.getElementsByTagName('i')[0].innerHTML = 'ID';
        document.getElementById('img').src = '';
    }

    function obtenerImagen(id) {
        fetch(`https://hardcore.up.railway.app/readImagen/${encodeURIComponent(id)}`)
            .then(res => res.blob())
            .then(res => {
                let reader = new FileReader();
                reader.onload = function (event) {
                    document.getElementById('img').src = event.target.result;
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
        fetch(`https://hardcore.up.railway.app/getProducto/${encodeURIComponent(id)}`)
            .then(res => res.json())
            .then(res => {
                obtenerImagen(res.id);
                document.getElementById('nombre').value = res.nombre;
                document.getElementById('stock').value = res.stock;
                document.getElementById('precio').value = res.priceU;
                document.getElementById('descrip').value = res.descrip;
                document.getElementsByTagName('i')[0].innerHTML = 'ID: ' + res.id;
            });
    }

    function llenarTabla(nombre) {
        document.getElementById('table_content').innerHTML = '';
        fetch(`https://hardcore.up.railway.app/readProducto/${encodeURIComponent(nombre)}`)
            .then(res => res.json())
            .then(res => {
                res.forEach(function (fila) {
                    document.getElementById('table_content').innerHTML +=
                        `
                    <tr>
                        <td style='width: 5%'>${fila.id}</td>
                        <td style='width: 30%'>${fila.nombre}</td>
                        <td style='width: 35%' title='${fila.descrip}'>${fila.descrip}</td>
                        <td style='width: 15%'>${fila.stock}</td>
                        <td style='width: 15%'>${fila.priceU}</td>
                    </tr>
                    `;
                });
                Array.from(document.getElementsByTagName('td')).forEach(function (e) {
                    e.addEventListener('click', function (e) {
                        Array.from(document.getElementsByTagName('td')).forEach(function (e) {
                            e.parentElement.style.backgroundColor = 'transparent';
                        });
                        e.target.parentElement.style.backgroundColor = '#a42121b8';
                        idProducto = e.target.parentElement.firstElementChild.innerHTML;
                        llenarCampos(idProducto);
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
