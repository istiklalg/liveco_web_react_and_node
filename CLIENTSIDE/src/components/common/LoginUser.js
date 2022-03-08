/* @author : istiklal */

import { SECRET_KEY } from "../../seviceConfiguration";
import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { authUser, setToken } from "../../redux/actions/loginActions";
import LoginForm from "./LoginForm";
import alertify from "alertifyjs";
alertify.set("notifier", "position", "bottom-left");

var CryptoJS = require("crypto-js");

function LoginUser({ authUser, history, ...props }) {
  const [currentUser, setCurrentUser] = useState({ ...props.currentUser });

  function handleChange(event) {
    const { name, value } = event.target;
    setCurrentUser((previousCurrentUser) => ({
      ...previousCurrentUser,
      [name]: name==="password" ? CryptoJS.AES.encrypt(value, SECRET_KEY).toString() : value,
    }));
  }
  
  function handleAuth(event) {
    event.preventDefault();
    authUser(currentUser)
      .then((data) => {
        if (data.id) {
          console.log("User that recently logged in : ", data?.userName);
          setToken(data);
          alertify.success(
            `${currentUser.userName} kullanıcısı olarak giriş yapıldı.`
          );
          document.getElementById("homePage").click();
        } else {
          alertify.error(
            `${currentUser.userName} için kullanıcı adı ya da şifre hatalı.`
          );
        }
      })
      .catch((error) => {
        alertify.error(error.message);
      });
  }

  return (
    <LoginForm
      onChange={handleChange}
      onAuth={handleAuth}
    />
  );
}

function mapStateToProps(state) {
  return {
    currentUser: state.loginUserReducer,
  };
}

const mapDispatchToProps = { authUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginUser));
