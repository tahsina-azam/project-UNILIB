import { storage } from "../config/firebase";
import React from "react";
import { useState } from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { GET_CATAGORIES_QUERY } from "../database/queries";
import { INSERT_BOOK } from "../database/Mutations";
import { useQuery, useMutation, empty } from "@apollo/client";
import "../styles/Forum.css";
//show categories in the dropdown menu
const ShowCat = ({ name, id }) => {
  return <Dropdown.Item eventKey={name}>{name}</Dropdown.Item>;
};
const UploadPDFs = () => {
  const [upload] = useMutation(INSERT_BOOK);
  let storageref, finalFile;
  const onSubmitForm = (e) => {
    console.log(e.target.files);
    finalFile = e.target.files[0];
    storageref = storage.ref().child(`${e.target.files[0].name}`);
  };
  const onSubmitButton = (e) => {
    try {
      storageref.put(finalFile).then(() => {
        storageref.getDownloadURL().then((link) => {
          e.preventDefault();
          upload({
            variables: {
              link: link,
            },
          });
          console.log("uploaded " + link);
          return link;
        });
      });
    } catch (err) {
      console.log("here");
      console.log({ err });
      return err;
    }
  };

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
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("Select category");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
          {/* form for book's name input */}
          <form className="m-2">
            <input
              type="text"
              className="form-control"
              placeholder="Name of the book"
            ></input>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={onSubmitButton}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default UploadPDFs;
