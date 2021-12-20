import { useMutation, useQuery } from "@apollo/client";
import { GET_POSTS_QUERY } from "../database/queries";
import { POST_POST } from "../database/Mutations";

//type post insert
export function TypePost() {
  const { refetch } = useQuery(GET_POSTS_QUERY);
  const [postPost, { error, loading }] = useMutation(POST_POST);
  if (loading) return <div>loading...</div>;
  if (error) return <div>error!</div>;
  const onSubmit = (e) => {
    e.preventDefault();
    const message = e.target[0].value;
    if (e.target[0].value !== "") {
      postPost({
        variables: {
          message: message,
          author_id: "d9a9427d-d40a-4796-bf63-926aa74c4972",
        },
      });
      refetch();
    }
    e.target[0].value = "";
  };
  return (
    <form
      onSubmit={onSubmit}
      className="mt-5"
      style={{ width: "80%", height: "100px" }}
    >
      <textarea
        type="text"
        className="form-control"
        placeholder="write something..."
        style={{ width: "100%", height: "100px" }}
      ></textarea>
      <button
        className="btn btn-dark shadow-none mt-2 text-right"
        style={{ width: "auto", height: "auto" }}
        type="submit button"
      >
        Post now
      </button>
    </form>
  );
}
