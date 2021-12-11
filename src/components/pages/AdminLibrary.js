import React from "react";
import { Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ShowBookList from "./ShowBookList";

class App extends React.Component {
  render() {
    return (
      <div>
        <Row className="mb-5"></Row>
        <div className="text-center">
          <a href="http://localhost:3000/unilib/admin/add-books">
            <Button variant="dark" type="submit" align="center" width="40%">
              + ADD BOOKS
            </Button>
          </a>
          <div>
            <ShowBookList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
