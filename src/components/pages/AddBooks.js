import React, { useState } from "react";
import { Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../../utility";

const Elements = ({ onSubmit }) => {
  const bookRef = React.useRef();
  const writerRef = React.useRef();
  const numRef = React.useRef();
  const linkRef = React.useRef();
  const textRef = React.useRef();
  const [fileName, setFileName] = useState("");

  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("bookName", bookRef.current.value);
    formData.append("writer", writerRef.current.value);
    formData.append("number", numRef.current.value);
    formData.append("image", fileName);
    formData.append("pdfLink", linkRef.current.value);
    formData.append("text", textRef.current.value);

    const data = {
      bookName: bookRef.current.value,
      writer: writerRef.current.value,
      number: numRef.current.value,
      image: fileName,
      pdfLink: linkRef.current.value,
      text: textRef.current.value,
    };
    onSubmit(data);

    axios.post("http://localhost:4000/addbook", formData).then(
      (res) => {
        console.log(res.data);
      },
      (error) => {
        alert("wrong username or password");
      }
    );
  };
  return (
    <div>
      <Row className="mb-5"></Row>
      <div
        class="card text-dark border-dark mb-3 mx-auto"
        style={{
          maxWidth: "25rem",
          alignSelf: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div class="card-header mx-auto">ADD A NEW BOOK</div>
        <div class="card-body">
          <form enctype="multipart/form-data" onSubmit={handleSubmit}>
            <Row className="mb-5"></Row>
            <div class="form-group mx-sm-3 mb-2 ">
              <label for="inputPassword2">Enter the name of the book</label>
              <input ref={bookRef} type="text" class="form-control" />
            </div>

            <div class="form-group mx-sm-3 mb-2  ">
              <label for="inputPassword2">Enter the name of the writer</label>
              <input ref={writerRef} type="text" class="form-control" />
            </div>
            <div class="form-group mx-sm-3 mb-2  ">
              <label for="inputPassword2">
                Enter the number of available books
              </label>
              <input ref={numRef} type="text" class="form-control" />
            </div>
            <div class="form-group mx-sm-3 mb-2  ">
              <label for="inputPassword2">Enter the pdf link:</label>
              <input
                ref={linkRef}
                type="text"
                class="form-control"
                id="basic-url"
                aria-describedby="basic-addon3"
              />
            </div>
            <div class="form-group  mx-sm-3 mb-2">
              <label for="exampleFormControlFile1">Example file input</label>
              <input
                type="file"
                class="form-control-file"
                filename="image"
                onChange={onChangeFile}
              />
            </div>
            <div class="form-group  mx-sm-3 mb-2">
              <label for="exampleFormControlTextarea1">
                Additional information about book:
              </label>
              <textarea
                ref={textRef}
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
            <div className="text-center">
              <button class="btn btn-dark" type="submit" align="center">
                Update
              </button>
              <Row className="mb-5"></Row>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

function App() {
  const handleSubmit = (data) => {
    const json = JSON.stringify(data, null, 4);
    console.clear();
    console.log(json);
  };
  return (
    <div>
      <Elements onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
