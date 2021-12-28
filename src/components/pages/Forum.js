import GetPosts from "../GetPosts";
import Sidebar from "../Sidebar";
import "../../styles/Sidebar.css";
import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
function Forum() {
  const hasura_id = localStorage.getItem("id");
  return (
    <Row className="wrapper">
      <Col className="col-sm-2 sidebar">
        <Sidebar user_id={hasura_id} type={"1"} />
      </Col>

      <Col className="col-sm-100 content">
        <GetPosts commenter_id={hasura_id} type={"1"} />
      </Col>
    </Row>
  );
}

export default Forum;
