var React = require("react")
var SpinnerButler = require("./SpinnerButler")
var mainstore = require("../../stores/mainstore")

function getState() {
  return {
    navMessages: mainstore.getServerMessages()
  }
}

var LoaderButler = React.createClass({
  getInitialState: function () {
    return getState();
  },

  render: function () {
    if (this.props.navMessagesJson) {
      var navMessagesJson = JSON.parse(JSON.stringify(this.props.navMessagesJson));
    }
    if (this.props.serverNavData) {
      var data = JSON.parse(JSON.stringify(this.props.serverNavData));
      var server_message = data.description;
      var errorCode = data.code;
      var message_args = data.details.slice(0); //msu_eta data
    }
    return (
      <div className="loaderButler">
        <div>
          <SpinnerButler />
        </div>
        <div
          style={{
            bottom: "5vh",
            fontSize: "4rem",
            fontWeight: "normal",
            position: "absolute",
            color: "#F36F36"
          }}
        >
          {(function () {
            if (navMessagesJson != undefined) {
              message_args.unshift(navMessagesJson[errorCode]);
              if (message_args[0] == undefined) {
                return server_message;
              } else {
                var header_message = _.apply(null, message_args);
                return header_message;
              }
            }
          }
          )()}
        </div>
      </div>
    )
  }
})

module.exports = LoaderButler
