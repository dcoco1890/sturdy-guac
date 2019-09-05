const db = require("../models");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


module.exports = app => {

    // had to move this up, the api/:id was getting called instead
    app.get("/api/map", (req, res) => {
        db.Image.findAndCountAll({}).then(dbImages => {
            var numMarker = dbImages.count;
            var info = dbImages.rows; // all the information as an array I believe
            console.log(`\n${numMarker} markers found! \n`);
            res.json(info);
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
    // app.post("/api/:loc", (req, res) => {
    //     db.Image.create({
    //         where: {
    //             //lat and long
    //         }
    //     });
    // });

    app.post("/api/upload", upload.single("photo"), (req, res) => {

        var name = req.file.originalname;
        if (req.file && (req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/png")) {

            db.Image.create({
                data: req.file.buffer,
                name: name,
                lat: req.body.lat,
                long: req.body.long
            }).then(success => {
                console.log("image uploaded");
                res.json(success);
            });


        } else {
            throw "error";
        }
    });

};