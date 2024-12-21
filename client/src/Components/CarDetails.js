import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import carData from "../carData";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { useDispatch } from "react-redux";
import { booking } from "../Features/CarSlice";

function CarDetails() {
  const { id } = useParams();
  const car = carData.find((car) => car.id === parseInt(id)); // Find car by ID
  const [selectedOption, setSelectedOption] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [starttime, setStartTime] = useState("");
  const [endtime, setEndTime] = useState("");
  const [days, setDays] = useState(0);
  const [dailyRate, setDailyRate] = useState(car ? car.price : 0); // Extract car price as daily rate
  const [totalRent, setTotalRent] = useState(0); // State for total rent
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/car1");
  };

  const rentigHandler = () => {
    const rentDetails = {
      wilayat: selectedOption,
      startDate: startdate,
      endDate: enddate,
      startTime: starttime,
      endTime: endtime,
      days,
      totalRent,
    };

    dispatch(booking(rentDetails)); // Update Redux state if necessary
    navigate("/accept", { state: rentDetails }); // Navigate to Accept.js with data
  };

  // Calculate days between start and end dates
  const calculateDays = () => {
    if (startdate && enddate) {
      const start = new Date(startdate);
      const end = new Date(enddate);

      if (start <= end) {
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDays(diffDays);
      } else {
        setDays(0);
      }
    } else {
      setDays(0);
    }
  };

  // Calculate total rent whenever days change
  useEffect(() => {
    setTotalRent(days * dailyRate);
  }, [days, dailyRate]);

  // Trigger calculation whenever startdate or enddate changes
  useEffect(() => {
    calculateDays();
  }, [startdate, enddate]);

  const wilayat = [
    "Muscat", "Seeb", "Bausher", "Matrah", "Al-Amerat", "Al-Mudhaibi", "Ibra",
    "Al-Kamil Wal Wafi", "Nizwa", "Sohar", "Ibri", "Rustaq", "Bahla", "Samail",
    "Izki", "Al-Hamra", "Al-Dakhiliyah", "Dhofar", "Salalah", "Taqah", "Mirbat",
    "Saham", "Al-Suwaiq", "Al-Khabourah", "Liwa", "Al-Batinah North",
    "Al-Batinah South", "Al-Sharqiyah North", "Al-Sharqiyah South", "Al-Wusta",
    "Musandam", "Buraimi", "Dima Wa Ta'in", "Al-Masirah", "Al-Khobar", "Al-Qurum",
    "Adam", "Wilayat Thumrait", "Al-Mizira", "Hail Al-Shasiyah",
    "A'Sharqiyah", "Wadi Al-Ain", "Fahud", "Al-Dhahirah", "Jalan Bani Bu Ali",
    "Jalan Bani Bu Hasan", "Al-Khaburah", "Al-Ya'arba", "Al-Bawshar", "Wadi Shanf",
    "Shinas", "Al-Sharqiah", "Al-Suwaiq", "Sur", "Al-Qurm", "Al-Mahajir", "Yanqul",
    "Khasab", "Al-Buraimi", "Samha", "Jabal Akhdar", "Al-Ghubra", "Maqna",
    "Al-Qarn", "Muqbalah", "Al-Ashkhara", "Khuta", "Al-Dhahira", "Abu Hadriah",
  ];

  if (!car) {
    return <h2>Car not found!</h2>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Container>
        <Row>
          <Col md={6}>
            <form className="div-form1" style={{ background: "rgb(209, 227, 255, 0.6)", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
              <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
                {car.brand} {car.model}
              </h1>
              <img
                src={car.image}
                alt={car.model}
                style={{ display: "block", margin: "0 auto", width: "100%", maxHeight: "400px", borderRadius: "10px" }}
              />
            </form>
          </Col>
          <Col md={6}>
            <Form className="div-form1">
              <FormGroup>
                <div className="form-group">
                  <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Fill The Form</h1>
                </div>
                <div className="form-group">
                  <label>Choose a destination:</label>
                  <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                    <option value="">--Please select a wilayat--</option>
                    {wilayat.map((wilayat, index) => (
                      <option key={index} value={wilayat}>
                        {wilayat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Start Date: </label>
                  <input type="date" className="form-control" onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>End Date: </label>
                  <input type="date" className="form-control" onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Time booking car: </label>
                  <input type="time" className="form-control" onChange={(e) => setStartTime(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Time returning car: </label>
                  <input type="time" className="form-control" onChange={(e) => setEndTime(e.target.value)} />
                </div>
                <div>
                  <table className="table">
                    <tbody>
                      <tr>
                        <th>Total Days</th>
                        <td>{days} day(s)</td>
                      </tr>
                      <tr>
                        <th>Total Rent</th>
                        <td>OMR {totalRent.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button type="button" color="primary" className="button" onClick={rentigHandler}>Rent</button>
                <br />
                <button onClick={handleBack} color="primary" className="button">&#8592; Back</button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CarDetails;
