const jwt = require('jsonwebtoken');
require('dotenv').config();

//JWT: request token
const requestToken = async (req, res) => {
    // Validate User Here
    let { ua_number, password } = req.body;

    // Then generate JWT Token
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        ua_number,
        password
    }
  
    const token = jwt.sign(data, jwtSecretKey);
  
    res.send(token);
};

//NOTE: this will be deleted soon
const validateToken = async (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let accessToken = (req.header('Authorization') !== undefined) ? req.header('Authorization').split(" ")[1] : '';
    if(accessToken == ''){
        // Access Denied
        return res.status(401).send('Access Denied: Authorization failed.');
    }
  
    try {
        const token = accessToken;
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return res.send("Successfully Verified");
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
}

module.exports = {
    requestToken,
    validateToken
};






