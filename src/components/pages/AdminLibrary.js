import React from "react";
import { Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ShowBookList from "./ShowBookList";
import "../../styles/AdminLibrary.css";
/**
 *@description contains all the components of admin library
 */
class App extends React.Component {
  render() {
    return (
      <div className="admin-library">
        <div className="text-center p-3 mx-auto">
          <a href="http://localhost:3000/unilib/admin/add-books">
            <Button variant="success" type="submit" align="center">
              + ADD BOOKS
            </Button>
          </a>
        </div>
        <div class="mx-auto">
          <ShowBookList />
        </div>
      </div>
    );
  }
}

export default App;
