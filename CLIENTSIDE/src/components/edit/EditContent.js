import React, { Component } from "react";
import { connect } from "react-redux";
import AddOrUpdateProduct from "../products/AddOrUpdateProduct";
import AddOrUpdateCategory from "../categories/AddOrUpdateCategory";
import ProductListTable from "../products/ProductListTable";
import CategoryListTable from "../categories/CategoryListTable";
import CartList from "../cart/CartList";
import { getToken } from "../../redux/actions/loginActions";
import LoginUser from "../common/LoginUser";

/** @author: istiklal */


class EditContent extends Component {

  renderSwitch(currnetId) {
    switch (currnetId) {
      case 1:
        // add product
        return(<AddOrUpdateProduct />);
      case 2:
        // edit product
        return(<ProductListTable />);
      case 3:
        // add cathegory
        return(<AddOrUpdateCategory />);
      case 4:
        // edit cathegory
        return(<CategoryListTable />);
      case 5:
        // waiting orders
        return(<CartList cartStatus={1} />);
      case 6:
        // confirmed orders
        return(<CartList cartStatus={2} />);;
      default:
        break;
    }
  }

  render() {
    const token = getToken();
    if(!token){
      return(
        <LoginUser />
      )
    }else{
      return (
      <div id="EditContentContainer">
        {this.renderSwitch(this.props.currentEditChoice.id)}
      </div>
    );
    }
    
  }
}

function mapStateToProps(state) {
  return {
    currentEditChoice: state.editChoiceReducer,
  };
}

export default connect(mapStateToProps)(EditContent);
