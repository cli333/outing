const express = require("express");
const app = express();
const cors = require("cors");
const api = require("./routes/api");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", api);

app.listen(port, () => console.log(`Server listening on port:${port}`));
