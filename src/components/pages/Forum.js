import "../../styles/Fonts.css";
import "../../styles/Forum.css";
import "@fontsource/open-sans";
import "@fontsource/abhaya-libre";
import "@fontsource/calistoga";
import GetPosts from "../GetPosts";

function Forum() {
  return (
    <div className="container-fluid">
      <GetPosts />
    </div>
  );
}

export default Forum;
// className="fw-light fnt text-muted" no comments div
