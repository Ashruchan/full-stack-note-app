const express = require("express");
const path = require("path");
const homeRouter = require("./routes/Noteshomeroutes");
const deleteRouter = require("./routes/Notesdeletepage");
const creatnotesRouter = require("./routes/creatNotes");
const viewnotesRouter = require("./routes/viewNotes");
const {mongoConnect} = require("./utils/databaseutil");
const { log } = require("console");

const app = express();

// EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Parse form body for POST requests
app.use(express.urlencoded({ extended: true }));

// Home page routes
app.use("/", homeRouter);

// Delete page route
app.use("/", deleteRouter);

//creatnotes page rout
app.use("/", creatnotesRouter);

//viewnotes page rout
app.use("/", viewnotesRouter);

mongoConnect((client) => {
  app.listen(3000, () => {
    console.log("the server is running on http://localhost:3000 \nhttp://100.99.248.58:3000");
  });
});
