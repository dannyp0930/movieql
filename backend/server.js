import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
`

const resolvers = {
  Query: {

  },
  Mutaion: {
    
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
