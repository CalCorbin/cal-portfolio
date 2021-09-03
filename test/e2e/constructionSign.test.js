const chromeDriver = require('../util/chrome')
const { recordTestFailure } = require('../util/errorHandler')
const ConstructionSignPage = require('../pages/ConstructionSign')
const testUrl = require('../util/testingUrls')
const DEFAULTS = require('../constants/defaults')

let driver
let constructionSignPage

describe('Cals Portfolio construction page test', function () {
    this.timeout(DEFAULTS.TEST_TIMEOUT)
    beforeEach(async () => {
        driver = await chromeDriver.createDriver()
        constructionSignPage = await ConstructionSignPage.create({ driver })
        await driver.get(testUrl.host)
        await driver.manage().window().setRect({
            width: DEFAULTS.BROWSER_WIDTH,
            height: DEFAULTS.BROWSER_HEIGHT,
        })
    })
    afterEach(async function () {
        if (this.currentTest.state === 'failed') {
            const testTitle = this.currentTest.title
            await recordTestFailure({
                driver,
                fileTitle: testTitle,
            })
        }
        await driver.quit()
    })
    it.skip('Should load construction sign page', async () => {
        await constructionSignPage.loadPage()
    })
})
