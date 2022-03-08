import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productActions";
import { withRouter } from "react-router-dom";



class ProductDetailView extends Component {
  
    
  componentDidMount(){
      this.props.actions.getProduct(this.props.productId);
  }

  render() {
    
    return (
      <div id="ProductDetailViewContiner">
        <Row className="justify-content-center">
          <Col md="4">
            <Card>
              <CardImg
                top
                width="100%"
                src={
                  this.props.product.productImage
                    ? `${process.env.PUBLIC_URL}/images/${this.props.product.productImage}`
                    : `${process.env.PUBLIC_URL}/images/permanent/noimage.jpg`
                }
                alt="Ürün Resmi"
              />
              <CardBody>
                <CardTitle tag="h5">{this.props.product.productName}</CardTitle>
                <CardText>{this.props.product.quantityPerUnit}</CardText>
                <CardText>
                  <small className="text-muted">
                    {this.props.product.unitPrice} TL
                  </small>
                </CardText>
                <CardText>
                <small className="text-muted goBackLink" onClick={() => this.props.history.goBack()}> {"< geri"} </small>
                </CardText>
              </CardBody>
            </Card>

            <br />
          </Col>
        </Row>
      </div>
    );
  }
}

// export function getProductById(products, productId) {
//   let product = products.find((product) => product.id === parseInt(productId)) || null;
//   return product;
// }

function mapStateToProps(state, ownProps) {
  const productId = ownProps.match ? ownProps.match.params.productId : null;
  return {
    productId,
    cart: state.cartReducer,
    currentCategory: state.changeCategoryReducer,
    product: state.productReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProduct: bindActionCreators(productActions.getProduct, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetailView));
