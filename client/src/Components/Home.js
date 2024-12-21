//import logo from "../Images/logo-t.png";
import { useSelector } from "react-redux";
//import Posts from "./Posts";
//import { Row, Col } from "reactstrap"; //import the Reactstrap Components
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = (props) => {
  const { isLogin} = useSelector(state => state.users)
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLogin) { navigate("/login") }
  
  },[isLogin])
  const cc = () => {
    navigate("/car");
}
  return (
    <div className='main-container' style={{
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh', // Make sure it covers the full height
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      
    }}>
      <div className={'titleContainer'}>
       <h1 className='h'>Welcome</h1>
       <h4 className='hh'>to Driving World</h4>
       <button className='button' onClick={cc}>car</button>
      </div>
    </div>
  );
};

export default Home;
