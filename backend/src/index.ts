import { ApolloServer, gql } from "apollo-server";

const DB = {
  Videos: [{ id: 1, title: "109 videos" }],
  Message: [{ id: 1, content: "Hi how are you?" }],
};

const resolvers = {
  Mutation: {
    createVideo: (_, args) => {
      DB.Videos.push({
        ...args.input,
        id: DB.Videos.length + 1,
      });
      return DB.Videos[DB.Videos.length - 1];
    },
    createMessage: (_, args) => {
      DB.Message.push({
        ...args.input,
        id: DB.Message.length + 1,
      });
      return DB.Message[DB.Message.length - 1];
    },
    deleteMessage(_, args) {
      const { id } = args;
      const index = DB.Message.findIndex((message) => message.id === id);
      if (index > -1) {
        DB.Message.splice(index, 1);
      }
      return "Deleted";
    },
  },
  Query: {
    allVideos: () => {
      return DB.Videos;
    },
    allMessages: () => {
      return DB.Message;
    },
  },
};

const typeDefs = gql`
  type Video {
    id: Int
    title: String
  }

  type Message {
    id: Int!
    content: String
  }

  type Query {
    allVideos: [Video]
    allMessages: [Message]
  }

  input MessageInput {
    content: String!
  }

  input VideoInput {
    title: String!
  }

  type Mutation {
    createVideo(input: VideoInput): Video
    createMessage(input: MessageInput): Message
    deleteMessage(id: Int!): String
  }
`;

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

server
  .listen(1200)
  .then(({ url }) => {
    console.log(`Server running ar ${url}`);
  })

  .catch((e) => {
    throw new Error(e);
  });
