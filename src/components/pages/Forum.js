import "../../styles/Fonts.css";
import "../../styles/Forum.css";
import "@fontsource/open-sans";
import "@fontsource/abhaya-libre";
import "@fontsource/calistoga";
import GetPosts from "../GetPosts";
import UploadButton from "../../UploadPDFs";

function Forum() {
  return (
    <div className="container-fluid">
      {/* <GetPosts /> */}
      <UploadButton />
    </div>
  );
}

export default Forum;
// className="fw-light fnt text-muted" no comments div
