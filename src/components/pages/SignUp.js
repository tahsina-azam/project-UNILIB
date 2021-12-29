import axios from "axios";
import React from "react";
import "../../styles/login.css";
import "../../styles/Fonts.css";
import selectType from "../popups";

const Field = React.forwardRef(({ label, type }, ref) => {
  return (
    <div className="form-outline flex-fill mb-0">
      <input ref={ref} type={type} className="form-control" />
      <label className="form-label">{label}</label>
    </div>
  );
});

const Form = ({ onSubmit }) => {
  const nameRef = React.useRef();
  const passwordRef = React.useRef();
  const emailRef = React.useRef();
  const registrationNumRef = React.useRef();
  const departmentRef = React.useRef();
  const sessionRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("in signup");
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      registration: registrationNumRef.current.value,
      department: departmentRef.current.value,
      session: sessionRef.current.value,
      password: passwordRef.current.value,
    };
    onSubmit(data);
    console.log(data);
    axios
      .post("http://localhost:4000/register", {
        name: nameRef.current.value,
        email: emailRef.current.value,
        registration: registrationNumRef.current.value,
        department: departmentRef.current.value,
        session: sessionRef.current.value,
        password: passwordRef.current.value,
      })
      .then(
        (res) => {
          selectType(
            "success",
            "activation link which is sent in your email account"
          );
          // alert("check your email for the activation link");
        },
        (error) => {
          selectType("invalid", "Carefully fillout all the fields");
          console.log(error);
        }
      );
  };
  return (
    <div className="vh-90 border-0">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black border-0">
              <div className="card-body p-md-5 regbody">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <Field ref={nameRef} label="Name" type="text" />
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-calendar-alt fa-lg me-3 fa-fw" />
                        <Field
                          ref={sessionRef}
                          label="Session"
                          type="varchar"
                        />
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <Field ref={emailRef} label="Email" type="email" />
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-list-ol fa-lg me-3 fa-fw" />
                        <Field
                          ref={registrationNumRef}
                          label="Registration Number"
                          type="number"
                        />
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-book-reader fa-lg me-3 fa-fw" />
                        <Field
                          ref={departmentRef}
                          label="Department"
                          type="text"
                        />
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <Field
                          ref={passwordRef}
                          label="Password"
                          type="password"
                        />
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-success text-align-center"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.png"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Usage example: new axios post part

const App = () => {
  const handleSubmit = (data) => {
    const json = JSON.stringify(data, null, 4);
    console.clear();
    console.log(json);
  };
  return <Form onSubmit={handleSubmit} />;
};

export default App;
