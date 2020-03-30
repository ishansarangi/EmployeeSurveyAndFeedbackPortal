import ApolloClient from 'apollo-boost';
import {HttpLink} from 'apollo-link-http';

export const apolloclient = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
});
