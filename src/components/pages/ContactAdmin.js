import { Dropdown } from "react-bootstrap";
const ContactAdmin = () => {
  return (
    <>
      <Dropdown
        className="row"
        onSelect={(e) => {
          console.log(e);
        }}
      >
        {/* show which book is selected */}
        <Dropdown.Toggle variant="secondary" className="col m-3">
          "hi"
        </Dropdown.Toggle>
        {/* dropdown menu */}
        <Dropdown.Menu>
          <Dropdown.Item eventKey={"A"}>1</Dropdown.Item>
          <Dropdown.Item eventKey={"b"}>1</Dropdown.Item>
          <Dropdown.Item eventKey={"C"}>1</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <form>
        <textarea
          type="text"
          className="form-control"
          placeholder="write something..."
          onChange={(e) => {}}
        ></textarea>
        <div
          style={{ color: "red", fontSize: "12px" }}
          className="ml-auto"
        ></div>
        <button
          className="btn btn-outline-dark mt-2 ml-auto"
          style={{ width: "auto", height: "auto" }}
          type="submit"
        >
          Post now
        </button>
      </form>
    </>
  );
};
export default ContactAdmin;
