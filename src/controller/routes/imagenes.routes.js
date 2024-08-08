// ? Módulos de terceros o estándar
import { Router } from "express";

// ? Módulos propios
import imagenModel from '../../models/imagenes.model.js'

const router = Router();

router.post('/', function (req, res) {
    try {
        console.log('OKOKOK');
        
        res.status(200).send(imagenModel.create(req.body));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

router.put('/', function (req, res) {
    try {
        console.log('------------');
        
        console.log(req.body);
        
        res.status(200).send(imagenModel.update(req.body));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

router.get('/:id', function (req, res) {
    try {

        res.status(200).send(imagenModel.read(req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

router.delete('/:adminID/:id', function (req, res) {
    try {
        res.status(200).send(imagenModel.delete(req.params.adminID, req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

export const imagenesRoutes = router; 