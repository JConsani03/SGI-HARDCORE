const $content = document.getElementById("content");
const $botones = document.getElementsByName("modulo");

history.replaceState(null, '', "/home");

function crearScript(nombre) {
    let script = document.createElement('script');
    script.src = nombre;
    script.id = 'script';
    $content.appendChild(script);
}

fetch(`https://hardcore.up.railway.app/productos.html`)
    .then(res => res.text())
    .then(res => { $content.innerHTML = res; crearScript('productos.js'); });


function setContent(btn) {
    let script = document.getElementById('script');
    script.remove();
    script = null;

    if (window.fragmentNamespace && typeof window.fragmentNamespace.cleanup === 'function') {
        window.fragmentNamespace.cleanup();
        delete window.fragmentNamespace;
    }

    fetch(`https://hardcore.up.railway.app/${btn.target.id}.html`)
        .then(res => res.text())
        .then(res => {
            $content.innerHTML = res;

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
        });



}

$botones.forEach(function (btn) {
    btn.addEventListener('click', setContent)
})


