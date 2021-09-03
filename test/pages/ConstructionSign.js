const WebElement = require('../util/Element')
const { withErrorHandling } = require('../util/errorHandler')
const { constructionSignPageLocators } = require('../selectors/locators')

function create({ driver }) {
    const my = {
        webElement: null,
    }

    const that = {
        loadPage,
    }

    async function loadPage() {
        return withErrorHandling(async () => {
            await driver.sleep(1000) // Avoids weird timing issues
            await my.webElement.loadEntireElement(
                constructionSignPageLocators.greetingParagraph
            )
        }, loadPage)
    }

    function _init() {
        my.driver = driver
        my.webElement = WebElement.create({ driver: my.driver })
    }

    _init()

    return that
}

module.exports = { create }
