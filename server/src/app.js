// path: app/src/app.js
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const path = require("path");
const app = express();

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);
app.use(express.static(path.join(__dirname, "../public")));

app.listen(8888, () => {
  console.log("Server is running on port 8888");
});
