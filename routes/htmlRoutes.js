var mongojs = require("mongojs");
var mongoose = require("mongoose");


/* var databaseUrl = "angel";
var collections = ["companies"];

// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});
 */

var db = require("../models")


module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/company", function (req, res) {
    db.companies.findOne({},
      function (error, found) {
        if (error) {
          console.log(error);
        } else {
          res.render("companyRow", {
            company: found.company,
            description: found.description,
            website: found.website,
            location: found.location,
            totalRaised: found.totalRaised,
            dateCrawled: found.dateCrawled,
            emails: found.emails

          })
        }
      });
  });

  app.get("/all-companies", function (req, res) {
    // Query: In our database, go to the animals collection, then "find" everything
    db.companies.find({
      $where: "this.emails.length > 1"
    }, function (error, found) {
      // Log any errors if the server encounters one
      if (error) {
        console.log(error);
      }
      // Otherwise, send the result of this query to the browser
      else {
        res.render("companyRow", {
          companyDetails: found
        });
      }
    });
  });

}