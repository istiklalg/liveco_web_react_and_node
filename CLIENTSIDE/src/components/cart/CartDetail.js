import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import alertify from "alertifyjs";
import { Button, Table, Row } from "reactstrap";
import * as cartActions from "../../redux/actions/cartActions";
import { bindActionCreators } from "redux";

/** @author: istiklal */

alertify.set("notifier", "position", "bottom-left");

class CartDetail extends Component {
  removeFromCart(cartItem) {
    this.props.actions.removeFromCart(cartItem);
    alertify.warning(
      cartItem.quantity +
        " adet " +
        cartItem.product.productName +
        " siparişiniz siparişlerden silindi",
      5
    );
  }

  emptyCart(cart) {
    this.props.actions.emptyCart(cart);
    alertify.error("Tüm siparişiniz silindi", 5);
  }

  render() {
    return (
      <div id="CartDetailContainer">
        <h3 align="center">Sipariş Detaylarınız</h3>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Ürün Adı</th>
              <th>Adet Fiyatı</th>
              <th>Ürün Sayısı</th>
              <th>Toplam Tutar</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.cart.map((cartItem) => (
              <tr key={cartItem.product.id}>
                <td>
                  <img
                    className="smallImage"
                    src={
                      cartItem.product.productImage
                        ? `${process.env.PUBLIC_URL}/images/${cartItem.product.productImage}`
                        : `${process.env.PUBLIC_URL}/images/permanent/Logo.jpg`
                    }
                    alt="Ürün resmi"
                  />
                </td>
                <td>{cartItem.product.productName}</td>
                <td>{cartItem.product.unitPrice} TL</td>
                <td>{cartItem.quantity}</td>
                <td>{cartItem.quantity * cartItem.product.unitPrice} TL</td>
                <td>
                  <Button
                    className="btn-sm btn-danger"
                    onClick={() => this.removeFromCart(cartItem)}
                  >
                    X
                  </Button>
                </td>
              </tr>
            ))}
            <tr className="table-info">
              <td colSpan="4">SİPARİŞ TOPLAMI</td>
              <td>{this.props.cartTotal}</td>
              <td> TL</td>
            </tr>
          </tbody>
        </Table>
        <hr />
        <Row className="justify-content-between">
          <Button
            className="btn-sm btn-secondary col-md-4"
            onClick={() => window.history.back()}
          >
            Alışverişe Devam Et
          </Button>
          <Button className="btn-sm btn-success col-md-4">
            <Link className="inButtonLink" to="/savecart">Siparişi Onayla</Link>
          </Button>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
    cartTotal: state.cartTotalReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
      emptyCart: bindActionCreators(cartActions.emptyCart, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
