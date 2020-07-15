var React = require("react")
var CommonActions = require("../../actions/CommonActions")
var mainstore = require("../../stores/mainstore");


var FeedbackModal = React.createClass({

  logoutSession: function () {
    $("#actionMenu").hide()
    if (
      mainstore.getLogoutState() === "false" ||
      mainstore.getLogoutState() === false
    ) {
      return false
    } else {
      CommonActions.logoutSession(true)
    }
  },

  closeFeedbackModal: function(){
    CommonActions.setFeedback(false);
  },

  sendFeedback: function (rating) {
    switch(rating){
      case 1:
        this.refs.colorPicker_1.style.background = "#EC5A5A";
        break;

      case 2:
          this.refs.colorPicker_2.style.background = "#FF8400";
          break;

      case 3:
          this.refs.colorPicker_3.style.background = "#4ACA57";
          break;
    }
    var self = this;
    setTimeout(function(){
      let feedback = {
        data_type: "",
        data: {},
      }
      var sessionData = JSON.parse(sessionStorage.getItem("sessionData"))
      feedback["data_type"] = "logout";
      feedback["data"]["rating"] = rating + "";
      feedback["data"]["auth-token"] = sessionData.data["auth-token"];
      feedback["data"]["seat_name"] = sessionData.data.seat_name;
      feedback["data"]["username"] = mainstore.getUsername();
      CommonActions.webSocketConnection(feedback);
      self.logoutSession();
    },0);
  },
  
  render: function () {
    var ratings = ["bad", "okay", "awesome"];
    const ratingItems = ratings.map((rating, index) =>
      <div key={index}
        style={{
          backgroundColor: "#F2F2F2",
          opacity: 0.9,
          textAlign: "center",
          width: "33%",
          margin: "0 -5%"
        }}
        ref={'colorPicker_' + (index + 1)}
        data-feedback={rating}
        onClick={this.sendFeedback.bind(this, (ratings.indexOf(rating) + 1))}
      >
        <img
          src={"./assets/images/feedback" + rating[0].toUpperCase() + rating.slice(1) + ".svg"}
          height="140px"
          width="140px"
          alt={rating}
        />
        <div style={{ "fontSize": "1.5em", "fontWeight": "bold" }} >{rating[0].toUpperCase() +
          rating.slice(1)}</div>
      </div>
    );
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
              style={{ padding: "0px", display: "flex", justifyContent: "space-between", alignItems: "center"}}
              className="modal-header"
            >
              <div
                style={{
                  color: "#4D5055",
                  backgroundColor: "#EFEFEF",
                  fontSize: "24px",
                }}
                className="modal-title"
              >
                How was your experience ?
              </div>
              <div onClick={this.closeFeedbackModal} style={{fontSize: "2em", paddingRight: "1em", color: "#000", cursor: "pointer", transform:"scale(1.5,1)"}}> X </div>
            </div>
            <div style={{ fontSize: "1.5em" }} className="modal-body">
              <div className="buttonContainer center-block chklstButtonContainer">
                <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                  {ratingItems}
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