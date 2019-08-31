const db = require("../models");
// const fs = require("fs");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


module.exports = app => {
    // Get all examples


    app.get("/api/examples", (req, res) => {
        db.Example.findAll({}).then(dbExamples => {
            res.json(dbExamples);
        });
    });

    app.get("/api/:id", (req, res) => {
        db.Image.findAll({
            where: {
                id: req.params.id
            }
        }).then(dbResponse => {
            // OMG THIS TOOK ME WAY TOO LONG TO FIGURE OUT
            res.send(dbResponse[0].data);
        }).catch(error => {
            res.send(error);
        });
    });

    // Create a new example
    app.post("/api/examples", (req, res) => {
        db.Example.create(req.body).then(dbExample => {
            res.send(dbExample);
        });
    });

    app.post("/api/upload", upload.single("photo"), (req, res) => {

        var name = req.file.originalname;
        if (req.file && (req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/png")) {

            db.Image.create({
                data: req.file.buffer,
                name: name
            }).then(success => {
                console.log("image uploaded");
                res.json(success);
            });


        } else {
            throw "error";
        }
    });


    // Delete an example by id
    app.delete("/api/examples/:id", (req, res) => {
        db.Example.destroy({ where: { id: req.params.id } }).then(dbExample => {
            res.json(dbExample);
        });
    });
};