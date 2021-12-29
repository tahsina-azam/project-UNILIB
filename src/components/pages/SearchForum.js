import { useQuery } from "@apollo/client";
import { SEARCH_USER, SEARCH_BOOKS } from "../../database/queries";
import { useState } from "react";
import { Post } from "../GetPosts";
import { PutComments } from "../PutComments";
import { Book } from "../GetBooks";
import selectType from "../popups";
import { BoxLoading } from "react-loadingg";
const SearchBooks = ({ val }) => {
  const { data, loading, error } = useQuery(SEARCH_BOOKS, {
    variables: {
      name: "%" + val + "%",
    },
  });
  if (loading) return <BoxLoading />;
  if (error) selectType("error", "please try again");
  return (
    <div className="text-start">
      {console.log(data)}
      {data.BookLinks.map((b) => (
        <Book
          name={b.name}
          key={b.id}
          link={b.link}
          uploaderName={b.uploader.name}
          uploaded_at={b.uploaded_at}
          description={b.description}
        />
      ))}
    </div>
  );
};
const SearchUser = ({ val }) => {
  const { data, loading, error, refetch } = useQuery(SEARCH_USER, {
    variables: {
      text1: "%" + val + "%",
      text2: val,
    },
  });
  if (loading) return <BoxLoading />;
  if (error) selectType("error", "please try again");
  return (
    <div className="text-start">
      {console.log(data)}
      {data.posts.map((p) => (
        <>
          <Post
            author={p.author.name}
            registration={p.author.registration}
            message={p.message}
            created_at={p.created_at}
          />
          <PutComments
            post={p}
            refetch={refetch}
            commenter_id={localStorage.getItem("id")}
          />
        </>
      ))}
    </div>
  );
};
export const SearchForum = () => {
  const [val, setVal] = useState("");
  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  // const onClick = (e) => {};

  return (
    <div className="text-center">
      <div className="radio-buttons m-3">
        <input
          id="Users"
          value="Users"
          name="platform"
          type="radio"
          className="mx-3"
          onChange={(e) => {
            setShow1(true);
            setShow2(false);
          }}
        />
        Posts
        <input
          id="Books Uploaded By Students"
          value="Books Uploaded By Students"
          name="platform"
          type="radio"
          className="mx-3"
          onChange={(e) => {
            setShow1(false);
            setShow2(true);
            // console.log(`show2 ${show2}`);
          }}
        />
        Books Uploaded By Students
      </div>
      <div class="input-group mb-3">
        {" "}
        <input
          type="text"
          class="form-control input-text"
          placeholder="Search a post or books here"
          onChange={(e) => {
            setVal(e.target.value);
            setShow(true);
          }}
        />
      </div>
      {show && show1 && <SearchUser val={val} />}
      {show && show2 && <SearchBooks val={val} />}
    </div>
  );
};
