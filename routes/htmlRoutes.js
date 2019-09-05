const db = require("../models");

module.exports = app => {

    // home page
    // I removed the DB call here, currently we are not pulling any images
    // here so there was no need.
    app.get("/", (req, res) => {
        res.render("index");

    });

    // map page
    app.get("/map", (req, res) => {
        res.render("map", {});
    });

    app.get("/map/all", (req, res) => {
        res.render("all-markers");
    });

    // future project, render specific marker from DB
    // app.get("/map/:id", (req, res) => {
    //     db.Image.findOne({ where: { id: req.params.id } }).then(dbImage => {
    //         var x = dbImage;
    //         console.log(x); //thnis code is nothing
    //         res.render("404");
    //     });
    // });

    // upload page
    // we might not need this page anymore
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