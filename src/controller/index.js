// ? Módulos de terceros o estándar
import os from 'node:os';

// ? Módulos propios
import app from './app.js';
import { SV_PORT } from './config.js';

const platform = os.platform(); 
const type = os.type();
const release = os.release(); 
console.log({platform, type, release});

app.use(function (req, res) {
    res.status(404).send('Recurso no encontrado.');
});

app.listen(SV_PORT, function () {
    console.log('Online!');
}); 