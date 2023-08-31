module.exports = {
  test: (_, value) => typeof value === "function",
  handler: ({key, value, parent}) => {
    parent[key] = value;
  }
};