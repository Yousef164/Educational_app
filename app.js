const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const app = express();

const { port } = require("./src/config/env");
const typeDefs = require("./src/typeDefs");
const resolvers = require("./src/resolvers");
const verifyToken = require("./src/middleware/verifyToken")
const verifyEmail = require("./src/routes/verifyEmail.route.js")
const paymentRoute = require("./src/routes/paymant.route");


app.use(express.json());

(async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
      const auth = req.headers.authorization || "";
      const user = verifyToken(auth);
      return { user }; 
    }
  });

  await server.start();
  server.applyMiddleware({ app });


  app.use('/verify-email', verifyEmail);
  app.use('/payment', paymentRoute);

  app.listen(port, () => {
    console.log(
      `Server is running on http://localhost:${port}${server.graphqlPath}`
    );
  });
})();