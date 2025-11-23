const { DataTypes } = require("sequelize");

const db = {};

const conn             = require("../config/db_connect");
db.User                = require("./schema/users")(conn, DataTypes);
db.Student             = require("./schema/student")(conn, DataTypes);
db.Teacher             = require("./schema/teacher")(conn, DataTypes);
db.Roadmap             = require("./schema/roadmap")(conn, DataTypes);
db.Topic               = require("./schema/topic")(conn, DataTypes);
db.Resource            = require("./schema/resource")(conn, DataTypes);
db.Quiz                = require("./schema/quiz")(conn, DataTypes);
db.Question            = require("./schema/question")(conn, DataTypes);
db.Option              = require("./schema/option")(conn, DataTypes);
db.studentAnswer       = require("./schema/studentAnswer")(conn, DataTypes);
db.Notification        = require("./schema/notification")(conn, DataTypes);
db.studentSubscription = require("./schema/studentSubscription")(conn, DataTypes);
db.studentMark         = require("./schema/studentMark")(conn, DataTypes);

Object.keys(db).forEach((modelName) => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});


(async () => {  
  await db.User.sync({force: true});
  await db.Teacher.sync({ force: true });
  await db.Student.sync({ force: true });
  
  await db.Roadmap.sync({ force: true });
  await db.Topic.sync({ force: true });
  await db.Resource.sync({ force: true });
  await db.Quiz.sync({ force: true });
  await db.Question.sync({ force: true });
  await db.Option.sync({ force: true });
  await db.studentAnswer.sync({ force: true });
  await db.studentSubscription.sync({ force: true });
  await db.studentMark.sync({ force: true });
  await db.Notification.sync({ force: true });

  console.log("Database & tables created in correct order!");
})();
module.exports = db;