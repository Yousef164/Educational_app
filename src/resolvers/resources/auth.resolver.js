const AuthService = require("../../services/auth.service");

module.exports = {
  Query: {
    login: async (parent, args, models) => {
      const { email, password } = args;
      return await AuthService.login(email, password);
    },
  },
  Mutation: {
    createUser: async (parent, args, models) => {
      const { username, email, password, role, level, subject } = args;
      return await AuthService.createUser(
        username,
        email,
        password,
        role,
        level,
        subject
      );
    },
  },
};
