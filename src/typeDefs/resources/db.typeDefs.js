const { gql } = require("apollo-server-express");

module.exports = gql`
  enum Type {
    video
    pdf
    link
  }

  enum Status {
    solved
    unsolved
    pending
  }

  type Roadmap {
    id: ID!
    title: String!
    description: String
    topics: [Topic!]
  }

  type Topic {
    id: ID!
    title: String!
    description: String
    roadmap: Roadmap
    resource: [Resource!]
    quiz: Quiz
  }

  type Resource {
    id: ID!
    title: String!
    url: String!
    type: Type
    topic: Topic
  }

  type Quiz {
    id: ID!
    title: String!
    topic: Topic
    question: [Question!]
    mark: Int!
  }

  type Question {
    id: ID!
    questionText: String!
    mark: Int!
    quiz: Quiz
    options: [Option!]!
  }

  type Option {
    id: ID!
    optionText: String!
    isCorrect: Boolean!
    question: Question
  }

  type QuizPending {
    id: ID!
    title: String!
  }

  type StudentMark {
    id: ID!
    studentMark: Int!
    status: Status! 
  }
`;
