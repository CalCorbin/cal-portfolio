const { By, until } = require('selenium-webdriver')

const pathType = {
  id: By.id,
  css: By.css,
  xpath: By.xpath,
}

function create({ driver }) {
  const my = {
    driver: null,
  }

  const that = {
    checkElementText,
    clickElement,
    loadEntireElement,
    setInput,
  }

  async function checkElementText({ path = pathType.css, locator }, elementText) {
    const element = await my.driver.findElement(path(locator))
    const textReceived = await my.driver.findElement(path(locator)).getText()
    try {
      await my.driver.wait(until.elementTextIs(element, `${elementText}`), 5000)
    } catch (e) {
      throw new Error(`Expected '${elementText}' but instead got '${textReceived}'`)
    }
  }

  async function clickElement({ path = pathType.css, locator }) {
    const element = await my.driver.findElement(path(locator))
    await element.click()
  }

  async function loadEntireElement({ path = pathType.css, locator }) {
    await my.driver.wait(until.elementLocated(path(locator)), 5000)
    const element = await my.driver.findElement(path(locator))
    await my.driver.wait(until.elementIsVisible(element), 5000)
  }

  async function setInput({ path = pathType.css, locator }, keys) {
    const element = await my.driver.findElement(path(locator))
    await element.click()
    await element.clear()
    await element.sendKeys(`${keys}`)
  }

  function _init() {
    my.driver = driver
  }

  _init()

  return that
}

module.exports = { pathType, create }
