const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/env")
module.exports = (authorization) => {
    const token = authorization.split(" ")[1];
    if(token) {
        const decoded = jwt.verify(token, jwtSecret);
        return decoded;
    }

    return null;
}