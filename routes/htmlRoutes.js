const db = require("../models");

module.exports = app => {

    // index page
    app.get("/", (req, res) => {
        db.Image.findAll({}).then(dbImage => {
            res.render("index", {
                images: dbImage
            });
        });
    });

    // map page
    app.get("/map", (req, res) => {
        db.Image.findAll({}).then(() => {
            res.render("map", {});
        });
    });

    // upload page
    app.get("/upload", (req, res) => {
        res.render("upload");
    });

    // gallery page
    app.get("/gallery", (req, res) => {
        db.Image.findAndCountAll({}).then(dbImages => {
            console.log(dbImages.count);
            // console.log(dbImages.rows);
            console.log(`\n${dbImages.count} pictures found! \n`);
            res.render("gallery-body", {
                layout: "gallery",
                images: dbImages.rows
            });
        });
    });

    // get request for a specific image. Finds it by ID and renders the images hndlbr 
    app.get("/img/:id", (req, res) => {
        db.Image.findOne({ where: { id: req.params.id } }).then(dbImage => {

            res.render("images", {
                img: dbImage
            });
        });
    });

    // 404 page for any unmatched routes
    app.get("*", (req, res) => {
        res.render("404");
    });
};