var React = require("react")
var appConstants = require("../../constants/appConstants")
var ActionCreators = require("../../actions/CommonActions")

var FeedbackModal = React.createClass({
  sendFeedback: function (event, feedback) {
    debugger
    console.log(feedback)
    feedback = "bad"
    let data = {
      event_name: "",
      event_data: {},
    }

    //Post the feedback
    data["event_name"] = "feedback_event"
    data["event_data"]["seat_name"] = mainstore.getSeatName()
    data["event_data"]["username"] = mainstore.getUsername()
    data["event_data"]["rating"] = feedback
    ActionCreators.postDataToInterface(data)

    // Logout from the current session
    if (
      mainstore.getLogoutState() === "false" ||
      mainstore.getLogoutState() === false
    ) {
      return false
    } else {
      ActionCreators.logoutSession(true)
    }
  },
  render: function () {
    return (
      <div style={{ display: "block", zIndex: 9999 }} className="modal">
        <div id="emergencyOverlay" className="emergencyOverlay">
          {" "}
        </div>
        <div
          style={{ marginLeft: "25%", marginTop: "8%" }}
          className="modal-dialog"
        >
          <div className="modal-content">
            <div
              style={{ background: "transparent", padding: "0px" }}
              className="modal-header"
            >
              <div
                style={{
                  color: "#4D5055",
                  backgroundColor: "#EFEFEF",
                  fontSize: "20px",
                }}
                className="modal-title"
              >
                How was your experience?
              </div>
            </div>
            <div style={{ fontSize: "1.5em" }} className="modal-body">
              <div className="buttonContainer center-block chklstButtonContainer">
                <div className="row removeBorder feedbackKey">
                  <div
                    className="col-md-4"
                    style={{
                      backgroundColor: "blanchedalmond",
                      opacity: 0.9,
                      textAlign: "center",
                    }}
                    data-feedback="bad"
                    onClick={this.sendFeedback("bad")}
                  >
                    <img
                      src={"./assets/images/feedbackBad.svg"}
                      height="140px"
                      width="140px"
                      alt="bad"
                    />
                    <div>Bad</div>
                  </div>

                  <div
                    className="col-md-4"
                    style={{
                      backgroundColor: "blanchedalmond",
                      opacity: 0.9,
                      textAlign: "center",
                    }}
                    data-feedback="okay"
                    onClick={this.sendFeedback()}
                  >
                    <img
                      src={"./assets/images/feedbackOk.svg"}
                      height="140px"
                      width="140px"
                      alt="ok"
                    />
                    <div>Okay</div>
                  </div>
                  <div
                    className="col-md-4"
                    style={{
                      backgroundColor: "blanchedalmond",
                      opacity: 0.9,
                      textAlign: "center",
                    }}
                    data-feedback="awesome"
                    onClick={this.sendFeedback()}
                  >
                    <img
                      src={"./assets/images/awesome.svg"}
                      height="140px"
                      width="140px"
                      alt="awesome"
                    />
                    <div>Awesome</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
})

module.exports = FeedbackModal
