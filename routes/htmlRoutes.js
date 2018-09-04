module.exports = function(app){
  app.get("/", function(req, res) {
    res.render("index");
  });
  app.get("/company", function(req, res) {
    res.render("company");
  });

}


