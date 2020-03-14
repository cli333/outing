const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const config = require("../config/config");
const axios = require("axios");
const { mapboxToken } = require("../api_keys/api_keys");

const connection = mysql.createConnection(config);

router.post("/search", (req, res) => {
  const query = req.body.query.replace(/\s+/g, "%20");
  axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxToken}`
    )
    .then(result => res.json(result.data));
});

router.get("/", (req, res) => {
  // connection.query(
  //   "SELECT * FROM users ORDER BY created_at DESC",
  //   (err, results, fields) => {
  //     if (err) throw err;
  //     res.json(results);
  //   }
  // );
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
