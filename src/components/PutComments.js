import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Button } from "react-bootstrap";
import selectType from "./popups";
import BoxLoading from "react-loadingg/lib/BoxLoading";
import { POST_COMMENT } from "../database/Mutations";
import Time from "./UuidToTime";
import "../styles/Forum.css";
import "../styles/Comment.css";
import "../styles/Sidebar.css";
//show comment
const Comment = ({ replier, reply, commented_at, registration }) => {
  return (
    <div class="container-fluid mt-2 text-start">
      <div class="row d-flex justify-content-left" style={{ width: "100%" }}>
        <div class="col-md-8" style={{ width: "100%" }}>
          <div class="card p-2" style={{ width: "100%" }}>
            <div
              class="d-flex justify-content-between align-items-left "
              style={{ width: "100%" }}
            >
              <div class="user d-flex flex-row align-items-left">
                <div>
                  <small
                    class="font-weight-bold text-success text-capitalize"
                    data-toggle="tooltip"
                    data-placement="top"
                    title={registration}
                  >
                    {replier}
                  </small>
                  {/* <small class="font-weight-bold text-success text-capitalize">
                    Reg.no: {registration}
                  </small> */}
                  <Time time={commented_at} caption="commented at: " />
                  <br />
                  <small class="font-weight-bold">{reply}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
//type to comment
export const TypeComment = ({ post, refetch, commenter_id }) => {
  const [postComment, { error, loading }] = useMutation(POST_COMMENT);
  if (loading) return <BoxLoading />;
  if (error) return selectType("success", "please try again");
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
    <div className="p-2 text-center">
      <form onSubmit={onSubmit} className="flex-row" style={{ width: "100%" }}>
        <textarea
          type="text"
          className="form-control mt-2 border-success"
          placeholder=" Type here..."
        />
        <div className="mt-2 text-right">
          <button
            className="btn btn-outline-success buttons"
            type="submit button"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};
//insert comment
export const PutComments = ({ post, refetch, commenter_id }) => {
  const [show, setShow] = useState(false);
  const [buttonText, setButtontext] = useState("Show comments");
  return (
    <div className="text-center p-2">
      {post.comments.length === 0 ? (
        <div>No comments!</div>
      ) : (
        <div>
          <Button
            className="bg-success1 border-0"
            onClick={() => {
              setShow(!show);
              const setText =
                buttonText === "Show comments"
                  ? "Hide Comments"
                  : "Show comments";
              setButtontext(setText);
            }}
          >
            {buttonText}
          </Button>
          {show &&
            post.comments.map((c) => (
              <Comment
                key={c.id}
                reply={c.reply}
                replier={c.commenter.name}
                commented_at={c.commented_at}
                registration={c.commenter.registration}
              />
            ))}
        </div>
      )}
    </div>
  );
};
