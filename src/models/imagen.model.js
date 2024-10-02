import sqlite from 'better-sqlite3';

const db = new sqlite('./src/controller/database.db');

db.prepare(`
    CREATE TABLE IF NOT EXISTS Imagenes 
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        data BLOB, 
        idProducto INTEGER, 
        FOREIGN KEY (idProducto) REFERENCES Productos(id) ON DELETE CASCADE
    )
`).run();

function comprobarAdmin(adminID) {
    let json = db.prepare(`SELECT * FROM Usuarios WHERE id = ? AND type = 1`).get(adminID);
    return (json != null);
}

export default class Imagen {

    static create(JSONImage) {
        let buffer = Buffer.from(JSONImage.data, 'base64');

        if (!comprobarAdmin(JSONImage.adminID)) throw new Error('No tienes permisos.');

        let res = db.prepare(`INSERT INTO Imagenes (data) VALUES(?)`).run(buffer);
        return { 'id': res.lastInsertRowid };
    }

    static update(JSONImage){
        if (!comprobarAdmin(JSONImage.adminID)) throw new Error('No tienes permisos.');

        let res = db.prepare(`UPDATE Imagenes SET idProducto = ? WHERE id = ?`).run(JSONImage.idProducto, JSONImage.id);
        return {'res': res.changes};
    }

    static read(id) {
        let res = db.prepare(`SELECT * FROM Imagenes WHERE idProducto = ?`).get(id);
        return res.data;
    }

    static delete(adminID, id) {
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');

        let res = db.prepare(`DELETE FROM Imagenes WHERE id = ?`).run(id);
        return res;
    }


}