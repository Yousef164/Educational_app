const { mergeTypeDefs } = require("@graphql-tools/merge")

const authTypeDefs = require("./resources/auth.typeDefs");
const homeTypeDefs = require("./resources/home.typeDefs");
const dbTypeDefs   = require("./resources/db.typeDefs");
const teacherAndStudentPages = require("./resources/teacherAndStudentPages.typeDefs");

const typeDefs = mergeTypeDefs([authTypeDefs, dbTypeDefs, homeTypeDefs, teacherAndStudentPages])

module.exports = typeDefs;
