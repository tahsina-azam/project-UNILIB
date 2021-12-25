import React, { useState } from "react";
import { Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentBookList from "./StudentBookList";
import "../../styles/AdminLibrary.css";

const App = () => {
  return (
    <div className="library">
      <div>
// <<<<<<< fixing-ui
        <div className="container mx-auto">
          <div className="row">
            <div className="col-md-12">
              <div className="input-group mb-3 ">
                <input
                  type="text"
                  className="form-control input-text"
                  placeholder="Type here"
                />
                <div className="input-group-append">
                  <button className="btn btn-success btn-lg m-1" type="button">
                    <i style={{ color: "white" }} className="fa fa-search" />
                  </button>
                </div>
              </div>
            </div>
// =======
//         <Row className="mb-5"></Row>
//         <div className=" container mx-auto">
//           <div class="row">
//             <div class="col-md-12"></div>
// >>>>>>> main
          </div>
        </div>
      </div>
      <div className="mx-auto">
        <StudentBookList />
      </div>
    </div>
  );
};

export default App;
