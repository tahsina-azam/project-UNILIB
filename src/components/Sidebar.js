//sidebar for forum and its children
import "../styles/Fonts.css";
import "../styles/Forum.css";
import "../styles/Sidebar.css";
import "@fontsource/open-sans";
import "@fontsource/abhaya-libre";
import "@fontsource/calistoga";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="sidebar">
        <div className="sidebar-header">
          <h3>Student uploads</h3>
        </div>

        <ul className="list-unstyled components ">
          <li>
            <button
              className=" border-0 my-1"
              style={{ width: "100%" }}
              onClick={() => navigate("/forum/getBooks")}
            >
              Notes
            </button>
          </li>
          <li>
            <button
              className=" border-0 my-1"
              style={{ width: "100%" }}
              onClick={() => navigate("/forum/getBooks")}
            >
              Books
            </button>
          </li>
          <li>
            <button
              className=" border-0 my-1"
              style={{ width: "100%" }}
              onClick={() => navigate("/forum/getBooks")}
            >
              Research paper
            </button>
          </li>
          <li>
            <button
              className=" border-0 my-1"
              style={{ width: "100%" }}
              onClick={() => navigate("/forum/getBooks")}
            >
              Previous year questions
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Sidebar;
