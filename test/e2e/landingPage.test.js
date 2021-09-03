const chromeDriver = require('../util/chrome')
const { recordTestFailure } = require('../util/errorHandler')
const LandingPage = require('../pages/Landing')
const testUrl = require('../util/testingUrls')
const DEFAULTS = require('../constants/defaults')

let driver
let landingPage

describe('Cals Portfolio landing page test', function () {
    this.timeout(DEFAULTS.TEST_TIMEOUT)
    beforeEach(async () => {
        driver = await chromeDriver.createDriver()
        landingPage = await LandingPage.create({ driver })
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
    it('Should load landing page', async () => {
        await landingPage.loadPage()
    })
})
