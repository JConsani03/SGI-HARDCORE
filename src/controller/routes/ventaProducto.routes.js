// ? Módulos de terceros o estándar
import { Router } from "express";

// ? Módulos propios
import VentaProducto from '../../models/ventaProducto.model.js';

const router = Router();

router.get('/createVentaProducto/:id_Venta/:id_Producto/:cantidad', function (req, res) {
    try {
        res.status(200).send(VentaProducto.create(req.params.id_Venta, req.params.id_Producto, req.params.cantidad));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

router.get('/readVentaProducto/:id_Venta', function (req, res) {
    try {
        res.status(200).send(VentaProducto.read(req.params.id_Venta));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

export const ventaProductoRouter = router;