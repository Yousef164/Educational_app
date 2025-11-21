const { isTeacher } = require("../utils/general");
const db = require("../models");

class TeacherService {
  static async getTeacherHomeData(user) {
    try {
      isTeacher(user);

      const teacherUser = await db.User.findByPk(user.userId);
      const teacher = await db.Teacher.findOne({
        where: { userId: teacherUser.id },
        include: [
          {
            model: db.Roadmap,
            as: "roadmap",
          },
        ],
      });

      return {
        welcomeMessage: {
          username: teacherUser.username,
          image: teacherUser.image,
        },
        roadmaps: teacher?.roadmap ? teacher.roadmap : [],
      };
    } catch (error) {
      throw error;
    }
  }

  static async addStudentMark(user, quizId, studentMark, status) {
    try {
        isStudent(user);

        const student = await db.Student.findOne({
          where: { userId: user.userId },
        });

        await db.studentMark.create({
          studentId: student.id,
          quizId,
          studentMark,
          status,
        });

        return "Student mark created successfuly";
      } catch (error) {
        throwErr(error);
      }
  }
}

module.exports = TeacherService;
