// ? Módulos de terceros o estándar
import { Router } from "express";
import jwt from 'jsonwebtoken';

// ? Módulos propios
import Usuario from '../../models/usuario.model.js';

const router = Router();
const SECRET_KEY = 'holacomoestasyomuybienytuahconchaleyobien38959193123812938194810948198349120';

router.get('/loginUser/:user/:pass', function (req, res) {
    try {
        const USER = req.params.user;
        const PASS = req.params.pass;

        res.status(200).send(Usuario.login(USER, PASS));

        const token = jwt.sign({ PASS }, SECRET_KEY, { expiresIn: '1h' });
        res.cookie('user', token, {
            httpOnly: true, // Evita que el cliente acceda a la cookie desde JavaScript
            maxAge: 3600000, // 1 hora
        });
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

router.get('/createUsuario/:adminID/:user/:pass/:type', function (req, res) {
    try {
        res.status(200).send(Usuario.create(req.params.adminID, req.params.user, req.params.pass, req.params.type));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

router.get('/readUsuario/:adminID/:user', function (req, res) {
    try {
        res.status(200).send(Usuario.read(req.params.adminID, req.params.user));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

router.get('/updateUsuario/:adminID/:userID/:newU/:newP/:newT', function (req, res) {
    try {
        res.status(200).send(Usuario.update(req.params.adminID, req.params.userID, req.params.newU, req.params.newP, req.params.newT));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

router.get('/deleteUsuario/:adminID/:userID', function (req, res) {
    try {
        res.status(200).send(Usuario.delete(req.params.adminID, req.params.userID));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

export const usuarioRouter = router; 