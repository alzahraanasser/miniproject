import React from 'react'
import { Col, Form, Row } from 'reactstrap'
import Comment from './Comment'
import Posts from './Posts'
function Feedback() {
  return (
    <div>
        <h1 style={{ textAlign: "center", marginBottom: "20px", color:"#ffff"}}>Customer Feedback</h1>
        <Row>
          <Col><Form className="div-form4 "> <p className='hhh'>Hello dear, you can give your feedback about car and services. We will be happy to hear from you.</p><Comment/></Form></Col>
          <Col><Form className="div-form2 "><Posts/></Form></Col>
        </Row>
    </div>
  )
}

export default Feedback