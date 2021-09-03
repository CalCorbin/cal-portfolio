const chrome = require('selenium-webdriver/chrome')
const { Builder, logging } = require('selenium-webdriver')

const chromeLogs = new logging.Preferences()
chromeLogs.setLevel(logging.Type.BROWSER, logging.Level.SEVERE)

const chromeOptions = new chrome.Options()
if (!process.argv.includes('--browser')) {
  chromeOptions.addArguments('--headless')
  chromeOptions.addArguments('--window-size=411x869')
}

function createDriver() {
  return new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build()
}

const that = {
  chromeOptions,
  createDriver,
}

module.exports = that
