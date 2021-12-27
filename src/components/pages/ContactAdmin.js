import { Dropdown } from "react-bootstrap";
const ContactAdmin = () => {
  return (
    <div className="text-start">
      <Dropdown
        className="m-5"
        onSelect={(e) => {
          console.log(e);
        }}
      >
        {/* show which book is selected */}
        <Dropdown.Toggle variant="success">Choose category</Dropdown.Toggle>
        {/* dropdown menu */}
        <Dropdown.Menu>
          <Dropdown.Item eventKey={"Request for a book"}>
            Request for a book
          </Dropdown.Item>
          <Dropdown.Item eventKey={"Feedback on a book"}>
            Feedback on a book
          </Dropdown.Item>
          <Dropdown.Item eventKey={"Report a user"}>
            Report a user
          </Dropdown.Item>
          <Dropdown.Item eventKey={"Others"}>Others</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className="m-5">
        <form>
          <textarea
            type="text"
            className="form-control"
            placeholder="write something..."
            onChange={(e) => {}}
            style={{ height: "200px" }}
          ></textarea>
          <div
            style={{ color: "red", fontSize: "12px" }}
            className="ml-auto"
          ></div>
          <button
            className="btn btn-success mt-2 ml-auto"
            style={{ width: "auto", height: "auto" }}
            type="submit"
          >
            <i class="far fa-share-square" /> Send
          </button>
        </form>
      </div>
    </div>
  );
};
export default ContactAdmin;
