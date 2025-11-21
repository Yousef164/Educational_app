const { throwErr, isTeacher } = require("../utils/general");
const db = require("../models");

class optionService {
  static async createOption(user, questionId, optionText, isCorrect) {
    try {
      isTeacher(user);
      const option = await db.Option.create({
        questionId,
        optionText,
        isCorrect,
      });
      await option.save();
      return option;
    } catch (error) {
      throwErr(error);
    }
  }
}

module.exports = optionService;
