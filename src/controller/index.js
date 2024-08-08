// ? Módulos de terceros o estándar
import os from 'os';
import cors from 'cors';

// ? Módulos propios
import server from './server.js'

const platform = os.platform(); 
const type = os.type();
const release = os.release(); 
console.log({platform, type, release});

server.use(cors());

server.use(function (req, res) {
    res.status(404).send('Recurso no encontrado.');
});

server.listen(8080, function () {
    console.log('Online!');
}); 