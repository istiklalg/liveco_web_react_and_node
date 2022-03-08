import * as actionTypes from "./actionTypes";
import { API_URL } from "../../seviceConfiguration";

export function changeCategory(category) {
  return { type: actionTypes.CHANGE_CATEGORY, payload: category };
}

export function getCategoriesSuccess(categories) {
  return { type: actionTypes.GET_CATEGORIES_SUCCESS, payload: categories };
}

export function getCategories() {
  return function (dispatch) {
    let url = `${API_URL}/categories`;
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getCategoriesSuccess(result)));
  };
}

export function createCategorySuccess(category) {
  return { type: actionTypes.CREATE_CATEGORY_SUCCESS, payload: category };
}

export function updateCategorySuccess(category) {
  return { type: actionTypes.UPDATE_PRODUCT_SUCCESS, payload: category };
}

export function saveCategoryApi(category) {
  return fetch(`${API_URL}/categories/` + (category.id || ""), {
    method: category.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(category),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveCategory(category) {
  return function (dispatch) {
    return saveCategoryApi(category)
      .then((savedCategory) => {
        category.id
          ? dispatch(updateCategorySuccess(savedCategory))
          : dispatch(createCategorySuccess(savedCategory));
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
    "Kategori için API ye gönderilen ürün güncelleme ya da ekleme talebinde bir hata oluştu -> "
  );
  throw error;
}
