import { storage } from "./config/firebase";
import React from "react";
import "./styles/Forum.css";
const UploadButton = () => {
  const onSubmit = (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    const storageref = storage.ref().child(`${e.target.files[0].name}`);
    try {
      storageref.put(file);
      storageref.getDownloadURL().then((e) => console.log(e));
    } catch (e) {
      console.log("here");
      console.log({ e });
    }
  };
  return (
    <div>
      <div
        classNameName="input-group p-0 mt-1"
        style={{ height: "auto", width: "auto" }}
      >
        <span classNameName="input-group-text border-0">
          <i classNameName="fa fa-cloud-upload p-0 m-0" />
        </span>
        <input
          type="file"
          classNameName="form-control border-0 align-center pl-0 ml-0"
          onChange={onSubmit}
        />
      </div>
    </div>
  );
};
export default UploadButton;
