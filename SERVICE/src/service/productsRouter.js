const express = require("express");
const router = express.Router();
const db = require("./db");
const bodyParser = require("body-parser");
const path = require("path");

const resultList = [];

router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  console.log("running for [GET].../products");
  // console.log("request : ", req);
  console.log("Query : ", req.query);
  if (req.query.id) {
    // && Number.isInteger(req.query.id)
    // req.query.id.includes("\"")
    db.db.get(`SELECT * FROM products WHERE id=${req.query.id}`, (err, row) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(
          `getting data from categories with id ${req.query.id}`,
          !row ? "-> No result !!" : ", Got it !!"
        );
        res.json(row?row:{});
      }
    });
  } else if(req.query.categoryId) {
    db.db.all(`SELECT * FROM products WHERE categoryId=${req.query.categoryId}`, (err, row) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(
          `getting data from categories with categoryId ${req.query.categoryId}`,
          !row ? "-> No result !!" : ", Got it !!"
        );
        res.json(row?row:{});
      }
    });
  } else {
    db.db.all("SELECT * FROM products", (err, rows) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("getting data from products", rows.length);
        res.json(rows);
      }
    });
  }
});

router.post("/", (req, res, next) => {
  console.log("running for [POST].../products");
  console.log("post request body : ", req.body);
  let newProduct = req.body ? req.body : {}
  if(newProduct && !newProduct.id){
    //INSERT INTO products (productName, categoryId, quantityPerUnit, unitPrice, unitsInStock, productImage)
    //VALUES ("Domates Salçası", 4, "250 gramlık kavanoz", 125.70, 15, "domates salçası.jpg")
    let stmt = `INSERT INTO products (productName, categoryId, quantityPerUnit, unitPrice, unitsInStock, productImage)
    VALUES ("${newProduct.productName}", ${newProduct.categoryId}, "${newProduct.quantityPerUnit}",
     ${newProduct.unitPrice}, ${newProduct.unitsInStock}, "${newProduct.productImage}")`
    db.db.run(stmt, (err, row) => {
      if(err){
        console.error("Yeni ürün eklenirken hata oluştu : ", err.message);
      }else{
        console.log("Yeni ürün başarıyla eklendi : ", row);
        res.status(200).json({ok: true});
      }
    })
  }
  // res.status(200).json(req.body);
  // products.push({name: req.body.name, price: req.body.price, image: req.body.image, description: req.body.description});
  // res.redirect("/");
});

router.put("/:id", (req, res, next) => {
  console.log("running for [PUT].../products");
  // console.log("request : ", req);
  console.log("put request body : ", req.body);
  let updatedProduct = req.body ? req.body : {}
  if(updatedProduct && updatedProduct.id){
    let stmt = `UPDATE products SET productName="${updatedProduct.productName}", categoryId=${updatedProduct.categoryId}, 
    quantityPerUnit="${updatedProduct.quantityPerUnit}", unitPrice=${updatedProduct.unitPrice}, 
    unitsInStock=${updatedProduct.unitsInStock}, productImage="${updatedProduct.productImage}" WHERE id=${updatedProduct.id}`
    db.db.run(stmt, (err, row) => {
      if(err){
        console.error(`${updatedProduct.id} idli ürün güncellenirken hata oluştu `, err.message);
      }else{
        console.log(`${updatedProduct.id} idli ürün başarıyla güncellendi`)
        res.status(200).json({ok: true});
      }
    })
  }

  // res.status(200).json({ok: true});
})

// module.exports = router;
exports.router = router;
exports.resultList = resultList;
