const db = require("../models");

module.exports = app => {

    // home page
    app.get("/", (req, res) => {
        // db.User.findAndCountAll({}).then(dbUsers => {
        // console.log(dbUsers.rows[0].dataValues.username);
        res.render("index", {
            // user: dbUsers.rows[0].dataValues.username
        });
    });

    // registration page
    app.get("/register", (req, res) => {
        res.render("index", {
            user: req.user
        });
    });
    
    // upload page
    app.get("/upload", (req, res) => {
        res.render("map-upload");
    });

    // map page
    app.get("/map", (req, res) => {
        db.Image.findAndCountAll({}).then(dbImages => {
            console.log(dbImages.count);
            // console.log(dbImages.rows);
            console.log(`\n${dbImages.count} pictures found! \n`);
            res.render("map-gallery", {
                images: dbImages.rows
            });
        });
    });

    // gallery page
    app.get("/gallery", (req, res) => {
        db.Image.findAndCountAll({}).then(dbImages => {
            console.log(dbImages.count);
            // console.log(dbImages.rows);
            console.log(`\n${dbImages.count} pictures found! \n`);
            res.render("gallery-body", {
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
    
    // future project, render specific marker from DB
    // app.get("/map/:id", (req, res) => {
    //     db.Image.findOne({ where: { id: req.params.id } }).then(dbImage => {
    //         var x = dbImage;
    //         console.log(x); //thnis code is nothing
    //         res.render("404");
    //     });
    // });

};