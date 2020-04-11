const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

const connection = mysql.createConnection(config);

router.post("/login", (req, res) => {
  const email = String(req.body.email);
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    email,
    (err, results, fields) => {
      if (err) {
        throw err;
      } else if (results.length === 0) {
        connection.query(
          "INSERT INTO users(email) VALUES(?)",
          email,
          (err, results, fields) => {
            if (err) throw err;
          }
        );
        connection.query(
          "SELECT * FROM users WHERE email = ?",
          email,
          (err, results, fields) => {
            if (err) throw err;
            jwt.sign({ ...results[0] }, "secretkey", (err, token) => {
              res.json({ token });
            });
          }
        );
      } else {
        jwt.sign({ ...results[0] }, "secretkey", (err, token) => {
          res.json({ token });
        });
      }
    }
  );
});

module.exports = router;
