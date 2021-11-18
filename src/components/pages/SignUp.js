import axios from "axios";
import React from "react";
import "../../App.css";

const appStyle = {
  height: "250px",
  display: "flex",
};

const formStyle = {
  margin: "auto",
  padding: "20px",
  border: "10px solid #c9c9c9",
  borderRadius: "5px",
  background: "#f5f5f5",
  width: "400px",
  display: "block",
  align: "center",
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
  const nameRef = React.useRef();
  const passwordRef = React.useRef();
  const emailRef = React.useRef();
  const registrationNumRef = React.useRef();
  const departmentRef = React.useRef();
  const sessionRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      registration: registrationNumRef.current.value,
      department: departmentRef.current.value,
      session: sessionRef.current.value,
      password: passwordRef.current.value,
    };
    onSubmit(data);
    axios.post("http://localhost:4000/register", {
      name: nameRef.current.value,
      email: emailRef.current.value,
      registration: registrationNumRef.current.value,
      department: departmentRef.current.value,
      session: sessionRef.current.value,
      password: passwordRef.current.value,
    });
  };
  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <Field ref={nameRef} label="Name:" type="text" />
      <Field ref={emailRef} label="Email:" type="email" />
      <Field
        ref={registrationNumRef}
        label="Registration Number:"
        type="number"
      />
      <Field ref={departmentRef} label="Department:" type="text" />
      <Field ref={sessionRef} label="Session:" type="varchar" />
      <Field ref={passwordRef} label="Password:" type="password" />
      <div>
        <button style={submitStyle} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

// Usage example: new axios post part

const App = () => {
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
};

export default App;
