module.exports = (db, type) => {
  const question = db.define("Question", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quizId: {
      type: type.INTEGER,
      allowNull: false,
    },
    questionText: {
      type: type.STRING,
      allowNull: false,
    },
    mark: {
      type: type.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: "Questions"
  });

  question.associate = (models) => {

    question.belongsTo(models.Quiz, {
      foreignKey: "quizId",
      as: "quiz"
    });

    question.hasMany(models.Option, {
      foreignKey: "questionId",
      as: "option"
    });
  }
  
  return question;
};
