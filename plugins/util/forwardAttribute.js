module.exports = {
  test: () => true,
  handler: ({ key, value, parent }) => {
    parent.attributes[key] = value;
  },
};