var mongojs = require("mongojs");
var mongoose = require("mongoose");

var databaseUrl = "angel";
var collections = ["companies"];

// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});

module.exports = function(app){
  // 2. At the "/all" path, display every entry in the animals collection
  /* app.get("/all", function(req, res) {
    // Query: In our database, go to the animals collection, then "find" everything
    db.companies.find({ $where: "this.emails.length > 1" }, function(error, found) {
      // Log any errors if the server encounters one
      if (error) {
        console.log(error);
      }
      // Otherwise, send the result of this query to the browser
      else {
        res.json(found);
      }
    });
  }); */



}


