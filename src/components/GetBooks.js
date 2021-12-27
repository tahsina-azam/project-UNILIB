import "../styles/Booklist.css";
import "../styles/Sidebar.css";
import "../styles/Fonts.css";
import { useFiles } from "../contexts/file";
import React from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import Time from "./UuidToTime";
const Book = ({ name, link, uploaderName, uploaded_at }) => {
  console.log("Fetch books");
  return (
    <li
      className="list-group-item d-flex justify-content-between align-content-center"
      onClick={() => {
        // window.location = link;
        window.open(link);
      }}
    >
      <div className="d-flex flex-row fnt">
        {" "}
        <div className="ml-2">
          <h6 className="mb-0 text-capitalize">{name}</h6>
          <div className="about">
            <span className="text-capitalize">Uploader: {uploaderName}</span>{" "}
            <Time time={uploaded_at} caption="uploaded at" />
          </div>
        </div>
      </div>
    </li>
  );
};
//show books
const GetBooks = () => {
  const { files, loading, error } = useFiles();
  const { category } = useParams();

  if (loading) return <div>loading...</div>;
  if (error) return <div>error!</div>;
  return (
    <div className="d-flex justify-content-center book-content">
      <ul className="list-group text-white">
        {files.length === 0 ? (
          <div>no books, sorry</div>
        ) : (
          files
            .filter((e) => e.category.name === category)
            .map((b) => (
              <Book
                key={b.id}
                name={b.name}
                link={b.link}
                uploaderName={b.uploader.name}
                uploaded_at={b.uploaded_at}
              />
            ))
        )}
      </ul>
    </div>
  );
};
export default GetBooks;
