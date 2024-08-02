// ? Módulos de terceros o estándar
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import url from 'url'
import path from 'path';

// ? Módulos propios
import { imagenesRoutes } from './routes/imagenes.routes.js'
import { productosRoutes } from './routes/productos.routes.js'
import { usuariosRoutes } from './routes/usuarios.routes.js'
import { ventas_productosRoutes } from './routes/ventas-productos.routes.js'
import { ventasRoutes } from './routes/ventas.routes.js'

const server = express();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ? RUTAS
server.use(imagenesRoutes);
server.use(productosRoutes);
server.use(usuariosRoutes);
server.use(ventas_productosRoutes);
server.use(ventasRoutes);

// ? Middlewares
server.use(bodyParser.raw({ type: 'application/octet-stream', limit: '500mb' }));
server.use(express.json({ limit: '500mb' }));
server.use(cors());
server.use(express.urlencoded({ extended: true }));

// ? Estáticos
server.use(express.static(path.join(__dirname, '..', 'assets', 'fonts')));
server.use(express.static(path.join(__dirname, '..', 'assets', 'views', 'landing')));
server.use(express.static(path.join(__dirname, '..', 'assets', 'views', 'login')));
server.use(express.static(path.join(__dirname, '..', 'assets', 'views', 'dashboard')));
server.use(express.static(path.join(__dirname, '..', 'assets', 'views', 'dashboard', 'subViews', 'insumos')));
server.use(express.static(path.join(__dirname, '..', 'assets', 'views', 'dashboard', 'subViews', 'nomina')));
server.use(express.static(path.join(__dirname, '..', 'assets', 'views', 'dashboard', 'subViews', 'pedir')));
server.use(express.static(path.join(__dirname, '..', 'assets', 'views', 'dashboard', 'subViews', 'productos')));
server.use(express.static(path.join(__dirname, '..', 'assets', 'views', 'dashboard', 'subViews', 'proveedores')));
server.use(express.static(path.join(__dirname, '..', 'assets', 'views', 'dashboard', 'subViews', 'usuarios')));
server.use(express.static(path.join(__dirname, '..', 'assets', 'views', 'dashboard', 'subViews', 'vender')));
server.use(express.static(path.join(__dirname, '..', 'assets', 'img')));

server.get('/landing', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '..', 'assets', 'views', 'landing', 'index.html'));
});
server.get('/login', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '..', 'assets', 'views', 'login', 'login.html'))
});
server.get('/home', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '..', 'assets', 'views', 'dashboard', 'dashboard.html'))
});

export default server;