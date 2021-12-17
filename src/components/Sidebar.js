//sidebar for forum and its children
import { GET_CATAGORIES_QUERY } from "../database/queries";
import UploadPDFs from "./UploadPDFs";
import "../styles/Fonts.css";
import "../styles/Forum.css";
import "../styles/Sidebar.css";
import "@fontsource/open-sans";
import "@fontsource/abhaya-libre";
import "@fontsource/calistoga";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
const ShowCatInSidebar = ({ name, id }) => {
  const navigate = useNavigate();
  return (
    <li>
      <button
        className=" border-0 my-1"
        style={{ width: "100%" }}
        onClick={() => navigate(`/forum/${name}`)}
      >
        {name}
      </button>
    </li>
  );
};
const Sidebar = () => {
  const { data, loading, error } = useQuery(GET_CATAGORIES_QUERY);
  if (loading) return <div className="text-muted">loading...</div>;
  if (error) return <div>error!</div>;
  return (
    <>
      <nav className="sidebar text-center">
        <div className="sidebar-header">
          <h3>Student uploads</h3>
        </div>

        <ul className="list-unstyled components ">
          {data.categories.length === 0 ? (
            <div>""</div>
          ) : (
            data.categories.map((c) => (
              <ShowCatInSidebar name={c.name} id={c.id} key={c.id} />
            ))
          )}
        </ul>
        <UploadPDFs />
      </nav>
    </>
  );
};
export default Sidebar;
