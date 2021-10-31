const { pathType } = require('../util/Element');

const constructionSignPageLocators = {
  greetingParagraph: {
    path: pathType.css,
    locator: 'div[data-testid="construction-sign"]',
  },
};

const landingPageLocators = {
  landingNavigationMenu: {
    locator: 'div[data-testid="landing-page"]',
  },
};

module.exports = {
  constructionSignPageLocators,
  landingPageLocators,
};
