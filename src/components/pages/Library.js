import React, { useState } from "react";
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
            <div class="col-md-12"></div>
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
