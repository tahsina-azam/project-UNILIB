import React from "react";
import { Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentBookList from "./StudentBookList";
import "../../styles/AdminLibrary.css";

const App = () => {
  return (
    <div className="library">
      <div>
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
        <StudentBookList />
      </div>
    </div>
  );
};

export default App;
