const { throwErr, isTeacher } = require("../utils/general");
const db = require("../models");

class roadmapService {
  static async createRoadmap(user, title, description, premuimPrice) {
    try {
      isTeacher(user);
      const teacher = await db.Teacher.findOne({
        where: { userId: user.userId },
      });
      if(!teacher){
        throwErr("Teacher profile not found");
      }
      const roadmap = await db.Roadmap.create({
        teacherId: teacher.id,
        title,
        premuimPrice,
        description,
      });
      console.log(roadmap);
      return roadmap;
    } catch (error) {
      throwErr(error);
    }
  }

  static async getAllRoadmapsByTeacher(user) {
    try {
      isTeacher(user);

      const teacher = await db.Teacher.findOne({
        where: { userId: user.userId },
        include: [
          {
            model: db.Roadmap,
            as: "roadmap",
          },
        ],
      });
      return teacher?.roadmap || [];
    } catch (error) {
      throwErr(error);
    }
  }

  static async getRoadmapById(user, roadmapId) {
    try {
        if (!user.emailVerified) {
          throwErr("Email not verified");
        }
        
        const roadmap = await db.Roadmap.findOne({
          where: { id: roadmapId },
          include: [
            {
              model: db.Topic,
              as: "topic",
            },
          ],
        });
        return roadmap;
      } catch (error) {
        throwErr(error);
      }
  }
}
module.exports = roadmapService;
