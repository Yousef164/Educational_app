const authResolvers = require("./resources/auth.resolver");
const homeResolvers = require("./resources/home.resolver");
const teacherAndStudentPages = require("./resources/teacherAndStudentPages.resolver")

module.exports = [authResolvers, homeResolvers, teacherAndStudentPages];
