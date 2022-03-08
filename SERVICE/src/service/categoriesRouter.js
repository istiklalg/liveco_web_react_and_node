const express = require("express");
const router = express.Router();
const db = require("./db");
const bodyParser = require("body-parser");
const path = require("path");

const resultList = [];

router.use(bodyParser.json());

router.get("/", (req, res, next) => {
  console.log("running for [GET].../categories");

  console.log("Query : ", req.query);
  if (req.query.id) {
    // && Number.isInteger(req.query.id)
    // req.query.id.includes("\"")
    db.db.get(
      `SELECT * FROM categories WHERE id=${req.query.id}`,
      (err, row) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log(
            `getting data from categories with id ${req.query.id}`,
            !row ? "-> No result !!" : ", Got it !"
          );
          res.json(row ? row : {});
        }
      }
    );
  } else {
    db.db.all("SELECT * FROM categories", (err, rows) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("getting data from categories", rows.length);
        res.json(rows);
      }
    });
  }
});

router.post("/", (req, res, next) => {
  console.log("running for [POST].../categories");
  console.log("post request body : ", req.body);
  let newCategory = req.body ? req.body : {};
  if (newCategory && !newCategory.id) {
    let stmt = `INSERT INTO categories (categoryName) VALUES ("${newCategory.categoryName}")`;
    db.db.run(stmt, (err, row) => {
      if (err) {
        console.error("Yeni kategori eklenirken hata oluştu : ", err.message);
      } else {
        console.log("Yeni kategori başarıyla eklendi : ", row);
        res.status(200).json({ ok: true });
      }
    });
  }
});

router.put("/:id", (req, res, next) => {
  console.log("running for [PUT].../categories");
  console.log("put request body : ", req.body);
  let updatedCategory = req.body ? req.body : {};
  if (updatedCategory && updatedCategory.id) {
    let stmt = `UPDATE categories SET categoryName="${updatedCategory.categoryName}" WHERE id=${updatedCategory.id}`;
    db.db.run(stmt, (err, row) => {
      if (err) {
        console.error(
          `${updatedCategory.id} idli kategori güncellenirken hata oluştu `,
          err.message
        );
      } else {
        console.log(
          `${updatedCategory.id} idli kategori başarıyla güncellendi`
        );
        res.status(200).json({ ok: true });
      }
    });
  }

  // res.status(200).json({ok: true});
});

exports.router = router;
exports.resultList = resultList;
