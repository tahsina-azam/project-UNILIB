import "bootstrap/dist/css/bootstrap.min.css";
import StudentBookList from "./StudentBookList";
import "../../styles/AdminLibrary.css";
/**
 *@description contains all the components of student library
 */
const App = () => {
  return (
    <div className="library pt-5">
      <div className="mx-auto pt-5">
        <StudentBookList />
      </div>
    </div>
  );
};

export default App;
