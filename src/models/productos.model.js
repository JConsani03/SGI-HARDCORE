import sqlite from 'better-sqlite3';

const db = new sqlite('./src/controller/database.db');

db.prepare(`CREATE TABLE IF NOT EXISTS Productos
    (id INTEGER PRIMARY KEY AUTOINCREMENT, 
    nombre TEXT, 
    descrip TEXT, 
    stock INTEGER, 
    priceU INTEGER, 
    idImage INTEGER, 
    FOREIGN KEY (idImage) REFERENCES Imagenes(id))`).run();

function comprobarAdmin(adminID) {
    let json = db.prepare(`SELECT * FROM Usuarios WHERE id = ? AND type = 1`).get(adminID);
    return (json != null);
}

export default class $$Productos {

    static create(adminID, nombre, descrip, stock, priceU, idImage) {
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        let id = db.prepare(`INSERT INTO Productos (nombre, descrip, stock, priceU, idImage) VALUES(?, ?, ?, ?, ?)`).run(nombre, descrip, stock, priceU, idImage);
        return { 'id': id.lastInsertRowid };
    }

    static read(nombre) {
        let res;
        if (nombre == -1) {
            res = db.prepare(`SELECT * FROM Productos`).all();
        } else {
            res = db.prepare(`SELECT * FROM Productos WHERE nombre LIKE ?`).all(`%${nombre}%`);
        }

        return res;
    }

    static get(id) {
        let res = db.prepare(`SELECT * FROM Productos WHERE id = ?`).get(id);
        return res;
    }

    static update(adminID, id, nombre, descrip, stock, priceU) {
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        let res = db.prepare(`UPDATE Productos SET nombre = ?, descrip = ?, stock = ?, priceU = ? WHERE id = ?`).run(nombre, descrip, stock, priceU, id);
        return res;

    }

    static delete(adminID, id) {
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        db.prepare(`DELETE FROM Productos WHERE id = ?`).run(id);
        return { 'message': 'OK' };
    }

}