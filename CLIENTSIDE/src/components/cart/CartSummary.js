import React, { Component } from "react";
import { connect } from "react-redux";
import alertify from "alertifyjs";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink,
  Badge,
} from "reactstrap";
import * as cartActions from "../../redux/actions/cartActions";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

alertify.set("notifier", "position", "bottom-left");

class CartSummary extends Component {
  // componentDidMount() {
  //   console.log("callaed for cart : ", this.props.cart)
  //   this.props.actions.cartTotalAmount(this.props.cart);
  // }

  componentDidUpdate(prevProps){
    if (this.props.cart !== prevProps.cart) {
      this.props.actions.cartTotalAmount(this.props.cart);
    }
  }

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

  renderEmpty() {
    return (
      <NavItem>
        <NavLink>Henüz Siparişiniz Yok</NavLink>
      </NavItem>
    );
  }

  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Siparişlerim{" "}
          <Badge className="countBadge">{this.props.cart.length}</Badge>{" "}
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
              <Badge
                className="btn-sm btn-danger"
                onClick={() => this.removeFromCart(cartItem)}
              >
                X
              </Badge>{" "}
              {cartItem.product.productName}{" "}
              <Badge className="countBadge">{cartItem.quantity}</Badge>
            </DropdownItem>
          ))}
          <DropdownItem divider />
          <DropdownItem>
            <Badge className="countBadge">{this.props.cartTotal} TL</Badge>
          </DropdownItem>
          <DropdownItem>
            <Badge className="btn-sm btn-success">
              <Link className="inButtonLink" to="/cart">Sipariş Detayları</Link>
            </Badge>
          </DropdownItem>
          <DropdownItem>
            <Badge
              className="btn-sm btn-danger"
              onClick={() => this.emptyCart(this.props.cart)}
            >
              Tümünü Sil
            </Badge>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  render() {
    return (
      <div id="CardSummaryContainer">
        {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
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
      cartTotalAmount: bindActionCreators(
        cartActions.cartTotalAmount,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
