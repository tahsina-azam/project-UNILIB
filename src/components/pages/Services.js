import React from "react";
import "../../styles/App.css";
import "../../styles/login.css";
import "../../styles/Fonts.css";
import "../../styles/Sidebar.css";
import axios from "axios";
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
  const messageRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      message: messageRef.current.value,
    };
    onSubmit(data);

    axios
      .post("http://localhost:4000/messages", {
        message: messageRef.current.value,
      })
      .then((err) => {
        console.log(err);
      });
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
                    <h3 className="services">Services</h3>
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex justify-content-center flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <Field
                          ref={messageRef}
                          label="Leave us a message"
                          type="text"
                        />
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-success text-align-center"
                          onSubmit={handleSubmit}
                        >
                          Send
                        </button>
                      </div>
                    </form>
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
