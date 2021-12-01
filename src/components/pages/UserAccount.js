import React, { Component } from "react";
import "../../App.css";
import { Col, Form, Row, Button, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import img1 from "../../images/user.png";

class App extends Component {
  componentDidMount() {
    const reloadCount = sessionStorage.getItem("reloadCount");
    if (reloadCount < 2) {
      sessionStorage.setItem("reloadCount", String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem("reloadCount");
    }
  }

  render() {
    return (
      <div>
        <Row className="mb-5"></Row>
        <Row className="mb-5">
          <div className="text-center">
            <Image src={img1} roundedCircle alt="..." />
          </div>
        </Row>
        <div>
          <Form>
            <Row className="mb-3">
              <Col className="mb-1"> </Col>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Roll</Form.Label>
                <Form.Control placeholder="1234" />
              </Form.Group>
              <Col className="mb-1"> </Col>
            </Row>

            <Row className="mb-3">
              <Col className="mb-0"> </Col>
              <Form.Group as={Col} controlId="formGridAddress1">
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="Name" />
              </Form.Group>
              <Col className="mb-0"> </Col>
            </Row>

            <Row className="mb-3">
              <Col className="mb-1"> </Col>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Department</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>CSE</option>
                  <option>EEE</option>
                  <option>SWE</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Session</Form.Label>
                <Form.Control />
              </Form.Group>
              <Col className="mb-1"> </Col>
            </Row>
            <div className="text-center">
              <Button variant="primary" type="submit" align="center">
                Update
              </Button>
              <Row className="mb-5"></Row>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default App;
