module.exports = (db, type) => {
  const option = db.define("Roadmap", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    questionId: {
      type: type.INTEGER,
      allowNull: false,
    },
    optionText: {
      type: type.STRING,
      allowNull: false,
    },
    isCorrect: {
      type: type.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: "Options"
  });

  option.associate = (models) => {
    option.belongsTo(models.Question, {
      foreignKey: "questionId",
      as: "question",
    });

    option.hasMany(models.studentAnswer, {
      foreignKey: "optionId",
      as: "studentAnswer"
    })
  };
  return option;
};
