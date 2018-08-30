const puppeteer = require('puppeteer');
const CREDS = require('./creds');
const mongoose = require('mongoose');
const Company = require('./models/company');
let axios = require('axios');

async function run() {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  await page.goto('https://angel.co/login');
  await page.screenshot({
    path: 'screenshots/angel.png'
  });

  const USERNAME_SELECTOR = '#user_email';
  const PASSWORD_SELECTOR = '#user_password';
  const BUTTON_SELECTOR = '#new_user > div:nth-child(6) > input';

  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(CREDS.username);

  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.password);

  await page.click(BUTTON_SELECTOR);

  await page.waitForNavigation();

  const companiesUrl = 'https://angel.co/companies';

  await page.goto(companiesUrl);
  await page.waitFor(2 * 1000);

  const searchQuery = {
    min: 100000,
    max: 1000000,
    stage: 'Seed'
  };

  const searchUrl = `https://angel.co/companies?raised[min]=${
    searchQuery.min
  }&raised[max]=${searchQuery.max}&signal[min]=0&signal[max]=10&stage=${
    searchQuery.stage
  }`;
  await page.goto(searchUrl);
  await page.waitFor(2 * 1000);
  await page.setViewport({
    width: 2500,
    height: 800
  });

  const DATE_FILTER =
    '#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(1) > div > div.column.joined.sortable';

  await page.click(DATE_FILTER);
  await page.waitFor(4 * 1000);

  let COMPANY_SELECTOR =
    '#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(INDEX) > div > div.company.column > div > div.text > div.name > a';
  //#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(2) > div > div.company.column > div > div.text > div.name > a  
  //#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div.dc59.frs86._a._jm > div > div:nth-child(1) > div > div.company.column > div > div.text > div.name > a
  //#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div.dc59.frs86._a._jm > div > div.dc59.frs86._a._jm > div > div:nth-child(1) > div > div.company.column > div > div.text > div.name > a


  //#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(INDEX) > div > div.company.column > div > div.text > div.name > a

  //#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(21) > div > div.company.column > div > div.text > div.name > a
  //#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div.dc59.frs86._a._jm > div > div:nth-child(1) > div > div.company.column > div > div.text > div.name > a

  //#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div.dc59.frs86._a._jm > div > div:nth-child(2) > div > div.company.column > div > div.text > div.name > a
  //#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div.dc59.frs86._a._jm > div > div.dc59.frs86._a._jm > div > div.dc59.frs86._a._jm > div > div.dc59.frs86._a._jm > div > div.dc59.frs86._a._jm > div > div.dc59.frs86._a._jm > div > div.dc59.frs86._a._jm > div > div.more

  //#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div.dc59.frs86._a._jm > div > div.dc59.frs86._a._jm > div > div.dc59.frs86._a._jm > div > div:nth-child(20) > div > div.company.column > div > div.text > div.name > a
  //#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div.dc59.frs86._a._jm > div > div.dc59.frs86._a._jm > div > div.dc59.frs86._a._jm > div > div.dc59.frs86._a._jm > div > div:nth-child(1) > div > div.company.column > div > div.text > div.name > a

  //#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div.dc59.frs86._a._jm > div > div.dc59.frs86._a._jm > div > div.dc59.frs86._a._jm > div > div.dc59.frs86._a._jm > div > div:nth-child(20) > div > div.company.column > div > div.text > div.name > a
  //#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div.dc59.frs86._a._jm > div > div.dc59.frs86._a._jm > div > div.dc59.frs86._a._jm > div > div.dc59.frs86._a._jm > div > div.dc59.frs86._a._jm > div > div:nth-child(1) > div > div.company.column > div > div.text > div.name > a
  //#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(21) > div > div.company.column > div > div.text > div.name > a
  //#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div.dc59.frs86._a._jm > div > div:nth-child(1) > div > div.company.column > div > div.text > div.name > a



  let DESCRIPTION_SELECTOR =
    '#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(INDEX) > div > div.company.column > div > div.text > div.pitch';

  //#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(INDEX) > div > div.company.column > div > div.text > div.pitch
  //#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div.dc59.frs86._a._jm > div > div:nth-child(1) > div > div.company.column > div > div.text > div.pitch
  //#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div.dc59.frs86._a._jm > div > div.dc59.frs86._a._jm > div > div:nth-child(1) > div > div.company.column > div > div.text > div.pitch


  let JOINED_SELECTOR =
    '#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(INDEX) > div > div.column.joined.selected > div.value';

  //#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(INDEX) > div > div.column.joined.selected > div.value
  //#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div.dc59.frs86._a._jm > div > div:nth-child(1) > div > div.column.joined.selected > div.value
  //#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div.dc59.frs86._a._jm > div > div.dc59.frs86._a._jm > div > div:nth-child(1) > div > div.column.joined.selected > div.value

  let LOCATION_SELECTOR =
    '#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(INDEX) > div > div.column.location > div.value > div > a';
  let MARKET_SELECTOR =
    '#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(INDEX) > div > div.column.market > div.value > div > a';
  let WEBSITE_SELECTOR =
    '#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(INDEX) > div > div.column.website > div.value > div > a';
  let EMPLOYEES_SELECTOR =
    '#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(INDEX) > div > div.column.company_size > div.value';
  let STAGE_SELECTOR =
    '#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(INDEX) > div > div.column.stage > div.value';
  let TOTAL_RAISED_SELECTOR =
    '#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(INDEX) > div > div.column.raised > div.value';

  let LENGTH_SELECTOR_CLASS =
    '#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(2)';

  let MORE_BUTTON_SELECTOR =
    '#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div.more';





  // clicks the "more" button allowing us to see all the different companies.
  let numPages = await getNumPages(page);
  console.log('Numpages: ', numPages);
  for (let i = 0; i < 10; i++) {
    await page.click(MORE_BUTTON_SELECTOR);
    MORE_BUTTON_SELECTOR = MORE_BUTTON_SELECTOR.replace(
      'div.more',
      'div.dc59.frs86._a._jm > div > div.more'
    );
    await page.waitFor(4 * 1000);
  }

  for (let h = 0; h <= 5; h++) {

    console.log("h", h)

    if (h > 0) {
      /* COMPANY_SELECTOR.replace('div:nth-child(INDEX) > div > div.company.column > div > div.text > div.name > a','div.dc59.frs86._a._jm > div > div:nth-child(INDEX) > div > div.company.column > div > div.text > div.name > a');
      DESCRIPTION_SELECTOR.replace('div:nth-child(INDEX) > div > div.company.column > div > div.text > div.pitch', 'div.dc59.frs86._a._jm > div > div:nth-child(INDEX) > div > div.company.column > div > div.text > div.pitch');
      JOINED_SELECTOR.replace('') */

      COMPANY_SELECTOR = COMPANY_SELECTOR.replace('div:nth-child(INDEX)', 'div.dc59.frs86._a._jm > div > div:nth-child(INDEX)');
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", COMPANY_SELECTOR);
      DESCRIPTION_SELECTOR = DESCRIPTION_SELECTOR.replace('div:nth-child(INDEX)', 'div.dc59.frs86._a._jm > div > div:nth-child(INDEX)');
      JOINED_SELECTOR = JOINED_SELECTOR.replace('div:nth-child(INDEX)', 'div.dc59.frs86._a._jm > div > div:nth-child(INDEX)');
      LOCATION_SELECTOR = LOCATION_SELECTOR.replace('div:nth-child(INDEX)', 'div.dc59.frs86._a._jm > div > div:nth-child(INDEX)');
      MARKET_SELECTOR = MARKET_SELECTOR.replace('div:nth-child(INDEX)', 'div.dc59.frs86._a._jm > div > div:nth-child(INDEX)');
      WEBSITE_SELECTOR = WEBSITE_SELECTOR.replace('div:nth-child(INDEX)', 'div.dc59.frs86._a._jm > div > div:nth-child(INDEX)');
      EMPLOYEES_SELECTOR = EMPLOYEES_SELECTOR.replace('div:nth-child(INDEX)', 'div.dc59.frs86._a._jm > div > div:nth-child(INDEX)');
      STAGE_SELECTOR = STAGE_SELECTOR.replace('div:nth-child(INDEX)', 'div.dc59.frs86._a._jm > div > div:nth-child(INDEX)');
      TOTAL_RAISED_SELECTOR = TOTAL_RAISED_SELECTOR.replace('div:nth-child(INDEX)', 'div.dc59.frs86._a._jm > div > div:nth-child(INDEX)');


    }

    let x = 0;

    // you could set a limit of how many companies you want to contact, currently i have 15

    for (let i = 1; i <= 20; i++) {

      //handeling for that first annoying batch

      if (h === 0 && i === 1) {
        i++;
      }

      if (h === 0 && i === 20 && x === 1) {
        i = 21;
      }


      //every 

      // change the index to the next child
      let companySelector = COMPANY_SELECTOR.replace('INDEX', i);
      let descriptionSelector = DESCRIPTION_SELECTOR.replace('INDEX', i);
      let joinedSelector = JOINED_SELECTOR.replace('INDEX', i);
      let locationSelector = LOCATION_SELECTOR.replace('INDEX', i);
      let marketSelector = MARKET_SELECTOR.replace('INDEX', i);
      let websiteSelector = WEBSITE_SELECTOR.replace('INDEX', i);
      let employeesSelector = EMPLOYEES_SELECTOR.replace('INDEX', i);
      let stageSelector = STAGE_SELECTOR.replace('INDEX', i);
      let totalRaisedSelector = TOTAL_RAISED_SELECTOR.replace('INDEX', i);

      let company = await page.evaluate(sel => {
        let element = document.querySelector(sel);
        return element ? element.innerHTML.trim() : null;
      }, companySelector);

      if (!company) continue;

      console.log(company, i);


      let description = await page.evaluate(sel => {
        let element = document.querySelector(sel);
        return element ? element.innerHTML.trim() : null;
      }, descriptionSelector);

      if (!description) continue;


      console.log(description, i);


      let joined = await page.evaluate(sel => {
        let element = document.querySelector(sel);
        return element ? element.innerHTML.trim() : null;
      }, joinedSelector);

      if (!joined) continue;


      console.log(joined, i);


      let location = await page.evaluate(sel => {
        let element = document.querySelector(sel);
        return element ? element.innerHTML.trim() : null;
      }, locationSelector);

      if (!location) continue;


      console.log(location, i);


      let market = await page.evaluate(sel => {
        let element = document.querySelector(sel);
        return element ? element.innerHTML.trim() : null;
      }, marketSelector);

      if (!market) continue;


      console.log(market, i);


      let website = await page.evaluate(sel => {
        let element = document.querySelector(sel);
        return element ? element.innerHTML.trim() : null;
      }, websiteSelector);

      if (!website) continue;


      console.log(website, i);


      let employees = await page.evaluate(sel => {
        let element = document.querySelector(sel);
        return element ? element.innerHTML.trim() : null;
      }, employeesSelector);

      if (!employees) continue;


      console.log(employees, i);


      let stage = await page.evaluate(sel => {
        let element = document.querySelector(sel);
        return element ? element.innerHTML.trim() : null;
      }, stageSelector);

      if (stage) {
        stage
          .replace('$', '')
          .replace(',', '')
          .trim();
        stage = parseInt(stage);
      } else {
        continue;
      }
      console.log(stage, i);


      let totalRaised = await page.evaluate(sel => {
        let element = document.querySelector(sel);
        return element ? element.innerHTML.trim() : null;
      }, totalRaisedSelector);

      if (!totalRaised) continue;
      console.log(totalRaised, i);


      /* let companyInfo = {
      company: company,
      description: description,
      joined: joined,
      location: location,
      market: market,
      website: website,
      employees: employees,
      stage: stage,
      totalRaised: totalRaised
    };
 */
      //console.log(companyInfo);

      //hunter.io call
      /*  let KEY = '6f4c435764ce159e8c1148cba2183cff27c10cf1';
       let searchUrl = `https://api.hunter.io/v2/domain-search?domain=${website}&api_key=${KEY}`;


       await axios.get(searchUrl)
         .then(function (response) {
           //console.log(response.data.data);
           emails = response.data.data.emails;
         })
         .catch(function (error) {
           // console.log(error);
         })


       upsertCompany({
         company: company,
         description: description,
         joined: joined,
         location: location,
         market: market,
         website: website,
         employees: employees,
         stage: stage,
         totalRaised: totalRaised,
         emails: emails,
         dateCrawled: new Date()
       }) */


      if (h === 0 && i === 20 && x === 0) {
        x = 1;
        i = 19;
      }

    }

  }

}

run();

async function getNumPages(page) {
  const NUM_USER_SELECTOR =
    '#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.top > div.count';

  let inner = await page.evaluate(sel => {
    let html = document.querySelector(sel).innerHTML;

    // format is: "69,803 users"
    return html
      .replace(',', '')
      .replace('Companies', '')
      .trim();
  }, NUM_USER_SELECTOR);

  let numUsers = parseInt(inner);

  console.log('numUsers: ', numUsers);

  let numPages = Math.ceil(numUsers / 20);
  return numPages;
}

function upsertCompany(companyObj) {

  const DB_URL = 'mongodb://localhost/angel';

  if (mongoose.connection.readyState == 0) {
    mongoose.connect(DB_URL);
  }

  // if the website exists don't update the entry
  let conditions = {
    website: companyObj.website
  };
  let options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
  };

  Company.findOneAndUpdate(conditions, companyObj, options, (err, result) => {
    if (err) throw err;
  });
}