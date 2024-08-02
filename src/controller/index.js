// ? Módulos de terceros o estándar
import path from 'path';
import os from 'os'

// ? Módulos propios
import server from './server.js'

const platform = os.platform(); 
const type = os.type();
const release = os.release(); 
console.log({platform, type, release});

server.get('/landing', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '..', 'assets', 'views', 'landing', 'index.html'));
});
server.get('/login', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '..', 'assets', 'views', 'login', 'login.html'))
});
server.get('/home', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '..', 'assets', 'views', 'dashboard', 'dashboard.html'))
});

server.use(function (req, res) {
    res.status(404).send('Recurso no encontrado.');
});

server.listen(8080, function () {
    console.log('Online!');
}); 