var React = require("react");

DevModeUtils = require("./DevModeUtils.js");

var CommonTool = React.createClass({
  randomize() {
    $("#barcodex").val(DevModeUtils.makeid());
  },

  loginInstant() {
    $("#username").val("admin");
    $("#password").val("apj0702");
    $("#loginBtn").trigger("click");
  },
  scan() {
    var Data = JSON.stringify({
      event_name: "process_barcode",
      event_data: { barcode: $("#barcodex").val() },
      source: "ui"
    });
    var CallBack = function(response) {
      console.log("gut response " + response.status);
    };
    postUrl(DevModeUtils.getSeatEndpoint(), Data, CallBack);
  },

  render() {
    return (
      <div className="toolcontent">
        <div className="toolLine">
          <input
            type="text"
            id="barcodex"
            defaultValue="Click on Randomize.."
          />
          <input
            type="button"
            defaultValue="Randomize"
            className="devtoolBtn"
            id="randBtn"
            onClick={this.randomize}
          />
          <input
            type="button"
            defaultValue="Scan"
            className="devtoolBtn"
            id="scanBtn"
            onClick={this.scan}
          />
        </div>
        <br/>
        <div className="toolLine">
        <input className = "fullwidth" type="text" defaultValue="null" id="tokenText" />
        <input
          type="button"
          defaultValue="GetAuthToken"
          className="devtoolBtn fullwidth"
          id="getToken"
          onClick={DevModeUtils.getAuthToken}
        />
        <br/><br/>
        <input
          type="button"
          className="devtoolBtn fullwidth"
          defaultValue="Login Instantly"
          id="loginInstant"
          onClick={this.loginInstant}
        />
        </div>
        <br />
      </div>
    );
  }
});
module.exports = CommonTool;
