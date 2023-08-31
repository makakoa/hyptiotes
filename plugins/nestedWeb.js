module.exports = {
  test: item => Array.isArray(item) && typeof item[0] === "string" && item[0][0] === ":",
  hook: ({item, parent}) => {
    const nested = hyptiotes.spinWeb(item);
    if (nested) parent.appendChild(nested);
  }
}