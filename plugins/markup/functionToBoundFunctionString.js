let functionLUID = 0;
module.exports = {
  test: (_, value) => typeof value === "function",
  handler: ({ key, value, parent }) => {
    let handlerName = "_hyptiotes_handler_" + functionLUID++;
    window.handlerName = value;
    parent.attributes[key] = handlerName + "()";
  },
};