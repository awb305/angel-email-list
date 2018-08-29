const mongoose = require('mongoose');

let companySchema = new mongoose.Schema({
  company: String,
  description: String,
  joined: String,
  location: String,
  market: String,
  website: String,
  employees: String,
  stage: String,
  totalRaised: String,
  emails: Object,
  dateCrawled: Date
});

let Company = mongoose.model('Company', companySchema);

module.exports = Company;