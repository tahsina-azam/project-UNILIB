import React from "react";
import "../../styles/App.css";
import "../../styles/login.css";
import "../../styles/Fonts.css";
import "../../styles/Sidebar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Field = React.forwardRef(({ label, type, placeholder }, ref) => {
  return (
    <div className="m-5">
      <label className="m-1 fnt">{label}</label>
      <input
        ref={ref}
        type={type}
        className="form-control fnt"
        style={{ width: "90%", height: "100%" }}
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
          console.log(res.data.token);
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            const email = emailRef.current.value;
            var id = email.split("@");
            history(`/unilib/user/${id[0]}`);
          } else {
            alert("wrong username or password");
          }
        },
        (error) => {
          alert("wrong username or password");
        }
      );
  };
  return (
    <form className="formStyle" onSubmit={handleSubmit}>
      <div className="form-group">
        <Field
          ref={emailRef}
          type="email"
          placeholder="enter email"
          label="Email Address"
        />
        <Field
          ref={passwordRef}
          placeholder="enter password"
          type="password"
          label="Password"
        />
        <div className="m-5">
          <button className="btn btn-dark submitStyle" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
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
    <div className="appStyle fnt">
      <Form onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
