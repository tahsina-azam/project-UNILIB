import "bootstrap/dist/css/bootstrap.min.css";
import StudentBookList from "./StudentBookList";
import "../../styles/AdminLibrary.css";

const App = () => {
  return (
    <div className="library">
      <div className="mx-auto">
        <StudentBookList />
      </div>
    </div>
  );
};

export default App;
