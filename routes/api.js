const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const config = require("../config/config");
const axios = require("axios");
const {
  mapboxToken,
  foursquareClientId,
  foursquareClientSecret
} = require("../api_keys/api_keys");

const connection = mysql.createConnection(config);

router.post("/search", async (req, res) => {
  const query = req.body.query.replace(/\s+/g, "%20");
  try {
    const geolocation = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxToken}`
    );
    const {
      features: [firstResult]
    } = geolocation.data;
    // const venues = await axios.get(
    //   `https://api.foursquare.com/v2/venues/explore?
    //       client_id=${foursquareClientId}&client_secret=${foursquareClientSecret}&ll=${firstResult.center[1].toFixed(
    //     2
    //   )},${firstResult.center[0].toFixed(
    //     2
    //   )}&v=20200101&openNow=1&sortyByPopularity=1`
    // );

    console.log(firstResult.center);
  } catch (err) {
    console.log(err);
  }
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
