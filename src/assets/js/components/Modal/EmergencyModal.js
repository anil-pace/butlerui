var React = require('react');
var Button1 = require("../Button/Button")
var appConstants = require("../../constants/appConstants")

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
                    <div style={{"color": "red", "fontWeight": "bold"}}>{this.props.bodyContent}</div>
                    <div>{this.props.bodySubcontent}</div>
                    <div>{this.props.bodyAction}</div>
                </div>
                {this.props.actionTobetaken && 
                  <div style={{"float": "right", "margin": "0 20px 20px 0"}}>
                    <Button1
                    disabled={false}
                    text={_("OK")}
                    color={"orange"}
                    module={appConstants.PUT_BACK}
                    action={appConstants.DECLINE_CANCEL_INVOICE
                    }
                  />
                </div>
                }
          </div>
        </div>
      </div>
    )
  }
});

module.exports = ModalEmergency;