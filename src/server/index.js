import express from 'express';
const server = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
console.log(path.join('app','src', 'assets', 'views', 'landing'));
// import $$Usuarios from '../models/Usuarios.js';
// import $$Ventas from '../models/Ventas.js';
// import $$Productos from '../models/Productos.js';
// import $$VentasProductos from '../models/Ventas-Productos.js';
// import $$Imagenes from '../models/Imagenes.js';

server.use(bodyParser.raw({ type: 'application/octet-stream', limit: '500mb' }));
server.use(express.json({ limit: '500mb' }));
server.use(cors());
server.use(express.urlencoded({ extended: true }));
// console.log(path.join(import.meta.dirname));
// server.use(express.static(path.join(import.meta.dirname, '..', 'assets', 'fonts')));
server.use(express.static(path.join('app','src', 'assets', 'views', 'landing')));
// server.use(express.static(path.join(import.meta.dirname, '..', 'assets', 'views', 'login')));
// server.use(express.static(path.join(import.meta.dirname, '..', 'assets', 'views', 'dashboard')));
// server.use(express.static(path.join(import.meta.dirname, '..', 'assets', 'views', 'dashboard', 'subViews', 'insumos')));
// server.use(express.static(path.join(import.meta.dirname, '..', 'assets', 'views', 'dashboard', 'subViews', 'nomina')));
// server.use(express.static(path.join(import.meta.dirname, '..', 'assets', 'views', 'dashboard', 'subViews', 'pedir')));
// server.use(express.static(path.join(import.meta.dirname, '..', 'assets', 'views', 'dashboard', 'subViews', 'productos')));
// server.use(express.static(path.join(import.meta.dirname, '..', 'assets', 'views', 'dashboard', 'subViews', 'proveedores')));
// server.use(express.static(path.join(import.meta.dirname, '..', 'assets', 'views', 'dashboard', 'subViews', 'usuarios')));
// server.use(express.static(path.join(import.meta.dirname, '..', 'assets', 'views', 'dashboard', 'subViews', 'vender')));
// server.use(express.static(path.join(import.meta.dirname, '..', 'assets', 'img')));

// USUARIO
// server.get('/loginUser/:user/:pass', function (req, res) {
//     try {
//         res.status(200).send($$Usuarios.login(req.params.user, req.params.pass));
//     } catch (error) {
//         res.status(400).send({ 'message': error.message });
//     }
// });

// server.get('/createUsuario/:adminID/:user/:pass/:type', function (req, res) {
//     try {
//         res.status(200).send($$Usuarios.create(req.params.adminID, req.params.user, req.params.pass, req.params.type));
//     } catch (error) {
//         res.status(400).send({ 'message': error.message });
//     }
// });

// server.get('/readUsuario/:adminID/:user', function (req, res) {
//     try {
//         res.status(200).send($$Usuarios.read(req.params.adminID, req.params.user));
//     } catch (error) {
//         res.status(400).send({ 'message': error.message });
//     }
// });

// server.get('/updateUsuario/:adminID/:userID/:newU/:newP/:newT', function (req, res) {
//     try {
//         res.status(200).send($$Usuarios.update(req.params.adminID, req.params.userID, req.params.newU, req.params.newP, req.params.newT));
//     } catch (error) {
//         res.status(400).send({ 'message': error.message });
//     }
// });

// server.get('/deleteUsuario/:adminID/:userID', function (req, res) {
//     try {
//         res.status(200).send($$Usuarios.delete(req.params.adminID, req.params.userID));
//     } catch (error) {
//         res.status(400).send({ 'message': error.message });
//     }
// });
// // FIN - USUARIO

// // PRODUCTOS
// server.get('/createProducto/:adminID/:nombre/:descrip/:stock/:priceU/:idImage', function (req, res) {
//     try {
//         res.status(200).send($$Productos.create(req.params.adminID, req.params.nombre, req.params.descrip, req.params.stock, req.params.priceU,  req.params.idImage));
//     } catch (error) {
//         res.status(400).send({ 'message': error.message });
//     }
// });

// server.get('/readProducto/:nombre', function (req, res) {
//     try {
//         res.status(200).send($$Productos.read(req.params.nombre));
//     } catch (error) {
//         res.status(400).send({ 'message': error.message });
//     }
// });

