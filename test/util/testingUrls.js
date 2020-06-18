const buildName = process.env.TESTENV;

const host = buildName
  ? `https://${buildName}`
  : 'http://localhost:3000';

module.exports = {
  host,
};
