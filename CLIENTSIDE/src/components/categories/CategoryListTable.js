import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import {
  Table,
  Button,
  Container,
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";

class CategoryListTable extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }

  render() {
    return (
      <Container fluid="fluid" id="ProductListTableContainer">
        <h3>Kategorileri Düzenle</h3>
        <Table>
          <thead>
            <tr>
              <th>Kategori Adı</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.categories.map((category) => (
              <tr key={category.id}>
                  <td>{category.categoryName}</td>
                  <td>
                  <Button color="light" size="sm" className="updateButton">
                    <Link to={"/admin/savecategory/" + category.id}>Güncelle</Link>
                  </Button>
                  </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <hr />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categoryListReducer,
  };
}

function mapDispachToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(categoryActions.getCategories, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispachToProps)(withRouter(CategoryListTable));