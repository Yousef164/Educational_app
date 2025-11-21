const db = require("../models");
const { throwErr, isStudent } = require("../utils/general");

class studentService {
  static async getStudentHomeData(user) {
    try {
      isStudent(user);

      const studentUser = await db.User.findByPk(user.id);

      const student = await db.Student.findOne({
        where: { userId: studentUser.id },
        include: [
          {
            model: db.studentSubscription,
            as: "studentSubscription",
            include: [
              {
                model: db.Roadmap,
                as: "roadmap",
              },
            ],
          },
          {
            model: db.studentMark,
            as: "studentMark",
            where: { status: "pending" },
            required: false,
            include: [
              {
                model: db.Quiz,
                as: "quiz",
              },
            ],
          },
        ],
      });

      return {
        welcomeMessage: {
          username: studentUser.username,
          image: studentUser.image || "",
        },
        studentSubscription: student?.studentSubscription
          ? student.studentSubscription.roadmap
          : [],
        quizPending:
          student?.studentMark?.map((mark) => ({
            id: mark.quiz.id,
            title: mark.quiz.title,
          })) || [],
      };
    } catch (error) {
      throwErr(error);
    }
  }

  static async getStudentMarks(user) {
    try {
      isStudent(user);

      const student = await db.Student.findOne({
        where: { userId: user.userId },
        include: [
          {
            model: db.studentMark,
            as: "studentMark",
          },
        ],
      });
      return student?.studentMark || [];
    } catch (error) {
      throwErr(error);
    }
  }

  static async subscriptionRoadmap(user, roadmapId, premuim) {
    try {
      isStudent(user);

      const student = await db.Student.findOne({
        where: { userId: user.userId },
      });

      await db.studentSubscription.create({
        studentId: student.id,
        roadmapId,
        premuim,
      });

      return "Subscription is successfly";
    } catch (error) {
      throwErr(error);
    }
  }

  static async addStudentAnswer(user, optionId) {
    try {
      isStudent(user);

      const student = await db.Student.findOne({
        where: { userId: user.userId },
      });

      await db.studentAnswer.create({ studentId: student.id, optionId });
      return "Student answer created successfuly";
    } catch (error) {
      throwErr(error);
    }
  }
}

module.exports = studentService;
