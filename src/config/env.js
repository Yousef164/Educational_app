const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    port: process.env.PORT || 3000,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DAILECT,

    emailApp: process.env.EMAIL_APP,
    passApp: process.env.PASSWORD_APP,
    urlApp: process.env.URL_APP,

    jwtSecret: process.env.JWT_SECRET
}