const express = require('express');
const index = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { read, readById, insert, update, deleteById } = require('./operaciones');

const configCors = {
    origin: "http://localhost:3000"
};

index.use(cors(configCors));
index.use(bodyParser.urlencoded({ extended: true }))
index.use(bodyParser.json())

index.get("/", (req, res) => {
    read(result => {
        res.status(200).send(result);
    });
});

index.get("/:id", (req, res) => {
    readById(req.params.id, result => {
        res.status(200).send(result);
    })
})

index.post("/", (req, res) => {
    insert(req.body, () => {
        res.status(200);
    });
});

index.put("/", (req, res) => {
    update(req.body, result => {
        res.status(200).send(result);
    })
});

index.delete("/:id", (req, res) => {
    deleteById(req.params.id, result => {
        res.status(200).send(result);
    });
});

index.listen(4000, () => {
    console.log("funciona");
});
