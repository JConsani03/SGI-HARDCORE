const $content = document.getElementById("content");
const $botones = document.getElementsByName("modulo");

history.replaceState(null, '', "/home");

// let flag = true;
// let img = null;
// let idProducto = null;

// function eliminar() {
//     fetch(`http://localhost:8080/deleteProducto/1/${encodeURIComponent(idProducto)}`)
//         .then(res => res.json())
//         .then(res => alert(res.message))
//     clearCampos()
//     llenarTabla(-1)
// }

// function cambiarBoton() {
//     if (flag) {
//         flag = !flag;
//         document.getElementById('fileInput').value = '';
//         img = null;
//         clearCampos();
//         document.getElementById('b_editar').disabled = true;
//         document.getElementById('b_nuevo').innerHTML = 'AGREGAR';
//         document.getElementById('b_eliminar').disabled = true;
//     } else {
//         flag = !flag;
//         document.getElementById('b_nuevo').innerHTML = 'NUEVO';
//         document.getElementById('b_editar').disabled = false;
//         document.getElementById('b_eliminar').disabled = false;
//         document.getElementById('fileInput').value = '';
//         fetch('http://localhost:8080/createImagen/1',
//             {
//                 method: 'post',
//                 headers: {
//                     'Content-Type': 'application/octet-stream'
//                 },
//                 body: img
//             })
//             .then(res => res.json())
//             .then(res => {
//                 fetch(`http://localhost:8080/createProducto/1
//                     /${encodeURIComponent(document.getElementById('nombre').value)}
//                     /${encodeURIComponent(document.getElementById('descrip').value)}
//                     /${encodeURIComponent(document.getElementById('stock').value)}
//                     /${encodeURIComponent(document.getElementById('precio').value)}
//                     /${encodeURIComponent(res.id)}`
//                 ).then(res => res.json())
//                     .then(res => {
//                         llenarTabla(-1);
//                         clearCampos();
//                     })
//             })
//             .catch(err => console.error('Error:', err));
//     }
// }

// function clearCampos() {
//     document.getElementById('fileInput').value = '';
//     img = null;
//     idProducto = null;
//     document.getElementById('nombre').value = '';
//     document.getElementById('stock').value = '';
//     document.getElementById('precio').value = '';
//     document.getElementById('descrip').value = '';
//     document.getElementsByTagName('i')[0].innerHTML = 'ID';
//     document.getElementById('img').src = '';

// }

// function obtenerImagen(id) {
//     fetch(`http://localhost:8080/readImagen/${encodeURIComponent(id)}`)
//         .then(res => res.blob())
//         .then(res => {
//             let reader = new FileReader();
//             reader.onload = function (event) {
//                 document.getElementById('img').src = event.target.result
//             }
//             reader.readAsDataURL(res);
//         })
// }

// function llenarCampos(id) {
//     flag = true;
//     document.getElementById('b_nuevo').innerHTML = 'NUEVO';
//     document.getElementById('b_editar').disabled = false;
//     document.getElementById('b_eliminar').disabled = false;
//     fetch(`http://localhost:8080/getProducto/${encodeURIComponent(id)}`)
//         .then(res => res.json())
//         .then(res => {
//             obtenerImagen(res.idImage)
//             document.getElementById('nombre').value = res.nombre;
//             document.getElementById('stock').value = res.stock;
//             document.getElementById('precio').value = res.priceU;
//             document.getElementById('descrip').value = res.descrip;
//             document.getElementsByTagName('i')[0].innerHTML = 'ID: ' + res.id;

//         })
// }

// function llenarTabla(nombre) {
//     document.getElementById('table_content').innerHTML = '';
//     fetch(`http://localhost:8080/readProducto/${encodeURIComponent(nombre)}`)
//         .then(res => res.json())
//         .then(res => {
//             res.forEach(function (fila) {
//                 document.getElementById('table_content').innerHTML +=
//                     `
//                 <tr>
//                     <td style='width: 5%'>${fila.id}</td>
//                     <td style='width: 30%'>${fila.nombre}</td>
//                     <td style='width: 35%' title='${fila.descrip}'>${fila.descrip}</td>
//                     <td style='width: 15%'>${fila.stock}</td>
//                     <td style='width: 15%'>${fila.priceU}</td>
//                 </tr>
//                 `;
//             })
//             Array.from(document.getElementsByTagName('td')).forEach(function (e) {
//                 e.addEventListener('click', function (e) {
//                     Array.from(document.getElementsByTagName('td')).forEach(function (e) {
//                         e.parentElement.style.backgroundColor = 'transparent'
//                     })
//                     e.target.parentElement.style.backgroundColor = '#a42121b8';
//                     idProducto = e.target.parentElement.firstElementChild.innerHTML;
//                     llenarCampos(idProducto);
//                 })
//             })
//         })
// }


function crearScript(nombre) {
    setTimeout(function () {
        console.log(nombre);
        let script = document.createElement('script');
        script.src = nombre;
        script.id = 'script';
        $content.appendChild(script);
    }, 700)
}

fetch(`http://localhost:8080/productos.html`)
    .then(res => res.text())
    .then(res => $content.innerHTML = res);
crearScript('productos.js');

function setContent(btn) {
    let script = document.getElementById('script');
    script.remove();
    script = null;
    delete script;

    // if (window.fragmentNamespace && typeof window.fragmentNamespace.cleanup === 'function') {
    //     window.fragmentNamespace.cleanup();
    //     delete window.fragmentNamespace; // Eliminar el namespace
    // }

    fetch(`http://localhost:8080/${btn.target.id}.html`)
        .then(res => res.text())
        .then(res => $content.innerHTML = res);


    switch (btn.target.id) {
        case 'productos': {
            crearScript(btn.target.id + '.js')
            break;
        }
        case 'insumos': {
            crearScript(btn.target.id + '.js')
            break;
        }
        case 'nomina': {
            crearScript(btn.target.id + '.js')
            break;
        }
        case 'pedir': {
            crearScript(btn.target.id + '.js')
            break;
        }
        case 'proveedores': {
            crearScript(btn.target.id + '.js')
            break;
        }
        case 'usuarios': {
            crearScript(btn.target.id + '.js')
            break;
        }
        case 'vender': {
            crearScript(btn.target.id + '.js')
            break;
        }
    }



    // if (btn.target.id == 'productos') {
    //     document.getElementById('modulo').innerHTML = 'MÓDULO - PRODUCTOS'
    //     setTimeout(function () {
    //         llenarTabla(-1);

    //         document.getElementById('fileInput').addEventListener('change', function (e) {
    //             let file = e.target.files[0];
    //             if (file) {
    //                 let reader = new FileReader();
    //                 reader.onload = function (event) {
    //                     img = event.target.result;
    //                 }
    //                 reader.readAsArrayBuffer(file);

    //                 let readerURL = new FileReader();
    //                 readerURL.onload = function (event) {
    //                     document.getElementById('img').src = event.target.result
    //                 }
    //                 readerURL.readAsDataURL(file);
    //             }
    //         });

    //         document.getElementById('busqueda').addEventListener('input', function (e) {
    //             if (e.target.value == '') {
    //                 llenarTabla(-1);
    //             } else {
    //                 llenarTabla(e.target.value);
    //             }
    //         });

    //     }, 500);
    // }
}

$botones.forEach(function (btn) {
    btn.addEventListener('click', setContent)
})


