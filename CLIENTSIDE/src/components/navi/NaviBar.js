import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import CartSummary from "../cart/CartSummary";
import * as loginActions from "../../redux/actions/loginActions";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
// import { Link } from "react-router-dom";

const NaviBar = (...props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setTokenState] = useState(loginActions.getToken);
  // const [sessionUser, setSessionUser] = useState({});
  const [sessionUser, setSessionUser] = useState(loginActions.getSessionUser());
  // props.user = getSessionUser();
  // console.log("session user : ", sessionUser.userName);
  // console.log("session user : ", props.currentUser.userName);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (!props.sessionUser?.id) {
      setSessionUser(loginActions.getSessionUser);
    } else {
      setSessionUser({ ...props.sessionUser });
    }
  }, [props.sessionUser]);

  return (
    <div>
      <Navbar color="light" light expand="md" fixed="top">
        <NavbarBrand href="/" id="homePage" title="Home Page">
          <img
            className="smallLogo"
            src={`${process.env.PUBLIC_URL}/logo512.png`}
            alt="Logo"
          />{" "}
          LIVECO
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="justify-content-between">
          <Nav className="mr-auto" navbar>
            {/* <NavItem> */}
            {token ? (
              <NavItem>
                <NavLink href="/admin/edit/">Düzenle</NavLink>
              </NavItem>
            ) : (
              <div></div>
            )}
            {token ? (
              <NavItem>
                <NavLink
                  href="/"
                  onClick={() => {
                    loginActions.setToken({});
                    setTokenState(true);
                  }}
                >
                  Çıkış Yap
                </NavLink>
              </NavItem>
            ) : (
              <NavItem>
                <NavLink href="/admin/" id="logIn" title="Login">Giriş</NavLink>
              </NavItem>
            )}
            {/* <NavLink href="/admin/">Kullanıcı Girişi</NavLink> */}
            {/* </NavItem> */}
            {/* <NavItem>
              <NavLink href="/admin/edit/">Düzenle</NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink href="/about_us/">Hakkımızda</NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink href="#">Üye Girişi</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Çıkış</NavLink>
            </NavItem> */}
            <CartSummary />
          </Nav>
          <NavbarText>
            {" "}
            {sessionUser?.id
              ? `${sessionUser.firstName} ${sessionUser.lastName} - `
              : ""}{" "}
            www.liv-eco.net
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

// function mapStateToProps(state) {
//   return {
//     currentUser: state.loginUserReducer,
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: {
//       getSessionUser: bindActionCreators(loginActions.getSessionUser, dispatch),
//       getToken: bindActionCreators(loginActions.getToken, dispatch),
//       setToken: bindActionCreators(loginActions.setToken, dispatch),
//     },
//   };
// }
// export default connect(mapStateToProps, mapDispatchToProps)(NaviBar);
export default NaviBar;



// export default class NaviBar extends Component {
//     render() {
//         return (
//             <div id="NaviBarContainer">

//             </div>
//         )
//     }
// }
