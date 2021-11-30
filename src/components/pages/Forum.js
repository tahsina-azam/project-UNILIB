import GetPosts from "../GetPosts";
import { TypePost } from "../PutPosts";
import Sidebar from "../Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

function Forum() {
  return (
    <div>
      <Sidebar />
      {/* <div className="wrapper"> */}
      {/* <!-- Page Content  --> */}
      <div className="content">
        <TypePost />
        <GetPosts />
      </div>
    </div>
  );
}

export default Forum;
// className="fw-light fnt text-muted" no comments div
