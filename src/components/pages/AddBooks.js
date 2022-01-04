import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../../utility";
import selectType from "../popups";
import { storage } from "../../config/firebase";

/**
 *
 * @param {function} param0 does necessary works when admin adds a book
 * @returns the body of a form to add books
 */
const Elements = ({ onSubmit }) => {
  let finalFile, finalFileName, storageref;
  const bookRef = React.useRef();
  const writerRef = React.useRef();
  const numRef = React.useRef();
  const linkRef = React.useRef();
  const textRef = React.useRef();
  const [fileName, setFileName] = useState("");

  /**
   * @description gets called when file is changes
   * @param {event} e keeps tract of any changes in the file
   */
  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };

  /**
   * generate file to upload
   * @param {event} e  keeps tract of any changes in the file
   */
  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log("count");
    finalFile = e.target.files[0];
    console.log(e.target.files[0]);
    finalFileName =
      typeof e.target.files[0] === undefined ? "" : e.target.files[0].name;
  };

  /**
   * handles form submission
   * @param {event} e  event function
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    storageref = storage.ref().child(`${finalFileName}`);
    console.log("onSubmitButton " + finalFileName);
    console.log(finalFileName);
    try {
      storageref.put(finalFile).then(() => {
        storageref.getDownloadURL().then((link) => {
          e.preventDefault();
          console.log(`link for library book ${link}`);
          const formData = new FormData();
          formData.append("bookName", bookRef.current.value);
          formData.append("writer", writerRef.current.value);
          formData.append("number", numRef.current.value);
          formData.append("image", fileName);
          formData.append("pdfLink", link);
          formData.append("text", textRef.current.value);

          const data = {
            bookName: bookRef.current.value,
            writer: writerRef.current.value,
            number: numRef.current.value,
            image: fileName,
            pdfLink: link,
            text: textRef.current.value,
          };
          onSubmit(data);

          axios.post("http://localhost:4000/addbook", formData).then(
            (res) => {
              selectType("success", "book uploaded");
              console.log(res.data);
            },
            (error) => {
              selectType("invalid", "Carefully fillout all the fields");
            }
          );
        });
      });
    } catch (err) {
      console.log("here");
      console.log({ err });
    }
  };
  return (
    <div class="mx-auto">
      <div>
        <form enctype="multipart/form-data" onSubmit={handleSubmit}>
          <div class="form-group  mx-sm-3 mb-2">
            <label>Enter the file:</label>{" "}
            <div className="input-group">
              <span className="input-group-text border-0">
                <i className="fa fa-cloud-upload p-0 m-0" />
              </span>
              <input
                type="file"
                className="form-control border-0 align-center pl-0 ml-0"
                onChange={onSubmitForm}
              />
            </div>
          </div>
          <div class="form-group  mx-sm-3 mb-2">
            <label for="exampleFormControlFile1">
              Enter the front page of the file:
            </label>{" "}
            <div className="input-group">
              <span className="input-group-text border-0">
                <i className="fa fa-cloud-upload p-0 m-0" />
              </span>
              <input
                type="file"
                accept="image/*"
                className="form-control border-0 align-center pl-0 ml-0"
                filename="image"
                onChange={onChangeFile}
              />
            </div>
          </div>
          <div class="form-group m-3">
            <label for="inputPassword2">The name of the book</label>
            <input ref={bookRef} type="text" class="form-control" />
          </div>

          <div class="form-group m-3">
            <label for="inputPassword2">The name of the writer</label>
            <input ref={writerRef} type="text" class="form-control" />
          </div>
          <div class="form-group m-3">
            <label for="inputPassword2">The number of available books</label>
            <input ref={numRef} type="text" class="form-control" />
          </div>
          {/* <div class="form-group m-3">
            <label for="inputPassword2">The pdf link</label>
            <input
              ref={linkRef}
              type="text"
              class="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
            />
          </div> */}

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
            <button class="btn btn-success m-2" type="submit" align="center">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/**
 * handles form data
 * @returns {Elements}
 */
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
