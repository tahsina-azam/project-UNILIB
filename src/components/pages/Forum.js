import GetPosts from "../GetPosts";
import Sidebar from "../Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
function Forum() {
  const hasura_id = localStorage.getItem("id");
  return (
    <div>
      <Sidebar />
      {/* <div className="wrapper"> */}
      {/* <!-- Page Content  --> */}
      <div className="content">
        {/* <TypePost author_id={hasura_id} /> */}
        <GetPosts commenter_id={hasura_id} />
      </div>
    </div>
  );
}

export default Forum;
