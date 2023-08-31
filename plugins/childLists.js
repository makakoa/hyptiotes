module.exports = {
  test: item => Array.isArray(item) && (typeof item[0] !== "string" || item[0][0] !== ":"),
  hook: ({item, parent}) => {
    item.forEach(i => {
      const child = typeof i === "string" ? document.createTextNode(item) : hyptiotes.spinWeb(i);
      parent.appendChild(child);
    });
  }
}