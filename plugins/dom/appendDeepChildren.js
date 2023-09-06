module.exports = {
  test: item => Array.isArray(item) && (typeof item[0] !== "string" || item[0][0] !== ":"),
  handler: ({item, parent, hyptiotes}) => {
    item.forEach(i => {
      const child = typeof i === "string" ? document.createTextNode(item) : hyptiotes.castWeb(i);
      parent.appendChild(child);
    });
  }
}