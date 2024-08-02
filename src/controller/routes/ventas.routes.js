// ? Módulos de terceros o estándar
import { Router } from "express";

// ? Módulos propios
import ventasModel from '../../models/ventas.model.js';

const router = Router();

router.get('/createVenta/:fecha/:descrip/:precioT', function (req, res) {
    try {
        res.status(200).send(ventasModel.create(req.params.fecha, req.params.descrip, req.params.precioT));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

router.get('/readVenta/:fecha', function (req, res) {
    try {
        res.status(200).send(ventasModel.read(req.params.fecha));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

router.get('/deleteVenta/:id', function (req, res) {
    try {
        res.status(200).send(ventasModel.delete(req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

export const ventasRoutes = router;