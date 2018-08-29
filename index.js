const puppeteer = require('puppeteer');
const CREDS = require('./creds');
//const mongoose = require('mongoose');
//const User = require('./models/user');

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

  const COMPANY_SELECTOR =
    '#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(INDEX) > div > div.company.column > div > div.text > div.name > a';
  const DESCRIPTION_SELECTOR =
    '#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(INDEX) > div > div.company.column > div > div.text > div.pitch';
  const JOINED_SELECTOR =
    '#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(INDEX) > div > div.column.joined.selected > div.value';
  const LOCATION_SELECTOR =
    '#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(INDEX) > div > div.column.location > div.value > div > a';
  const MARKET_SELECTOR =
    '#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(INDEX) > div > div.column.market > div.value > div > a';
  const WEBSITE_SELECTOR =
    '#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(INDEX) > div > div.column.website > div.value > div > a';
  const EMPLOYEES_SELECTOR =
    '#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(INDEX) > div > div.column.company_size > div.value';
  const STAGE_SELECTOR =
    '#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(INDEX) > div > div.column.stage > div.value';
  const TOTAL_RAISED_SELECTOR =
    '#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(INDEX) > div > div.column.raised > div.value';

  const LENGTH_SELECTOR_CLASS =
    '#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div:nth-child(2)';

  let MORE_BUTTON_SELECTOR =
    '#root > div.page.unmodified.dl85.layouts.fhr17.header._a._jm > div.companies.dc59.fix36._a._jm > div > div.content > div.dc59.frs86._a._jm > div.results > div.more';

  // clicks the "more" button allowing us to see all the different companies.
  let numPages = await getNumPages(page);
  console.log('Numpages: ', numPages);
  for (let i = 0; i < 3; i++) {
    await page.click(MORE_BUTTON_SELECTOR);
    MORE_BUTTON_SELECTOR = MORE_BUTTON_SELECTOR.replace(
      'div.more',
      'div.dc59.frs86._a._jm > div > div.more'
    );
    await page.waitFor(1.5 * 1000);
  }

  // you could set a limit of how many companies you want to contact, currently i have 15

  for (let i = 2; i <= 15; i++) {
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
      return document.querySelector(sel).innerHTML.trim();
    }, companySelector);

    let description = await page.evaluate(sel => {
      return document.querySelector(sel).innerHTML.trim();
    }, descriptionSelector);

    let joined = await page.evaluate(sel => {
      return document.querySelector(sel).innerHTML.trim();
    }, joinedSelector);

    let location = await page.evaluate(sel => {
      let element = document.querySelector(sel);
      return element ? element.innerHTML.trim() : null;
    }, locationSelector);

    if (!location) continue;

    let market = await page.evaluate(sel => {
      let element = document.querySelector(sel);
      return element ? element.innerHTML.trim() : null;
    }, marketSelector);

    if (!market) continue;

    let website = await page.evaluate(sel => {
      let element = document.querySelector(sel);
      return element ? element.innerHTML.trim() : null;
    }, websiteSelector);

    if (!website) continue;

    let employees = await page.evaluate(sel => {
      let element = document.querySelector(sel);
      return element ? element.innerHTML.trim() : null;
    }, employeesSelector);

    if (!employees) continue;

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

    let totalRaised = await page.evaluate(sel => {
      let element = document.querySelector(sel);
      return element ? element.innerHTML.trim() : null;
    }, totalRaisedSelector);

    if (!totalRaised) continue;

    let companyInfo = {
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

    console.log(companyInfo);

    //console.log(company, description, joined, location, market, website, employees, stage, totalRaised);
  }

  /* let username = await page.evaluate((sel) => {
    return document.querySelector(sel).getAttribute('href').replace('/', '');
  }, usernameSelector);

  let email = await page.evaluate((sel) => {
    let element = document.querySelector(sel);
    return element ? element.innerHTML : null;
  }, emailSelector);

  // not all users have emails visible
  if (!email)
    continue;
 */

  // TODO save this user
}

/*

  const userToSearch = 'john';
  const searchUrl = `https://github.com/search?q=${userToSearch}&type=Users&utf8=%E2%9C%93`;

  await page.goto(searchUrl);
  await page.waitFor(2 * 1000);

  // const LIST_USERNAME_SELECTOR = '#user_search_results > div.user-list > div:nth-child(1) > div.d-flex > div > a';
  const LIST_USERNAME_SELECTOR = '#user_search_results > div.user-list > div:nth-child(INDEX) > div.d-flex > div > a';
  // const LIST_EMAIL_SELECTOR = '#user_search_results > div.user-list > div:nth-child(2) > div.d-flex > div > ul > li:nth-child(2) > a';
  const LIST_EMAIL_SELECTOR = '#user_search_results > div.user-list > div:nth-child(INDEX) > div.d-flex > div > ul > li:nth-child(2) > a';

  const LENGTH_SELECTOR_CLASS = 'user-list-item';

  let numPages = await getNumPages(page);

  console.log('Numpages: ', numPages);


  /// make page number 10 so we don't have abuse detection. I might want to add in a set timeout or two

  numPages = 10

  for (let h = 1; h <= numPages; h++) {

    let pageUrl = searchUrl + '&p=' + h;

    await page.goto(pageUrl);

    let listLength = await page.evaluate((sel) => {
      return document.getElementsByClassName(sel).length;
    }, LENGTH_SELECTOR_CLASS);

    for (let i = 1; i <= listLength; i++) {
      // change the index to the next child
      let usernameSelector = LIST_USERNAME_SELECTOR.replace("INDEX", i);
      let emailSelector = LIST_EMAIL_SELECTOR.replace("INDEX", i);

      let username = await page.evaluate((sel) => {
        return document.querySelector(sel).getAttribute('href').replace('/', '');
      }, usernameSelector);

      let email = await page.evaluate((sel) => {
        let element = document.querySelector(sel);
        return element ? element.innerHTML : null;
      }, emailSelector);

      // not all users have emails visible
      if (!email)
        continue;

      console.log(username, ' -> ', email);

      // TODO save this users
      upsertUser({
        username: username,
        email: email,
        dateCrawled: new Date()
      });


    }
  }*/
//};

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
/*
function upsertUser(userObj) {

  const DB_URL = 'mongodb://localhost/thal';

  if (mongoose.connection.readyState == 0) {
    mongoose.connect(DB_URL);
  }

  // if this email exists, update the entry, don't insert
  let conditions = {
    email: userObj.email
  };
  let options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
  };

  User.findOneAndUpdate(conditions, userObj, options, (err, result) => {
    if (err) throw err;
  });
} */