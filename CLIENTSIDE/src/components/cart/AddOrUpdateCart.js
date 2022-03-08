/* @author : istiklal */
/* add and update forms for categories */

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { saveCart } from "../../redux/actions/cartActions";
import CartForm from "./CartForm";

import alertify from "alertifyjs";

alertify.set("notifier", "position", "bottom-left");

function AddOrUpdateCart({
  instantCart,
  instantCartTotalPrice,
  carts,
  saveCart,
  getCarts,
  history,
  ...props
}) {
  const [cart, setCart] = useState({ ...props.cart });

  const [errors, setErrors] = useState({});

  const [validation, setValidation] = useState(false);

  useEffect(() => {
    setCart({ ...props.cart });
  }, [props.cart]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCart((previousCart) => ({
      ...previousCart,
      [name]: name === "cart" ? JSON.stringify(value) : value,
      [name]: name === "totalPrice" ? parseFloat(value) : value,
    }));
    validate(name, value);
  }

  function validate(name, value) {
    if (name && (value.includes("'") || value.includes('"') || value.includes("*"))) {
      setValidation(false);
      setErrors((previousErrors) => ({
        ...previousErrors,
        [name]: `Bu alana girdiğiniz değeri düzeltin`,
      }));
    } else {
      setValidation(true);
      setErrors((previousErrors) => ({
        ...previousErrors,
        [name]: "",
      }));
    }
  }

  function handleSave(event) {
    event.preventDefault();
    if (validation && cart) {
      cart.cart = JSON.stringify(instantCart);
      cart.totalPrice = instantCartTotalPrice;
      saveCart(cart)
        .then(() => {
          history.push(cart.id ? "/admin/edit" : "/");
          alertify.success(`${cart.customerName} için sipariş başarıyla kaydedildi.`);
          if(!cart.id){
            document.getElementById("homePage").click();
          }
        })
        .catch((error) => {
          console.error(error.message);
          alertify.error("Sipariş bilgileri kaydediliken bir hata oluştu, lütfen daha sonra tekrar deneyin.");
        });
    } else {
      alertify.error("Lütfen bilgileri doldurunuz !");
    }
  }

  return (
    <CartForm
      cart={cart.id ? cart : instantCart}
      cartTotalPrice={cart.id ? cart.totalPrice : instantCartTotalPrice}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    />
  );
}

export function getCartById(carts, cartId) {
  let cart = carts.find((cart) => cart.id === parseInt(cartId)) || null;
  return cart;
}

function mapStateToProps(state, ownProps) {
  const cartId = ownProps.match ? ownProps.match.params.cartId : null;
  const cart =
    cartId && state.cartAdminReducer.length > 0
      ? getCartById(state.cartAdminReducer, cartId)
      : {};
  return {
    cart,
    carts: state.cartAdminReducer,
    instantCart: state.cartReducer,
    instantCartTotalPrice: state.cartTotalReducer,
  };
}

const mapDispatchToProps = { saveCart };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddOrUpdateCart));
