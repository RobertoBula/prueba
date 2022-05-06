const connection = require("./database");

function insert(body, callback) {
    connection.query("INSERT INTO usuarios set ?", body, function (err, result) {
        if (err) throw err;
        callback(result);
    });
}

function read(callback) {
    connection.query('SELECT * FROM usuarios', function (err, result) {
        if (err) throw err
        callback(result);
    });
}

function readById(id, callback) {
    connection.query(`SELECT * FROM usuarios WHERE id = ${id}`, function (err, result) {
        if (err) throw err
        callback(result[0]);
    });
}

function update(body, callback) {
    // TODO: finish fields
    connection.query(`
        UPDATE usuarios SET
            nombre = "${body.nombre}",
            tipoIden = "${body.tipoIden}",
            numeroIden = "${body.numeroIden}",
            fecha = "${body.fecha}",
            direccion = "${body.direccion}",
            edad = ${body.edad}
            WHERE id = ${body.id}`,
        function (err, result) {
            if (err) throw err
            callback(result);
        });
}

function deleteById(id, callback) {
    connection.query(`DELETE FROM usuarios WHERE id = ${id}`, (err, result) => {
        if (err) throw err
        callback(result);
    });
}

module.exports = { insert, read, readById, update, deleteById };