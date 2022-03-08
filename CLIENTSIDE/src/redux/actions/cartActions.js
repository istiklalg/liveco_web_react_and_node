import * as actionTypes from "./actionTypes";
import { API_URL } from "../../seviceConfiguration";

export function addToCart(cartItem) {
  return { type: actionTypes.ADD_TO_CART, payload: cartItem };
}

export function removeFromCart(cartItem) {
  return { type: actionTypes.REMOVE_FROM_CART, payload: cartItem };
}

export function emptyCart(cart) {
  return { type: actionTypes.EMPTY_CART, payload: [] };
}

export function cartTotalAmount(cart) {
  let cartTotal = 0.0;
  if (cart.length > 0) {
    cart.forEach(element => {
      cartTotal += parseFloat(element.product.unitPrice)*element.quantity;
    });
  }
  return { type: actionTypes.CART_TOTAL_AMOUNT, payload: cartTotal };
}

export function getCartsSuccess(carts){
  return { type: actionTypes.GET_CARTS_SUCCESS, payload: carts };
}

export function getCarts(cartStatus) {
  return function (dispatch) {
    let url = `${API_URL}/carts`;
    if(cartStatus){
      url += "?status=" + parseInt(cartStatus);
    }
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getCartsSuccess(result)));
  };
}

export function createCartSuccess(cart) {
  return { type: actionTypes.CREATE_CART_SUCCESS, payload: cart };
}

export function updateCartSuccess(cart) {
  return { type: actionTypes.UPDATE_CART_SUCCESS, payload: cart };
}

export function saveCartApi(cart) {
  return fetch(`${API_URL}/carts/` + (cart.id || ""), {
    method: cart.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(cart),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveCart(cart) {
  return function (dispatch) {
    return saveCartApi(cart)
      .then((savedCart) => {
        cart.id
          ? dispatch(updateCartSuccess(savedCart))
          : dispatch(createCartSuccess(savedCart));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export async function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  const error = await response.text();
  throw new Error(error);
}

export function handleError(error) {
  console.error(
    "Sipariş için API ye gönderilen ürün güncelleme ya da ekleme talebinde bir hata oluştu -> "
  );
  throw error;
}