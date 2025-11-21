const { isTeacher } = require("../utils/general");
const db = require("../models");

class topicService {
  static async createTopic(user, roadmapId, title, description) {
    try {
      isTeacher(user);

      const topic = await db.Topic.create({
        roadmapId,
        title,
        description,
      });

      await topic.save();
      return topic;
    } catch (error) {
      throwErr(error);
    }
  }

  static async getTopicById(user, topicId) {
    try {
      if (!user.emailVerified) {
        throwErr("Email not verified");
      }

      const topic = await db.Topic.findOne({
        where: { id: topicId },
        include: [
          {
            model: db.Resource,
            as: "resource",
          },
          {
            model: db.Quiz,
            as: "quiz",
          },
        ],
      });
      return topic;
    } catch (error) {
      throwErr(error);
    }
  }
}

module.exports = topicService;
