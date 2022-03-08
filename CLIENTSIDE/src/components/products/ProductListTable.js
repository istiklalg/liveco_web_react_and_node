import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productActions";
import * as cartActions from "../../redux/actions/cartActions";
import alertify from "alertifyjs";
import {
  Table,
  Button,
  Container,
  // CardImgOverlay,
} from "reactstrap";
import { Link } from "react-router-dom";

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
      <Container fluid="fluid" id="ProductListTableContainer">
        <h3>Ürünleri Düzenle</h3>
        <Table>
          <thead>
            <tr>
              <th>Resim</th>
              <th>Ürün Adı</th>
              <th>Kategori Id</th>
              <th>Ürün Miktarı/Açıklaması</th>
              <th>Ürün Fİyatı</th>
              <th>Ürün Stok Sayısı</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img className="smallImage"
                    src={
                      product.productImage
                        ? `${process.env.PUBLIC_URL}/images/${product.productImage}`
                        : `${process.env.PUBLIC_URL}/images/permanent/Logo.jpg`
                    }
                    alt="Ürün resmi"
                  />
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.categoryId}</td>
                  <td>{product.quantityPerUnit}</td>
                  <td>{product.unitPrice}</td>
                  <td>{product.unitsInStock}</td>
                  <td>
                  <Button color="light" size="sm" className="updateButton">
                    <Link to={"/admin/saveproduct/" + product.id}>Güncelle</Link>
                  </Button>
                  </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <hr />
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
