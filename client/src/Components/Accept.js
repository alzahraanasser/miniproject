import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Label, Button } from "reactstrap";

const Accept = () => {
  const { state } = useLocation(); // Get the data passed from CarDetails
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/visa-payment");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      alert("Booking deleted successfully.");
    }
  };

  if (!state) {
    return <h3>Loading rent details...</h3>;
  }

  return (
    <Container fluid>
      <h1>Rent Confirmation</h1>
      <Row>
        <Col md={6} className="offset-md-3">
          <Form
            style={{
              background: "rgb(209, 227, 255, 0.6)",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2>Are You Sure?</h2>
            <h3>Rent Details</h3>
            <FormGroup>
              <Label>Wilayat:</Label>
              <p>{state.wilayat}</p>
            </FormGroup>
            <FormGroup>
              <Label>Start Date:</Label>
              <p>{state.startDate}</p>
            </FormGroup>
            <FormGroup>
              <Label>End Date:</Label>
              <p>{state.endDate}</p>
            </FormGroup>
            <FormGroup>
              <Label>Start Time:</Label>
              <p>{state.startTime}</p>
            </FormGroup>
            <FormGroup>
              <Label>End Time:</Label>
              <p>{state.endTime}</p>
            </FormGroup>
            <FormGroup>
              <Label>Total Rent:</Label>
              <p>OMR {state.totalRent.toFixed(2)}</p>
            </FormGroup>
            <div style={{ display: "flex", gap: "10px" }}>
              <Button color="primary" onClick={handleContinue}>
                Continue
              </Button>
              <Button
                color="warning"
                onClick={() => navigate(`/update/${state.id}`, { state })}
              >
                Update
              </Button>
              <Button color="danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Accept;
