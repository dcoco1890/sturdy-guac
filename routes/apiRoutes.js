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

    // Create a new example
    app.post("/api/examples", (req, res) => {
        db.Example.create(req.body).then(dbExample => {
            res.json(dbExample);
        });
    });

    app.post("/api/upload", upload.single("photo"), (req, res) => {
        if (req.file && (req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/png")) {
            // console.log(typeof req.file.buffer.data);
            var newImg = {

                // kind: req.file.mimetype,
                // name: req.file.originalname,
                data: req.file.buffer
            };
            db.Image.create(newImg).then(success => {
                console.log("image uploaded");
                // console.log(newImg);
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