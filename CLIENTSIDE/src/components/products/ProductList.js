import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import * as productActions from "../../redux/actions/productActions";
import * as cartActions from "../../redux/actions/cartActions";
import alertify from "alertifyjs";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  // CardImgOverlay,
} from "reactstrap";
// import { Link } from "react-router-dom";

alertify.set("notifier", "position", "bottom-left");

class ProductList extends Component {
  componentDidMount() {
    this.props.actions.getProducts();
  }

  addToCart = (product) => {
    this.props.actions.addToCart({ product: product, quantity: 1 });
    alertify.success(product.productName + " siparişiniz başarıyla eklendi", 2);
  };

  render() {
    return (
      <Container fluid="fluid" id="ProductListContainer">
        <h3 align="center">
          {this.props.currentCategory.categoryName
            ? this.props.currentCategory.categoryName + " Ürün Grubu"
            : "Tüm Ürünler"}
        </h3>
        <Row className="justify-content-center" align="center">
          {this.props.products.map((product) => (
            <Col md="4" lg="3" key={product.id}>
              <Card
                // key={product.id}
                // className="col-md-5 productCard"
                className="my-3 standartHeight"
              >
                <CardImg
                  className="productImage"
                  top
                  src={
                    product.productImage
                      ? `${process.env.PUBLIC_URL}/images/${product.productImage}`
                      : `${process.env.PUBLIC_URL}/images/permanent/noimage.jpg`
                  }
                  alt="Ürün Resmi"
                />
                {/* <CardImgOverlay> */}
                <CardBody>
                  <CardTitle tag="h5">{product.productName}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    Fiyat : {product.unitPrice} TL
                  </CardSubtitle>
                  <CardText className="truncateContent">
                    Ürün ve İçerik Detayları : {product.quantityPerUnit && product.quantityPerUnit !== "undefined" ? product.quantityPerUnit : ""}
                  </CardText>
                  <CardText>
                    <Link to={`/product/${product.id}`}>...detay</Link>
                  </CardText>
                  <Button
                    className="addCartButton"
                    color="success"
                    size="sm"
                    onClick={() => this.addToCart(product)}
                    disabled={
                      parseInt(product.unitsInStock) === 0 ? true : false
                    }
                  >
                    {parseInt(product.unitsInStock) === 0
                      ? "Stokta Yok"
                      : "Siparişe Ekle"}
                    {/* {" "}<span style={product.unitsInStock===0?{"display":"block"}:{"display":"none"}}>(Stokta Yok)</span> */}
                    {/* <Badge color="light">({product.unitsInStock} stokta)</Badge> */}
                  </Button>
                  {/* <Button color="light" size="sm" className="updateButton">
                    <Link to={"/saveproduct/" + product.id}>Güncelle</Link>
                  </Button> */}
                </CardBody>
                {/* </CardImgOverlay> */}
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer,
  };
}

function mapDispachToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
      addToCart: bindActionCreators(cartActions.addToCart, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispachToProps)(ProductList);
