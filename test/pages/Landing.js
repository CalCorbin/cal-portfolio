const WebElement = require('../util/Element.js');
const { withErrorHandling } = require('../util/errorHandler.js');
const { landingPageLocators } = require('../selectors/locators.js');

function create({ driver }) {
  const my = {
    webElement: null,
  };

  const that = {
    loadPage,
  };

  async function loadPage() {
    return withErrorHandling(async () => {
      await driver.sleep(1000); // Avoids weird timing issues
      await my.webElement.loadEntireElement(landingPageLocators.landingNavigationMenu);
    }, loadPage);
  }

  function _init() {
    my.driver = driver;
    my.webElement = WebElement.create({ driver: my.driver });
  }

  _init();

  return that;
}

module.exports = { create };
