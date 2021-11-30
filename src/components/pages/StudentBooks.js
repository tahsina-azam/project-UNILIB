import Sidebar from "../Sidebar";
import "../../styles/Sidebar.css";
import "../../styles/post.css";
import UploadPDFs from "../UploadPDFs";
const StudentBooks = () => {
  return (
    <div>
      <Sidebar />
      <div className=" book-content">{<UploadPDFs />}</div>
    </div>
  );
};
export default StudentBooks;
