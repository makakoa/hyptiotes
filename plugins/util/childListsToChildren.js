module.exports = {
  test: (item) =>
    Array.isArray(item) &&
    (typeof item[0] !== "string" || item[0][0] !== ":"),
  handler: ({ item, parent, hyptiotes }) => {
    item.forEach((i) => {
      parent.children.push(hyptiotes.mapItem(i, parent, hyptiotes));
    });
  },
};