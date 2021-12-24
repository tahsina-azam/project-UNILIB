//sidebar for forum and its children
import { GET_CATAGORIES_QUERY } from "../database/queries";
import UploadPDFs from "./UploadPDFs";
import "../styles/Fonts.css";
import "../styles/Forum.css";
import "../styles/Sidebar.css";
import "@fontsource/open-sans";
import "@fontsource/abhaya-libre";
import "@fontsource/calistoga";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
const ShowCatInSidebar = ({ name, id }) => {
  const navigate = useNavigate();
  return (
    // <li>
    //   <button
    //     className=" border-0 my-1"
    //     style={{ width: "100%" }}
    //
    //   >
    //
    //   </button>
    // </li>
    <Link className="w-100 ml-auto my-1 link px-3" to={`/forum/${name}`}>
      <i className="fas fa-circle-notch" />
      <span
        className="d-none d-sm-inline inside-text"
        // onClick={() => navigate(`/forum/${name}`)}
      >
        {" "}
        {name}
      </span>
    </Link>
  );
};
const Sidebar = () => {
  const { data, loading, error } = useQuery(GET_CATAGORIES_QUERY);
  if (loading) return <div className="text-muted">loading...</div>;
  if (error) return <div>error!</div>;
  return (
    <>
      <div className="container-fluid bar">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark sidebar">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <a
                href="/"
                className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
              >
                <span className="fs-5 d-none d-sm-inline">Menu</span>
              </a>
              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start list-unstyled components"
                id="menu"
              >
                <Link
                  className="nav-item align-middle px-0 py-3 link"
                  to="/forum/writepost"
                >
                  <i className="fas fa-pen icon" />
                  <span className="ms-1 d-none d-sm-inline inside-text">
                    {" "}
                    Write a post
                  </span>
                </Link>
                <Link
                  className="nav-item align-middle px-0 py-3 link"
                  to="/forum"
                >
                  <i className="fas fa-newspaper icon" />
                  <span className="ms-1 d-none d-sm-inline inside-text">
                    {" "}
                    All Posts
                  </span>
                </Link>
                <li className="link">
                  <div
                    href="#submenu1"
                    data-bs-toggle="collapse"
                    className="nav-item px-0 align-middle py-3"
                  >
                    <i className="fas fa-book icon" />
                    <span className="ms-1 d-none d-sm-inline inside-text">
                      {" "}
                      Book list
                    </span>{" "}
                  </div>
                  <ul
                    className="collapse show nav flex-column ms-1"
                    id="submenu1"
                    data-bs-parent="#menu"
                  >
                    {data.categories.length === 0 ? (
                      <div>""</div>
                    ) : (
                      data.categories.map((c) => (
                        <ShowCatInSidebar name={c.name} id={c.id} key={c.id} />
                      ))
                    )}
                  </ul>
                </li>
              </ul>
              <UploadPDFs />
              <div className="dropdown pb-4"></div>
            </div>
          </div>
        </div>
      </div>
    </>
    // <>
    //   <nav className="sidebar text-center">
    //     <div className="sidebar-header">
    //       <h3></h3>
    //     </div>

    //     <ul className="list-unstyled components ">
    //       {data.categories.length === 0 ? (
    //         <div>""</div>
    //       ) : (
    //         data.categories.map((c) => (
    //           <ShowCatInSidebar name={c.name} id={c.id} key={c.id} />
    //         ))
    //       )}
    //     </ul>
    //
    //   </nav>
    // </>
  );
};
export default Sidebar;
