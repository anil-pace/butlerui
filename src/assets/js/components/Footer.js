var React = require("react")
var allSvgConstants = require("../constants/svgConstants")
var CommonActions = require("../actions/CommonActions")
var mainstore = require("../stores/mainstore")
var virtualkeyboard = require("virtual-keyboard")
var jqueryPosition = require("jquery-ui/position")
var virtualKeyBoard_header = null
var UPHIndicator = require("./UPHIndicator")
var appConstants = require("../constants/appConstants")

function getState() {
  return {
  }
}
var Footer = React.createClass({
  componentDidMount: function() {
    document.getElementById("footer_close").src =  mainstore.getGamificationUrl();
  },
  componentWillMount: function() {
    mainstore.addChangeListener(this.onChange)
  },
  onChange: function() {
    if (virtualKeyBoard_header != null) {
      virtualKeyBoard_header.getkeyboard().close()
    }
    this.setState(getState())
  },
  openNav: function() {
    var e = document.getElementById("mySidenav")
    if (e.style.height == "65%") {
      e.style.height = "0px"
    } else {
      e.style.height = "65%"
    }
    document.getElementById("footerOverlay").style.display = "block"
    document.getElementById("footerOverlay").style.transition = "0.5s";
    document.getElementById("footer_open").src =  mainstore.getGamificationExpand();
  },
  closeNav: function() {
    document.getElementById("mySidenav").style.height = "0"
    document.getElementById("footerOverlay").style.display = "none"
  },
  render: function() {
    return (
      <div className="footer">
        <div className="footerWrapper">
        <iframe style={{"border": "1px solid transparent"}} id="footer_close" width="97%" src=""></iframe>
        <div className="upArrow"> <span
                className="glyphicon glyphicon-chevron-up"
                onClick={this.openNav}
              />
        </div>
        </div>
        <div id="footerOverlay" className="footerOverlay"> </div>
        <div id="mySidenav" className="sidenav">
        <iframe id="footer_open" width="100%" height="90%" src=""></iframe>
        <div className="downArrow"> <span
                className="glyphicon glyphicon-chevron-down"
                onClick={this.closeNav}
              />
        </div>
        </div>
      </div>
    )
  }
})

module.exports = Footer
