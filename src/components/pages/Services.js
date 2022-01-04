import React from "react";
import "../../styles/App.css";
import "../../styles/login.css";
import "../../styles/Fonts.css";
import "../../styles/Sidebar.css";
import axios from "axios";

/**
 * specifying Field component
 */
const Field = React.forwardRef(({ label, type, placeholder }, ref) => {
  return (
    <textarea
      ref={ref}
      type={type}
      className="form-control fnt"
      placeholder={placeholder}
      style={{ height: "500px" }}
    />
  );
});
/**
 * specifying login form
 * @param {function} param0
 * @returns a login form
 */
const Form = ({ onSubmit }) => {
  const messageRef = React.useRef();
  /**
   * handles form submission
   * @param {event} e  event function
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      message: messageRef.current.value,
    };
    onSubmit(data);

    axios
      .post("http://localhost:4000/messages", {
        message: messageRef.current.value,
      })
      .then((err) => {
        console.log(err);
      });
  };
  return (
    <div className="text-center align-items-center">
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center flex-row align-items-center mt-5">
          {/* <i className="fas fa-envelope fa-lg me-3 fa-fw"></i> */}
          <Field
            ref={messageRef}
            type="text"
            placeholder="Leave us a message here"
          />
        </div>

        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-success m-2"
            onSubmit={handleSubmit}
          >
            <i class="far fa-share-square" /> Send
          </button>
        </div>
      </form>
    </div>
  );
};

// Usage example:

function App() {
  const handleSubmit = (data) => {
    const json = JSON.stringify(data, null, 4);
    console.clear();
    console.log(json);
  };
  return (
    <div className="fnt mt-0 pt-0">
      <Form onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
