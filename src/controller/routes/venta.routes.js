// ? Módulos de terceros o estándar
import { Router } from "express";

// ? Módulos propios
import Venta from '../../models/venta.model.js';

const router = Router();

router.get('/createVenta/:fecha/:descrip/:precioT', function (req, res) {
    try {
        res.status(200).send(Venta.create(req.params.fecha, req.params.descrip, req.params.precioT));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

router.get('/readVenta/:fecha', function (req, res) {
    try {
        res.status(200).send(Venta.read(req.params.fecha));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

router.get('/deleteVenta/:id', function (req, res) {
    try {
        res.status(200).send(Venta.delete(req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

export const ventaRouter = router;