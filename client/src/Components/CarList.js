import React from "react";
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap";

import carData from "../carData";
import { Link } from "react-router-dom";
function CarList() {
  return (
    <Container fluid>
      <h3 className=" text-center" style={{fontSize: "6rem", fontWeight: "bold",color: '#d1e3ff'} }>Cars List</h3>
      <Row className='g-3'>
        {carData.map((car, index) => {
          return (
            <Col md={3}>
              <Card className="w-100 h-100 m-2 ">
                <CardBody>
                  <CardTitle style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333", marginBottom: "10px" }}>
                    {car.brand}
                  </CardTitle>
                 <Link to={`/car-details/${car.id}`}><img src={car.image} alt="" className="img-fluid" /></Link> 
                  <table className='table'>
                    <tbody>
                        <tr>
                            <th>Model</th>
                            <td>{car.model}</td>
                        </tr>
                        <tr>
                            <th>Price</th>
                            <td>{car.price}</td>
                        </tr>
                        <tr>
                            <th>Year</th>
                            <td>{car.year}</td>
                        </tr>
                        <tr>
                            <th>Color</th>
                            <td>{car.color}</td>
                        </tr>
                        <tr>
                            <th>Type</th>
                            <td>{car.fuelType}</td>
                        </tr>
                        <tr>
                            <th>Mileage</th>
                            <td>{car.mileage}</td>
                        </tr>
                  </tbody>
                </table>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default CarList;
