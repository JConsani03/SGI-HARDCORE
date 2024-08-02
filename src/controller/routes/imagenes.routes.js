// ? Módulos de terceros o estándar
import { Router } from "express";

// ? Módulos propios
import imagenModel from '../../models/imagenes.model.js'

const router = Router();

router.post('/createImagen/:adminID', function (req, res) {
    try {
        res.status(200).send(imagenModel.create(req.params.adminID, req.body));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

router.get('/updateImagen/:adminID/:idProducto/:id', function (req, res) {
    try {
        res.status(200).send(imagenModel.update(req.params.adminID, req.params.idProducto, req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

router.get('/readImagen/:id', function (req, res) {
    try {
        res.status(200).send(imagenModel.read(req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

router.get('/deleteImagen/:adminID/:id', function (req, res) {
    try {
        res.status(200).send(imagenModel.delete(req.params.adminID, req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

export const imagenesRoutes = router; 