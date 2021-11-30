import "../../styles/Fonts.css";
import "../../styles/Forum.css";
import "../../styles/Sidebar.css";
import "@fontsource/open-sans";
import "@fontsource/abhaya-libre";
import "@fontsource/calistoga";
import GetPosts from "../GetPosts";


function Forum() {
  return (
    // <div className="container-fluid">
    //   <UploadButton className="position-absolute top-0 end-0" />
    //   <GetPosts />
    // </div>
    <>
      <div>
        <nav className="sidebar">
          <div className="sidebar-header">
            <h3>Student uploads</h3>
          </div>

          <ul className="list-unstyled components ">
            <li>
              <a href="#notes" style={{ color: "black" }}>
                Notes
              </a>
            </li>
            <li>
              <a href="#books" style={{ color: "black" }}>
                Books
              </a>
            </li>
            <li>
              <a href="#research paper" style={{ color: "black" }}>
                Research paper
              </a>
            </li>
            <li>
              <a href="#preQues" style={{ color: "black" }}>
                Previous year questions
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {/* <div className="wrapper"> */}
      {/* <!-- Page Content  --> */}
      <div id="content">
        <GetPosts />
      </div>
      {/* </div> */}
    </>
  );
}

export default Forum;
// className="fw-light fnt text-muted" no comments div
