import "../styles/Booklist.css";
import "../styles/Sidebar.css";
import "../styles/Fonts.css";
import { useFiles } from "../contexts/file";
import React from "react";
import "../styles/Library.css";
import { Row, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Time from "./UuidToTime";
const Book = ({ name, link, uploaderName, uploaded_at }) => {
  console.log("Fetch books");
  return (
    <Card
      style={{ width: "18rem", height: "20rem" }}
      onClick={() => {
        // window.location = link;
        window.open(link);
      }}
    >
      <Card.Body>
        <Card.Title className="text-success ">
          {name}
          <br /> <Time time={uploaded_at} caption="uploaded at" />
        </Card.Title>

        <Card.Text className="fnt-description mt-3">
          <p>
            <span style={{ color: "#198754" }} className="text-capitalize">
              Uploader: {uploaderName}
            </span>
          </p>
          <span style={{ color: "#198754" }}>Description: </span>
        </Card.Text>
      </Card.Body>{" "}
    </Card>
  );
};
//show books
const GetBooks = () => {
  const { files, loading, error } = useFiles();
  const { category } = useParams();

  if (loading) return <div>loading...</div>;
  if (error) return <div>error!</div>;
  return (
    <div className="content list-forum">
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
    </div>
  );
};
export default GetBooks;
