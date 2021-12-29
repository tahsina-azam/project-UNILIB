//sidebar for forum and its children
import { GET_CATAGORIES_QUERY } from "../database/queries";
import UploadPDFs from "./UploadPDFs";
import selectType from "./popups";
import BoxLoading from "react-loadingg/lib/BoxLoading";
import "../styles/Fonts.css";
import "../styles/Forum.css";
import "../styles/Sidebar.css";
import "@fontsource/open-sans";
import "@fontsource/abhaya-libre";
import "@fontsource/calistoga";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
const ShowCatInSidebar = ({ name, id }) => {
  return (
    <Link className="w-100 py-1 link" to={`/forum/${name}`}>
      <i className="fas fa-circle-notch" />
      <span className="d-none d-sm-inline inside-text"> {name}</span>
    </Link>
  );
};
const Sidebar = ({ user_id, type, pageid }) => {
  const { data, loading, error } = useQuery(GET_CATAGORIES_QUERY);
  if (type === "1") {
    if (loading) return <BoxLoading />;
    if (error) selectType("error", "please try again");
    return (
      <div className="bar">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-success sidebar ">
          <div className="col align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start list-unstyled components"
              id="menu"
            >
              <Link
                className="nav-item align-middle px-0 py-1 link"
                to="/forum/search"
              >
                <i className="fa fa-search icon" />
                <span className="ms-1 d-none d-sm-inline inside-text">
                  {" "}
                  Search
                </span>
              </Link>
              <Link
                className="nav-item align-middle px-0 py-1 link"
                to="/forum/writepost"
              >
                <i className="fas fa-pen icon" />
                <span className="ms-1 d-none d-sm-inline inside-text">
                  {" "}
                  Write a post
                </span>
              </Link>
              <Link
                className="nav-item align-middle px-0 py-1 link"
                to="/forum/ContactAdmin"
              >
                <i className="fas fa-envelope-open-text icon" />
                <span className="ms-1 d-none d-sm-inline inside-text">
                  {" "}
                  Contact admin
                </span>
              </Link>
              <Link
                className="nav-item align-middle px-0 py-1 link"
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
                  className="nav-item px-0 align-middle py-1"
                >
                  <i className="fas fa-book icon" />
                  <span className="ms-1 d-none d-sm-inline inside-text">
                    {" "}
                    Book list
                  </span>{" "}
                </div>
                <ul
                  className="collapse show nav flex-column ms-1 text-start"
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
            <UploadPDFs user_id={user_id} />
            <div className="dropdown pb-4"></div>
          </div>
        </div>
      </div>
    );
  } else if (type === "2") {
    return (
      <div className="bar">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-success sidebar ">
          <div className="col align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start list-unstyled components"
              id="menu"
            >
              <Link
                className="nav-item align-middle px-0 py-1 link"
                to={`/edit-user/${pageid}`}
              >
                <i className="fa fa-user-edit icon" />
                <span className="ms-1 d-none d-sm-inline inside-text">
                  {" "}
                  Edit Account
                </span>
              </Link>
              <Link
                className="nav-item align-middle px-0 py-1 link"
                to="/check-report"
              >
                <i className="fas fa-clipboard-check icon" />
                <span className="ms-1 d-none d-sm-inline inside-text">
                  {" "}
                  Check Reports
                </span>
              </Link>
              <Link
                className="nav-item align-middle px-0 py-1 link"
                to="/unilib/admin/manage-users"
              >
                <i className="fas fa-users icon" />
                <span className="ms-1 d-none d-sm-inline inside-text">
                  {" "}
                  Manage Users
                </span>
              </Link>
              <Link
                className="nav-item align-middle px-0 py-1 link"
                to="/user-history"
              >
                <i className="fas fa-history icon" />
                <span className="ms-1 d-none d-sm-inline inside-text">
                  Account History
                </span>
              </Link>
            </ul>
            <Link
              className="btn btn-outline-light shadow-none text-center"
              to="/unilib/admin/add-books/"
            >
              Upload a book
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bar">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-success sidebar ">
          <div className="col align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start list-unstyled components"
              id="menu"
            >
              <Link
                className="nav-item align-middle px-0 py-1 link"
                to={`/edit-user/${pageid}`}
              >
                <i className="fa fa-user-edit icon" />
                <span className="ms-1 d-none d-sm-inline inside-text">
                  {" "}
                  Edit Account
                </span>
              </Link>
              <Link
                className="nav-item align-middle px-0 py-1 link"
                to="/view-all"
              >
                <i className="fas fa-users icon" />
                <span className="ms-1 d-none d-sm-inline inside-text">
                  {" "}
                  Other Users
                </span>
              </Link>
<<<<<<< HEAD
              <Link
                className="nav-item align-middle px-0 py-1 link"
                to="/recently-added-books"
              >
                <i className="fas fa-envelope-open-text icon" />
                <span className="ms-1 d-none d-sm-inline inside-text">
                  {" "}
                  Recent Uploads
                </span>
              </Link>
=======

>>>>>>> a466ec4 (fixed #83 and added post edit-delete option)
              <Link
                className="nav-item align-middle px-0 py-1 link"
                to="/user-history"
              >
                <i className="fas fa-history icon" />
                <span className="ms-1 d-none d-sm-inline inside-text">
                  Account History
                </span>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    );
  }
};
export default Sidebar;
