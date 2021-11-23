import app, { storage } from "./config/firebase";
import React, { useRef, useState } from "react";
//import { useState } from "react";
// const UploadButton = () => {
//   const [image, setImage] = useState(null);
//   const onImageChange = (e) => {
//     const reader = new FileReader();
//     let file = e.target.files[0]; // get the supplied file
//     // if there is a file, set image to that file
//     if (file) {
//       reader.onload = () => {
//         if (reader.readyState === 2) {
//           console.log(file);
//           setImage(file);
//         }
//       };
//       reader.readAsDataURL(e.target.files[0]);
//       // if there is no file, set image back to null
//     } else {
//       setImage(null);
//     }
//   };
//   const uploadToFirebase = () => {
//     //1.
//     if (image) {
//       //2.
//       const storageRef = storage.ref();
//       //3.
//       const imageRef = storageRef.child(image.name);
//       //4.
//       imageRef
//         .put(image)
//         //5.
//         .then(() => {
//           alert("Image uploaded successfully to Firebase.");
//         });
//     } else {
//       alert("Please upload an image first.");
//     }
//     return (
//       <div>
//         <input
//           type="file"
//           accept="image/x-png,image/jpeg"
//           onChange={(e) => {
//             onImageChange(e);
//           }}
//         />
//         <button>Upload to Firebase</button>
//       </div>
//     );
//   };
// };
const UploadButton = () => {
  const MyCustomButton = (props) => {
    return <button onClick={props.onClick}>Upload a picture</button>;
  };
  const incre = 1;
  const handleClick = () => {};
  return (
    <div>
      <MyCustomButton onClick={() => handleClick()} />
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={(e) => {
          console.log(e.target.files);
          const file = e.target.files[0];
          const storageref = storage.ref().child("images/owishi.jpg");
          try {
            storageref.put(file);
            storageref.getDownloadURL().then((e) => console.log({ e }));
          } catch (e) {
            console.log("here");
            console.log({ e });
          }
          // uploadBytes(imageref, file).then(() => {
          //   console.log("Uploaded a blob or file!");
          // });
        }}
      />
    </div>
  );
};
export default UploadButton;
