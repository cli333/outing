const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const config = require("../config/config");

const connection = mysql.createConnection(config);

router.get("/", (req, res) => {
  connection.query(
    "SELECT * FROM users ORDER BY created_at DESC",
    (err, results, fields) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// on the hero page, add a tally to show existing outings
// router.get("/count", (req, res) => {
//   connection.query(
//     "SELECT COUNT(*) AS outings_count FROM outings",
//     (err, results, fields) => {
//       if (err) throw err;
//       res.json(results.outings_count);
//     }
//   );
// });

module.exports = router;
