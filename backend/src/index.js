"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var apollo_server_1 = require("apollo-server");
var DB = {
    Videos: [{ id: 1, title: "109 videos" }],
    Message: [{ id: 1, content: "Hi how are you?" }]
};
var resolvers = {
    Mutation: {
        createVideo: function (_, args) {
            DB.Videos.push(__assign(__assign({}, args.input), { id: DB.Videos.length + 1 }));
            return DB.Videos[DB.Videos.length - 1];
        },
        createMessage: function (_, args) {
            DB.Message.push(__assign(__assign({}, args.input), { id: DB.Message.length + 1 }));
            return DB.Message[DB.Message.length - 1];
        },
        deleteMessage: function (_, args) {
            var id = args.id;
            var index = DB.Message.findIndex(function (message) { return message.id === id; });
            if (index > -1) {
                DB.Message.splice(index, 1);
            }
            return "Deleted";
        }
    },
    Query: {
        allVideos: function () {
            return DB.Videos;
        },
        allMessages: function () {
            return DB.Message;
        }
    }
};
var typeDefs = (0, apollo_server_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Video {\n    id: Int\n    title: String\n  }\n\n  type Message {\n    id: Int!\n    content: String\n  }\n\n  type Query {\n    allVideos: [Video]\n    allMessages: [Message]\n  }\n\n  input MessageInput {\n    content: String!\n  }\n\n  input VideoInput {\n    title: String!\n  }\n\n  type Mutation {\n    createVideo(input: VideoInput): Video\n    createMessage(input: MessageInput): Message\n    deleteMessage(id: Int!): String\n  }\n"], ["\n  type Video {\n    id: Int\n    title: String\n  }\n\n  type Message {\n    id: Int!\n    content: String\n  }\n\n  type Query {\n    allVideos: [Video]\n    allMessages: [Message]\n  }\n\n  input MessageInput {\n    content: String!\n  }\n\n  input VideoInput {\n    title: String!\n  }\n\n  type Mutation {\n    createVideo(input: VideoInput): Video\n    createMessage(input: MessageInput): Message\n    deleteMessage(id: Int!): String\n  }\n"])));
var server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});
server
    .listen(1200)
    .then(function (_a) {
    var url = _a.url;
    console.log("Server running ar " + url);
})["catch"](function (e) {
    throw new Error(e);
});
var templateObject_1;
