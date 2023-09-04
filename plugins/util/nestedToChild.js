module.exports = {
  test: (item) =>
    Array.isArray(item) && typeof item[0] === "string" && item[0][0] === ":",
  handler: ({ item, parent, hyptiotes }) => {
    const nested = hyptiotes.castWeb(item);
    if (nested) parent.children.push(nested);
  },
};