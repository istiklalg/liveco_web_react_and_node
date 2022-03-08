/* @author : istiklal */

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import { getToken } from "../../redux/actions/loginActions";
import LoginUser from "../common/LoginUser";
import ProductDetail from "./ProductDetail";
import alertify from "alertifyjs";

alertify.set("notifier", "position", "bottom-left");

function AddOrUpdateProduct({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  history,
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product }); 
  const token = getToken();
  const [errors, setErrors] = useState({});

  const [loadingImage, setLoadingImage] = useState({});

  const [validation, setValidation] = useState(false);

  useEffect(() => {
    if (categories.length === 0) {

      getCategories(); 
    }
    setProduct({ ...props.product });
  }, [props.product, categories, getCategories]);

  function handleChange(event) {
    const { name, value, files } = event.target;
    if (files) {
      setLoadingImage(files[0]);
    }
    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: name === "productImage" && files ? files[0].name : value,

      [name]: name === "categoryId" ? parseInt(value, 10) : value,
    }));
    validate(name, value);
  }

  function validate(name, value) {
    if (name === "productName" && value === "") {
      setValidation(false);
      setErrors((previousErrors) => ({
        ...previousErrors,
        productName: "Ürün adını boş bırakmamalısınız",
      }));
    } else {
      setValidation(true);
      setErrors((previousErrors) => ({
        ...previousErrors,
        productName: "",
      }));
    }
  }

  function handleSave(event) {
    event.preventDefault();
    if (validation) {
      saveProduct(product, loadingImage)
        .then(() => {
          history.push("/admin/edit");
          alertify.success(`${product.productName} başarıyla kaydedildi.`);
        })
        .catch((error) => {
          alertify.error(error.message);
        });
    } else {
      alertify.error("Lütfen bilgileri doldurunuz !");
    }
  }

  if (!token) {
    return <LoginUser />;
  } else {
    return (
      <ProductDetail
        product={product}
        categories={categories}
        loadingImage={loadingImage}
        onChange={handleChange}
        onSave={handleSave}
        errors={errors}
      />
    );
  }
}

export function getProductById(products, productId) {
  let product =
    products.find((product) => product.id === parseInt(productId)) || null;
  return product;
}

function mapStateToProps(state, ownProps) {
  const productId = ownProps.match ? ownProps.match.params.productId : null;
  const product =
    productId && state.productListReducer.length > 0
      ? getProductById(state.productListReducer, productId)
      : {};
  return {
    product,
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
}

const mapDispatchToProps = { getCategories, saveProduct };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddOrUpdateProduct));
