

const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({ msg: "Enter Token First" });
    } else {
      try {
        const decoded = jwt.verify(token, process.env.jwtpasscode);
        //console.log(token)
        if (decoded) {

            //console.log(decoded)
          
            req.body.id = decoded.email
          
          next();
        } else {
          return res.status(401).send({ msg: "Wrong Token" });
        }
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Server error.' });
      }
    }
  };
  
  module.exports = {
    authenticate
  };