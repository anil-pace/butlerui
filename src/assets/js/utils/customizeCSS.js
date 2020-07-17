var React = require("react")

var receiveCustomiseJSX = (clientSpecificJSX) => {
  const isValid = clientSpecificJSX && React.isValidElement(clientSpecificJSX)

  if (isValid && clientSpecificJSX) {
    return { customJSX: true, clientSpecificJSX: clientSpecificJSX }
  } else {
    return { customJSX: false }
  }
}

module.exports = receiveCustomiseJSX
