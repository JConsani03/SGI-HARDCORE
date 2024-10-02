// ? Módulos de terceros o estándar
import { Router } from "express";

// ? Módulos propios
import Producto from '../../models/producto.model.js';

const router = Router();

router.get('/createProducto/:adminID/:nombre/:descrip/:stock/:priceU/:idImage', function (req, res) {
    try {
        res.status(200).send(Producto.create(req.params.adminID, req.params.nombre, req.params.descrip, req.params.stock, req.params.priceU,  req.params.idImage));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

router.get('/readProducto/:nombre', function (req, res) {
    try {
        res.status(200).send(Producto.read(req.params.nombre));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

router.get('/getProducto/:id', function (req, res) {
    try {
        res.status(200).send(Producto.get(req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

router.get('/updateProducto/:adminID/:nombre/:descrip/:stock/:priceU', function (req, res) {
    try {
        res.status(200).send(Producto.update(req.params.adminID, req.params.nombre, req.params.descrip, req.params.stock, req.params.priceU));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

router.get('/deleteProducto/:adminID/:id', function (req, res) {
    try {
        res.status(200).send(Producto.delete(req.params.adminID, req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

export const productoRouter = router; 