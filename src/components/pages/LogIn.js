import React from "react";
import "../../styles/App.css";
import "../../styles/login.css";
import "../../styles/Fonts.css";
import "../../styles/Sidebar.css";
import selectType from "../popups";
import axios from "axios";
import Auth from "../../Auth";
import { useNavigate } from "react-router-dom";

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

const Form = ({ onSubmit }) => {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  let history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
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
            console.log(Auth.getAuth() + "from login");
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
                          className="btn btn-dark text-align-center"
                          onSubmit={handleSubmit}
                        >
                          Login
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
    // <form className="formStyle" onSubmit={handleSubmit}>
    //   <div className="form-group">
    //     <Field
    //       ref={emailRef}
    //       type="email"
    //       placeholder="enter email"
    //       label="Email Address"
    //     />
    //     <Field
    //       ref={passwordRef}
    //       placeholder="enter password"
    //       type="password"
    //       label="Password"
    //     />
    //     <div className="m-5">
    //       <button className="btn btn-dark submitStyle" type="submit">
    //         Submit
    //       </button>
    //     </div>
    //   </div>
    // </form>
  );
};

// Usage example:

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
