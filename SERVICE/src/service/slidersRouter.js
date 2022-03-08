const express = require("express");
const router = express.Router();
const db = require("./db");
const bodyParser = require("body-parser");
const path = require("path");

/** @author: istiklal */

router.use(bodyParser.json());

router.get("/", (req, res, next) => {
  console.log("running for [GET].../sliders");
  console.log("Query : ", req.query);
  db.db.all("SELECT * FROM sliders ORDER BY id", (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("getting data from sliders...");
      res.json(rows);
    }
  });
});

router.post("/", (req, res, next) => {
  console.log("running for [POST].../sliders");
  console.log("post request body : ", req.body);
  let newSlider = req.body ? req.body : {};
  if (newSlider) {
    let stmt = `INSERT INTO sliders (name, imageFileName) 
                VALUES ("${newSlider.name}", "${newSlider.imageFileName}")`;
    db.db.run(stmt, (err, row) => {
      if (err) {
        console.error("Yeni slider resmi eklenirken hata oldu : ", err.message);
      } else {
        console.log("Yeni slider resmi başarıyla eklendi : ", row);
        res.status(200).json({ ok: true });
      }
    });
  }
});

router.put("/", (req, res, next) => {
  console.log("running for [POST].../sliders");
  console.log("post request body : ", req.body);
  let updatedSlider = req.body ? req.body : {};
  if (updatedSlider) {
    let stmt = `UPDATE sliders SET name="${updatedSlider.name}", imageFileName=${updatedSlider.imageFileName}  
                WHERE id=${updatedSlider.id}`;
    db.db.run(stmt, (err, row) => {
      if (err) {
        console.error(
          `${updatedSlider.id} idli slider resmi güncellenirken hata oluştu `,
          err.message
        );
      } else {
        console.log(
          `${updatedSlider.id} idli slider resmi başarıyla güncellendi `,
          row
        );
        res.status(200).json({ ok: true });
      }
    });
  }
});

exports.router = router;
