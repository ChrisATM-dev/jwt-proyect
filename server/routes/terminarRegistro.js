const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const validInfo = require("../middleware/validinfo");

router.put("/", authorization, validInfo, async (req, res, next) => {
    req.customPath = "/completeRegister"; // Define una propiedad personalizada
    next();
  }, validInfo, async (req, res) => {
  try {
    const { nombre, apellidoP, apellidoM, fechaNacimiento, genero, universidad, carrera } = req.body;
    const complete = true;

    // Realizar la consulta de actualización
    const user = await pool.query(
      "UPDATE users SET is_complete = $1, first_name = $2, last_name_p = $3, last_name_m = $4, gender = $5, birth_date = $6, university = $7, career = $8 WHERE user_id = $9",
      [complete, nombre, apellidoP, apellidoM, genero, fechaNacimiento, universidad, carrera, req.user]
    );

    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
