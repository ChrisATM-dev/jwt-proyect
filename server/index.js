const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());

// ROUTES //

//register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//Completar registro
app.use("/completeRegister", require("./routes/terminarRegistro"));

//dashboar route
app.use("/dashboard", require("./routes/dashboard"))

app.use("/gato", require("./routes/gato"));

app.listen(5000, () => {
    console.log("server is running on port 5000");
})

