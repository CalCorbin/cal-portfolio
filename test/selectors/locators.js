const { pathType } = require('../util/Element.js');

const constructionSignPageLocators = {
  greetingParagraph: {
    path: pathType.css,
    locator: 'div[data-testid="construction-sign"]',
  },
};

const landingPageLocators = {
  landingNavigationMenu: {
    locator: 'div[data-testid="landing-navigation"]',
  },
};

module.exports = {
  constructionSignPageLocators,
  landingPageLocators,
};
