const express = require("express");
const router = express.Router();
const db = require("./db");

router.get("/", (req, res, next) => {
  console.log("running for [GET].../");

  console.log("Query : ", req.query);
  db.db.all("SELECT * FROM sqlite_sequence", (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("getting data from categories", rows.length);
      let htmlPage = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"><title>istiklal's api service</title>
                    </head><body><div><h3 style="text-align: center;">ISTIKLAL'S API SERVICE</h3><hr><ul>`;
      rows.forEach((row) => {
        htmlPage += `<li>/${row.name} for ${row.name} elements. Elements count ${row.seq}</li><br>`;
      });

      htmlPage += `</ul></div></body></html>`;

      res.send(htmlPage);
    }
  });
});

exports.router = router;
