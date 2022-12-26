import { ApolloServer, gql } from "apollo-server";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
export const API_KEY = process.env.TMDB_API_KEY;
export const BASE_URL = "https://api.themoviedb.org/3";

const typeDefs = gql`
  type Query {
    popularMovies: [Movie!]
    topRatedMovies: [Movie!]
    upcommingMovies: [Movie!]
    movie(id: Int!): Movie
  }
  type Movie {
    poster_path: String
    adult: Boolean!
    overview: String!
    release_date: String!
    id: Int!
    original_title: String!
    original_language: String!
    title: String!
    backdrop_path: String
    popularity: Float!
    vote_count: Int!
    video: Boolean!
    vote_average: Float!
  }
`;

const resolvers = {
  Query: {
    async popularMovies() {
      const {
        data: { results },
      } = await axios.get(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR`
      );
      return results;
    },
    async topRatedMovies() {
      const {
        data: { results },
      } = await axios.get(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=ko-KR`
      );
      return results;
    },
    async upcommingMovies() {
      const {
        data: { results },
      } = await axios.get(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR`
      );
      return results;
    },
    async movie(_, { id }) {
      const { data } = await axios.get(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR`
      );
      return data;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
