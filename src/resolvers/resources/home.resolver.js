const studentService = require("../../services/student.service");
const teacherService = require("../../services/teacher.service");
const roadmapService = require("../../services/roadmap.service");
const topicService = require("../../services/topic.service");
const resourceService = require("../../services/resource.service");
const quizService = require("../../services/quiz.service");
const questionService = require("../../services/question.service");
const optionService = require("../../services/option.service");

module.exports = {
  Query: {
    getStudentHomeData: async (parent, args, { user }) => {
      return await studentService.getStudentHomeData(user);
    },
    getTeacherHomeData: async (parent, args, { user }) => {
      return await teacherService.getTeacherHomeData(user);
    },
  },
  Mutation: {
    createRoadmap: async (parent, args, { user }) => {
      const { title, description, premuimPrice } = args;
      return await roadmapService.createRoadmap(
        user,
        title,
        description,
        premuimPrice
      );
    },

    createTopic: async (parent, args, { user }) => {
      const { roadmapId, title, description } = args;
      return await topicService.createTopic(
        user,
        roadmapId,
        title,
        description
      );
    },

    createResource: async (parent, args, { user }) => {
      const { topicId, title, url, type } = args;
      return await resourceService.createResource(
        user,
        topicId,
        title,
        url,
        type
      );
    },

    createQuiz: async (parent, args, { user }) => {
      const { topicId, title, description, mark } = args;
      return await quizService.createQuiz(
        user,
        topicId,
        title,
        description,
        mark
      );
    },

    createQuestion: async (parent, args, { user }) => {
      const { quizId, questionText, mark } = args
      return await questionService.createQuestion(
        user,
        quizId,
        questionText,
        mark
      );
    },

    createOption: async (parent, args, { user }) => {
        const { questionId, optionText, isCorrect } = args;
        return await optionService.createOption(
          user,
          questionId,
          optionText,
          isCorrect
        );
    },
  },
};
