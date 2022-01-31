const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const db = require("./config/db").default;
const path = require("path");
const parentDirectory = __dirname;
const app = express();

require("dotenv").config();
db();
app.use(express.static(path.join(parentDirectory, "/uploads/")));
app.use("/public", express.static(path.join(parentDirectory, "/public/")));
app.use(
  "/static",
  express.static(path.join(parentDirectory, "/public/static"))
);

app.use(
  "/public-admin-panel",
  express.static(path.join(parentDirectory, "/admin-panel/"))
);
app.use(
  "/static-admin-panel",
  express.static(path.join(parentDirectory, "/admin-panel/static"))
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use("/", require("./routes/"));

/* GET home page. */
app.get("/admin-panel", function (req, res) {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.sendFile(path.join(parentDirectory, "/admin-panel/index.html"));
});

app.get("/*", function (req, res) {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.sendFile(path.join(parentDirectory, "/public/index.html"));
});
const PORT = process.env.PORT || 4000;

const server = http.createServer(app);
server.listen(PORT, console.log(`listening on ${PORT}`));
