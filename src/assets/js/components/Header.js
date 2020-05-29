var React = require("react")
var allSvgConstants = require("../constants/svgConstants")
var CommonActions = require("../actions/CommonActions")
var mainstore = require("../stores/mainstore")
var virtualkeyboard = require("virtual-keyboard")
var jqueryPosition = require("jquery-ui/position")
var virtualKeyBoard_header = null
var UPHIndicator = require("./UPHIndicator")
var appConstants = require("../constants/appConstants")
var EmergencyModal = require('./Modal/EmergencyModal')


function getState() {
  return {
    spinner: mainstore.getSpinnerState(),
    systemIsIdle: mainstore.getSystemIdleState(),
    logoutState: mainstore.getLogoutState(),
    scanAllowed: mainstore.getScanAllowedStatus(),
    ppsMode: mainstore.getPpsMode(),
    ppsProfile: mainstore.getPpsProfile(),
    ppsRequestedStatus: mainstore.getPpsRequestedStatus(),
    ppsId: mainstore.getSeatName(),
    uphCount: mainstore.getUPHCount(),
    isUPHActive: mainstore.isUPHActive(),
    frontScreen: mainstore.getSeatType(),
    uphThreshold: mainstore.getUPHThreshold()
  }
}
var Header = React.createClass({
  virtualKeyBoard: "",
  exceptionMenu: "",
  searchMenu: "",
  getInitialState: function() {
    return getState()
  },
  openKeyboard: function() {
    $("#actionMenu").hide()
    $(".form-control").blur()
    virtualKeyBoard_header = $("#barcode").keyboard({
      layout: "custom",
      customLayout: {
        default: [
          "! @ # $ % ^ & * + _",
          "1 2 3 4 5 6 7 8 9 0 {b}",
          "q w e r t y u i o p",
          "a s d f g h j k l",
          "{shift} z x c v b n m . {shift}",
          "{space}",
          "{a} {c}"
        ],
        shift: [
          "( ) { } [ ] = ~ ` -",
          "< > | ? / \" : ; , ' {b}",
          "Q W E R T Y U I O P",
          "A S D F G H J K L",
          "{shift} Z X C V B N M . {shift}",
          "{space}",
          "{a} {c}"
        ]
      },
      css: {
        container:
          "ui-widget-content ui-widget ui-corner-all ui-helper-clearfix custom-keypad"
      },
      reposition: true,
      alwaysOpen: false,
      initialFocus: true,
      position: {
        of: $(".keyboard-actions"),
        my: "center top",
        at: "center top"
      },
      visible: function(e, keypressed, el) {
        el.value = ""
      },
      accepted: function(e, keypressed, el) {
        if (e.target.value === "") {
        } else {
          var data = {
            event_name: "process_barcode",
            event_data: {
              barcode: e.target.value.trim()
            },
            source: "ui"
          }
          CommonActions.postDataToInterface(data)
        }
      }
    })
    $("#barcode")
      .data("keyboard")
      .reveal()
  },
  logoutSession: function() {
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
  componentDidMount: function() {},
  enableException: function() {
    CommonActions.enableException(true)
    var data = {}
    data["code"] = null
    data["level"] = "error"
    CommonActions.generateNotification(data)
    $("#actionMenu").hide()
  },
  enableSearch: function() {
    CommonActions.updateSeatData([], "itemSearch")
    $("#actionMenu").hide()
  },
  showMenu: function() {
    $("#actionMenu").toggle()
    $(".subMenu").hide()
  },
  refresh: function() {
    location.reload()
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
  getExceptionMenu: function() {
    var x = "",
      screenId = mainstore.getScreenId()
    for (var prop in appConstants) {
      if (appConstants.hasOwnProperty(prop)) {
        if (appConstants[prop] == screenId) {
          x = prop
          break
        }
      }
    }
    if (
      x.search("EXCEPTION") != -1 ||
      screenId === appConstants.PUT_FRONT_EXCEPTION_DAMAGED_ENTITY ||
      screenId === appConstants.PICK_FRONT_EXCEPTION_DAMAGED_ENTITY ||
      screenId === appConstants.PUT_BACK_PHYSICALLY_DAMAGED_ITEMS ||
      screenId === appConstants.PUT_FRONT_EXCESS_ITEMS_PPSBIN ||
      screenId === appConstants.PICK_FRONT_MISSING_DAMAGED_UNSCANNABLE_ENTITY ||
      screenId === appConstants.PICK_FRONT_IRT_BIN_CONFIRM ||
      screenId === appConstants.PUT_FRONT_MISSING_DAMAGED_UNSCANNABLE_ENTITY ||
      screenId === appConstants.PUT_FRONT_ITEMS_TO_IRT_BIN
    )
      this.exceptionMenu = ""
    else if (mainstore.getExceptionAllowed().length > 0)
      this.exceptionMenu = (
        <div className="actionItem" onClick={this.enableException}>
          {_("Exception")}
        </div>
      )
    else
      this.exceptionMenu = (
        <div className="actionItem disable">{_("Exception")}</div>
      )
  },
  getSearchItemMenu: function() {
    if (mainstore.orphanSearchAllowed()) {
      this.searchMenu = (
        <div className="actionItem" onClick={this.enableSearch}>
          {_("Item Search")}
        </div>
      )
    }
  },

  peripheralData: function(type) {
    CommonActions.getPeriPheralData(type)
    $("#actionMenu").hide()
  },
  utilityMenu: function() {
    $(".subMenu").toggle()
    //CommonActions.displayperipheralMenu();
  },
  notifyTower: function() {
    var data = {
      pps_id: this.state.ppsId
    }
    CommonActions.postDataToTower(data)
  },
  render: function() {
    var ppsRequestedStatus=""
    var logoutClass
    var cssClass
    var disableScanClass
    var invoiceFlow =
      mainstore.getScreenId() === appConstants.PUT_BACK_INVOICE ? true : false
    this.getExceptionMenu()
    this.getSearchItemMenu()
    if (this.state.spinner || this.state.systemIsIdle || invoiceFlow) {
      cssClass = "keyboard-actions hide-manual-barcode"
    } else {
      cssClass = "keyboard-actions"
    }
    if (
      mainstore.getLogoutState() === "false" ||
      mainstore.getLogoutState() === false
    ) {
      logoutClass = "actionItem disable"
    } else {
      logoutClass = "actionItem"
    }
    if (this.state.scanAllowed == true) {
      disableScanClass = ""
    } else {
      disableScanClass = "disableScanClass"
    }
    var isFrontScreen = this.state.frontScreen === appConstants.FRONT
    const { uphThreshold, uphCount, ppsMode } = this.state
    const isAuditMode = ppsMode.toUpperCase() === "AUDIT" ? true : false
    if(this.state.ppsRequestedStatus !== "undefined"){
      ppsRequestedStatus = (<div className="ppsMode">
      PPS Requested Status : {this.state.ppsRequestedStatus}
    </div>)
      
    }
    
    return (
      <div>
        <div className="head">
          <div className="logo">
            <img src={allSvgConstants.logo} style={{ width: "142px" }} />
          </div>
          <div className="ppsMode">
            {" "}
            PPS Mode : {this.state.ppsMode.toUpperCase()}{" "}
          </div>
          <div className="ppsMode">
            PPS Profile : {this.state.ppsProfile}
          </div>
          
          {ppsRequestedStatus}
          {this.state.isUPHActive && isFrontScreen && !isAuditMode ? (
            <UPHIndicator
              uphCount={uphCount}
              lowerThreshold={uphThreshold && uphThreshold.lower_threshold}
              upperThreshold={uphThreshold && uphThreshold.upper_threshold}
            />
          ) : (
            ""
          )}
          {mainstore.getSystemEmergency() && 
              <EmergencyModal 
              title="Operation paused"
              bodyContent="Butler operations have been halted."
              bodySubcontent="Please wait for the operation to resume or contact your supervisor for further steps."
          />}
          {mainstore.getSystemAuditError() === true && 
            <EmergencyModal 
                title="System Error"
                bodyContent="There is a problem with the transaction you are working on."
                bodySubcontent="Please place any items you may have in your hand back in the slot."
                bodyAction="Support has been informed, "
                msgAction = "Tap OK to move to another transaction."
                actionTobetaken = {true}
                module = {appConstants.SYSTEM_ERROR}
                action = {appConstants.AUDIT_SIDELINE_ACKNOWLEDGED}
          />}
        {mainstore.getSystemPickError() === true && 
            <EmergencyModal 
                title="System Error"
                bodyContent="There is a problem with the transaction you are working on."
                bodySubcontent="Please place any items you may have in your hand back in bin-x."
                bodyAction="Support has been informed, "
                msgAction = "Tap OK to move to another transaction."
                actionTobetaken = {true}
                module = {appConstants.SYSTEM_ERROR}
                action = {appConstants.AUTO_SIDELINE_CONFIRM}
          />}

          <div className={cssClass} onClick={this.openKeyboard}>
            <img
              src={allSvgConstants.scanHeader}
              className={disableScanClass}
            />
            <input id="barcode" type="text" value="" />
          </div>
          <div className="header-actions" onClick={this.showMenu}>
            <img src={allSvgConstants.menu} />
          </div>
        </div>
        <div className="actionMenu" id="actionMenu">
          {this.exceptionMenu}
          <div className="actionItem" onClick={this.utilityMenu}>
            {_("Utility")}
            <div
              className="subMenu"
              onClick={this.peripheralData.bind(this, "pptl")}
            >
              {_("PPTL Management")}
            </div>
            <div
              className="subMenu"
              onClick={this.peripheralData.bind(this, "barcode_scanner")}
            >
              {_("Scanner Management")}
            </div>
          </div>
          {this.searchMenu}
          <div className={logoutClass} onClick={this.notifyTower}>
            {_("Call for Help")}
          </div>
          <div className={logoutClass} onClick={this.logoutSession}>
            {_("Logout")}
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Header
