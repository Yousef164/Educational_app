module.exports = (db, type) => {
  const studentAnswer = db.define("StudentAnswers", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      authIncrement: true,
    },
    optionId: {
      type: type.INTEGER,
      allowNull: false,
    },
    studentId: {
      type: type.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: "StudentAnswers"
  });

  studentAnswer.associate = (models) => {
    studentAnswer.belongsTo(models.Student, {
      foreignKey: "studentId",
      as: "student",
    });

    studentAnswer.belongsTo(models.Option, {
      foreignKey: "optionId",
      as: "option",
    });
  };
  return studentAnswer;
};
