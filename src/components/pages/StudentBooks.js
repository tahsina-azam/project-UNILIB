import Sidebar from "../Sidebar";
import "../../styles/Sidebar.css";
import "../../styles/post.css";
import UploadPDFs from "../UploadPDFs";
import GetBooks from "../GetBooks";
const StudentBooks = () => {
  return (
    <div>
      <Sidebar />
      <div className=" book-content">{<UploadPDFs />}</div>
      <GetBooks />
    </div>
  );
};
export default StudentBooks;
