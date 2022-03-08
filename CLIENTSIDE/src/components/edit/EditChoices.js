import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, ListGroup, ListGroupItem } from "reactstrap";
import * as editActions from "../../redux/actions/editActions";

/** @author: istiklal */

class EditChoices extends Component {
  componentDidMount() {
    this.props.actions.getEditChoice();
  }

  selectEditChoice = (choice) => {
    this.props.actions.changeEditChoice(choice);
  };

  render() {
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
    },
  };
}

export default connect(mapStateToProps, mapDispachToProps)(EditChoices);
