// ? Módulos de terceros o estándar
import { Router } from "express";

// ? Módulos propios
import usuariosModel from '../../models/usuarios.model.js';

const router = Router();

router.get('/loginUser/:user/:pass', function (req, res) {
    try {
        res.status(200).send(usuariosModel.login(req.params.user, req.params.pass));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

router.get('/createUsuario/:adminID/:user/:pass/:type', function (req, res) {
    try {
        res.status(200).send(usuariosModel.create(req.params.adminID, req.params.user, req.params.pass, req.params.type));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

router.get('/readUsuario/:adminID/:user', function (req, res) {
    try {
        res.status(200).send(usuariosModel.read(req.params.adminID, req.params.user));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

router.get('/updateUsuario/:adminID/:userID/:newU/:newP/:newT', function (req, res) {
    try {
        res.status(200).send(usuariosModel.update(req.params.adminID, req.params.userID, req.params.newU, req.params.newP, req.params.newT));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

router.get('/deleteUsuario/:adminID/:userID', function (req, res) {
    try {
        res.status(200).send(usuariosModel.delete(req.params.adminID, req.params.userID));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

export const usuariosRoutes = router; 