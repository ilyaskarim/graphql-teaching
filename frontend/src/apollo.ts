import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const createMessageMutation = gql`
  mutation ($input: MessageInput) {
    createMessage(input: $input) {
      content
      id
    }
  }
`;

export const deleteMessageMutation = gql`
  mutation ($id: Int!) {
    deleteMessage(id: $id)
  }
`;

export const allMessagesQuery = gql`
  {
    allMessages {
      id
      content
    }
  }
`;

export const allVideosQuery = gql`
  {
    allVideos {
      id
      title
    }
  }
`;

const client = new ApolloClient({
  uri: "http://localhost:1200/graphql",
  cache: new InMemoryCache(),
});

export default client;
