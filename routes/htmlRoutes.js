const db = require("../models");

module.exports = app => {

    // index page
    app.get("/", (req, res) => {
        db.Example.findAll({}).then(dbExamples => {
            res.render("index", {
                msg: "SKREET_art",
                examples: dbExamples
            });
        });
    });

    // map page
    app.get("/map", (req, res) => {
        db.Example.findAll({}).then(() => {
            res.render("map", {});
        });
    });

    // example page and pass in an example by id
    app.get("/example/:id", (req, res) => {
        db.Example.findOne({ where: { id: req.params.id } }).then(dbExample => {
            res.render("example", {
                example: dbExample
            });
        });
    });

    app.get("/upload", (req, res) => {
        res.render("upload");
    });

    // 404 page for any unmatched routes
    app.get("*", (req, res) => {
        res.render("404");
    });
};