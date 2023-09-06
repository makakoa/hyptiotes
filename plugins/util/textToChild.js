module.exports = {
  test: (item) => typeof item === "string",
  handler: ({ item, parent }) => {
    parent.children.push(item);
  },
};