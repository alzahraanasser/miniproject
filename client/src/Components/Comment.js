//Commnt page
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePost } from "../Features/CommentSlice";
import {
  Button,
  Col,
  Container,
  Row,
  Input,
} from "reactstrap";

const Comment = () => {
  const [postMsg, setpostMsg] = useState("");
  const { user} = useSelector((state) => state.users);
  const dispatch=useDispatch();

  const handlePost =()=>{
    if(!postMsg.trim()) { //trim means remove space
      alert("Post message is required.")
      return
    }
    const postData = {
      postMsg: postMsg,
      email: user.email,
    };
    dispatch(savePost(postData)); 
    setpostMsg("")
  }

  return (
    <Container>
      <Row>
        <Col>
          <Input
            id="share"
            name="share"
            placeholder="Share your comment..."
            type="textarea"
            value={postMsg}
            onChange={e=>setpostMsg(e.target.value)}
          /><div>
            <br></br>
          <button className="button" color="primary" onClick={handlePost}>Share</button></div>
        </Col>
      </Row>
    </Container>
  );
};

export default Comment;
