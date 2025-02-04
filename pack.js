const sqlite3 = require('sqlite3').verbose();

// Crear o abrir la base de datos
let db = new sqlite3.Database('./mi-base-de-datos.db', (err) => {
    if (err) {
        console.error('Error al abrir la base de datos', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

// Crear una tabla
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        edad INTEGER
    )`, (err) => {
        if (err) {
            console.error('Error al crear la tabla', err.message);
        } else {
            console.log('Tabla "usuarios" creada o ya existente.');
        }
    });

    // Insertar datos en la tabla
    db.run(`INSERT INTO usuarios (nombre, edad) VALUES (?, ?)`, ['Juan', 25], function(err) {
        if (err) {
            return console.error('Error al insertar datos', err.message);
        }
        console.log(`Se insertó una fila con el ID ${this.lastID}`);
    });

    // Consultar datos de la tabla
    db.each(`SELECT id, nombre, edad FROM usuarios`, (err, row) => {
        if (err) {
            console.error('Error al consultar datos', err.message);
        }
        console.log(row.id, row.nombre, row.edad);
    });
});

// Cerrar la base de datos
db.close((err) => {
    if (err) {
        console.error('Error al cerrar la base de datos', err.message);
    } else {
        console.log('Conexión a la base de datos cerrada.');
    }
});