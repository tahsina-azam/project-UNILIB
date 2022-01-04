import { Button, Modal } from "react-bootstrap";
import "../styles/Sidebar.css";
import { useMutation } from "@apollo/client";
import { DELETE_BOOK, DELETE_POST } from "../database/Mutations";
import BoxLoading from "react-loadingg/lib/BoxLoading";
import { useState } from "react";
import selectType from "./popups";
export const DeletePosts = ({ postid }) => {
  const [deletePost, { loading, error }] = useMutation(DELETE_POST);
  const [show, setShow] = useState(false);
  const onSubmitButton = () => {
    deletePost({ variables: { id: postid } }).then(window.location.reload());
  };
  const handleClose = () => {
    setShow(false);
  };
  if (loading) return <BoxLoading />;
  if (error) return selectType("error", "please try again");
  return (
    <>
      <Button
        className="btn btn-danger border-0 float-child1 mx-1"
        data-toggle="tooltip"
        data-placement="top"
        title="click to delete"
        onClick={() => {
          setShow(!show);
        }}
      >
        <i class="fas fa-trash-alt" style={{ color: "white" }} />
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your post will be deleted.</Modal.Body>

        <Modal.Footer>
          <button className="btn btn-danger" onClick={onSubmitButton}>
            Okay
          </button>
          <button className="btn btn-success" onClick={handleClose}>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export const DeleteBooks = ({ id, link }) => {
  const [DeleteBook, { loading, error }] = useMutation(DELETE_BOOK);
  const [show, setShow] = useState(false);
  const onSubmitButton = () => {
    console.log(`book id: ${id}`);
    console.log(`book link: ${link}`);
    DeleteBook({ variables: { id: id, link: link } }).then(
      console.log("deleted"),
      setShow(false),
      window.location.reload()
    );
  };
  const handleClose = () => {
    setShow(false);
  };
  if (loading) return <BoxLoading />;
  if (error) return selectType("error", "please try again");
  return (
    <>
      <Button
        className="btn btn-danger border-0 float-child1"
        data-toggle="tooltip"
        data-placement="top"
        title="click to delete"
        onClick={() => {
          setShow(!show);
        }}
      >
        <i class="fas fa-trash-alt p-1" style={{ color: "white" }} />
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your book will be deleted.</Modal.Body>

        <Modal.Footer>
          <button className="btn btn-danger" onClick={onSubmitButton}>
            Okay
          </button>
          <button className="btn btn-success" onClick={handleClose}>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
