const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization")

router.get("/", (req, res) =>{
    try {

        res.json({gato: "Gato TOM"});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;