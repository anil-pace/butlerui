var React = require('react');
var ModalHeader = require("./ModalHeader")

var ModalEmergency = React.createClass({
  render: function () {
    return (
            <div style={{"display" :"block", "zIndex": 9999}} className="modal">
            <div id="emergencyOverlay" className="emergencyOverlay"> </div>
            <div className="modal-dialog">
            <div className="modal-content">
                <div style={{"background" : "transparent"}} className="modal-header">
                    <div style={{"float" : "left", "padding" :"1em 1em 0em 2em"}}>
                      <img 
                        src={"./assets/images/alert_icon.png"}
                        height="70px"
                        width="70px"
                      />
                    </div>
                    <div style={{"color" : "red", "fontWeight": "bold"}} className="modal-title">
                        {this.props.title}
                    </div>
                </div>
                <div style={{"fontSize":"1.5em"}} className="modal-body">
                    <div style={{"color": "red", "fontWeight": "bold"}}>Butler operations have been halted.</div>
                    <div> Please wait for the operation to resume or contact your supervisor for further steps.</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = ModalEmergency;