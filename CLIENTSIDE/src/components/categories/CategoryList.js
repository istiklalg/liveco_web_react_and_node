import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as productActions from "../../redux/actions/productActions";

/** @author: istiklal */

class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }

  selectCategory = (category) => {
    if (category) {
      // to get products by category;
      this.props.actions.changeCategory(category);
      this.props.actions.getProducts(category.id);
    } else {
      // to reset category filter;
      this.props.actions.changeCategory({});
      this.props.actions.getProducts();
    }
  };

  render() {
    return (
      <Container fluid="fluid" id="CategoryListContainer">
        <h3>Kategoriler</h3>
        <ListGroup>
          {this.props.categories.map((category) => (
            <ListGroupItem
              active={category.id === this.props.currentCategory.id}
              className="selectableListItem"
              key={category.id}
              onClick={() => this.selectCategory(category)}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
          <ListGroupItem
            color="info"
            className="selectableListItem"
            onClick={() => this.selectCategory()}
          >
            Tüm Ürünler
          </ListGroupItem>
        </ListGroup>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer,
  };
}

function mapDispachToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      changeCategory: bindActionCreators(
        categoryActions.changeCategory,
        dispatch
      ),
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispachToProps)(CategoryList);
