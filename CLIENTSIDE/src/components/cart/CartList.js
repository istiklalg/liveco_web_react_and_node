import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import { Table, Container, Button } from "reactstrap";

class CartList extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.cartStatus !== prevProps.cartStatus) {
      this.props.actions.getCarts(this.props.cartStatus);
    }
  }

  componentDidMount() {
    this.props.actions.getCarts(this.props.cartStatus);
  }

  createLittleTable = (subList) => {
    if (subList && subList.length > 0) {
      return (
        <Container fluid="fluid" id="subTableContainer">
          <Table responsive striped size="sm">
            <thead>
              <tr>
                <th>Ürün Adı</th>
                <th>Ürün Adedi</th>
                <th>Birim Fiyatı</th>
                <th>Ücreti</th>
              </tr>
            </thead>
            <tbody>
              {subList.map((subItem) => {
                return (
                  <tr key={subItem.product.id}>
                    <td>{subItem.product.productName}</td>
                    <td>{subItem.quantity}</td>
                    <td>{subItem.product.unitPrice} TL</td>
                    <td>
                      {subItem.quantity * parseFloat(subItem.product.unitPrice)}{" "}
                      TL
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      );
    }
  };

  render() {
    return (
      <Container fluid="fluid" id="cartListContainer">
        <h3>
          {this.props.cartStatus === 1
            ? "Bekleyen Siparişler"
            : "Onaylı Siparişler"}
        </h3>
        <Table size="sm">
          <thead>
            <tr>
              <th>Müşteri Adı</th>
              <th>Telefon</th>
              <th>E-posta</th>
              <th>Adres</th>
              <th>Sİpariş Tarihi</th>
              <th>Sipariş Detayı</th>
              <th>Sipariş Durumu</th>
              <th>Sipariş Tutarı</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.carts.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.customerName}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.address + " / " + item.city}</td>
                  <td>{item.date}</td>
                  <td>{this.createLittleTable(JSON.parse(item.cart))}</td>
                  {/* <td>{item.cart}</td> */}
                  <td
                    className={
                      item.status === 1 ? "table-danger" : "table-success"
                    }
                  >
                    {item.status === 1 ? "Bekliyor.." : "Onaylanmış "}
                    <br />
                    {item.approvalDate ? item.approvalDate : ""}
                  </td>
                  <td>{item.totalPrice} TL</td>
                  <td>
                    <Button color="light" size="sm" className="updateButton">
                      <Link to={"/admin/savecart/" + item.id}>Güncelle</Link>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    carts: state.cartAdminReducer,
  };
}

function mapDispachToProps(dispatch) {
  return {
    actions: {
      getCarts: bindActionCreators(cartActions.getCarts, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispachToProps
)(withRouter(CartList));
