module.exports = function(req, res, next) {
    const { email, name, password, nombre, apellidoP, apellidoM, fechaNacimiento, genero, universidad, carrera } = req.body;
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/register") {
      // Verificar que todos los campos requeridos estén presentes y no vacíos
      if (![email, name, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }

    } else if (req.path === "/login") {
      // Verificar que los campos de login estén presentes y no vacíos
      if (![email, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }

    } else if (req.customPath === "/completeRegister") {  
      // Verificar que todos los campos necesarios para completar el registro estén presentes
      if (![nombre, apellidoP, apellidoM, fechaNacimiento, genero, universidad, carrera].every(Boolean)) {
        return res.status(401).json("Missing Credentials for Update");
      }
    }
  
    next();
  };
  