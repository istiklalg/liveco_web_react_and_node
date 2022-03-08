import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, ListGroup, ListGroupItem } from "reactstrap";
import * as editActions from "../../redux/actions/editActions";

/*
editChoices: [
    { id: 1, call:"/saveproduct", name: "Ürün Ekle"},
    { id: 2, call:"/saveproduct", name: "Ürün Düzenle"},
    { id: 3, call:"/savecategory", name: "Kategori Ekle"},
    { id: 4, call:"/savecategory", name: "Kategoriyi Düzenle"},
    { id: 5, call:"/seecarts", name: "Siparişleri Gör"},
  ],
*/

class EditChoices extends Component {
  componentDidMount() {
    // this.props.actions.getEditChoices();
    this.props.actions.getEditChoice();
  }

  selectEditChoice = (choice) => {
    this.props.actions.changeEditChoice(choice);
  };

  render() {
    // console.log("current edit choice in EditChoices : ", this.props.currentEditChoice);
    return (
      <div id="EditChoicesContainer">
        <Container fluid="fluid" id="CategoryListContainer">
          <h3>Yönetim</h3>
          <ListGroup>
            {this.props.editChoices.map((choice) => (
              <ListGroupItem
                active={choice.id === this.props.currentEditChoice.id}
                className="selectableListItem"
                key={choice.id}
                onClick={() => {
                  this.selectEditChoice(choice);
                }}
              >
                {choice.name}
              </ListGroupItem>
            ))}
            {/* <ListGroupItem
              color="info"
              className="selectableListItem"
              onClick={() => this.selectCategory()}
            >
              Tüm Ürünler
            </ListGroupItem> */}
          </ListGroup>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    editChoices: state.editChoicesListReducer,
    currentEditChoice: state.editChoiceReducer,
    // currentCategory: state.changeCategoryReducer,
    //   categories: state.categoryListReducer,
  };
}

function mapDispachToProps(dispatch) {
  return {
    actions: {
      getEditChoices: bindActionCreators(editActions.getEditChoices, dispatch),
      getEditChoice: bindActionCreators(editActions.getEditChoice, dispatch),
      changeEditChoice: bindActionCreators(
        editActions.changeEditChoice,
        dispatch
      ),
      //   getProducts: bindActionCreators(productActions.getProducts, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispachToProps)(EditChoices);
