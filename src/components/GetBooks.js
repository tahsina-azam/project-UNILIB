import "../styles/Booklist.css";
import "../styles/Sidebar.css";
import "../styles/Fonts.css";
import "../styles/Library.css";
import { useFiles } from "../contexts/file";
import React from "react";
import "../styles/Library.css";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Time from "./UuidToTime";
import selectType from "./popups";
import BoxLoading from "react-loadingg/lib/BoxLoading";
import { DeleteBooks } from "./Delete";
export const Book = ({
  id,
  name,
  link,
  uploaderName,
  uploaderId,
  uploaded_at,
  description,
}) => {
  console.log("Fetch books");
  return (
    <Card style={{ width: "18rem", height: "25rem" }}>
      <Card.Body>
        <Card.Title
          className="text-success"
          onClick={() => {
            window.open(link);
          }}
        >
          {" "}
          {name}
          <br /> <Time time={uploaded_at} caption="uploaded at" />
        </Card.Title>
        <Card.Text className="fnt-description mt-3">
          <p>
            <span style={{ color: "#198754" }} className="text-capitalize">
              Uploader: {uploaderName}
            </span>
          </p>
          <span style={{ color: "#198754" }}>Description: {description}</span>
          <br />
        </Card.Text>
      </Card.Body>{" "}
      <Card.Footer className="border-0">
        {uploaderId === localStorage.getItem("id") && (
          <DeleteBooks id={id} link={link} />
        )}
      </Card.Footer>
    </Card>
  );
};
//show books
const GetBooks = () => {
  const { files, loading, error } = useFiles();
  const { category } = useParams();

  if (loading) return <BoxLoading />;
  if (error) return selectType("error", "please try again");
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
              id={b.id}
              name={b.name}
              link={b.link}
              uploaderName={b.uploader.name}
              uploaderId={b.uploader.id}
              uploaded_at={b.uploaded_at}
              description={b.description}
            />
          ))
      )}
    </div>
  );
};
export default GetBooks;
