const chromeDriver = require('../util/chrome.js');
const { recordTestFailure } = require('../util/errorHandler.js');
const ConstructionSignPage = require('../pages/ConstructionSign.js');
const testUrl = require('../util/testingUrls.js');
const DEFAULTS = require('../constants/defaults.js');

let driver;
let constructionSignPage;

describe('Cals Portfolio construction page test', function () {
  this.timeout(DEFAULTS.TEST_TIMEOUT);
  beforeEach(async () => {
    driver = await chromeDriver.createDriver();
    constructionSignPage = await ConstructionSignPage.create({ driver });
    await driver.get(testUrl.host);
    await driver
      .manage()
      .window()
      .setRect({ width: DEFAULTS.BROWSER_WIDTH, height: DEFAULTS.BROWSER_HEIGHT });
  });
  afterEach(async function () {
    if (this.currentTest.state === 'failed') {
      const testTitle = this.currentTest.title;
      await recordTestFailure({
        driver,
        fileTitle: testTitle,
      });
    }
    await driver.quit();
  });
  it('Should load construction sign page', async () => {
    await constructionSignPage.loadPage();
  });
});
