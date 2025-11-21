module.exports = (db, type) => {
  const quiz = db.define("quiz", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    topicId: {
      type: type.INTEGER,
      allowNull: false,
    },
    title: {
      type: type.STRING,
      allowNull: false,
    },
    description: {
      type: type.STRING,
      allowNull: false,
    },
    mark: {
      type: type.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: "Quizzes"
  });

  quiz.associate = (models) => {

    quiz.belongsTo(models.Topic, {
      foreignKey: "topicId",
      as: "topic"
    });

    quiz.hasMany(models.studentMark, {
      foreignKey: "quizId",
      as: "studentMark"
    });

    quiz.hasMany(models.Question, {
      foreignKey: "quizId",
      as: "question"
    });
  }
  return quiz;
};
