// import React from 'react'

import { Col, Row } from "react-bootstrap"

function CheckoutSteps(props: {
  step1?: boolean
  step2?: boolean
  step3?: boolean
  step4?: boolean
}) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? "active" : ""}>Sign-IN</Col>
      <Col className={props.step2 ? "active" : ""}>Shipping</Col>
      <Col className={props.step3 ? "active" : ""}>payment</Col>
      <Col className={props.step4 ? "active" : ""}>placeholder</Col>
    </Row>
  )
}

export default CheckoutSteps
