import React, { Component } from "react";
import {Container, Row, Col} from "reactstrap";

/** @author: istiklal */

export default class Footer extends Component {
  render() {
    return (
      <Container fluid="fluid" className="footer">
        <Row className="justify-content-between">
          <Col sm="4">
            <small>Copyright ©2021 all rights reserved</small>
          </Col>
          <Col sm="4" className="align-right">
            <small>Prepared by İstiklal Güneş</small> {"  "}
            <img id="istiklalLogo" src={`${process.env.PUBLIC_URL}/images/permanent/istiklalLogo.jpg`} alt="" />{"  "}
          </Col>
        </Row>
      </Container>
    );
  }
}
