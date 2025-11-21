const { throwErr, isTeacher } = require("../utils/general");
const db = require("../models");

class questionService {
  static async createQuestion(user, quizId, questionText, mark) {
    try {
      isTeacher(user);
      const question = await db.Question.create({
        quizId,
        questionText,
        mark,
      });
      await question.save();
      return question;
    } catch (error) {
      throwErr(error);
    }
  }
}

module.exports = questionService;