// server.get('/getProducto/:id', function (req, res) {
//     try {
//         res.status(200).send($$Productos.get(req.params.id));
//     } catch (error) {
//         res.status(400).send({ 'message': error.message });
//     }
// });

// server.get('/updateProducto/:adminID/:nombre/:descrip/:stock/:priceU', function (req, res) {
//     try {
//         res.status(200).send($$Productos.update(req.params.adminID, req.params.nombre, req.params.descrip, req.params.stock, req.params.priceU));
//     } catch (error) {
//         res.status(400).send({ 'message': error.message });
//     }
// });

// server.get('/deleteProducto/:adminID/:id', function (req, res) {
//     try {
//         res.status(200).send($$Productos.delete(req.params.adminID, req.params.id));
//     } catch (error) {
//         res.status(400).send({ 'message': error.message });
//     }
// });
// // FIN - PRODUCTOS

// // IMAGENES
// server.post('/createImagen/:adminID', function (req, res) {
//     try {
//         res.status(200).send($$Imagenes.create(req.params.adminID, req.body));
//     } catch (error) {
//         res.status(400).send({ 'message': error.message });
//     }
// });

// server.get('/updateImagen/:adminID/:idProducto/:id', function (req, res) {
//     try {
//         res.status(200).send($$Imagenes.update(req.params.adminID, req.params.idProducto, req.params.id));
//     } catch (error) {
//         res.status(400).send({ 'message': error.message });
//     }
// });

// server.get('/readImagen/:id', function (req, res) {
//     try {
//         res.status(200).send($$Imagenes.read(req.params.id));
//     } catch (error) {
//         res.status(400).send({ 'message': error.message });
//     }
// });

// server.get('/deleteImagen/:adminID/:id', function (req, res) {
//     try {
//         res.status(200).send($$Imagenes.delete(req.params.adminID, req.params.id));
//     } catch (error) {
//         res.status(400).send({ 'message': error.message });
//     }
// });
// // FIN - IMAGENES

// // VENTAS-PRODUCTOS
// server.get('/createVentaProducto/:id_Venta/:id_Producto/:cantidad', function (req, res) {
//     try {
//         res.status(200).send($$VentasProductos.create(req.params.id_Venta, req.params.id_Producto, req.params.cantidad));
//     } catch (error) {
//         res.status(400).send({ 'message': error.message });
//     }
// });

// server.get('/readVentaProducto/:id_Venta', function (req, res) {
//     try {
//         res.status(200).send($$VentasProductos.read(req.params.id_Venta));
//     } catch (error) {
//         res.status(400).send({ 'message': error.message });
//     }
// });
// // FIN - VENTAS-PRODUCTOS

// // VENTAS
// server.get('/createVenta/:fecha/:descrip/:precioT', function (req, res) {
//     try {
//         res.status(200).send($$Ventas.create(req.params.fecha, req.params.descrip, req.params.precioT));
//     } catch (error) {
//         res.status(400).send({ 'message': error.message });
//     }
// });

// server.get('/readVenta/:fecha', function (req, res) {
//     try {
//         res.status(200).send($$Ventas.read(req.params.fecha));
//     } catch (error) {
//         res.status(400).send({ 'message': error.message });
//     }
// });

// server.get('/deleteVenta/:id', function (req, res) {
//     try {
//         res.status(200).send($$Ventas.delete(req.params.id));
//     } catch (error) {
//         res.status(400).send({ 'message': error.message });
//     }
// });
// // FIN - VENTAS

// server.get('/landing', function (req, res) {
//     res.status(200).sendFile(path.join(import.meta.dirname, '..', 'assets', 'views', 'landing', 'index.html'));
// });
// server.get('/login', function (req, res) {
//     res.status(200).sendFile(path.join(import.meta.dirname, '..', 'assets', 'views', 'login', 'login.html'))
// });
// server.get('/home', function (req, res) {
//     res.status(200).sendFile(path.join(import.meta.dirname, '..', 'assets', 'views', 'dashboard', 'dashboard.html'))
// });

server.use(function (req, res) {
    res.status(404).send('Recurso no encontrado.');
});

server.listen(8080, function () {
    console.log('Online!');
}); 