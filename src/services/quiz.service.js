const { throwErr, isTeacher } = require("../utils/general");
const db = require("../models");

class quizService {
  static async createQuiz(user, topicId, title, description, mark) {
    try {
      isTeacher(user);
      const quiz = await db.Quiz.create({
        topicId,
        title,
        description,
        mark,
      });
      await quiz.save();
      return quiz;
    } catch (error) {
      throwErr(error);
    }
  }

  static async getQuizById(user, quizId) {
    try {
      if (!user.emailVerified) {
        throwErr("Email not verified");
      }

      const quiz = await db.Quiz.findByPk(quizId);

      return quiz;
    } catch (error) {
      throwErr(error);
    }
  }
}

module.exports = quizService;
