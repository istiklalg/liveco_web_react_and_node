import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import CategoryList from "../categories/CategoryList";
import ProductList from "../products/ProductList";
import SliderGalery from "../slider/SliderGalery";

/** @author: istiklal */

class Dashboard extends Component {
    
  render() {
    return (
      <div id="DashboardContainer">
        <Row>
          <Col lg="2">
            <CategoryList />
          </Col>
          <Col lg="10">
            <Row className={this.props.currentCategory.id ? "d-none" : "d-block"} id="sliderContainer">
              <SliderGalery />
              <br />
            </Row>
            <Row>
              <ProductList />
            </Row>
            <br />
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
  };
}

export default connect(mapStateToProps)(Dashboard);
