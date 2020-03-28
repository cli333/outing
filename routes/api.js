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

router.post("/", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const query = encodeURIComponent(req.body.query);
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
          )},${currentLocation.center[0].toFixed(
            2
          )}&v=20200101&sortByPopularity=1`
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
    }
  });
});

router.post("/destinations", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const query = encodeURIComponent(req.body.query);
        const { currentLocation } = req.body;
        const venues = await axios.get(
          `https://api.foursquare.com/v2/venues/search?client_id=${foursquareClientId}&client_secret=${foursquareClientSecret}&ll=${currentLocation.center[1].toFixed(
            2
          )},${currentLocation.center[0].toFixed(2)}&v=20200101&query=${query}`
        );
        res.json(venues.data.response.venues.filter(v => v.location.address));
      } catch (err) {
        res.status(404).json({ success: false });
      }
    }
  });
});

router.post("/directions", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const { currentLocation, myDestination } = req.body;
      const locationStartAddress = encodeURIComponent(
        currentLocation.place_name
      );
      const city = myDestination.location.city;
      const state = myDestination.location.state;
      const country = myDestination.location.country;
      const destinationString = `${myDestination.location.address}${
        city ? ", " + city : ""
      }${state ? ", " + state : ""}${country ? ", " + country : ""}`;
      const locationEndAddress = encodeURIComponent(destinationString);
      try {
        const directions = await axios.get(
          `https://www.mapquestapi.com/directions/v2/route?key=${mapquestKey}&from=${locationStartAddress}&to=${locationEndAddress}`
        );
        const maneuvers = directions.data.route.legs[0].maneuvers;
        connection.query(
          "INSERT INTO trips(startingLocation, startingLocationCoordinates, directions, directionsCoordinates, directionsIcons, destination, destinationCoordinates, destinationIcon, userId) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            currentLocation.place_name,
            JSON.stringify(currentLocation.center),
            maneuvers.map(m => m.narrative).join(";"),
            JSON.stringify(
              maneuvers.map(m => [m.startPoint.lng, m.startPoint.lat])
            ),
            JSON.stringify(maneuvers.map(m => m.iconUrl)),
            destinationString,
            JSON.stringify([
              myDestination.location.lng,
              myDestination.location.lat
            ]),
            `${myDestination.categories[0].icon.prefix}32${myDestination.categories[0].icon.suffix}`,
            authData.id
          ],
          (err, results, fields) => {
            if (err) throw err;
          }
        );
        res.json(maneuvers);
      } catch (err) {
        res.status(404).json({ success: false });
      }
    }
  });
});

router.get("/trips", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      connection.query(
        "SELECT startingLocation, directions, destination, trips.id, trips.createdAt FROM trips INNER JOIN users ON trips.userId = users.id WHERE trips.userId = ? ORDER BY trips.createdAt DESC",
        [authData.id],
        (err, results, fields) => {
          if (err) {
            throw err;
          } else {
            res.json(results);
          }
        }
      );
    }
  });
});

module.exports = router;
