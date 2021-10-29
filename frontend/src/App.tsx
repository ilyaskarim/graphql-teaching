import { useMutation, useQuery } from "@apollo/client";
import {
  allMessagesQuery,
  allVideosQuery,
  createMessageMutation,
  deleteMessageMutation,
} from "./apollo";

function App() {
  const [createMessage] = useMutation(createMessageMutation);
  const [deleteMessage] = useMutation(deleteMessageMutation);
  const {
    data: MessagesData,
    loading: MessageLoading,
    refetch: refetchMessages,
  } = useQuery(allMessagesQuery);
  const { data: VideosData, loading: VideoLoading } = useQuery(allVideosQuery);

  return (
    <div>
      <div>
        <h2>Messages</h2>
        <input
          type="text"
          placeholder="Create a message"
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              await createMessage({
                variables: {
                  input: {
                    content: (e.target as HTMLInputElement).value,
                  },
                },
              });
              refetchMessages();
              (e.target as HTMLInputElement).value = "";
            }
          }}
        />
        <ul>
          {MessagesData?.allMessages?.map(
            (message: { content: string; id: number }) => {
              return (
                <li>
                  <strong>{message.content}</strong>
                  &nbsp; &nbsp;
                  <button
                    onClick={async () => {
                      await deleteMessage({
                        variables: {
                          id: message.id,
                        },
                      });
                      refetchMessages();
                    }}
                  >
                    &times;
                  </button>
                </li>
              );
            }
          )}
        </ul>
      </div>

      <div>
        <h2>Videos</h2>
        <ul>
          {VideosData?.allVideos?.map(
            (message: { title: string; id: number }) => {
              return <li>{message.title}</li>;
            }
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
