const { gql } = require("apollo-server-express")

module.exports = gql`

type Query {
  getAllRoadmapsByTeacher: [Roadmap!]!
  getRoadmapById(roadmapId: ID!): Roadmap!
  getTopicById(topicId: ID!): Topic!
  getResourceById(resourceId: ID!): Resource!
  getQuizById(quizId: ID!): Quiz!
  getStudentMarks: [StudentMark!]!
}

type Mutation {
  subscriptionRoadmap(roadmapId: ID!, premuim: Boolean): String
  addStudentMark(quizId: ID!, studentMark: Int, status: Status): String
  addStudentAnswer(optionId: ID!): String
}



` 