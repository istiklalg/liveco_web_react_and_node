/** @author: istiklal */

import { API_URL, SECRET_KEY } from "../../seviceConfiguration";
import * as actionTypes from "./actionTypes";

var CryptoJS = require("crypto-js");

export function authUserSuccess(currentUser) {
  return { type: actionTypes.AUTH_USER_SUCCESS, payload: currentUser };
}

export function authUserApi(userName, password) {
  let url = API_URL + "/users";
  return fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(userName),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function authUser(userName, password) {
  return function (dispatch) {
    return authUserApi(userName, password)
      .then((currentUser) => {
        dispatch(authUserSuccess(currentUser));
        return currentUser;
      })
      .catch((error) => {
        throw error;
      });
  };
}

export async function handleResponse(response) {
  if (response.ok) {
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 202) {
      return {};
    }
  }
  const error = await response.text();
  throw new Error(error);
}

export function handleError(error) {
  console.error("API ye gönderilen giriş onay talebinde bir hata oluştu -> ");
  throw error;
}

export function setToken(user) {
  sessionStorage.setItem("livecotoken", JSON.stringify(user));
}

export function getToken() {
  const tokenString = sessionStorage.getItem("livecotoken");
  const userToken = JSON.parse(tokenString);
  if (userToken && userToken?.token) {
    const chipperToken = CryptoJS.HmacSHA512(
      `%%--authLIV-ECOtoken-${userToken.id}-%`,
      SECRET_KEY
    ).toString();
    return userToken.token === chipperToken ? userToken.token : false;
  }
}

export function getSessionID() {
  const tokenString = sessionStorage.getItem("livecotoken");
  const userToken = JSON.parse(tokenString);
  if (userToken && userToken?.sessionId) {
    const chipperID = CryptoJS.HmacSHA512(
      `%%--auth(LIV-ECO)session-${userToken.id}-%`,
      SECRET_KEY
    ).toString();
    return userToken.sessionId === chipperID ? userToken.sessionId : false;
  }
}

export function getSessionUser() {
  const tokenString = sessionStorage.getItem("livecotoken");
  const userToken = JSON.parse(tokenString);
  return userToken ? userToken : {};
}
