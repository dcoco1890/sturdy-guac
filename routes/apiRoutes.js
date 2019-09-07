const db = require("../models");
const bcrypt = require("bcrypt");
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

    // register route
    app.post("/register", async (req, res) => {

        // hash the password provided by the user with bcrypt so that
        // we are never storing plain text passwords. This is crucial
        // for keeping your db clean of sensitive data
        const hash = bcrypt.hashSync(req.body.password, 10);

        try {
            // create a new user with the password hash from bcrypt
            let user = await db.User.create(
                Object.assign(req.body, { password: hash })
            );

            // data will be an object with the user and it's authToken
            let data = await user.authorize();

            // send back the new user and auth token to the
            // client { user, authToken }
            return res.json(data);

        } catch (err) {
            return res.status(400).send(err);
        }

    });

    // login route
    app.post("/login", async (req, res) => {
        const { username, password } = req.body;

        // if the username / password is missing, we use status code 400
        // indicating a bad request was made and send back a message
        if (!username || !password) {
            return res.status(400).send(
                "Request missing username or password param"
            );
        }

        try {

            // we will cover the user authenticate method in the next section
            let user = await db.User.authenticate(username, password);

            return res.json(user);

        } catch (err) {
            return res.status(400).send("invalid username or password");
        }

    });

    // logout route
    app.delete("/logout", async (req, res) => {

        console.log(req.headers.cookie);

        // because the logout request needs to be send with
        // authorization we should have access to the user
        // on the req object, so we will try to find it and
        // call the model method logout
        const { user, cookies: { auth_token: authToken } } = req;

        // we only want to attempt a logout if the user is
        // present in the req object, meaning it already
        // passed the authentication middleware. There is no reason
        // the authToken should be missing at this point, check anyway
        if (user && authToken) {
            await req.user.logout(authToken);
            return res.status(204).send();
        }

        // if the user missing, the user is not logged in, hence we
        // use status code 400 indicating a bad request was made
        // and send back a message
        return res.status(400).send(
            { errors: [{ message: "not authenticated" }] }
        );
    });

    // me route - get the currently logged in user
    app.get("/me", (req, res) => {
        if (req.user) {
            return res.send(req.user);
        }
        res.status(404).send(
            { errors: [{ message: "missing auth token" }] }
        );
    });

};