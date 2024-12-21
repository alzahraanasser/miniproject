import {
  Container,
  Row,
  Col,
} from "reactstrap";

import { useEffect, useState } from "react";
import { loginSchemaValidation } from "../Validations/LoginValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";
import oo from '../Images/oo.jpeg'; // Import the background image

const Login = () => {
  //Retrieve the current value of the state and assign it to a variable.
  //Create the state variables
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const {msg, isLogin } = useSelector((state) => state.users); 
  //For form validation using react-hook-form
  const {
    register,
    handleSubmit, // Submit the form when this is called
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchemaValidation), //Associate your Yup validation schema using the resolver
  });

  const dispatch = useDispatch(); //every time we want to call an action, make an action happen
  const navigate = useNavigate(); //declares a constant variable named navigate and assigns it the value returned by the useNavigate() hook

  // Handle form submission
  const onSubmit = () => {

     const userData = {
       email: email,
       password: password,
      
     };
    dispatch(login(userData))
    navigate("/");
  };

  useEffect(() => { 
    if (isLogin) { navigate("/") }
    else { navigate("/login") }
  },[isLogin]);
 

  return (
    <div className='login-container' style={{
      backgroundImage: `url(${oo})`, // Apply background image dynamically
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh', // Make sure it covers the full height
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Container fluid className=" p-6 rounded shadow" style={{ maxWidth: "500px" }} >
          <form className="div-form w-100" onSubmit={handleSubmit(onSubmit)} >
            <div className="appTitle">
              <h1 className="text-center">Login</h1>
              <br/>
            </div>
              <div className="form-group">
              <h6>Name</h6>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email..."
                  {...register("email", {
                    onChange: (e) => setemail(e.target.value),
                  })}
                />
                <p className="error">{errors.email?.message}</p>
              </div>
              <div className="form-group">
                <h6>password</h6>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password..."
                  {...register("password", {
                    onChange: (e) => setpassword(e.target.value),
                  })}
                />
                <p className="error">{errors.password?.message}</p>
              </div>

              <button type="submit" color="primary" className="button">
                Sign In
              </button>
              <p className="hhh">Don't have an account? <a href="/register">Sign Up</a></p>
          </form>
    </Container>
    </div>
  );
};

export default Login;
