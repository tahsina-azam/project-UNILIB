import React, { useState } from "react";
import "../../styles/App.css";
import "../../styles/login.css";
import "../../styles/Fonts.css";
import "../../styles/Sidebar.css";
import selectType from "../popups";
import axios from "axios";
import Auth from "../../Auth";
import { useNavigate } from "react-router-dom";
/**
 * specifying Field component
 */
const Field = React.forwardRef(({ label, type, placeholder }, ref) => {
  return (
    <div>
      <label className="fnt">{label}</label>
      <input
        ref={ref}
        type={type}
        className="form-control fnt"
        placeholder={placeholder}
      />
    </div>
  );
});
/**
 * specifying login form
 * @param {function} param0
 * @returns a login form
 */
const Form = ({ onSubmit }) => {
  const [error, setError] = useState("");
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  let history = useNavigate();

  /**
   * handles form submission
   * @param {event} e  event function
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const errors = Object.keys(data).filter((e) => data[e] === "");
    console.log({ errors });
    if (errors.length > 0) {
      setError(errors[0]);
      return;
    }
    onSubmit(data);

    axios
      .post("http://localhost:4000/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then(
        (res) => {
          if (res.data.token) {
            Auth.authenticate();
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.id);

            const email = emailRef.current.value;
            var id = email.split("@");
            selectType("success", "account");
            //console.log(Auth.getAuth() + "from login");

            history(`/unilib/user/${id[0]}`);
          } else {
            //alert("login first");
          }
        },
        (error) => {
          // alert("wrong username or password");
          selectType("invalid", "wrong user name or password");
        }
      );
  };
  return (
    <div className="vh-90 mt-5">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black ">
              <div className="card-body p-md-5 regbody">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <Field ref={emailRef} label="Email" type="email" />
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
                          onSubmit={handleSubmit}
                        >
                          Login
                        </button>
                      </div>
                    </form>
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {error === "" ? "" : `Please fill out the ${error} field`}
                    </div>
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

// Usage example:

/**
 * handles login of users , admins and teachers
 * @returns login form
 */
function App() {
  const handleSubmit = (data) => {
    const json = JSON.stringify(data, null, 4);
    console.clear();
    console.log(json);
  };
  return (
    <div className="fnt mt-0 pt-0">
      <Form onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
