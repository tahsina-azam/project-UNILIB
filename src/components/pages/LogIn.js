import React from "react";
import "../../App.css";
import axios from "axios";

const appStyle = {
  display: "flex",
  flexWrap: "wrap",
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  alignItems: "center",
};

const formStyle = {
  margin: "auto",
  padding: "10px",
  border: "1px solid #c9c9c9",
  borderRadius: "5px",
  background: "#f5f5f",
  width: "220px",
  display: "block",
  alignItems: "center",
};

const labelStyle = {
  margin: "10px 0 5px 0",
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: "15px",
};

const inputStyle = {
  margin: "5px 0 10px 0",
  padding: "5px",
  border: "1px solid #bfbfbf",
  borderRadius: "3px",
  boxSizing: "border-box",
  width: "100%",
};

const submitStyle = {
  margin: "10px 0 0 0",
  padding: "7px 10px",
  border: "1px solid #efffff",
  borderRadius: "3px",
  background: "#000000",
  width: "100%",
  fontSize: "15px",
  color: "white",
  display: "block",
  align: "center",
};

const Field = React.forwardRef(({ label, type }, ref) => {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input ref={ref} type={type} style={inputStyle} />
    </div>
  );
});

const Form = ({ onSubmit }) => {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    onSubmit(data);
    axios.post("http://localhost:4000/login", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };
  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <Field ref={emailRef} label="Email:" type="text" />
      <Field ref={passwordRef} label="Password:" type="password" />
      <div>
        <button style={submitStyle} type="submit">
          Submit
        </button>
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
    <div style={appStyle}>
      <Form onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
