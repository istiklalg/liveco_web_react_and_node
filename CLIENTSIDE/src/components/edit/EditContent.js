import React, { Component } from "react";
import { connect } from "react-redux";
import AddOrUpdateProduct from "../products/AddOrUpdateProduct";
import AddOrUpdateCategory from "../categories/AddOrUpdateCategory";
// import { bindActionCreators } from "redux";
// import { Container, ListGroup, ListGroupItem } from "reactstrap";
// import * as editActions from "../../redux/actions/editActions";
// import AddOrUpdateProduct from "../products/AddOrUpdateProduct";
import ProductListTable from "../products/ProductListTable";
import CategoryListTable from "../categories/CategoryListTable";
import CartList from "../cart/CartList";
import { getToken } from "../../redux/actions/loginActions";
import LoginUser from "../common/LoginUser";

/*
editChoices: [
    { id: 1, call:"/saveproduct", name: "Ürün Ekle"},
    { id: 2, call:"/saveproduct", name: "Ürün Düzenle"},
    { id: 3, call:"/savecategory", name: "Kategori Ekle"},
    { id: 4, call:"/savecategory", name: "Kategoriyi Düzenle"},
    { id: 5, call:"/seecarts", name: "Siparişleri Gör"},
    { id: 6, call:"/admin/seecarts", name: "Siparişleri Onayla"},
  ],
*/

class EditContent extends Component {

  renderSwitch(currnetId) {
    switch (currnetId) {
      case 1:
        // ürün ekleme
        return(<AddOrUpdateProduct />);
      case 2:
        // ürün düzenleme
        return(<ProductListTable />);
      case 3:
        // kategori ekle
        return(<AddOrUpdateCategory />);
      case 4:
        // kategoriyi düzenle
        return(<CategoryListTable />);
      case 5:
        // bekleyen siparişler
        return(<CartList cartStatus={1} />);
      case 6:
        // onaylı siparişler
        return(<CartList cartStatus={2} />);;
      default:
        break;
    }
  }

  render() {
    // console.log("current edit choice in EditContent : ", this.props.currentEditChoice);
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
    // editChoices: state.editChoicesListReducer,
    currentEditChoice: state.editChoiceReducer,
    // currentCategory: state.changeCategoryReducer,
    //   categories: state.categoryListReducer,
  };
}

// function mapDispachToProps(dispatch) {
//   return {
//     actions: {
//       getEditChoices: bindActionCreators(editActions.getEditChoices, dispatch),
//       changeEditChoice: bindActionCreators(
//         editActions.changeEditChoice,
//         dispatch
//       ),
//       //   getProducts: bindActionCreators(productActions.getProducts, dispatch),
//     },
//   };
// }

export default connect(mapStateToProps)(EditContent);
