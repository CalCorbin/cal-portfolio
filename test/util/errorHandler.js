/* eslint no-console: 0 */
const { logging } = require('selenium-webdriver')
const fs = require('fs')

const logDirectory = './seleniumLogs'
const screenshotDir = `${logDirectory}/screenshots`
const consoleLogDir = `${logDirectory}/consoleLogs`

function checkDirectorySync(directory) {
  try {
    fs.statSync(directory)
  } catch (e) {
    fs.mkdirSync(directory)
  }
}

// Create the logging directories for the selenium tests
try {
  if (!fs.existsSync(logDirectory)) {
    checkDirectorySync(logDirectory)
  }
  if (!fs.existsSync(screenshotDir)) {
    checkDirectorySync(screenshotDir)
  }
  if (!fs.existsSync(consoleLogDir)) {
    checkDirectorySync(consoleLogDir)
  }
} catch (e) {
  if (e.code !== 'EEXIST') throw e
}

async function recordFailureScreenshot({ driver, fileTitle = `screenshot ${Date.now()}` }) {
  await driver.takeScreenshot().then((base64png) => {
    fs.writeFileSync(`./seleniumLogs/screenshots/failed- ${fileTitle}.png`, Buffer.from(base64png, 'base64'))
  })
}

async function recordBrowserLogs({ driver, fileTitle = `consoleLogs ${Date.now()}` }) {
  await driver
    .manage()
    .logs()
    .get(logging.Type.BROWSER)
    .then((entries) => {
      fs.writeFileSync(`./seleniumLogs/consoleLogs/failed- ${fileTitle}.json`, JSON.stringify(entries, null, 2))
    })
}

async function recordTestFailure({ driver, fileTitle }) {
  await recordFailureScreenshot({ driver, fileTitle })
  await recordBrowserLogs({ driver, fileTitle })
}

async function withErrorHandling(runFunction, functionName) {
  try {
    await runFunction()
  } catch (e) {
    console.trace('\x1b[31m', functionName)
    console.table({
      'Selenium Error': `${e.name} ${e.message}`,
    })
    throw e
  }
}

module.exports = { withErrorHandling, recordTestFailure }
