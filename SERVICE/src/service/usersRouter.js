const express = require("express");
const router = express.Router();
const db = require("./db");
const bodyParser = require("body-parser");
const path = require("path");
const conf = require("../seviceConfiguration");
var CryptoJS = require("crypto-js");

/** @author: istiklal */

const resultList = [];

router.use(bodyParser.json());

router.get("/usernames", (req, res, next) => {
  console.log("running for [GET].../users/usernames");
  db.db.all("SELECT userName FROM users WHERE admin=0", (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(404).send("Error : ", err.message);
    } else {
      console.log("getting names from users", rows.length);
      res.json(rows);
    }
  });
});

router.get("/", (req, res, next) => {
  console.log("running for [GET].../users");

  if (req.query.userName) {
    if (req.query.userName.includes('"') || req.query.userName.includes("'")) {
      console.log(
        `Dangerous chars in query can be database injection -> ${req.query.userName}`
      );
      res.json({ name: "Don't try it" });
    } else {
      db.db.get(
        `SELECT id, userName, firstName, lastName, address, city, country, phone, email, admin, isRootUser FROM users WHERE userName='${req.query.userName}'`,
        (err, row) => {
          if (err) {
            console.error(err.message);
          } else {
            console.log(
              `getting data from user with id ${req.query.userName}`,
              !row ? "-> No result !!" : ", Got it !!"
            );
            res.json(row ? row : {});
          }
        }
      );
    }
  } else if (
    req.query.GET ||
    req.query.get ||
    req.query.POST ||
    req.query.post
  ) {
    console.log(
      `Dangerous request in query can be database injection -> `,
      req.query
    );
    res.json({ name: "Don't try it" });
  } else {
    db.db.all(
      "SELECT id, userName, firstName, lastName, address, city, country, phone, email FROM users WHERE admin=0",
      (err, rows) => {
        if (err) {
          console.error(err.message);
          res.status(404).send("Error : ", err.message);
        } else {
          console.log("getting data from users", rows.length);
          res.json(rows);
        }
      }
    );
  }
});

router.post("/allow", (req, res, next) => {
  console.log("running for [POST].../users/allow");
  console.log("post request body : ", req.body);
  let allowReq = req.body ? req.body : {};
  if (allowReq) {
    if (
      allowReq.userName.includes('"') ||
      allowReq.userName.includes("'") ||
      allowReq.password.includes('"') ||
      allowReq.password.includes("'")
    ) {
      res.json({ name: "Don't try it !!" });
    } else {
      let stmt = `SELECT id, userName, firstName, lastName, address, city, country, phone, email, admin, isRootUser 
                  FROM users WHERE userName='${allowReq.userName}' AND password='${allowReq.password}' LIMIT 1;`;
      db.db.run(stmt, (err, row) => {
        if (err) {
          console.error(
            "Kullan??c?? giri?? onay?? s??ras??nda bir hata olu??tu",
            err.message
          );
          res.json(row ? row : {});
        }
      });
    }
  }
});

router.post("/", (req, res, next) => {
  console.log("running for [POST].../users");
  let authReq = req.body ? req.body : {};
  
  if (authReq && authReq.userName && authReq.password) {
    console.log("password received : ", authReq.password)
    let decodedPassword = CryptoJS.AES.decrypt(authReq.password, conf.REACT_SECRET_KEY).toString();
    console.log("password is : ", decodedPassword);
    authReq.password = CryptoJS.HmacSHA1(decodedPassword, conf.SECRET_KEY).toString();
    console.log("password now : ", authReq.password);
    if (
      authReq.userName.includes("'") ||
      authReq.userName.includes('"') ||
      authReq.userName.includes("*") ||
      authReq.password.includes("'") ||
      authReq.password.includes('"') ||
      authReq.password.includes("*")
    ) {
      console.log(
        "Kullan??c?? ad?? veya ??ifrede (\", ', *) gibi sorunlu karakterler var"
      );
      res.status(404).json({});
    } else {

      let stmt = `SELECT id, userName, firstName, lastName, admin FROM users 
                  WHERE userName='${authReq.userName}' AND password='${authReq.password}' LIMIT 1;`;
      db.db.get(stmt, (err, row) => {
        if (err) {
          console.error("Kullan??c?? giri?? onay?? s??ras??nda bir hata olu??tu", err.message);
        }else if(row){
          /// TODO : session token session id is generating here...
          //row.token = ;
          //row.sessionId = ;
          console.log("Gelen cevap : ", row);
          res.json(row);
        }else{
          console.error("Uyan cevap yok");
          res.status(202).json();
        }
      });
    }
  } else {
    console.log("Login Formu bo?? !!");
    res.status(404).json({});
  }
});

exports.router = router;
exports.resultList = resultList;
