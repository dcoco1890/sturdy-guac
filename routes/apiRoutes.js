const db = require("../models");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


module.exports = app => {

    app.get("/api/:id", (req, res) => {
        db.Image.findAll({
            where: {
                id: req.params.id
            }
        }).then(dbResponse => {
            // OMG THIS TOOK ME WAY TOO LONG TO FIGURE OUT
            console.log(dbResponse);
            console.log(dbResponse[0]);
            res.send(dbResponse[0].data);
        }).catch(error => {
            res.send(error);
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

};