import { storage } from "../config/firebase";
import React from "react";
import { useState } from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { GET_CATAGORIES_QUERY, GET_BOOK_LIST_QUERY } from "../database/queries";
import { INSERT_BOOK } from "../database/Mutations";
import { useQuery, useMutation } from "@apollo/client";
import "../styles/Forum.css";
import "../styles/Sidebar.css";
import selectType from "./popups";
const UploadPDFs = () => {
  const [show, setShow] = useState(false);
  const [val, setVal] = useState({ name: "Select category" });
  const [showWarning, setShowWarning] = useState("");
  const handleClose = () => {
    setShowWarning("");
    setShow(false);
  };
  const handleShow = () => setShow(!show);
  const [upload] = useMutation(INSERT_BOOK);
  let storageref, finalFile, finalFileName;
  //show categories in the dropdown menu
  const ShowCat = ({ name, id }) => {
    return <Dropdown.Item eventKey={id}>{name}</Dropdown.Item>;
  };
  //generate file to upload
  const onSubmitForm = (e) => {
    console.log(e.target.files);
    finalFile = e.target.files[0];
    finalFileName = typeof finalFile === undefined ? "" : finalFile.name;
    if (finalFileName !== "") setShowWarning("");
    storageref = storage.ref().child(`${e.target.files[0].name}`);
  };
  //generate download link and add to hasura
  //if the input is empty, generates error
  const onSubmitButton = (e) => {
    console.log("onSubmitButton " + finalFileName);
    console.log("1");
    console.log(val.name);
    const ShowWarningString =
      val.name === "Select category"
        ? "Fill the fields correctly"
        : typeof finalFile === undefined
        ? "Fill the fields correctly"
        : "";
    setShowWarning(ShowWarningString);

    if (ShowWarningString === "") {
      selectType("waiting", "books");
      console.log("2");
      try {
        storageref.put(finalFile).then(() => {
          storageref.getDownloadURL().then((link) => {
            e.preventDefault();
            upload({
              variables: {
                link: link,
                name: finalFileName,
                category_id: val.id,
              },
            });
            selectType("success", "book");
            console.log("books refetching");
            refetch();
            console.log("books refetched");
            setShowWarning("");
            handleShow();

            return link;
          });
        });
      } catch (err) {
        console.log("here");
        console.log({ err });

        return err;
      }
    } else {
      setShowWarning("Fill the fields correctly");
    }
  };
  //the function to upload the file to firebase
  const UploadToFirebase = () => {
    return (
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
    );
  };
  const { data, loading, error } = useQuery(GET_CATAGORIES_QUERY);
  const { refetch } = useQuery(GET_BOOK_LIST_QUERY);
  if (loading) return <div className="text-muted">loading...</div>;
  if (error) return <div>error!</div>;
  return (
    <>
      {/* button to upload */}

      <Button
        variant="btn btn-outline-light shadow-none"
        type="submit"
        onClick={handleShow}
        className="text-center"
      >
        Upload a book
      </Button>
      {/* select book*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UploadToFirebase className="m-2" />
          {/* takes the val of the selected category */}
          <Dropdown
            className="row"
            onSelect={(e) => {
              console.log(e);
              setVal(data.categories.find(({ id }) => id === e));
            }}
          >
            {/* show which book is selected */}
            <Dropdown.Toggle variant="secondary" className="col m-3">
              {val.name}
            </Dropdown.Toggle>
            {/* dropdown menu */}
            <Dropdown.Menu>
              {data.categories.map((c) => (
                <ShowCat name={c.name} id={c.id} key={c.id} />
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <span style={{ color: "grey", fontSize: "12px" }} className="ml-auto">
            **Select the category first
          </span>
        </Modal.Body>

        <Modal.Footer>
          {/* warning */}
          <span style={{ color: "red", fontSize: "12px" }} className="ml-auto">
            {showWarning}
          </span>
          <Button variant="success" onClick={onSubmitButton}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default UploadPDFs;
