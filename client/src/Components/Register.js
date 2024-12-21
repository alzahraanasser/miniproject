import {
  Button,
  Container,
  Row,
  Col
} from "reactstrap";
import { useState } from "react";
//import { Mail, Lock, User,Phone} from 'lucide-react';
import { userSchemaValidation } from "../Validations/UserValidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";
import oo from '../Images/oo.jpeg'; // Import the background image

const Register = () => {
  //Retrieve the current value of the state and assign it to a variable.
  //Create the state variables
  const { user,msg}  = useSelector((state) => state.users);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("")
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  //For form validation using react-hook-form
  const {
    register,
    handleSubmit, // Submit the form when this is called
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation), //Associate your Yup validation schema using the resolver
  });

  const dispatch = useDispatch(); //every time we want to call an action, make an action happen
  const navigate = useNavigate(); //declares a constant variable named navigate and assigns it the value returned by the useNavigate() hook

  // Handle form submission
  const onSubmit = (data) => {
     const userData = {
      name:data.name,
      email:data.email,
      phone:data.phone,
      password:data.password,
      
     };
    dispatch(registerUser(userData))
    navigate("/login")
  };

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
    <Container fluid className=" p-6 rounded shadow" style={{ maxWidth: "750px" }}>
      
          <form className="div-form " onSubmit={handleSubmit(onSubmit)}>
            <div className="appTitle "><h4>Create account</h4></div>
            <section>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name..."
                  {...register("name", {
                    onChange: (e) => setname(e.target.value),
                  })}
                />
                <p className="error">{errors.name?.message}</p>
              </div>
              <div className="form-group">
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
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder="Enter your phone..."
                  {...register("phone", {
                    onChange: (e) => setphone(e.target.value),
                  })}
                />
                <p className="error">{errors.phone?.message}</p>
              </div>
              <div className="form-group">
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
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm your password..."
                  {...register("confirmPassword", {
                    onChange: (e) => setconfirmPassword(e.target.value),
                  })}
                />
                <p className="error">{errors.confirmPassword?.message}</p>
              </div>
              <Button color="primary" className="button">
                Register
              </Button>
            </section>
          </form>
      
      <Row>
        <Col>
        <form className="div-form">
        <div>
          <h3>Details</h3>
          <h5>{msg }</h5>
          <h5>{user?.email}</h5>
          <h5>{user?.phone}</h5>
        </div></form>
      </Col></Row>
    </Container>
    </div>
  );
};

export default Register;
