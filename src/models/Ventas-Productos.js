
import sqlite from 'better-sqlite3';

const db = new sqlite('./server/database.db');

db.prepare("CREATE TABLE IF NOT EXISTS Ventas_Productos ("
                    + "id_Venta INTEGER,"
                    + "id_Producto INTEGER,"
                    + "cantidad INTEGER, "
                    + "FOREIGN KEY(id_Venta) REFERENCES Ventas(id) ON DELETE CASCADE,"
                    + "FOREIGN KEY(id_Producto) REFERENCES Productos(id)"
                    + ")"
).run();

export default class $$VentasProductos {

    static create(id_Venta, id_Producto, cantidad) {
        db.prepare(`INSERT INTO Ventas_Productos (id_Venta, id_Producto, cantidad) VALUES(?, ?, ?)`).run(id_Venta, id_Producto, cantidad);
        return { 'message': 'OK' };
    }

    static read(id_Venta) {
        let res = db.prepare(`SELECT * FROM Ventas_Productos WHERE id_Venta = ?`).all(id_Venta);
        return res;
    }

}