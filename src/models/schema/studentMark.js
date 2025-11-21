module.exports = (db, type) => {
  const studentMark = db.define("StudentMark", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    studentId: {
      type: type.INTEGER,
      allowNull: false,
    },
    quizId: {
      type: type.INTEGER,
      allowNull: false,
    },
    studentMark: {
      type: type.FLOAT,
      allowNull: false,
    },
    status: {
      type: type.ENUM("solved", "unsolved", "pending"),
      defaultValue: "unsolved"
    }
  }, {
    tableName: "StudentMark"
  });

  studentMark.associate = (models) => {
    
    studentMark.belongsTo(models.Student, {
      foreignKey: "studentId",
      as: "student"
    });

    studentMark.belongsTo(models.Quiz, {
      foreignKey: "quizId",
      as: "quiz"
    });
  }
  return studentMark;
};
