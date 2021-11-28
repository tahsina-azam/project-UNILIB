import { useMutation } from "@apollo/client";
import { POST_COMMENT } from "../database/Mutations";
import { Time } from "./UuidToTime";
import "../styles/Forum.css";
import "../styles/Comment.css";
//show comment
const Comment = ({ replier, reply, commented_at }) => {
  return (
    <div className="mb-3">
      <h5 className="text-capitalize">
        {replier} <Time time={commented_at} caption="commented at: " />
      </h5>
      <p class="d-flex comment-text container-fluid">{reply}</p>
    </div>
  );
};
//type to comment
const TypeComment = ({ post, refetch }) => {
  const [postComment, { error, loading }] = useMutation(POST_COMMENT);
  if (loading) return <div>loading...</div>;
  if (error) return <div>error!</div>;
  const onSubmit = (e) => {
    e.preventDefault();
    const reply = e.target[0].value;
    if (e.target[0].value !== "")
      postComment({ variables: { post_id: post.id, reply } });
    e.target[0].value = "";
    refetch();
  };
  return (
    <form
      style={{ height: "20%", width: "100%" }}
      onSubmit={onSubmit}
      className="d-inline-flex bg-light p-2 flex-row align-items-start"
    >
      <textarea
        type="text"
        style={{ width: "300px" }}
        class="form-control ml-1 shadow-none textarea"
        placeholder="Post a comment"
      />
      <div class="mt-2 text-right">
        <button class="btn btn-primary btn-sm shadow-none" type="submit button">
          Post comment
        </button>
        <button
          class="btn btn-outline-primary btn-sm ml-1 shadow-none"
          type="button"
        >
          Cancel
        </button>
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
export const PutComments = ({ post, refetch }) => {
  return (
    <div>
      {post.comments.length === 0 ? (
        <div>
          <div className="fw-light fnt text-muted">no comments</div>
          <TypeComment key={post.id} post={post} refetch={refetch} />
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
          <TypeComment key={post.id} post={post} refetch={refetch} />
        </div>
      )}
    </div>
  );
};
