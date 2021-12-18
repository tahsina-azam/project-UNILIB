import React from "react";
import { Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ShowBookList from "./ShowBookList";
import "../../styles/AdminLibrary.css";

class App extends React.Component {
  render() {
    return (
      <div className="admin-library">
        <Row className="mb-5"></Row>
        <div className="text-center w-50 p-3 mx-auto">
          <a href="http://localhost:3000/unilib/admin/add-books">
            <Button variant="dark" type="submit" align="center" width="40%">
              + ADD BOOKS
            </Button>
          </a>
        </div>
        <div class="">
          <Row className="mb-5"></Row>
          <div className=" container mx-auto">
            <div class="row">
              <div class="col-md-12">
                <div class="input-group mb-3">
                  {" "}
                  <input
                    type="text"
                    class="form-control input-text"
                    placeholder="Search books...."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <div class="input-group-append">
                    {" "}
                    <button
                      color="black"
                      class="btn btn-outline-warning btn-lg"
                      type="button"
                    >
                      <i style={{ color: "black" }} class="fa fa-search"></i>
                    </button>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mx-auto">
          <ShowBookList />
        </div>
      </div>
    );
  }
}

export default App;
