import { storage } from "../config/firebase";
import React from "react";
import { useState, useCallback } from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { GET_CATAGORIES_QUERY, GET_BOOK_LIST_QUERY } from "../database/queries";
import { INSERT_BOOK } from "../database/Mutations";
import { useQuery, useMutation } from "@apollo/client";
import "../styles/Forum.css";
import "../styles/Sidebar.css";
import selectType from "./popups";
import BoxLoading from "react-loadingg/lib/BoxLoading";
const UploadPDFs = ({ user_id }) => {
  const [show, setShow] = useState(false);
  const [val, setVal] = useState({ name: "Select category" });
  const [showWarning, setShowWarning] = useState("");
  const [description, setDescription] = useState("");
  const [finalFile, setFinalFile] = useState();
  const [finalFileName, setfinalFileName] = useState();
  const handleClose = () => {
    setShowWarning("");
    setShow(false);
  };
  const handleShow = () => setShow(!show);
  const [upload] = useMutation(INSERT_BOOK);
  let storageref;
  //show categories in the dropdown menu
  const ShowCat = ({ name, id }) => {
    return <Dropdown.Item eventKey={id}>{name}</Dropdown.Item>;
  };
  //generate file to upload
  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log("count");
    setFinalFile(e.target.files[0]);
    console.log(e.target.files[0]);
    setfinalFileName(
      typeof e.target.files[0] === undefined ? "" : e.target.files[0].name
    );
    if (finalFileName !== "") setShowWarning("");
  };
  //generate download link and add to hasura
  //if the input is empty, generates error
  const onSubmitButton = (e) => {
    storageref = storage.ref().child(`${finalFileName}`);
    console.log("onSubmitButton " + finalFileName);
    console.log("1");
    console.log(`${val.name} with ${val.id}`);
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
      const des = description.substring(0, 150);
      console.log(`des ${des}`);
      console.log(finalFileName);
      try {
        storageref.put(finalFile).then(() => {
          storageref.getDownloadURL().then((link) => {
            e.preventDefault();
            console.log(
              `here is the logged user ${localStorage.getItem("id")}`
            );
            upload({
              variables: {
                link: link,
                name: finalFileName,
                category_id: val.id,
                description: des,
                uploader_id: localStorage.getItem("id"),
              },
            }).then(selectType("success", "book"));

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
  const UploadToFirebase = useCallback(() => {
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
  }, []);
  const { data, loading, error } = useQuery(GET_CATAGORIES_QUERY);
  const { refetch } = useQuery(GET_BOOK_LIST_QUERY);
  if (loading) return <BoxLoading />;
  if (error) selectType("error", "please try again");
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
          <textarea
            placeholder=" Any other important informations(keep it in 150 characters)"
            type="text"
            value={description}
            onChange={(e) => {
              const getDes = e.target.value;
              setDescription(getDes);
              console.log(getDes);
            }}
            style={{ width: "100%" }}
          />
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
