const { throwErr, isTeacher } = require("../utils/general");
const db = require("../models");

class resourceService {
  static async createResource(user, topicId, title, url, type) {
    try {
      isTeacher(user);
      const resource = await db.Resource.create({
        topicId,
        title,
        url,
        type,
      });
      await resource.save();
      return resource;
    } catch (error) {
      throwErr(error);
    }
  }

  static async getResourceById(user, resourceId) {
    try {
      if (!user.emailVerified) {
        throwErr("Email not verified");
      }

      const resource = await db.Resource.findOne({
        where: { id: resourceId },
      });

      return resource;
    } catch (error) {
      throwErr(error);
    }
  }
}

module.exports = resourceService;
