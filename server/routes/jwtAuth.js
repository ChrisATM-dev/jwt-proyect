const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validinfo");
const Authorization = require("../middleware/authorization");
const authorization = require("../middleware/authorization");

//registering
router.post("/register", validInfo, async (req, res) => {
    try{
        //1. desestructure the req.body (name, email, password)
        const { name, email, password } = req.body;

        //2. check if user exist (if user exist then throw error)
        const user = await pool.query("Select * from users where user_email = $1",[email]);
        

        //res.json(user.rows) se usa para ver lo que retorna ??????????

        if(user.rows.length !== 0){
            return res.status(401).json("User already exist");
        }

        //3. bcrypt the user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        //4. enter the new user inside our database
        const newUser = await pool.query("INSERT INTO users (user_email, user_password, user_name) VALUES ($1, $2, $3) returning *", [email, bcryptPassword, name]);
        //res.status(201).send("Successfully registered user");, solo me muestra el mensaje pero no pueden haber mas de un status?
        
        //5. genrating our jwt token
        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({ token });


    }catch (err){
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})

//login route
router.post("/login", validInfo, async (req, res) => {
    try {
        //1. destructure the req.body
        const {email, password} = req.body;

        //2. check if user doesn't exist (if not then we throw error)
        const user = await pool.query("select * from users where user_email = $1", [email]);

        if (user.rows.length === 0){
            return res.status(401).json("Password or Email is incorrect");

        }

        //3. check if incomming password is the same the database passwonrd
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if(!validPassword){
            return res.status(401).json("Password or Email is incorrect")
        }
 
        //4. give hen the jwt token
        const token = jwtGenerator(user.rows[0].user_id);
        const id = user.rows[0].user_id;
        res.json({ token , id});


    }catch (err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})


router.get("/is-verify", authorization, async (req, res) => {
    try {
        const user = await pool.query("SELECT is_complete FROM users WHERE user_id = $1", [req.user]);
        res.json({ verify: true, is_Complete: user.rows[0].is_complete });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;
