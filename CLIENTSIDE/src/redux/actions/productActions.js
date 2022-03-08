import * as actionTypes from "./actionTypes";
import { API_URL } from "../../seviceConfiguration";

export function getProductsSuccess(products) {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
}

export function getProducts(categoryId) {
  return function (dispatch) {
    let url = `${API_URL}/products`;
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getProductsSuccess(result)));
  };
}

export function getProductSuccess(product) {
  return { type: actionTypes.GET_PRODUCT_SUCCESS, payload: product };
}

export function getProduct(productId) {
  return function (dispatch) {
    let url = `${API_URL}/products`;
    if (productId) {
      url += "?id=" + productId;
      return fetch(url)
        .then((response) => response.json())
        .then((result) => dispatch(getProductSuccess(result)));
    } else {
      console.log("Ürün id si gelmedi..");
      return {};
    }
  };
}

export function createProductSuccess(product) {
  return { type: actionTypes.CREATE_PRODUCT_SUCCESS, payload: product };
}

export function updateProductSuccess(product) {
  return { type: actionTypes.UPDATE_PRODUCT_SUCCESS, payload: product };
}

export function saveProductApi(product, loadingImage) {
  // (product.id||"") bunu yaparak eğer product ın id si varsa yaz yoksa "" boş string olarak geç demiş oluyoruz !!
  product.productImage = product.productImage
    ? product.productImage.split("\\").pop()
    : "";
  product.file = loadingImage;

  return fetch(`${API_URL}/products/` + (product.id || ""), {
    method: product.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(product),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveProduct(product, loadingImage) {
  return function (dispatch) {
    return saveProductApi(product, loadingImage)
      .then((savedProduct) => {
        product.id
          ? dispatch(updateProductSuccess(savedProduct))
          : dispatch(createProductSuccess(savedProduct));
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
    "API ye gönderilen ürün güncelleme ya da ekleme talebinde bir hata oluştu -> "
  );
  throw error;
}
