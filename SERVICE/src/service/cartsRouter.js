const express = require("express");
const router = express.Router();
const db = require("./db");
const bodyParser = require("body-parser");
const path = require("path");
const mailer = require("./mailerService")

const resultList = [];

router.use(bodyParser.json());

router.get("/", (req, res, next) => {
  console.log("running for [GET].../carts");
  let date_now = new Date();
  date_now = date_now.toLocaleString("tr-TR", {timeZone: "Europe/Istanbul"}).replace(".", "-").replace(".", "-");
  console.log("Current date is : ", date_now);
  console.log("Query : ", req.query);
  if (req.query.id) {
    // && Number.isInteger(req.query.id)
    // req.query.id.includes("\"")
    db.db.get(`SELECT * FROM carts WHERE id=${req.query.id}`, (err, row) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(
          `getting data from carts with id ${req.query.id}`,
          !row ? "-> No result !!" : ", Got it !"
        );
        res.json(row ? row : {});
      }
    });
  } else if (req.query.status) {
    db.db.all(
      `SELECT * FROM carts WHERE status=${req.query.status}`,
      (err, rows) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log(
            `getting data from carts with status ${req.query.status}`,
            !rows ? "-> No result !!" : ", Got it !"
          );
          res.json(rows ? rows : []);
        }
      }
    );
  } else {
    db.db.all("SELECT * FROM carts", (err, rows) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("getting data from carts", rows.length);
        res.json(rows);
      }
    });
  }
});

router.post("/", (req, res, next) => {
  let date_now = new Date();
  //date_now = date_now.toLocaleString().replace(".", "-").replace(".", "-");
  date_now = date_now.toLocaleString("tr-TR", {timeZone: "Europe/Istanbul"}).replace(".", "-").replace(".", "-");
  console.log("running for [POST].../carts");
  console.log(date_now, " post request body : ", req.body);
  let newCart = req.body ? req.body : {};
  newCart.date = date_now;
  if (newCart && !newCart.id) {
    let stmt = `INSERT INTO carts (customerName, phone, email, address, city, cart, totalPrice, date) 
				VALUES ("${newCart.customerName}", "${newCart.phone}", "${newCart.email}", 
				"${newCart.address}", "${newCart.city}", '${newCart.cart}', 
				"${newCart.totalPrice ? parseFloat(newCart.totalPrice) : 0.00}", "${date_now}")`;
    db.db.run(stmt, (err, row) => {
      if (err) {
        console.error("Yeni sipariş eklenirken hata oluştu : ", err.message);
      } else {
        console.log("Yeni sipariş başarıyla eklendi : ", row);
        mailer.sendNewCartToAdmin(newCart);
        mailer.sendNewCartToCustomer(newCart);
        res.status(200).json({ ok: true });
      }
    });
  }
});

router.put("/:id", (req, res, next) => {
  console.log("running for [PUT].../carts");
  console.log("put request body : ", req.body);
  let updatedCart = req.body ? req.body : {};
  if (updatedCart && updatedCart.id) {
    let stmt = `UPDATE carts SET status="${parseInt(updatedCart.status)}" WHERE id=${updatedCart.id}`;
    db.db.run(stmt, (err, row) => {
      if (err) {
        console.error(
          `${updatedCart.id} idli siperiş güncellenirken hata oluştu `,
          err.message
        );
      } else {
        console.log(`${updatedCart.id} idli sipariş başarıyla güncellendi`);
        res.status(200).json({ ok: true });
      }
    });
  }
});

exports.router = router;
exports.resultList = resultList;
