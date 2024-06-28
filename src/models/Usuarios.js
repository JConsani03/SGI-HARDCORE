import sqlite from 'better-sqlite3';

const db = new sqlite('../server/database.db');

db.prepare(
    'CREATE TABLE IF NOT EXISTS Usuarios' +
    '(id INTEGER PRIMARY KEY AUTOINCREMENT, usuario TEXT UNIQUE, pass TEXT, type INTEGER)').run();

function comprobarAdmin(adminID) {
    let json = db.prepare(`SELECT * FROM Usuarios WHERE id = ? AND type = 1`).get(adminID);
    return (json != null);
}

export default class $$Usuarios {

    static create(adminID, user, pass, type) {
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        if (user.length < 3) throw new Error('El nombre de usuario debe tener como mínimo 3 caracteres.');
        if (pass.length < 6) throw new Error('La contraseña debe tener como mínimo 6 caracteres.');

        db.prepare(`INSERT INTO Usuarios (usuario, pass, type) VALUES(?, ?, ?)`).run(user, pass, type);

        return { 'message': 'OK' };
    }

    static read(adminID, user) {
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        let res = db.prepare(`SELECT * FROM Usuarios WHERE usuario LIKE ?`).all(`${user}%`);
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
        let res = db.prepare(`DELETE FROM Usuarios WHERE id = ?`).run(userID);
        return res;

    }

    static login(user, pass) {
        let json = db.prepare(`SELECT * FROM Usuarios WHERE usuario = ?`).get(user);
        if (json) {

            if (json.pass == pass) {
                return { 'message': 'OK' };
            } else {
                throw new Error('El usuario o contraseña son incorrectos.');
            }

        } else {
            throw new Error('Usuario o contraseñas inválidos.');
        }
    }

}