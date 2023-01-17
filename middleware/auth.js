const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.auth = (req, res, next) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let accessToken = (req.header('Authorization') !== undefined) ? req.header('Authorization').split(" ")[1] : '';

    if(accessToken == ''){
        // Access Denied
        return res.status(401).send('Access Denied: Authorization failed.');
    }
  
    try {
        const verified = jwt.verify(accessToken, jwtSecretKey);
        if(!verified){
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }

    next();
}

