// ? Módulos de terceros o estándar
import express from 'express';
import cors from 'cors';
// import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import url from 'node:url';
import path from 'node:path';

// ? Módulos propios
import { imagenRouter } from './routes/imagen.routes.js';
import { productoRouter } from './routes/producto.routes.js';
import { usuarioRouter } from './routes/usuario.routes.js';
import { ventaProductoRouter } from './routes/ventaProducto.routes.js';
import { ventaRouter } from './routes/venta.routes.js';

const app = express();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log({import: import.meta, import_meta_url: import.meta.url, __filename, __dirname});

// ? Middlewares
// app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '500mb' }));
app.use(cookieParser());
app.use(express.json({ limit: '500mb' }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// ? Estáticos
app.use(express.static(path.join(__dirname, '..', 'assets', 'fonts')));
app.use(express.static(path.join(__dirname, '..', 'assets', 'views', 'landing')));
app.use(express.static(path.join(__dirname, '..', 'assets', 'views', 'login')));
app.use(express.static(path.join(__dirname, '..', 'assets', 'views', 'dashboard')));
app.use(express.static(path.join(__dirname, '..', 'assets', 'views', 'dashboard', 'subViews', 'insumos')));
app.use(express.static(path.join(__dirname, '..', 'assets', 'views', 'dashboard', 'subViews', 'nomina')));
app.use(express.static(path.join(__dirname, '..', 'assets', 'views', 'dashboard', 'subViews', 'pedir')));
app.use(express.static(path.join(__dirname, '..', 'assets', 'views', 'dashboard', 'subViews', 'productos')));
app.use(express.static(path.join(__dirname, '..', 'assets', 'views', 'dashboard', 'subViews', 'proveedores')));
app.use(express.static(path.join(__dirname, '..', 'assets', 'views', 'dashboard', 'subViews', 'usuarios')));
app.use(express.static(path.join(__dirname, '..', 'assets', 'views', 'dashboard', 'subViews', 'vender')));
app.use(express.static(path.join(__dirname, '..', 'assets', 'img')));

// ? RUTAS
app.use('/images', imagenRouter);
app.use(productoRouter);
app.use(usuarioRouter);
app.use(ventaProductoRouter);
app.use(ventaRouter);

app.get('/landing', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '..', 'assets', 'views', 'landing', 'index.html'));
});
app.get('/login', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '..', 'assets', 'views', 'login', 'login.html'));
});
app.get('/home', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '..', 'assets', 'views', 'dashboard', 'dashboard.html'));
});

export default app;