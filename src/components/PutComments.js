import { useMutation } from "@apollo/client";
import { POST_COMMENT } from "../database/Mutations";
import Time from "./UuidToTime";
import "../styles/Forum.css";
import "../styles/Comment.css";
//show comment
const Comment = ({ replier, reply, commented_at }) => {
  return (
    <div className="mb-5">
      <h5 className="text-capitalize">
        {replier} <Time time={commented_at} caption="commented at: " />
      </h5>
      <p
        className="d-flex container-fluid "
        style={{ color: "black", fontSize: "15px" }}
      >
        {reply}
      </p>
    </div>
  );
};
//type to comment
const TypeComment = ({ post, refetch, commenter_id }) => {
  const [postComment, { error, loading }] = useMutation(POST_COMMENT);
  if (loading) return <div>loading...</div>;
  if (error) return <div>error!</div>;
  const onSubmit = (e) => {
    e.preventDefault();
    const reply = e.target[0].value;
    if (e.target[0].value !== "")
      postComment({
        variables: {
          post_id: post.id,
          reply: reply,
          commenter_id: commenter_id,
        },
      });
    e.target[0].value = "";
    refetch();
  };
  return (
    <form
      style={{ height: "20%", width: "100%" }}
      onSubmit={onSubmit}
      className="d-inline-flex bg-light p-2 flex-row align-items-start"
    >
      <div className="col">
        <textarea
          type="text"
          style={{ width: "500px", height: "100px" }}
          className="row form-control ml-1 shadow-none"
          placeholder=" Write a comment"
        />
        <div className="row mt-2 text-right">
          <button
            className="btn btn-dark shadow-none"
            style={{ width: "auto" }}
            type="submit button"
          >
            Post comment
          </button>
        </div>
      </div>
    </form>

    // <form onSubmit={onSubmit} className="d-inline-flex">
    //   <input
    //     type="text"
    //     className="flex-row form-control"
    //     placeholder="write something..."
    //   ></input>
    //   <button
    //     className="m-2 p-1 btn btn-outline-dark d-inline-flex"
    //     type="submit button"
    //   >
    //     Comment
    //   </button>
    // </form>
  );
};
//insert comment
export const PutComments = ({ post, refetch, commenter_id }) => {
  return (
    <div>
      {post.comments.length === 0 ? (
        <div>
          <TypeComment
            key={post.id}
            post={post}
            refetch={refetch}
            commenter_id={commenter_id}
          />
        </div>
      ) : (
        <div>
          {post.comments.map((c) => (
            <Comment
              key={c.id}
              reply={c.reply}
              replier={c.commenter.name}
              commented_at={c.commented_at}
            />
          ))}
          <TypeComment
            key={post.id}
            post={post}
            refetch={refetch}
            commenter_id={commenter_id}
          />
        </div>
      )}
    </div>
  );
};
