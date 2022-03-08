import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { getToken } from "../../redux/actions/loginActions";
import LoginUser from "../common/LoginUser";
import EditChoices from "./EditChoices";
import EditContent from "./EditContent";

/** @author: istiklal */

class AdminEdit extends Component {
  render() {
    const token = getToken();
    if (!token) {
      return <LoginUser />;
    } else {
      return (
        <div id="AdminEditContainer">
          <Row>
            <Col lg="2">
              <EditChoices />
            </Col>
            <Col lg="10">
              <EditContent />
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default withRouter(AdminEdit);
