/* @author : istiklal */
/* add and update forms for categories */

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { saveCategory } from "../../redux/actions/categoryActions";
import CategoryDetail from "./CategoryDetail";
import { getToken } from "../../redux/actions/loginActions";
import LoginUser from "../common/LoginUser";
import alertify from "alertifyjs";

alertify.set("notifier", "position", "bottom-left");

function AddOrUpdateCategory({
  categories,
  saveCategory,
  getCategies,
  history,
  ...props
}) {
  const [category, setCategory] = useState({ ...props.category }); // bu kullanıma javascript te distructing denir.
  // bu syntax state deki product ı setProduct ile set edebilirim demek oluyor react-hook dan yararlanıyoruz.
  const token = getToken();
  const [errors, setErrors] = useState({});

  const [validation, setValidation] = useState(false);

  useEffect(() => {
    // if (categories.length === 0) {
    //   getCategories();
    // }
    setCategory({ ...props.category });
  }, [props.category]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCategory((previousCategory) => ({
      ...previousCategory,
      [name]: value,
    }));
    validate(name, value);
  }

  function validate(name, value) {
    if (name === "categoryName" && value === "") {
      setValidation(false);
      setErrors((previousErrors) => ({
        ...previousErrors,
        categoryName: "Kategory adını boş bırakmamalısınız",
      }));
    } else {
      setValidation(true);
      setErrors((previousErrors) => ({
        ...previousErrors,
        categoryName: "",
      }));
    }
  }

  function handleSave(event) {
    event.preventDefault();
    if (validation && category) {
      saveCategory(category)
        .then(() => {
          history.push("/admin/edit");
          alertify.success(`${category.categoryName} başarıyla kaydedildi.`);
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
      <CategoryDetail
        category={category}
        onChange={handleChange}
        onSave={handleSave}
        errors={errors}
      />
    );
  }
}

export function getCategoryById(categories, categoryId) {
  let category =
    categories.find((category) => category.id === parseInt(categoryId)) || null;
  return category;
}

function mapStateToProps(state, ownProps) {
  const categoryId = ownProps.match ? ownProps.match.params.categoryId : null;
  const category =
    categoryId && state.categoryListReducer.length > 0
      ? getCategoryById(state.categoryListReducer, categoryId)
      : {};
  return {
    category,
    categories: state.categoryListReducer,
  };
}

const mapDispatchToProps = { saveCategory };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddOrUpdateCategory));
