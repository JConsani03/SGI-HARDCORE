import sqlite from 'better-sqlite3';
import { createHash } from 'crypto';

const db = new sqlite('./src/controller/database.db');

db.prepare(
    `CREATE TABLE IF NOT EXISTS Usuarios(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    usuario TEXT UNIQUE, 
    pass TEXT, 
    type INTEGER
    )`
).run();

function hashDate(user, pass) {
    const passHash = createHash('sha256');
    const userHash = createHash('sha256');

    const hashedUser = userHash.update(user.trim()).digest('hex');
    const hashedPass = passHash.update(pass.trim()).digest('hex');

    return {hashedUser, hashedPass};
}

try{
    let aux = hashDate('admin', 'admin');
    db.prepare(`INSERT INTO Usuarios (id, usuario, pass, type) VALUES(?, ?, ?, ?)`).run(1, aux.hashedUser, aux.hashedPass, 1);
}catch{

}

function comprobarAdmin(adminID) {
    let json = db.prepare(`SELECT * FROM Usuarios WHERE id = ? AND type = 1`).get(adminID);
    return (json != null);
}

export default class $$Usuarios {

    static create(adminID, user, pass, type) {
        console.log(user.trim().length, pass.trim().length)
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        if (user.trim().length < 3) throw new Error('El nombre de usuario debe tener como mínimo 3 caracteres.');
        if (pass.trim().length < 6) throw new Error('La contraseña debe tener como mínimo 6 caracteres.');

        try {
            const hashedData = hashDate(user, pass);
            db.prepare(`INSERT INTO Usuarios (usuario, pass, type) VALUES(?, ?, ?)`).run(hashedData.hashedUser, hashedData.hashedPass, type);
        } catch (err) {
            let cadena = err.message.split(' ');
            console.log(cadena);
            if (cadena[0] == 'UNIQUE') throw new Error('Este usuario ya existe.');
        }


        return { 'message': 'OK' };
    }

    static read(adminID, user) {
        let res
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        if (user == -1) {
            res = db.prepare(`SELECT * FROM Usuarios`).all();
        } else {
            res = db.prepare(`SELECT * FROM Usuarios WHERE usuario LIKE ?`).all(`%${user}%`);
        }

        return res;
    }

    static update(adminID, userID, newU, newP, newT) {
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        if (newU.length < 3) throw new Error('El nombre de usuario debe tener como mínimo 3 caracteres.');
        if (newP.length < 6) throw new Error('La contraseña debe tener como mínimo 6 caracteres.');
        let res = db.prepare(`UPDATE Usuarios SET usuario = ?, pass = ?, type = ? WHERE id = ?`).run(newU, newP, newT, userID);
        return res;

    }

    static delete(adminID, userID) {
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        db.prepare(`DELETE FROM Usuarios WHERE id = ?`).run(userID);
        return { 'message': 'OK' };

    }

    static login(user, pass) {
        const hashedData = hashDate(user, pass);
        let json = db.prepare(`SELECT * FROM Usuarios WHERE usuario = ?`).get(hashedData.hashedUser);
        if (json) {

            if (json.pass == hashedData.hashedPass) {
                return { 'message': 'OK' };
            } else {
                throw new Error('El usuario o contraseña son incorrectos.');
            }

        } else {
            throw new Error('Usuario o contraseñas inválidos.');
        }
    }

}