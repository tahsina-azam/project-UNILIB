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
const Sidebar = ({ user_id }) => {
  const { data, loading, error } = useQuery(GET_CATAGORIES_QUERY);
  if (loading) <BoxLoading />;
  if (error) return selectType("success", "please try again");
  return (
    <>
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
    </>
  );
};
export default Sidebar;
