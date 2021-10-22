const { pathType } = require('../util/Element');

const constructionSignPageLocators = {
  greetingParagraph: {
    path: pathType.css,
    locator: 'div[data-testid="construction-sign"]',
  },
};

const landingPageLocators = {
  landingNavigationMenu: {
    locator: 'div[data-testid="landing-container"]',
  },
};

module.exports = {
  constructionSignPageLocators,
  landingPageLocators,
};
