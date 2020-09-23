import { ApolloServer, gql } from 'apollo-server-micro';

import MoviesAPI from './sources/movies';
import movieConfig from './sources/config/configuration.json';

const typeDefs = gql`
  type Query {
    movies(query: String!): [Movie] 
  }

  type Movie {
    popularity: Float
    id: Int
    video: Boolean
    vote_count: Int
    vote_average: Float
    title: String
    # release_date: Date # coustom type
    original_language: String
    original_title: String
    genre_ids: [Int]
    backdrop_path: String
    adult: Boolean
    overview: String
    poster_path: String
    image_url: String
  }
`;

const resolvers = {
  Query: {
    movies: async (_, { query }, { dataSources: { moviesAPI } }) => {
      console.log('movies');
      return  await moviesAPI.searchMovie(query);
    },
  },
  Movie: {
    image_url: (root, __, { movieConfig }) => {
      const {
        poster_path
      } = root;

      const {
        images: {
          secure_base_url,
          poster_sizes
        }
      } = movieConfig;

      return `${secure_base_url}${poster_sizes[1]}${poster_path}`;
    }
  }
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      moviesAPI: new MoviesAPI()
    };
  },
  context: async () => {
    const { AUTH_TOKEN } = process.env;

    return {
      token: AUTH_TOKEN,
      movieConfig
    };
  },
});

const hanndler = apolloServer.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default hanndler;
