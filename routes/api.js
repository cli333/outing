const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const config = require("../config/config");
const axios = require("axios");
const {
  mapboxToken,
  foursquareClientId,
  foursquareClientSecret,
  mapquestKey
} = require("../api_keys/api_keys");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/middleware");

const connection = mysql.createConnection(config);

router.post("/test", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "authenticated",
        authData
      });
    }
  });
});

router.post("/", async (req, res) => {
  const query = encodeURIComponent(req.body.query);
  try {
    const geolocation = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxToken}`
    );
    const {
      features: [currentLocation, ...otherLocations]
    } = geolocation.data;

    if (currentLocation.place_type[0] != "address") {
      const address = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${currentLocation.center[0]}%2C%20${currentLocation.center[1]}.json?access_token=${mapboxToken}`
      );
      currentLocation.place_name = address.data.features[0].place_name;
    }

    const venues = await axios.get(
      `https://api.foursquare.com/v2/venues/explore?client_id=${foursquareClientId}&client_secret=${foursquareClientSecret}&ll=${currentLocation.center[1].toFixed(
        2
      )},${currentLocation.center[0].toFixed(2)}&v=20200101&sortByPopularity=1`
    );

    res.json({
      currentLocation,
      otherLocations,
      destinations: venues.data.response.groups[0].items
        .map(i => i.venue)
        .filter(v => v.location.address)
    });
  } catch (err) {
    res.status(404).json({ success: false });
  }
});

router.post("/destinations", async (req, res) => {
  const query = encodeURIComponent(req.body.query);
  const { currentLocation } = req.body;
  try {
    const venues = await axios.get(
      `https://api.foursquare.com/v2/venues/search?client_id=${foursquareClientId}&client_secret=${foursquareClientSecret}&ll=${currentLocation.center[1].toFixed(
        2
      )},${currentLocation.center[0].toFixed(2)}&v=20200101&query=${query}`
    );
    res.json(venues.data.response.venues.filter(v => v.location.address));
  } catch (err) {
    res.status(404).json({ success: false });
  }
});

router.post("/directions", async (req, res) => {
  const { currentLocation, myDestination } = req.body;
  const locationStartAddress = encodeURIComponent(currentLocation.place_name);
  const city = myDestination.location.city;
  const state = myDestination.location.state;
  const country = myDestination.location.country;
  const locationEndAddress = encodeURIComponent(
    myDestination.location.address +
      (myDestination.location.crossStreet
        ? " " + myDestination.location.crossStreet
        : "") +
      ", " +
      city +
      ", " +
      state +
      ", " +
      country
  );

  try {
    const directions = await axios.get(
      `https://www.mapquestapi.com/directions/v2/route?key=${mapquestKey}&from=${locationStartAddress}&to=${locationEndAddress}`
    );
    res.json(directions.data.route.legs[0].maneuvers);
  } catch (err) {
    res.status(404).json({ success: false });
  }
});

// connection.query(
//   "SELECT * FROM users ORDER BY created_at DESC",
//   (err, results, fields) => {
//     if (err) throw err;
//     res.json(results);
//   }
// );

module.exports = router;
