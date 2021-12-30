import Sidebar from "../Sidebar";
import "../../styles/Sidebar.css";
import "../../styles/post.css";

import GetBooks from "../GetBooks";
const StudentBooks = () => {
  return (
    <div>
      <Sidebar type={"1"} />

      <GetBooks />
    </div>
  );
};
export default StudentBooks;
