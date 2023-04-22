// path: app/src/app.js
const express = require("express");
const session = require("express-session");

const { v4: uuidv4 } = require("uuid");

const sessionSecret = uuidv4();
const routes = require("./routes");
const path = require("path");
const app = express();

process.env.SESSION_SECRET = sessionSecret;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);
app.use(express.static(path.join(__dirname, "../public")));

app.listen(8888, () => {
  console.log("Server is running on port 8888");
});
