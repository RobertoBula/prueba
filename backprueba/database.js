const mysql = require("mysql");

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"prueba_bd"
});

connection.connect();

module.exports = connection;