import ApolloClient from "apollo-boost";
import { addtvSeries } from './resolver/tvresolver'

const client = new ApolloClient({
  uri: "http://localhost:4000/",
});

export default client
