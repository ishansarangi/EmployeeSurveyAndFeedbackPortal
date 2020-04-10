import ApolloClient from 'apollo-boost';

export const apolloclient = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
});
