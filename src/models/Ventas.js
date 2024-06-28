import sqlite from 'better-sqlite3';

const db = new sqlite('../server/database.db');

db.prepare('CREATE TABLE IF NOT EXISTS Ventas' +
    '(id INTEGER PRIMARY KEY AUTOINCREMENT, fecha TEXT, descrip TEXT, precioT INTEGER)').run();

export default class $$Ventas {

    static create(fecha, descrip, precioT) {
        db.prepare(`INSERT INTO Ventas (fecha, descrip, precioT) VALUES(?, ?, ?)`).run(fecha, descrip, precioT);
        return { 'message': 'OK' };
    }

    static read(fecha) {
        let res = db.prepare(`SELECT * FROM Ventas WHERE fecha LIKE ?`).all(`${fecha}%`);
        return res;
    }

    static delete(id) {
        let res = db.prepare(`DELETE FROM Ventas WHERE id = ?`).run(id);
        return res;
    }

}