import "bootstrap/dist/css/bootstrap.min.css";
import StudentBookList from "./StudentBookList";
import "../../styles/AdminLibrary.css";

const App = () => {
  return (
    <div className="library">
      <div>
        <div className="container mx-auto">
          <div className="row">
            <div className="col-md-12"></div>
          </div>
        </div>
      </div>
      <div className="mx-auto">
        <StudentBookList />
      </div>
    </div>
  );
};

export default App;
