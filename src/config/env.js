const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    port: process.env.PORT || 3000,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,

    emailApp: process.env.EMAIL_APP,
    passApp: process.env.PASSWORD_APP,
    urlApp: process.env.URL_APP,

    paymobBase: process.env.PAYMOB_BASE,
    apiKey: process.env.API_KEY,
    integrationId: process.env.INTEGRATION_ID,
    iframeId: process.env.IFRAME_ID,
    paymobHmac: process.env.PAYMOB_HMAC,

    jwtSecret: process.env.JWT_SECRET
}