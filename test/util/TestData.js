function create() {
  const that = { uniqueInputData };

  async function uniqueInputData() {
    const randomString = Math.random()
      .toString(36)
      .substr(2, 5);

    return randomString;
  }

  return that;
}

module.exports = { create };
