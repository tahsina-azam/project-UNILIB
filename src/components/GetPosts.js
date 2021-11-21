import { useQuery } from "@apollo/client";
import { GET_POSTS_QUERY } from "../database/queries";
import { PutComments } from "./PutComments";
import { Time } from "./UuidToTime";
//show posts
const Post = ({ author, message, created_at }) => {
  const caption = "Published at: ";
  return (
    <div>
      <div className="text-capitalize fnt-calistoga text-bold">
        <span>{author}</span>
        {console.log(created_at)}
        <Time time={created_at} caption={caption} />
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
    <div>
      {data.posts.length === 0 ? (
        <div>no posts, sorry</div>
      ) : (
        data.posts.map((p) => (
          <div className="d-flex flex-row mt-2 justify-content-start mb-3">
            <img src="/images/profile-user.png" className="icon" alt="" />
            <div className="col-xxl-4">
              <Post
                key={p.id}
                author={p.author.name}
                message={p.message}
                created_at={p.created_at}
              />
              <div className="borderrr border-dark p-2">
                <PutComments key={p.id} post={p} refetch={refetch} />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export default GetPosts;
