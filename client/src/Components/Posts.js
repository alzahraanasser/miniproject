import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "../Features/CommentSlice";
import { Table } from "reactstrap";
import { likePost } from "../Features/CommentSlice";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);
  const user = useSelector((state)=>state.users.user)
  const dispatch = useDispatch();
 const navigate=useNavigate();
  useEffect(() => {
    dispatch(getPosts());
  }, []);

      const handleLikePost = (postId) => {
        const postData = {
          postId: postId,
          userId: user._id,
        };
        dispatch(likePost(postData));
        navigate("/home");
      };



  return (
    <div className="postsContainer">
      <table className="table"  >
        <thead>
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Comment</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {posts.map((post) => (
            <tr key={post._id} >
              {/* Ensure to add a unique key for each row */}
              <td className="td" >{post.email}</td>
              <td className="td">
                <p className="postMsg postedBy postByName"> {moment(post.createdAt).fromNow()}</p>
                {post.postMsg}
                <p className="likes">
                <Link  onClick={() => handleLikePost(post._id)}>
               <FaThumbsUp />
              </Link>
              ({post.likes.count})
              </p>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> 
  );
};

export default Posts;
