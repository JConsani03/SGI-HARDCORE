const express = require('express');
const server = express();

const cors = require('cors');
const path = require('path');
const fs = require('fs');

const sqlite = require('better-sqlite3');
const db = new sqlite(`./database.db`);

db.prepare('CREATE TABLE IF NOT EXISTS Usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, usuario TEXT UNIQUE, pass TEXT)').run();
db.prepare('CREATE TABLE IF NOT EXISTS Productos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, descrip TEXT, stock INTEGER, priceU INTEGER)').run();

try{
    db.prepare('INSERT INTO Usuarios (usuario, pass) VALUES(\'andres03\', \'1234\')').run();
}catch{
    console.log("error");
}

class response{
    constructor(res, body){
        this.res = res;
        this.body = body;
    }
}

server.use(express.json());
server.use(cors());
server.use(express.static(path.dirname(__dirname) + '\\assets\\fonts'));
server.use(express.static(path.dirname(__dirname) + '\\assets\\views\\landing'));
server.use(express.static(path.dirname(__dirname) + '\\assets\\views\\login'));
server.use(express.static(path.dirname(__dirname) + '\\assets\\views\\dashboard'));
server.use(express.static(path.dirname(__dirname) + '\\assets\\img'));

server.get('/login/:user/:pass', function (req, res) {
    let json = db.prepare(`SELECT * FROM Usuarios WHERE usuario = \'${req.params.user}\'`).all();
    if(json.length != 0){
        if(req.params.pass == json[0].pass){
            res.send(new response('OK', ''));
            return;
        } else {
            res.send(new response('ERROR', ''));
            return;
        }
    }
    res.send(new response('NONE', ''));
});

server.get('/landing', function (req, res){
    fs.readFile(path.dirname(__dirname) + '\\assets\\views\\landing\\index.html', function (err, buffer){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html').send(buffer);
    });
});
server.get('/login', function (req, res){
    fs.readFile(path.dirname(__dirname) + '\\assets\\views\\login\\login.html', function (err, buffer){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html').send(buffer);
    });
});
server.get('/home', function (req, res){
    fs.readFile(path.dirname(__dirname) + '\\assets\\views\\dashboard\\dashboard.html', function (err, buffer){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html').send(buffer);
    });
});

server.use(function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Recurso no encontrado.');
});

server.listen(8080, function(){
    console.log('Online!');
}); 