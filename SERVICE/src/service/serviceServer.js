const express = require("express");
var cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const conf = require("../seviceConfiguration");

const port = conf.API_PORT;

const homeRouter = require("./homeRouter");
const categoriesRouter = require("./categoriesRouter");
const productsRouter = require("./productsRouter");
const cartsRouter = require("./cartsRouter");
const usersRouter = require("./usersRouter");
const slidersRouter = require("./slidersRouter");

/** @author: istiklal */

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "/public/images")));

app.use("*", (req, res, next) => {
  console.log(`logging in express for request query : `, req.query);
  console.log(`logging in express for request body : `, req.body);
  next();
});

app.use("/", homeRouter.router);
app.use("/categories", categoriesRouter.router);
app.use("/products", productsRouter.router);
app.use("/carts", cartsRouter.router);
app.use("/users", usersRouter.router);
app.use("/sliders", slidersRouter.router);

app.use((req, res) => {
  res.status(404).send("<h1 >Böyle bir talep için cevap bulunmamaktadır.</h1>");
});

app.listen(port, () => {
  console.log(`Listening port ${port}`);
});
