import { useMutation, useQuery } from "@apollo/client";
import { POST_POST } from "../database/Mutations";
import { GET_POSTS_QUERY } from "../database/queries";

//type post ansert
export const TypePost = () => {
  const { refetch } = useQuery(GET_POSTS_QUERY);
  const [postPost, { error, loading }] = useMutation(POST_POST);
  if (loading) return <div>loading...</div>;
  if (error) return <div>error!</div>;
  const onSubmit = (e) => {
    e.preventDefault();
    const message = e.target[0].value;
    if (e.target[0].value !== "") {
      postPost({ variables: { message: message } });
      refetch();
    }
    e.target[0].value = "";
  };
  return (
    <form
      onSubmit={onSubmit}
      className="m-2"
      style={{ width: "100%", height: "30 rem" }}
    >
      <textarea
        type="text"
        className="form-control"
        placeholder="write something..."
      ></textarea>
      <button
        className="m-2 p-1 btn btn-outline-dark d-inline-flex"
        style={{ width: "auto", height: "auto" }}
        type="submit button"
      >
        Post now
      </button>
    </form>
  );
};
