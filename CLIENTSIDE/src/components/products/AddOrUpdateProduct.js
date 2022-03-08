/* @author : istiklal */
/* add and update forms for products */
// useEffect componentDidMount yerine
//useState ise set state yerine kullanacağımız fonksiyonlar olacak

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
  // loadingImage,
  getProducts,
  getCategories,
  saveProduct,
  history,
  ...props // burada mevcut propsları bu şekilde genişletebiliyoruz. Yani bu fonksiyonun propları ve yukarıdakiler demek oluyor.
}) {
  const [product, setProduct] = useState({ ...props.product }); // bu kullanıma javascript te distructing denir.
  // bu syntax state deki product ı setProduct ile set edebilirim demek oluyor react-hook dan yararlanıyoruz.
  const token = getToken();
  const [errors, setErrors] = useState({});

  const [loadingImage, setLoadingImage] = useState({});

  const [validation, setValidation] = useState(false);

  useEffect(() => {
    if (categories.length === 0) {
      // bu demek oluyorki kategoriler sayfasına hiç gidilmeden bu sayfaya gelinmiş !
      getCategories(); // bunu yaparak categories listesini dolduruyoruz.
    }
    setProduct({ ...props.product });
  }, [props.product, categories, getCategories]);
  // [props.product] vermek useEffect in sonsuz döngüye girmesini engellemektedir, bunun anlamı props.product ı izle bu doma yerleştiği zaman process i bitir demek

  function handleChange(event) {
    const { name, value, files } = event.target;
    if (files) {
      setLoadingImage(files[0]);
    }
    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: name === "productImage" && files ? files[0].name : value,
      // [name]: name === "productImage" ? ( files && files[0] ? files[0].name : "resim hatalı") : value,
      [name]: name === "categoryId" ? parseInt(value, 10) : value, // önceki product ın name i o olan alanındeğerini atıyorız categoryId olan alanı integer a çeviriyoruz
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
