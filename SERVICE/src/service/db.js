const sqlite3 = require("sqlite3").verbose();
const path = require("path");

/** @author: istiklal */

let connectionError = null;
const dbPath = path.resolve(__dirname, "livecodb.db");

let db = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error("!! Database connection error -> ", err.message);
      if (err.code === "SQLITE_CANTOPEN") {
        console.log("!! database path -> ", dbPath);
      }
      connectionError = err;
    } else {
      console.log("Connected to the db successfully.");
    }
  }
);

exports.db = db;
