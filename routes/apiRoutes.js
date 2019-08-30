const db = require("../models");
// const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: __dirname + "/uploads/images" });

module.exports = app => {
    // Get all examples
    app.get("/api/examples", (req, res) => {
        db.Example.findAll({}).then(dbExamples => {
            res.json(dbExamples);
        });
    });

    // Create a new example
    app.post("/api/examples", (req, res) => {
        db.Example.create(req.body).then(dbExample => {
            res.json(dbExample);
        });
    });

    app.post("/api/upload", upload.single("photo"), (req, res) => {
        if (req.file) {
            console.log(req.file);
            res.json(req.file);
        } else { throw "error"; }
    });


    // Delete an example by id
    app.delete("/api/examples/:id", (req, res) => {
        db.Example.destroy({ where: { id: req.params.id } }).then(dbExample => {
            res.json(dbExample);
        });
    });
};