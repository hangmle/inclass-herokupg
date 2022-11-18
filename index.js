// Add required packages
const express = require("express");
const app = express();

require('dotenv').config();

// Set up EJS
app.set("view engine", "ejs");

// Add database package and connection string (can remove ssl)
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.CRUNCHY_DATABASE_URL,   // make a new Pool and connect to psql
  ssl: {
    rejectUnauthorized: false
  }
});

// // Setup routes
// app.get("/", (req, res) => {
//   //res.send ("Hello world...");
//   res.render("index");
// });

// Start listener
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started (http://localhost:3000/) !");
});

app.get("/", (req, res) => {
  //res.send ("Hello world...");
  const sql = "SELECT * FROM PRODUCT ORDER BY PROD_ID";
  pool.query(sql, [], (err, result) => {
    var message = "";
    var model = {};
    if (err) {
      message = `Error - ${err.message}`;
    } else {
      message = "success";
      model = result.rows;
    };
    res.render("index", {
      message: message,
      model: model
    });
  });
});

