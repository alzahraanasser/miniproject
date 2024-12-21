import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Input, Label, Button, Container, Row, Col } from "reactstrap";
import { updateCarDetails, getrent } from "../Features/CarSlice";

function UpdateCarDetails() {
  const { id } = useParams();
  const location = useLocation(); // To access state passed from Accept.js
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cars = useSelector((state) => state.cars.cars);
  const car = cars?.find((car) => car._id === id);

  const [wilayat, setWilayat] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (!cars || cars.length === 0) {
      dispatch(getrent());
    }
  }, [cars, dispatch]);

  useEffect(() => {
    if (car) {
      setWilayat(car.wilayat);
      setStartDate(car.startDate.split("T")[0]);
      setEndDate(car.endDate.split("T")[0]);
      setStartTime(car.startTime);
      setEndTime(car.endTime);
    } else if (location.state) {
      // If state is passed, use it to populate the fields
      const { wilayat, startDate, endDate, startTime, endTime } = location.state;
      setWilayat(wilayat);
      setStartDate(startDate);
      setEndDate(endDate);
      setStartTime(startTime);
      setEndTime(endTime);
    }
  }, [car, location.state]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedCar = {
      id,
      wilayat,
      startDate,
      endDate,
      startTime,
      endTime,
    };

    dispatch(updateCarDetails(updatedCar));
    alert("Car details updated successfully!");
    navigate("/visa-payment");
  };

  if (!car && !location.state) {
    return <h2>Car not found!</h2>;
  }

  return (
    <Container style={{ marginTop: "50px" }}>
      <Row>
        <Col md={6} className="offset-md-3">
          <h2 className="text-center">Update Car Details</h2>
          <Form onSubmit={handleUpdate} className="p-4 shadow bg-light">
            <FormGroup>
              <Label for="wilayat">Destination (Wilayat)</Label>
              <Input
                type="text"
                id="wilayat"
                value={wilayat}
                onChange={(e) => setWilayat(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="startDate">Start Date</Label>
              <Input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="endDate">End Date</Label>
              <Input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="startTime">Start Time</Label>
              <Input
                type="time"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="endTime">End Time</Label>
              <Input
                type="time"
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </FormGroup>
            <Button type="submit" color="primary" block>
              Update Car
            </Button>
            <Button
              type="button"
              color="secondary"
              block
              onClick={() => navigate("/car1")}
            >
              Cancel
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UpdateCarDetails;
