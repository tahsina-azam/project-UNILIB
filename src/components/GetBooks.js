//show and download books in forum
import { GET_BOOK_LIST_QUERY } from "../database/queries";
import { useQuery } from "@apollo/client";
import "../styles/Booklist.css";
import "../styles/Sidebar.css";
import "../styles/Fonts.css";
const Book = ({ name, link }) => {
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
            <span>"who uploadeed"</span> <span>"when uploaded"</span>{" "}
          </div>
        </div>
      </div>
    </li>
  );
};
//show books
const ShowBooks = () => {
  const { data, loading, error } = useQuery(GET_BOOK_LIST_QUERY);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error!</div>;
  return (
    <div className="d-flex justify-content-center book-content">
      <ul className="list-group text-white">
        {data.BookLinks.length === 0 ? (
          <div>no books, sorry</div>
        ) : (
          data.BookLinks.map((b) => (
            <Book key={b.id} name={b.name} link={b.link} />
          ))
        )}
      </ul>
    </div>
  );
};
const GetBooks = () => {
  return (
    <>
      <ShowBooks />
    </>
  );
};
export default GetBooks;
