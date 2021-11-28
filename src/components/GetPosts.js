import { useQuery } from "@apollo/client";
import { GET_POSTS_QUERY } from "../database/queries";
import { PutComments } from "./PutComments";
import { Time } from "./UuidToTime";
import "../styles/post.css";
//show posts
const Post = ({ author, message, created_at }) => {
  const caption = "Published at: ";
  return (
    <div>
      <div class="user-info">
        <h3 className="text-capitalize fnt-calistoga">
          <a href="timeline.html" class="profile-link">
            {author}
          </a>{" "}
        </h3>
        <Time time={created_at} caption={caption} class="text-muted" />
      </div>
      {/* <div class="reaction">
              <a class="btn text-green">
                <i class="fa fa-thumbs-up"></i> 13
              </a>
              <a class="btn text-red">
                <i class="fa fa-thumbs-down"></i> 0
              </a>
            </div> */}
      <div className="text-capitalize fnt-calistoga text-bold">
        {console.log(created_at)}

        <p className="fnt paddin">{message}</p>
      </div>
    </div>
  );
};
//fetch posts
const GetPosts = () => {
  const { data, loading, error, refetch } = useQuery(GET_POSTS_QUERY);
  if (loading) return <div>loading...</div>;
  if (error) return <div>error!</div>;
  return (
    <div class=" post-content">
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      {/* jokhon chobi up dite hobe post hishabe */}
      {/* <img
          src="https://via.placeholder.com/400x150/FFB6C1/000000"
          class="img-responsive post-image"
        /> */}
      <div class="post-container">
        {data.posts.length === 0 ? (
          <div>no posts, sorry</div>
        ) : (
          data.posts.map((p) => (
            <div className="d-flex flex-row mt-2 justify-content-start mb-3">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                alt="user"
                class="profile-photo-md pull-left"
              />

              <div>
                <div class="line-divider"></div>
                <div class="post-text">
                  <Post
                    key={p.id}
                    author={p.author.name}
                    message={p.message}
                    created_at={p.created_at}
                  />
                </div>
                <div class="line-divider"></div>
                <div className="post-comment borderrr px-2">
                  <PutComments key={p.id} post={p} refetch={refetch} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default GetPosts;
