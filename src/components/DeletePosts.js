import { Button, Modal } from "react-bootstrap";
import "../styles/Sidebar.css";
import { useMutation } from "@apollo/client";
import { DELETE_POST } from "../database/Mutations";
import BoxLoading from "react-loadingg/lib/BoxLoading";
import { useState } from "react";
import selectType from "././popups";
const DeletePosts = ({ postid }) => {
  const [deletePost, { loading, error }] = useMutation(DELETE_POST);
  const [show, setShow] = useState(false);
  const onSubmitButton = () => {
    deletePost({ variables: { id: postid } });
    window.location.reload();
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
        to="/forum/writepost"
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
          <Button variant="danger" onClick={onSubmitButton}>
            Okay
          </Button>
          <Button variant="success" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default DeletePosts;
