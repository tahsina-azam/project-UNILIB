import { storage } from "../config/firebase";
import React from "react";
import { useState } from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { GET_CATAGORIES_QUERY } from "../database/queries";
import { INSERT_BOOK } from "../database/Mutations";
import { useQuery, useMutation } from "@apollo/client";
import "../styles/Forum.css";
//show categories in the dropdown menu
const ShowCat = ({ name, id }) => {
  return <Dropdown.Item eventKey={name}>{name}</Dropdown.Item>;
};
const UploadPDFs = () => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("Select category");
  const [labelState, setLabelState] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [upload] = useMutation(INSERT_BOOK);
  let storageref, finalFile, finalFileName;
  //generate file to upload
  const onSubmitForm = (e) => {
    console.log(e.target.files);
    finalFile = e.target.files[0];
    finalFileName = finalFile.name;
    setLabelState(true);
    storageref = storage.ref().child(`${e.target.files[0].name}`);
  };
  //generate download link and add to hasura
  //if the input is empty, generates error
  const onSubmitButton = (e) => {
    console.log("onSubmitButton " + finalFileName);
    try {
      storageref.put(finalFile).then(() => {
        storageref.getDownloadURL().then((link) => {
          e.preventDefault();
          upload({
            variables: {
              link: link,
              name: finalFileName,
            },
          });

          return link;
        });
      });
    } catch (err) {
      console.log("here");
      console.log({ err });
      return err;
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
  if (loading) return <div className="text-muted">loading...</div>;
  if (error) return <div>error!</div>;

  return (
    <>
      {/* button to upload */}
      <Button variant="dark" onClick={handleShow}>
        Upload a book
      </Button>
      {/* select book*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UploadToFirebase className="m-2" />
          <Dropdown
            className="row"
            onSelect={(e) => {
              console.log(e);
              setValue(e);
            }}
          >
            <Dropdown.Toggle variant="secondary" className="col m-3">
              {value}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {data.categories.map((c) => (
                <ShowCat name={c.name} id={c.id} />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Body>
        <Modal.Footer>
          {/* buttons of the modal */}
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={onSubmitButton}
            // disable a button when there is no file input
            // disabled={labelState ? false : true} --> doesn't work
          >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default UploadPDFs;
