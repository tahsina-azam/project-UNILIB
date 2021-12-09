import React from "react";
import {
  Col,
  Form,
  Row,
  Button,
  Image,
  InputGroup,
  FormControl,
  input,
  form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Elements = ({ onSubmit }) => {
  const bookRef = React.useRef();
  const writerRef = React.useRef();
  const numRef = React.useRef();
  const imgRef = React.useRef();
  const linkRef = React.useRef();
  const textRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      book: bookRef.current.value,
      writer: writerRef.current.value,
      number: numRef.current.value,
      image: imgRef.current.value,
      link: linkRef.current.value,
      text: textRef.current.value,
    };
    onSubmit(data);

    /*axios.post('http://localhost:4000/',{
          email: emailRef.current.value,
          password: passwordRef.current.value
    }).then((res) => {    
      console.log(res.data.token);      
      if(res.data.token){
        localStorage.setItem('token', res.data.token)
        const email=emailRef.current.value;
        var id = email.split('@');
        history(`/unilib/user/${id[0]}`);
      }
      else{
        alert('wrong username or password');
      }
      
    },(error)=>{
      alert('wrong username or password');
    });*/
  };
  return (
    <div>
      <Row className="mb-5"></Row>
      <div
        class="card text-dark border-dark mb-3 mx-auto"
        style={{
          maxWidth: "25rem",
          alignSelf: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div class="card-header mx-auto">ADD A NEW BOOK</div>
        <div class="card-body">
          <form>
            <Row className="mb-5"></Row>
            <div class="form-group mx-sm-3 mb-2 ">
              <label for="inputPassword2">Enter the name of the book</label>
              <input ref={bookRef} type="text" class="form-control" />
            </div>

            <div class="form-group mx-sm-3 mb-2  ">
              <label for="inputPassword2">Enter the name of the writer</label>
              <input ref={writerRef} type="text" class="form-control" />
            </div>
            <div class="form-group mx-sm-3 mb-2  ">
              <label for="inputPassword2">
                Enter the number of available books
              </label>
              <input ref={numRef} type="text" class="form-control" />
            </div>
            <div class="form-group mx-sm-3 mb-2  ">
              <label for="inputPassword2">Enter the pdf link:</label>
              <input
                ref={linkRef}
                type="text"
                class="form-control"
                id="basic-url"
                aria-describedby="basic-addon3"
              />
            </div>
            <div class="form-group  mx-sm-3 mb-2">
              <label for="exampleFormControlFile1">Example file input</label>
              <input
                ref={imgRef}
                type="file"
                class="form-control-file"
                id="exampleFormControlFile1"
              />
            </div>
            <div class="form-group  mx-sm-3 mb-2">
              <label for="exampleFormControlTextarea1">
                Additional information about book:
              </label>
              <textarea
                ref={textRef}
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
            <div className="text-center">
              <button class="btn btn-dark" type="submit" align="center">
                Update
              </button>
              <Row className="mb-5"></Row>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

function App() {
  const handleSubmit = (data) => {
    const json = JSON.stringify(data, null, 4);
    console.clear();
    console.log(json);
  };
  return (
    <div>
      <Elements onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
