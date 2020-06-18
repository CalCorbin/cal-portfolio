const { pathType } = require('../util/Element.js');

const constructionSignPageLocators = {
  greetingParagraph: {
    path: pathType.css,
    locator: 'div[data-testid="construction-sign"]',
  },
};

module.exports = {
  constructionSignPageLocators,
};
