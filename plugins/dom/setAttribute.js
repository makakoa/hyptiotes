module.exports = {
  test: () => true,
  handler: ({key, value, parent}) => {
    parent.setAttribute(key, value);
  }
};