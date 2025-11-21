const { DataTypes } = require("sequelize");

const db = {};

const conn             = require("../config/db_connect");
const typeDefs = require("../typeDefs");
db.User                = require("./schema/users")(conn, DataTypes);
db.Student             = require("./schema/student")(conn, DataTypes);
db.Teacher             = require("./schema/teacher")(conn, DataTypes);
db.studentMark         = require("./schema/studentMark")(conn, DataTypes);
db.Notification        = require("./schema/notification")(conn, DataTypes);
db.studentSubscription = require("./schema/studentSubscription")(conn, DataTypes);
db.Roadmap             = require("./schema/roadmap")(conn, DataTypes);
db.Topic               = require("./schema/topic")(conn, DataTypes);
db.Resource            = require("./schema/resource")(conn, DataTypes);
db.Quiz                = require("./schema/quiz")(conn, DataTypes);
db.Question            = require("./schema/question")(conn, DataTypes);
db.Option              = require("./schema/option")(conn, DataTypes);
db.studentAnswer       = require("./schema/studentAnswer")(conn, DataTypes);

Object.keys(db).forEach((modelName) => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});


conn.sync({ force: false }).then(() => console.log("Database & tables created!"));

module.exports = db;