const { gql } = require("apollo-server-express");

module.exports = gql`
  enum Role {
    teacher
    student
    manager
  }

  type Query {
    getStudentHomeData: StudentHomeData!
    getTeacherHomeData: TeacherHomeData!
  }

  type Mutation {
    createRoadmap(title: String!, description: String!, premuimPrice: Int): Roadmap
    createTopic(roadmapId: ID!, title: String!, description: String!): Topic
    createResource(topicId: ID!, title: String!, url: String!, type: Type!): Resource
    createQuiz(topicId: ID!, title: String!, description: String!, mark: Int!): Quiz
    createQuestion(quizId: ID!, questionText: String!, mark: Int!): Question
    createOption(questionId: ID!, optionText: String!, isCorrect: Boolean!): Option
  }

  type StudentHomeData {
    welcomeMessage: WelcomeMessage!
    studentSubscription: [Roadmap!]!
    quizPending: [QuizPending!]!
  }

  type TeacherHomeData {
    welcomeMessage: WelcomeMessage!
    roadmaps: [Roadmap!]!
  }

  type WelcomeMessage {
    username: String!
    image: String
  }

  
`;
