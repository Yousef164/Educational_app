const student = require("./student");

module.exports = (db, type) => {
  const studentSubscription = db.define("StudentSubscrebtions", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    studentId: {
      type: type.INTEGER,
      allowNull: false,
    },
    roadmapId: {
      type: type.INTEGER,
      allowNull: false,
    },
    premium: {
      type: type.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    expiresAt: {
      type: type.DATE,
      allowNull: false
    }
  }, {
    tableName: "StudentSubscrebtions"
  });

  studentSubscription.associate = (models)=> {

    studentSubscription.belongsTo(models.Student, {
      foreginKey: "studentId",
      as: "student"
    });

    studentSubscription.belongsTo(models.Roadmap, {
      foreginKey: "roadmapId",
      as: "roadmap"
    });
  }
  return studentSubscription;
};
