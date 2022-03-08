import { combineReducers } from "redux";
import changeCategoryReducer from "./changeCategoryReducer";
import categoryListReducer from "./categoryListReducer";
import productListReducer from "./productListReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import cartAdminReducer from "./cartAdminReducer";
import saveProductReducer from "./saveProductReducer";
import cartTotalReducer from "./cartTotalReducer";
import editChoicesListReducer from "./editChoicesListReducer";
import editChoiceReducer from "./editChoicesReducer";
import saveCartReducer from "./saveCartReducer";
import loginUserReducer from "./loginUserReducer";

const rootReducer = combineReducers({
  changeCategoryReducer,
  categoryListReducer,
  productListReducer,
  productReducer,
  cartReducer,
  cartAdminReducer,
  saveProductReducer,
  cartTotalReducer,
  editChoicesListReducer,
  editChoiceReducer,
  saveCartReducer,
  loginUserReducer,
});

export default rootReducer;
