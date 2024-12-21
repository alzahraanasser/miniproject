import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "reactstrap"; //import the Reactstrap Components
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { useSelector } from "react-redux";
import oo from './bk.jpg'; // Import the background image
import Carpage from "./Components/Carpage";
import CarDetails from "./Components/CarDetails";
import CarList from "./Components/CarList";
import PayPage from "./Components/PayPage";
import VisaPayment from "./Components/VisaPayment";
import Feedback from "./Components/Feedback";
import Accept from "./Components/Accept";
import UpdateCarDetails from "./Components/Update";
//import Footer from "./Components/Footer";

const App = () => {
  const { user } = useSelector((state) => state.users);
 
  return (
    <div className='login-container' style={{
      backgroundImage: `url(${oo})`, // Apply background image dynamically
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      minHeight: '100vh', // Make sure it covers the full height
      display: 'flex',
    }}>
    <Container fluid>
      <Router>
        <Row>
          {user ? <Header /> : null}
        </Row>
        <Row className="main">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/car" element={<Carpage />}></Route>
            <Route path="/car-details/:id" element={<CarDetails />} />
            <Route path="/car1" element={<CarList />}></Route>
            <Route path="/payment" element={<PayPage />} />
            <Route path="/visa-payment" element={<VisaPayment />} />
            <Route path="/comment" element={<Feedback />} />
            <Route path="/accept" element={<Accept />} />   
            <Route path="/update/:id" element={<UpdateCarDetails />} />         

          </Routes>
        </Row>
        
      </Router>
    </Container>
    </div>
  );
};

export default App;
