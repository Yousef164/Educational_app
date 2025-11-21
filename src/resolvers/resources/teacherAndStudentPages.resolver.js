const roadmapService = require("../../services/roadmap.service");
const topicService = require("../../services/topic.service");
const resouceService = require("../../services/resource.service");
const quizService = require("../../services/quiz.service");

module.exports = {
  Query: {
    getAllRoadmapsByTeacher: async (parent, args, { user }) => {
      return await roadmapService.getAllRoadmapsByTeacher(user);
    },

    getRoadmapById: async (parent, args, { user }) => {
      const { roadmapId } = args;
      return await roadmapService.getRoadmapById(user, roadmapId);
    },

    getTopicById: async (parent, args, { user }) => {
      const { topicId } = args;

      return await topicService.getTopicById(user, topicId);
    },

    getResourceById: async (parent, args, { user }) => {
      const { resourceId } = args;
      return await resouceService.getResourceById(user, resourceId);
    },

    getQuizById: async (parent, args, { user }) => {
      const { quizId } = args;
      return await quizService.getQuizById(user, quizId);
    },

    getStudentMarks: async (parent, args, { user }) => {
      return await studentService.getStudentMarks(user);
    },
  },

  Mutation: {
    subscriptionRoadmap: async (parent, args, { user }) => {
      const { roadmapId, premuim } = args;
      return await studentService.subscriptionRoadmap(user, roadmapId, premuim);
    },

    addStudentMark: async (parent, args, { user }) => {
      const { quizId, studentMark, status } = args;
      return await teacherService.addStudentMark(
        user,
        quizId,
        studentMark,
        status
      );
    },

    addStudentAnswer: async (parent, args, { user }) => {
      const { optionId } = args;
      return await studentService.addStudentAnswer(user, optionId);
    },
  },
};
